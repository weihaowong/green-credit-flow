-- =====================================================
-- COMPLETE USERS TABLE WITH RLS POLICIES FOR AUTHENTICATION
-- =====================================================

-- Drop existing tables if they exist (in correct order to handle foreign keys)
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS bank_connections CASCADE;
DROP TABLE IF EXISTS merchants CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- =====================================================
-- 1. CREATE USERS TABLE
-- =====================================================

-- Create users table that references auth.users for proper authentication
CREATE TABLE public.users (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  date_of_birth DATE,
  base_score INTEGER NOT NULL DEFAULT 650 CHECK (base_score >= 300 AND base_score <= 850),
  eco_score INTEGER NOT NULL DEFAULT 0 CHECK (eco_score >= -100 AND eco_score <= 100),
  eco_score_month INTEGER NOT NULL DEFAULT EXTRACT(MONTH FROM NOW()),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add comments for documentation
COMMENT ON TABLE public.users IS 'User profiles linked to Supabase auth.users';
COMMENT ON COLUMN public.users.id IS 'References auth.users.id';
COMMENT ON COLUMN public.users.base_score IS 'Credit/financial base score (300-850)';
COMMENT ON COLUMN public.users.eco_score IS 'Environmental impact score (-100 to 100)';
COMMENT ON COLUMN public.users.eco_score_month IS 'Month when eco_score was last reset';
COMMENT ON COLUMN public.users.preferences IS 'User preferences as JSON object';

-- =====================================================
-- 2. CREATE RELATED TABLES
-- =====================================================

-- Merchants table
CREATE TABLE public.merchants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  website_url TEXT,
  green_score INTEGER NOT NULL CHECK (green_score >= 0 AND green_score <= 100),
  category TEXT NOT NULL,
  subcategory TEXT,
  logo_url TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Malaysia',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.merchants IS 'Merchants with environmental scores';
COMMENT ON COLUMN public.merchants.green_score IS 'Environmental rating (0-100)';

-- Transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES public.merchants(id) ON DELETE SET NULL,
  merchant_name TEXT NOT NULL, -- Backup in case merchant is deleted
  amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
  currency TEXT NOT NULL DEFAULT 'MYR',
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  transaction_type TEXT NOT NULL DEFAULT 'purchase' CHECK (transaction_type IN ('purchase', 'refund', 'adjustment')),
  eco_score_delta DECIMAL(5,2) DEFAULT 0,
  category TEXT,
  subcategory TEXT,
  description TEXT,
  reference_number TEXT,
  payment_method TEXT,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.transactions IS 'User transactions with environmental impact tracking';
COMMENT ON COLUMN public.transactions.eco_score_delta IS 'Change in eco score from this transaction';

-- Bank connections table
CREATE TABLE public.bank_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  bank_name TEXT NOT NULL,
  bank_code TEXT,
  account_number_hash TEXT, -- Store hashed version for security
  account_type TEXT CHECK (account_type IN ('checking', 'savings', 'credit')),
  account_balance DECIMAL(12,2) DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'MYR',
  last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sync_frequency INTEGER DEFAULT 24, -- hours
  is_connected BOOLEAN DEFAULT false,
  is_primary BOOLEAN DEFAULT false,
  connection_status TEXT DEFAULT 'active' CHECK (connection_status IN ('active', 'inactive', 'error', 'revoked')),
  error_message TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.bank_connections IS 'User bank account connections for transaction syncing';

-- User sessions table for tracking login sessions
CREATE TABLE public.user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  session_token TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  device_info JSONB DEFAULT '{}',
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.user_sessions IS 'User session tracking for security';

-- =====================================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Users table indexes
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_eco_score ON public.users(eco_score);
CREATE INDEX idx_users_is_active ON public.users(is_active);
CREATE INDEX idx_users_created_at ON public.users(created_at);

-- Merchants table indexes
CREATE INDEX idx_merchants_name ON public.merchants(name);
CREATE INDEX idx_merchants_slug ON public.merchants(slug);
CREATE INDEX idx_merchants_green_score ON public.merchants(green_score);
CREATE INDEX idx_merchants_category ON public.merchants(category);
CREATE INDEX idx_merchants_is_verified ON public.merchants(is_verified);

-- Transactions table indexes
CREATE INDEX idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX idx_transactions_merchant_id ON public.transactions(merchant_id);
CREATE INDEX idx_transactions_date ON public.transactions(transaction_date);
CREATE INDEX idx_transactions_amount ON public.transactions(amount);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_transactions_user_date ON public.transactions(user_id, transaction_date DESC);

-- Bank connections table indexes
CREATE INDEX idx_bank_connections_user_id ON public.bank_connections(user_id);
CREATE INDEX idx_bank_connections_is_connected ON public.bank_connections(is_connected);
CREATE INDEX idx_bank_connections_is_primary ON public.bank_connections(is_primary);

-- User sessions table indexes
CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires_at ON public.user_sessions(expires_at);
CREATE INDEX idx_user_sessions_session_token ON public.user_sessions(session_token);

-- =====================================================
-- 4. CREATE UTILITY FUNCTIONS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to handle new user creation from auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate eco score delta
CREATE OR REPLACE FUNCTION public.calculate_eco_score_delta(
  transaction_amount DECIMAL,
  merchant_green_score INTEGER,
  remaining_cap INTEGER DEFAULT 50
)
RETURNS DECIMAL AS $$
DECLARE
  calculated_delta DECIMAL;
  base_impact DECIMAL;
BEGIN
  -- Base impact calculation: (amount / 3000) * 50 (max 50 points per transaction)
  base_impact := LEAST((transaction_amount / 3000.0) * 50, remaining_cap);
  
  IF merchant_green_score >= 70 THEN
    -- High green score: positive impact
    calculated_delta := base_impact * (merchant_green_score / 100.0);
  ELSIF merchant_green_score >= 50 THEN
    -- Medium green score: neutral to slightly positive
    calculated_delta := base_impact * ((merchant_green_score - 50) / 50.0) * 0.5;
  ELSE
    -- Low green score: negative impact
    calculated_delta := -base_impact * ((50 - merchant_green_score) / 50.0);
  END IF;
  
  -- Round to 2 decimal places
  RETURN ROUND(calculated_delta, 2);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset monthly eco score
CREATE OR REPLACE FUNCTION public.reset_monthly_eco_score()
RETURNS VOID AS $$
BEGIN
  UPDATE public.users 
  SET 
    eco_score = 0, 
    eco_score_month = EXTRACT(MONTH FROM NOW()),
    updated_at = NOW()
  WHERE eco_score_month != EXTRACT(MONTH FROM NOW());
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's monthly eco score stats
CREATE OR REPLACE FUNCTION public.get_user_eco_stats(user_uuid UUID)
RETURNS TABLE(
  current_score INTEGER,
  monthly_transactions INTEGER,
  positive_transactions INTEGER,
  negative_transactions INTEGER,
  total_spent DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.eco_score,
    COUNT(t.id)::INTEGER as monthly_transactions,
    COUNT(CASE WHEN t.eco_score_delta > 0 THEN 1 END)::INTEGER as positive_transactions,
    COUNT(CASE WHEN t.eco_score_delta < 0 THEN 1 END)::INTEGER as negative_transactions,
    COALESCE(SUM(t.amount), 0) as total_spent
  FROM public.users u
  LEFT JOIN public.transactions t ON u.id = t.user_id 
    AND EXTRACT(MONTH FROM t.transaction_date) = EXTRACT(MONTH FROM NOW())
    AND EXTRACT(YEAR FROM t.transaction_date) = EXTRACT(YEAR FROM NOW())
  WHERE u.id = user_uuid
  GROUP BY u.eco_score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 5. CREATE TRIGGERS
-- =====================================================

-- Trigger for updating updated_at columns
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_merchants_updated_at
  BEFORE UPDATE ON public.merchants
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bank_connections_updated_at
  BEFORE UPDATE ON public.bank_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to automatically create user profile when auth user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bank_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 7. CREATE RLS POLICIES
-- =====================================================

-- Users table policies
CREATE POLICY "Users can view their own profile" 
ON public.users 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.users 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.users 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Admin can view all users
CREATE POLICY "Admins can view all users"
ON public.users
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  )
);

-- Merchants table policies (publicly readable, admin writable)
CREATE POLICY "Anyone can view merchants" 
ON public.merchants
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage merchants" 
ON public.merchants
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  )
);

-- Transactions table policies
CREATE POLICY "Users can view their own transactions" 
ON public.transactions
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" 
ON public.transactions
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions" 
ON public.transactions
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Admins can view all transactions
CREATE POLICY "Admins can view all transactions"
ON public.transactions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.users.id = auth.uid() 
    AND auth.users.raw_app_meta_data->>'role' = 'admin'
  )
);

-- Bank connections table policies
CREATE POLICY "Users can manage their own bank connections" 
ON public.bank_connections
FOR ALL 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- User sessions table policies
CREATE POLICY "Users can view their own sessions" 
ON public.user_sessions
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sessions" 
ON public.user_sessions
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sessions" 
ON public.user_sessions
FOR DELETE 
USING (auth.uid() = user_id);

-- =====================================================
-- 8. INSERT SAMPLE DATA
-- =====================================================

-- Insert sample merchants
INSERT INTO public.merchants (name, slug, green_score, category, subcategory, is_verified) VALUES
('Solar Solutions Sdn Bhd', 'solar-solutions', 95, 'Energy', 'Renewable Energy', true),
('Green Earth Grocery', 'green-earth-grocery', 85, 'Retail', 'Organic Food', true),
('EcoTransport Malaysia', 'ecotransport-malaysia', 82, 'Transportation', 'Public Transport', true),
('Sustainable Living Store', 'sustainable-living', 78, 'Retail', 'Home & Garden', true),
('Local Fresh Market', 'local-fresh-market', 72, 'Food', 'Groceries', false),
('Regular Supermarket', 'regular-supermarket', 45, 'Food', 'Groceries', false),
('Fast Fashion Store', 'fast-fashion', 25, 'Retail', 'Clothing', false),
('Eco-Friendly Restaurant', 'eco-restaurant', 88, 'Food', 'Restaurant', true),
('Green Building Materials', 'green-building', 92, 'Construction', 'Materials', true),
('Sustainable Fashion', 'sustainable-fashion', 75, 'Retail', 'Clothing', true),
('Organic Farm Market', 'organic-farm', 90, 'Food', 'Groceries', true),
('Eco-Cleaning Services', 'eco-cleaning', 80, 'Services', 'Cleaning', false),
('Green Tech Solutions', 'green-tech', 87, 'Technology', 'Software', true),
('Sustainable Packaging', 'sustainable-packaging', 85, 'Manufacturing', 'Packaging', true),
('Eco-Tourism Malaysia', 'eco-tourism', 78, 'Tourism', 'Travel', false);

