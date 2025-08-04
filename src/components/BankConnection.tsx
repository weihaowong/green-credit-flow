import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Landmark, CheckCircle, AlertCircle, Wallet, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BankConnectionProps {
  isConnected: boolean;
  bankName?: string;
  balance?: number;
  lastSync?: Date;
  onConnect?: () => Promise<void>;
  loading?: boolean;
}

const BankConnection = ({ 
  isConnected, 
  bankName, 
  balance, 
  lastSync, 
  onConnect,
  loading = false 
}: BankConnectionProps) => {
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!onConnect) return;
    
    setConnecting(true);
    
    try {
      await onConnect();
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect to bank. Please try again.",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  const formatBalance = (amount?: number) => {
    if (!amount) return "RM 0.00";
    return new Intl.NumberFormat('ms-MY', {
      style: 'currency',
      currency: 'MYR'
    }).format(amount);
  };

  const formatLastSync = (date?: Date) => {
    if (!date) return "Never";
    return date.toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-primary" />
          Bank Connection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isConnected ? (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="font-medium">{bankName || "GLC Bank"}</span>
              </div>
              <Badge variant="outline" className="text-success border-success">
                Connected
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Account Balance</div>
                <div className="text-lg font-semibold flex items-center gap-1">
                  <Wallet className="h-4 w-4 text-primary" />
                  {formatBalance(balance)}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Last Sync</div>
                <div className="text-sm">
                  {formatLastSync(lastSync)}
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                "Refresh Transactions"
              )}
            </Button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <AlertCircle className="h-5 w-5" />
              <span>No bank account connected</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connect your GLC Bank account to start tracking your EcoScore
            </p>
            <Button 
              variant="banking" 
              size="lg" 
              className="w-full"
              onClick={handleConnect}
              disabled={connecting || loading}
            >
              {connecting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect Bank Account"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BankConnection;