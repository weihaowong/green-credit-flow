import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Store, ChevronDown, ChevronUp, Leaf, Loader2 } from "lucide-react";

interface Merchant {
  id: string;
  name: string;
  greenScore: number;
  category?: string;
}

interface MerchantsListProps {
  merchants: Merchant[];
  loading?: boolean;
}

const MerchantsList = ({ merchants, loading = false }: MerchantsListProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortedMerchants = [...merchants].sort((a, b) => b.greenScore - a.greenScore);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    if (score >= 40) return "text-muted-foreground";
    return "text-destructive";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default";
    if (score >= 60) return "secondary";
    if (score >= 40) return "outline";
    return "destructive";
  };

  if (loading) {
    return (
      <Card className="shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            Merchant Green Scores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Loading merchants...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-4 cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Store className="h-5 w-5 text-primary" />
                Merchant Green Scores
                <Badge variant="outline" className="ml-2">
                  {merchants.length} merchants
                </Badge>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent>
            {sortedMerchants.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Store className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No merchants available</p>
                <p className="text-sm">Merchant data will appear here once available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sortedMerchants.map((merchant, index) => (
                  <div
                    key={merchant.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-subtle hover:bg-muted/50 transition-colors animate-slide-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {merchant.name}
                        </span>
                        {merchant.category && (
                          <Badge variant="outline" className="text-xs">
                            {merchant.category}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Leaf className="h-3 w-3" />
                        <span className={`text-sm font-medium ${getScoreColor(merchant.greenScore)}`}>
                          {merchant.greenScore}
                        </span>
                      </div>
                      <Badge 
                        variant={getScoreBadgeVariant(merchant.greenScore)}
                        className="min-w-[60px] justify-center"
                      >
                        {merchant.greenScore >= 80 ? "Excellent" :
                         merchant.greenScore >= 60 ? "Good" :
                         merchant.greenScore >= 40 ? "Fair" : "Poor"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default MerchantsList;