-- =====================================================
-- 9. GRANT NECESSARY PERMISSIONS
-- =====================================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant access to tables
GRANT SELECT ON public.merchants TO anon, authenticated;
GRANT ALL ON public.users TO authenticated;
GRANT ALL ON public.transactions TO authenticated;
GRANT ALL ON public.bank_connections TO authenticated;
GRANT ALL ON public.user_sessions TO authenticated;

-- Grant access to sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION public.calculate_eco_score_delta TO authenticated;
GRANT EXECUTE ON FUNCTION public.reset_monthly_eco_score TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_eco_stats TO authenticated;

-- =====================================================
-- 10. CREATE HELPFUL VIEWS
-- =====================================================

-- View for user dashboard data
CREATE VIEW public.user_dashboard AS
SELECT 
  u.id,
  u.email,
  u.first_name,
  u.last_name,
  u.base_score,
  u.eco_score,
  COUNT(t.id) as total_transactions,
  COALESCE(SUM(t.amount), 0) as total_spent,
  COUNT(bc.id) as connected_banks,
  u.last_login,
  u.created_at
FROM public.users u
LEFT JOIN public.transactions t ON u.id = t.user_id
LEFT JOIN public.bank_connections bc ON u.id = bc.user_id AND bc.is_connected = true
GROUP BY u.id, u.email, u.first_name, u.last_name, u.base_score, u.eco_score, u.last_login, u.created_at;

-- Grant access to view
GRANT SELECT ON public.user_dashboard TO authenticated;

-- RLS policy for the view
CREATE POLICY "Users can view their own dashboard"
ON public.user_dashboard
FOR SELECT
USING (auth.uid() = id);

ALTER VIEW public.user_dashboard ENABLE ROW LEVEL SECURITY;

COMMENT ON VIEW public.user_dashboard IS 'User dashboard summary data';