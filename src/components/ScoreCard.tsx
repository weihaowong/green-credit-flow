import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Leaf } from "lucide-react";

interface ScoreCardProps {
  baseScore: number;
  ecoScore: number;
  combinedScore: number;
  scoreMonth: number;
}

const ScoreCard = ({ baseScore, ecoScore, combinedScore, scoreMonth }: ScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 750) return "text-success";
    if (score >= 650) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 750) return "Excellent";
    if (score >= 650) return "Good";
    if (score >= 550) return "Fair";
    return "Poor";
  };

  return (
    <Card className="shadow-card hover:shadow-hover transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <TrendingUp className="h-5 w-5 text-primary" />
          Credit Score Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Combined Score Display */}
        <div className="text-center space-y-2">
          <div className={`text-4xl font-bold ${getScoreColor(combinedScore)}`}>
            {combinedScore}
          </div>
          <Badge variant="secondary" className="text-sm font-medium">
            {getScoreLabel(combinedScore)}
          </Badge>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Base Score</span>
              <span className="font-medium">{baseScore}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(baseScore / 850) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Leaf className="h-3 w-3 text-success" />
                EcoScore
              </span>
              <span className="font-medium text-success">+{ecoScore}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-score h-2 rounded-full transition-all duration-500"
                style={{ width: `${(ecoScore / 50) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="p-4 bg-gradient-subtle rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">This Month's Progress</span>
            <Badge variant="outline" className="text-success border-success">
              {50 - ecoScore} points remaining
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            Resets on the 1st of each month
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreCard;