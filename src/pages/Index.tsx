import { useState } from "react";
import Header from "@/components/Header";
import ScoreCard from "@/components/ScoreCard";
import BankConnection from "@/components/BankConnection";
import TransactionFeed from "@/components/TransactionFeed";
import CSVUpload from "@/components/CSVUpload";
import MerchantsList from "@/components/MerchantsList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Leaf, 
  Calendar,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useUserScore } from "@/hooks/useUserScore";
import { useTransactions } from "@/hooks/useTransactions";
import { useMerchants } from "@/hooks/useMerchants";
import { useBankConnection } from "@/hooks/useBankConnection";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { score, loading: scoreLoading } = useUserScore(user?.id || null);
  const { transactions, uploadTransactions, loading: transactionsLoading } = useTransactions(user?.id || null);
  const { merchants, loading: merchantsLoading } = useMerchants();
  const { connection, connectBank, isConnected, loading: bankLoading } = useBankConnection(user?.id || null);
  const { toast } = useToast();

  const handleTransactionUpload = async (data: any[]) => {
    const csvTransactions = data.map((item) => ({
      date: item.date,
      amount: item.amount,
      merchant: item.merchant,
      category: item.category,
    }));

    const result = await uploadTransactions(csvTransactions);
    
    if (result.success) {
      toast({
        title: "Transactions uploaded successfully!",
        description: `${data.length} transactions have been processed and your EcoScore has been updated.`,
      });
    } else {
      toast({
        title: "Upload failed",
        description: result.error || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleMerchantUpload = async (data: any[]) => {
    const csvMerchants = data.map((item) => ({
      name: item.name,
      green_score: parseInt(item.green_score),
      category: item.category,
    }));

    // This would typically be an admin function
    toast({
      title: "Merchant upload",
      description: "Merchant data upload is an admin function. Contact support for assistance.",
    });
  };

  const handleBankConnect = async () => {
    const result = await connectBank("GLC Bank");
    
    if (result.success) {
      toast({
        title: "Bank connected successfully!",
        description: "Your GLC Bank account has been linked. Transactions are being imported.",
      });
    } else {
      toast({
        title: "Connection failed",
        description: result.error || "Please try again.",
        variant: "destructive",
      });
    }
  };

  // Show loading state while authentication is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading EcoScore Wallet...</p>
        </div>
      </div>
    );
  }

  // Show welcome screen for unauthenticated users
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-subtle">
        <Header />
        
        <main className="container mx-auto px-4 py-8 space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground">
              Welcome to EcoScore Wallet
            </h2>
            <p className="text-lg text-muted-foreground">
              Track your sustainable spending and boost your credit score with every green purchase
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="text-success border-success">
                🇲🇾 Malaysian Banks Supported
              </Badge>
              <Badge variant="outline" className="text-primary border-primary">
                Sandbox Environment
              </Badge>
            </div>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-eco text-primary-foreground shadow-eco">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Ready to boost your credit score?</h3>
                <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                  Start spending sustainably today and watch your EcoScore grow. 
                  Sign up to connect your bank account or upload your transaction history.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="secondary" size="lg" className="shadow-hover">
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>

        {/* Footer */}
        <footer className="bg-primary/5 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
            <p>&copy; 2025 EcoScore Wallet. A GLC Bank Innovation Project.</p>
            <p className="text-sm mt-2">
              Sandbox environment for testing purposes only.
            </p>
          </div>
        </footer>
      </div>
    );
  }

  // Show main dashboard for authenticated users
  const stats = [
    {
      title: "Monthly EcoScore",
      value: score ? `+${score.ecoScore}` : "Loading...",
      subtitle: score ? `${score.remainingCap} remaining` : "Calculating...",
      icon: Leaf,
      color: "text-success"
    },
    {
      title: "Reset Date",
      value: "Aug 1",
      subtitle: "Next reset",
      icon: Calendar,
      color: "text-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.email?.split('@')[0] || 'User'}!
          </h2>
          <p className="text-lg text-muted-foreground">
            Track your sustainable spending and boost your credit score with every green purchase
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="text-success border-success">
              🇲🇾 Malaysian Banks Supported
            </Badge>
            <Badge variant="outline" className="text-primary border-primary">
              Sandbox Environment
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Score & Bank */}
          <div className="space-y-6">
            {score && (
              <ScoreCard 
                baseScore={score.baseScore}
                ecoScore={score.ecoScore}
                combinedScore={score.combinedScore}
                scoreMonth={score.scoreMonth}
              />
            )}
            <BankConnection 
              isConnected={isConnected}
              bankName="GLC Bank"
              balance={connection?.account_balance || 0}
              lastSync={connection?.last_sync ? new Date(connection.last_sync) : undefined}
              onConnect={handleBankConnect}
              loading={bankLoading}
            />
          </div>

          {/* Middle Column - Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <TransactionFeed 
              transactions={transactions.map(t => ({
                id: t.id,
                date: new Date(t.date),
                merchant: t.merchant?.name || 'Unknown Merchant',
                amount: t.amount,
                greenScore: t.merchant?.green_score || 0,
                ecoScoreDelta: t.eco_score_delta,
                category: t.category || t.merchant?.category || 'Other'
              }))}
              loading={transactionsLoading}
            />
            <MerchantsList 
              merchants={merchants.map(m => ({
                id: m.id,
                name: m.name,
                greenScore: m.green_score,
                category: m.category || 'Other'
              }))}
              loading={merchantsLoading}
            />
            
            {/* CSV Upload Section */}
            <CSVUpload 
              type="transactions" 
              onUploadComplete={handleTransactionUpload}
            />
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-eco text-primary-foreground shadow-eco">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Ready to boost your credit score?</h3>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                Start spending sustainably today and watch your EcoScore grow. 
                Connect your bank account or upload your transaction history to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="shadow-hover"
                  onClick={handleBankConnect}
                  disabled={bankLoading}
                >
                  Connect Bank Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 EcoScore Wallet. A GLC Bank Innovation Project.</p>
          <p className="text-sm mt-2">
            Sandbox environment for testing purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
