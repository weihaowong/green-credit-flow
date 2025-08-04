-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  base_score INTEGER DEFAULT 650,
  eco_score INTEGER DEFAULT 0,
  eco_score_month INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create merchants table
CREATE TABLE merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  green_score INTEGER CHECK (green_score >= 0 AND green_score <= 100) NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES merchants(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  eco_score_delta DECIMAL(5,2) DEFAULT 0,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bank_connections table for OAuth simulation
CREATE TABLE bank_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  account_balance DECIMAL(10,2) DEFAULT 0,
  last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_connected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_merchants_green_score ON merchants(green_score);
CREATE INDEX idx_bank_connections_user_id ON bank_connections(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_merchants_updated_at BEFORE UPDATE ON merchants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bank_connections_updated_at BEFORE UPDATE ON bank_connections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to calculate EcoScore delta
CREATE OR REPLACE FUNCTION calculate_eco_score_delta(
  transaction_amount DECIMAL,
  merchant_green_score INTEGER,
  remaining_cap INTEGER
)
RETURNS DECIMAL AS $$
BEGIN
  -- Formula: delta = min( (amount / 3000) × (greenScore / 100) × 50 , remainingCap )
  -- Negative score if greenScore < 50, symmetric weighting
  DECLARE
    calculated_delta DECIMAL;
  BEGIN
    IF merchant_green_score < 50 THEN
      -- Negative score for low green scores
      calculated_delta := -LEAST(
        (transaction_amount / 3000.0) * ((100 - merchant_green_score) / 100.0) * 50,
        remaining_cap
      );
    ELSE
      -- Positive score for high green scores
      calculated_delta := LEAST(
        (transaction_amount / 3000.0) * (merchant_green_score / 100.0) * 50,
        remaining_cap
      );
    END IF;
    
    RETURN calculated_delta;
  END;
END;
$$ LANGUAGE plpgsql;

-- Create function to reset monthly EcoScore
CREATE OR REPLACE FUNCTION reset_monthly_eco_score()
RETURNS VOID AS $$
BEGIN
  UPDATE users 
  SET eco_score = 0, eco_score_month = EXTRACT(MONTH FROM NOW())
  WHERE eco_score_month != EXTRACT(MONTH FROM NOW());
END;
$$ LANGUAGE plpgsql;

-- Insert sample merchants
INSERT INTO merchants (name, green_score, category) VALUES
  ('ABLE GLOBAL BERHAD', 50, 'CONSUMER PRODUCTS & SERVICES'),
  ('ABLEGROUP BERHAD', 50, 'INDUSTRIAL PRODUCTS & SERVICES'),
  ('ABM FUJIYA BERHAD', 50, 'INDUSTRIAL PRODUCTS & SERVICES'),
  ('ACME HOLDINGS BERHAD', 50, 'PROPERTY'),
  ('ADVANCE SYNERGY BHD', 75, 'CONSUMER PRODUCTS & SERVICES'),
  ('ADVANCECON HOLDINGS BERHAD', 75, 'CONSTRUCTION'),
  ('ADVENTA BHD', 50, 'HEALTH CARE'),
  ('AE MULTI HOLDINGS BHD', 50, 'INDUSTRIAL PRODUCTS & SERVICES'),
  ('AEON CO. (M) BHD', 100, 'CONSUMER PRODUCTS & SERVICES'),
  ('AEON CREDIT SERVICE (M) BHD', 75, 'FINANCIAL SERVICES'),
  ('AFFIN BANK BERHAD', 75, 'FINANCIAL SERVICES'),
  ('AHB HOLDINGS BHD', 50, 'CONSUMER PRODUCTS & SERVICES'),
  ('AHMAD ZAKI RESOURCES BHD', 75, 'CONSTRUCTION'),
  ('AIRASIA X BERHAD', 75, 'CONSUMER PRODUCTS & SERVICES');

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bank_connections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Merchants are publicly readable
CREATE POLICY "Anyone can view merchants" ON merchants
  FOR SELECT USING (true);

-- Only admins can modify merchants
CREATE POLICY "Only admins can modify merchants" ON merchants
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Users can only see their own transactions
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Users can only see their own bank connections
CREATE POLICY "Users can view own bank connections" ON bank_connections
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can manage own bank connections" ON bank_connections
  FOR ALL USING (auth.uid()::text = user_id::text); 
