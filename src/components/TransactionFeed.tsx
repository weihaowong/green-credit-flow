import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, TrendingUp, TrendingDown, Leaf } from "lucide-react";

interface Transaction {
  id: string;
  date: Date;
  merchant: string;
  amount: number;
  greenScore: number;
  ecoScoreDelta: number;
  category?: string;
}

interface TransactionFeedProps {
  transactions: Transaction[];
}

const TransactionFeed = ({ transactions }: TransactionFeedProps) => {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount);
  };

  const getScoreColor = (delta: number) => {
    if (delta > 0) return "text-success";
    if (delta < 0) return "text-destructive";
    return "text-muted-foreground";
  };

  const getScoreBadgeVariant = (delta: number) => {
    if (delta > 0) return "default";
    if (delta < 0) return "destructive";
    return "secondary";
  };

  const getGreenScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    if (score >= 40) return "text-muted-foreground";
    return "text-destructive";
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          Recent Transactions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No transactions yet</p>
            <p className="text-sm">Connect your bank or upload CSV to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg bg-gradient-subtle hover:bg-muted/50 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {transaction.merchant}
                    </span>
                    <span className="font-semibold">
                      {formatAmount(transaction.amount)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{transaction.date.toLocaleDateString()}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Leaf className="h-3 w-3" />
                      <span className={getGreenScoreColor(transaction.greenScore)}>
                        Green Score: {transaction.greenScore}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 ml-4">
                  <Badge 
                    variant={getScoreBadgeVariant(transaction.ecoScoreDelta)}
                    className="flex items-center gap-1"
                  >
                    {transaction.ecoScoreDelta > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : transaction.ecoScoreDelta < 0 ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : null}
                    <span className={getScoreColor(transaction.ecoScoreDelta)}>
                      {transaction.ecoScoreDelta > 0 ? '+' : ''}{transaction.ecoScoreDelta}
                    </span>
                  </Badge>
                  
                  {transaction.category && (
                    <span className="text-xs text-muted-foreground">
                      {transaction.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionFeed;