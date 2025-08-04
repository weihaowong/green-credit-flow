import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert, Tables } from "@/integrations/supabase/types";

export interface User {
  id: string;
  email: string;
  base_score: number;
  eco_score: number;
  eco_score_month: number;
  created_at: string;
  updated_at: string;
}

export interface UserScore {
  baseScore: number;
  ecoScore: number;
  combinedScore: number;
  scoreMonth: number;
  remainingCap: number;
}

export class UserService {
  static async getUser(userId: string): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        return { user: null, error: error.message };
      }

      return { user: data as User, error: null };
    } catch (error) {
      return { user: null, error: "An unexpected error occurred" };
    }
  }

  static async updateUser(userId: string, updates: Partial<TablesInsert<"users">>): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async getUserScore(userId: string): Promise<{ score: UserScore | null; error: string | null }> {
    try {
      const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        return { score: null, error: error.message };
      }

      const currentMonth = new Date().getMonth() + 1;
      
      // Check if we need to reset monthly EcoScore
      if (user.eco_score_month !== currentMonth) {
        await this.resetMonthlyEcoScore(userId);
        user.eco_score = 0;
        user.eco_score_month = currentMonth;
      }

      const combinedScore = Math.min(user.base_score + user.eco_score, 850);
      const remainingCap = Math.max(0, 50 - Math.abs(user.eco_score));

      const score: UserScore = {
        baseScore: user.base_score,
        ecoScore: user.eco_score,
        combinedScore,
        scoreMonth: user.eco_score_month,
        remainingCap,
      };

      return { score, error: null };
    } catch (error) {
      return { score: null, error: "An unexpected error occurred" };
    }
  }

  static async updateEcoScore(userId: string, delta: number): Promise<{ success: boolean; error: string | null }> {
    try {
      // Get current user data
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (userError) {
        return { success: false, error: userError.message };
      }

      const currentMonth = new Date().getMonth() + 1;
      let newEcoScore = user.eco_score;

      // Reset if it's a new month
      if (user.eco_score_month !== currentMonth) {
        newEcoScore = delta;
      } else {
        newEcoScore += delta;
      }

      // Apply monthly cap
      if (Math.abs(newEcoScore) > 50) {
        newEcoScore = newEcoScore > 0 ? 50 : -50;
      }

      const { error } = await supabase
        .from("users")
        .update({
          eco_score: newEcoScore,
          eco_score_month: currentMonth,
        })
        .eq("id", userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async resetMonthlyEcoScore(userId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const currentMonth = new Date().getMonth() + 1;

      const { error } = await supabase
        .from("users")
        .update({
          eco_score: 0,
          eco_score_month: currentMonth,
        })
        .eq("id", userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async getScoreHistory(userId: string, months: number = 6): Promise<{ history: any[]; error: string | null }> {
    try {
      // In a real implementation, this would fetch historical score data
      // For now, we'll simulate some data
      const history = [];
      const currentDate = new Date();

      for (let i = 0; i < months; i++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        history.push({
          month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          baseScore: 650 + Math.floor(Math.random() * 50),
          ecoScore: Math.floor(Math.random() * 51),
          combinedScore: 650 + Math.floor(Math.random() * 100),
        });
      }

      return { history: history.reverse(), error: null };
    } catch (error) {
      return { history: [], error: "An unexpected error occurred" };
    }
  }

  static async getScoreBreakdown(userId: string): Promise<{ breakdown: any; error: string | null }> {
    try {
      // Get user's transactions to calculate score breakdown
      const { data: transactions, error: transactionsError } = await supabase
        .from("transactions")
        .select(`
          amount,
          eco_score_delta,
          merchant:merchants(green_score, category)
        `)
        .eq("user_id", userId);

      if (transactionsError) {
        return { breakdown: null, error: transactionsError.message };
      }

      const breakdown = {
        totalTransactions: transactions.length,
        totalSpent: transactions.reduce((sum, t) => sum + t.amount, 0),
        totalEcoScoreDelta: transactions.reduce((sum, t) => sum + t.eco_score_delta, 0),
        averageTransactionAmount: transactions.length > 0 
          ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length 
          : 0,
        averageEcoScoreDelta: transactions.length > 0 
          ? transactions.reduce((sum, t) => sum + t.eco_score_delta, 0) / transactions.length 
          : 0,
        categoryBreakdown: transactions.reduce((acc, t) => {
          const category = t.merchant?.category || 'Unknown';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        greenScoreDistribution: transactions.reduce((acc, t) => {
          const score = t.merchant?.green_score || 0;
          const range = score >= 80 ? 'Excellent (80-100)' :
                       score >= 60 ? 'Good (60-79)' :
                       score >= 40 ? 'Fair (40-59)' : 'Poor (0-39)';
          acc[range] = (acc[range] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
      };

      return { breakdown, error: null };
    } catch (error) {
      return { breakdown: null, error: "An unexpected error occurred" };
    }
  }

  static async getScoreRecommendations(userId: string): Promise<{ recommendations: string[]; error: string | null }> {
    try {
      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      const { data: transactions } = await supabase
        .from("transactions")
        .select(`
          merchant:merchants(green_score, category)
        `)
        .eq("user_id", userId)
        .limit(10);

      const recommendations: string[] = [];

      if (user.eco_score < 25) {
        recommendations.push("Consider shopping at more eco-friendly merchants to boost your EcoScore");
      }

      if (user.eco_score < 10) {
        recommendations.push("Try uploading more transaction history to see your EcoScore potential");
      }

      const lowGreenScoreTransactions = transactions?.filter(t => (t.merchant?.green_score || 0) < 50) || [];
      if (lowGreenScoreTransactions.length > 0) {
        recommendations.push("Some of your recent purchases were from low-green-score merchants. Consider alternatives for better EcoScore gains.");
      }

      if (user.eco_score >= 40) {
        recommendations.push("Great job! You're close to maxing out your monthly EcoScore bonus.");
      }

      if (recommendations.length === 0) {
        recommendations.push("Keep up the sustainable spending! Your EcoScore is looking good.");
      }

      return { recommendations, error: null };
    } catch (error) {
      return { recommendations: [], error: "An unexpected error occurred" };
    }
  }
} 