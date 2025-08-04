# EcoScore Wallet

A sustainable spending application that rewards users with credit score bonuses for shopping at eco-friendly merchants. Built with React, TypeScript, and Supabase.

## Features

### 🔐 Authentication
- User signup and login with email/password
- Secure session management with Supabase Auth
- Protected routes and user-specific data

### 💳 Bank Integration
- OAuth simulation for GLC Bank connection
- Real-time account balance display
- Transaction synchronization

### 📊 EcoScore Engine
- Monthly EcoScore calculation (0-50 points)
- Merchant green score matching
- Automatic monthly reset
- Combined credit score display (base + eco)

### 📁 CSV Upload
- Transaction history upload
- Merchant green score management
- Real-time processing and EcoScore updates

### 📈 Real-time Dashboard
- Live transaction feed
- Merchant green score display
- Score breakdown and recommendations

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State Management**: React Query, Custom Hooks
- **Styling**: Tailwind CSS with custom gradients

## Database Schema

### Users Table
```sql
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  base_score INTEGER DEFAULT 650,
  eco_score INTEGER DEFAULT 0,
  eco_score_month INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Merchants Table
```sql
merchants (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  green_score INTEGER CHECK (0-100),
  category TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Transactions Table
```sql
transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  merchant_id UUID REFERENCES merchants(id),
  amount DECIMAL(10,2),
  date DATE,
  eco_score_delta DECIMAL(5,2),
  category TEXT,
  created_at TIMESTAMP
)
```

### Bank Connections Table
```sql
bank_connections (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  bank_name TEXT,
  account_balance DECIMAL(10,2),
  last_sync TIMESTAMP,
  is_connected BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## EcoScore Algorithm

The EcoScore calculation follows this formula:

```
delta = min( (amount / 3000) × (greenScore / 100) × 50 , remainingCap )
```

- **Positive scores**: For merchants with green scores ≥ 50
- **Negative scores**: For merchants with green scores < 50 (symmetric weighting)
- **Monthly cap**: 50 points maximum per month
- **Combined score**: base_score + eco_score (max 850)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd green-credit-flow
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
   - Create a new Supabase project
   - Run the migration in `supabase/migrations/001_initial_schema.sql`
   - Update the Supabase URL and key in `src/integrations/supabase/client.ts`

4. Start the development server:
```bash
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### For Users

1. **Sign Up/Login**: Create an account or sign in
2. **Connect Bank**: Link your GLC Bank account (simulated)
3. **Upload Transactions**: Upload CSV files with transaction history
4. **Track EcoScore**: Monitor your sustainable spending impact
5. **View Merchants**: Browse eco-friendly merchant ratings

### For Admins

1. **Manage Merchants**: Upload merchant green scores via CSV
2. **Monitor Users**: Track user engagement and EcoScore distribution
3. **Analytics**: View spending patterns and sustainability metrics

## CSV Formats

### Transaction Upload
```csv
date,amount,merchant,category
2025-08-01,125.50,Green Earth Grocery,Groceries
2025-08-02,2500.00,Solar Solutions Sdn Bhd,Home & Garden
```

### Merchant Upload
```csv
name,green_score,category
Solar Solutions Sdn Bhd,95,Renewable Energy
Green Earth Grocery,85,Organic Food
```

## API Services

### Authentication Service
- `signUp(email, password)`: Create new user account
- `signIn(email, password)`: Authenticate user
- `signOut()`: End user session
- `getCurrentUser()`: Get authenticated user data

### Transaction Service
- `getTransactions(userId)`: Fetch user transactions
- `uploadTransactions(userId, csvData)`: Process CSV uploads
- `calculateEcoScoreDelta(amount, greenScore, remainingCap)`: Calculate score changes

### Merchant Service
- `getMerchants()`: Fetch all merchants
- `uploadMerchants(csvData)`: Add merchant data
- `searchMerchants(query)`: Search merchants by name

### Bank Connection Service
- `connectBank(userId, bankName)`: Simulate OAuth connection
- `getBankAccounts(userId)`: Fetch account information
- `syncTransactions(userId)`: Sync bank transactions

### User Score Service
- `getUserScore(userId)`: Get current score data
- `updateEcoScore(userId, delta)`: Update EcoScore
- `resetMonthlyEcoScore(userId)`: Reset monthly bonus

## React Hooks

### useAuth()
Manages authentication state and user sessions.

### useTransactions(userId)
Handles transaction data and CSV uploads.

### useMerchants()
Manages merchant data and green scores.

### useBankConnection(userId)
Handles bank connection and OAuth simulation.

### useUserScore(userId)
Manages user score calculations and updates.

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@ecoscorewallet.com or create an issue in the repository.

---

**Note**: This is a sandbox environment for testing purposes. Real bank integration would require proper OAuth implementation and compliance with financial regulations.
