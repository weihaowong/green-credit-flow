import { useState } from "react";
import Header from "@/components/Header";
import ScoreCard from "@/components/ScoreCard";
import BankConnection from "@/components/BankConnection";
import TransactionFeed from "@/components/TransactionFeed";
import CSVUpload from "@/components/CSVUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Leaf, 
  Calendar,
  ArrowRight
} from "lucide-react";

const Index = () => {
  // Sample data - in real app this would come from API/database
  const [userScore, setUserScore] = useState({
    baseScore: 650,
    ecoScore: 18,
    combinedScore: 668,
    scoreMonth: 8 // August
  });

  const [isConnected, setIsConnected] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      date: new Date("2025-08-03"),
      merchant: "Green Earth Grocery",
      amount: 125.50,
      greenScore: 85,
      ecoScoreDelta: 2.1,
      category: "Groceries"
    },
    {
      id: "2", 
      date: new Date("2025-08-02"),
      merchant: "Solar Solutions Sdn Bhd",
      amount: 2500.00,
      greenScore: 95,
      ecoScoreDelta: 15.8,
      category: "Home & Garden"
    },
    {
      id: "3",
      date: new Date("2025-08-01"),
      merchant: "Fast Fashion Store",
      amount: 89.90,
      greenScore: 25,
      ecoScoreDelta: -0.6,
      category: "Clothing"
    }
  ]);

  const handleTransactionUpload = (data: any[]) => {
    // Process uploaded transactions
    const newTransactions = data.map((item, index) => ({
      id: `upload-${index}`,
      date: item.date,
      merchant: item.merchant,
      amount: item.amount,
      greenScore: Math.floor(Math.random() * 100), // Would be looked up from merchant DB
      ecoScoreDelta: Math.floor(Math.random() * 10) - 2,
      category: item.category
    }));
    
    setTransactions([...newTransactions, ...transactions]);
  };

  const handleMerchantUpload = (data: any[]) => {
    // Handle merchant green score uploads
    console.log("Merchant data uploaded:", data);
  };

  const stats = [
    {
      title: "Monthly EcoScore",
      value: `+${userScore.ecoScore}`,
      subtitle: `${50 - userScore.ecoScore} remaining`,
      icon: Leaf,
      color: "text-success"
    },
    {
      title: "Green Transactions",
      value: "12",
      subtitle: "This month",
      icon: TrendingUp,
      color: "text-primary"
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
      <Header userName="Amir Rahman" />
      
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <ScoreCard {...userScore} />
            <BankConnection 
              isConnected={isConnected}
              bankName="GLC Bank"
              balance={15420.50}
              lastSync={new Date()}
            />
          </div>

          {/* Middle Column - Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <TransactionFeed transactions={transactions} />
            
            {/* CSV Upload Section */}
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="transactions">Upload Transactions</TabsTrigger>
                <TabsTrigger value="merchants">Manage Merchants</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="mt-6">
                <CSVUpload 
                  type="transactions" 
                  onUploadComplete={handleTransactionUpload}
                />
              </TabsContent>
              
              <TabsContent value="merchants" className="mt-6">
                <CSVUpload 
                  type="merchants" 
                  onUploadComplete={handleMerchantUpload}
                />
              </TabsContent>
            </Tabs>
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
                <Button variant="secondary" size="lg" className="shadow-hover">
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
