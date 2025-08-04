import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert, Tables } from "@/integrations/supabase/types";

export interface Transaction {
  id: string;
  user_id: string;
  merchant_id: string | null;
  amount: number;
  date: string;
  eco_score_delta: number;
  category: string | null;
  created_at: string;
  merchant?: {
    name: string;
    green_score: number;
    category: string | null;
  };
}

export interface CSVTransaction {
  date: string;
  amount: number;
  merchant: string;
  category?: string;
}

export interface TransactionWithMerchant extends Transaction {
  merchant: {
    name: string;
    green_score: number;
    category: string | null;
  };
}

export class TransactionService {
  static async getTransactions(userId: string): Promise<{ transactions: TransactionWithMerchant[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select(`
          *,
          merchant:merchants(name, green_score, category)
        `)
        .eq("user_id", userId)
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) {
        return { transactions: [], error: error.message };
      }

      return { transactions: data as TransactionWithMerchant[], error: null };
    } catch (error) {
      return { transactions: [], error: "An unexpected error occurred" };
    }
  }

  static async uploadTransactions(userId: string, transactions: CSVTransaction[]): Promise<{ success: boolean; error: string | null }> {
    try {
      // Get all merchants for matching
      const { data: merchants, error: merchantsError } = await supabase
        .from("merchants")
        .select("*");

      if (merchantsError) {
        return { success: false, error: merchantsError.message };
      }

      // Process each transaction
      const processedTransactions: TablesInsert<"transactions">[] = [];
      let totalEcoScoreDelta = 0;

      for (const transaction of transactions) {
        // Find matching merchant (simple name matching)
        const merchant = merchants?.find(m => 
          m.name.toLowerCase().includes(transaction.merchant.toLowerCase()) ||
          transaction.merchant.toLowerCase().includes(m.name.toLowerCase())
        );

        // Calculate EcoScore delta
        const remainingCap = 50 - Math.abs(totalEcoScoreDelta); // Monthly cap
        const ecoScoreDelta = merchant 
          ? await this.calculateEcoScoreDelta(transaction.amount, merchant.green_score, remainingCap)
          : 0;

        totalEcoScoreDelta += ecoScoreDelta;

        processedTransactions.push({
          user_id: userId,
          merchant_id: merchant?.id || null,
          amount: transaction.amount,
          date: transaction.date,
          eco_score_delta: ecoScoreDelta,
          category: transaction.category || null,
        });
      }

      // Insert transactions
      const { error: insertError } = await supabase
        .from("transactions")
        .insert(processedTransactions);

      if (insertError) {
        return { success: false, error: insertError.message };
      }

      // Update user's EcoScore
      const { error: updateError } = await supabase
        .from("users")
        .update({ eco_score: totalEcoScoreDelta })
        .eq("id", userId);

      if (updateError) {
        return { success: false, error: updateError.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async calculateEcoScoreDelta(amount: number, greenScore: number, remainingCap: number): Promise<number> {
    try {
      const { data, error } = await supabase.rpc('calculate_eco_score_delta', {
        transaction_amount: amount,
        merchant_green_score: greenScore,
        remaining_cap: remainingCap
      });

      if (error) {
        console.error('Error calculating EcoScore delta:', error);
        return 0;
      }

      return data || 0;
    } catch (error) {
      console.error('Error calling calculate_eco_score_delta:', error);
      return 0;
    }
  }

  static async addTransaction(userId: string, transaction: Omit<TablesInsert<"transactions">, "user_id">): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("transactions")
        .insert({
          ...transaction,
          user_id: userId,
        });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async deleteTransaction(transactionId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transactionId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async getTransactionStats(userId: string): Promise<{ 
    totalTransactions: number; 
    totalSpent: number; 
    averageEcoScoreDelta: number; 
    error: string | null 
  }> {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .select("amount, eco_score_delta")
        .eq("user_id", userId);

      if (error) {
        return { totalTransactions: 0, totalSpent: 0, averageEcoScoreDelta: 0, error: error.message };
      }

      const totalTransactions = data.length;
      const totalSpent = data.reduce((sum, t) => sum + t.amount, 0);
      const averageEcoScoreDelta = data.length > 0 
        ? data.reduce((sum, t) => sum + t.eco_score_delta, 0) / data.length 
        : 0;

      return { 
        totalTransactions, 
        totalSpent, 
        averageEcoScoreDelta, 
        error: null 
      };
    } catch (error) {
      return { totalTransactions: 0, totalSpent: 0, averageEcoScoreDelta: 0, error: "An unexpected error occurred" };
    }
  }
} 