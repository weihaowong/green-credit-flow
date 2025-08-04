import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

export interface BankConnection {
  id: string;
  user_id: string;
  bank_name: string;
  account_balance: number;
  last_sync: string;
  is_connected: boolean;
  created_at: string;
  updated_at: string;
}

export interface BankAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
  account_type: string;
}

export class BankConnectionService {
  static async getBankConnection(userId: string): Promise<{ connection: BankConnection | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("bank_connections")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
        return { connection: null, error: error.message };
      }

      return { connection: data as BankConnection, error: null };
    } catch (error) {
      return { connection: null, error: "An unexpected error occurred" };
    }
  }

  static async connectBank(userId: string, bankName: string = "GLC Bank"): Promise<{ success: boolean; error: string | null }> {
    try {
      // Simulate OAuth connection process
      const mockBalance = Math.floor(Math.random() * 50000) + 5000; // RM 5k-55k

      const connection: TablesInsert<"bank_connections"> = {
        user_id: userId,
        bank_name: bankName,
        account_balance: mockBalance,
        last_sync: new Date().toISOString(),
        is_connected: true,
      };

      // Check if connection already exists
      const { data: existingConnection } = await supabase
        .from("bank_connections")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (existingConnection) {
        // Update existing connection
        const { error } = await supabase
          .from("bank_connections")
          .update({
            is_connected: true,
            last_sync: new Date().toISOString(),
            account_balance: mockBalance,
          })
          .eq("user_id", userId);

        if (error) {
          return { success: false, error: error.message };
        }
      } else {
        // Create new connection
        const { error } = await supabase
          .from("bank_connections")
          .insert(connection);

        if (error) {
          return { success: false, error: error.message };
        }
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async disconnectBank(userId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("bank_connections")
        .update({
          is_connected: false,
          last_sync: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async refreshBankData(userId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      // Simulate fetching fresh bank data
      const mockBalance = Math.floor(Math.random() * 50000) + 5000;

      const { error } = await supabase
        .from("bank_connections")
        .update({
          account_balance: mockBalance,
          last_sync: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async getBankAccounts(userId: string): Promise<{ accounts: BankAccount[]; error: string | null }> {
    try {
      // Simulate bank accounts from connected bank
      const mockAccounts: BankAccount[] = [
        {
          id: "1",
          name: "Main Savings Account",
          balance: 15420.50,
          currency: "MYR",
          account_type: "Savings",
        },
        {
          id: "2",
          name: "Current Account",
          balance: 8750.25,
          currency: "MYR",
          account_type: "Current",
        },
      ];

      return { accounts: mockAccounts, error: null };
    } catch (error) {
      return { accounts: [], error: "An unexpected error occurred" };
    }
  }

  static async getTransactionHistory(userId: string, days: number = 30): Promise<{ transactions: any[]; error: string | null }> {
    try {
      // Simulate transaction history from bank
      const mockTransactions = [
        {
          id: "1",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          description: "Grocery Store",
          amount: -125.50,
          type: "debit",
        },
        {
          id: "2",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          description: "Salary Deposit",
          amount: 3500.00,
          type: "credit",
        },
        {
          id: "3",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          description: "Online Shopping",
          amount: -89.90,
          type: "debit",
        },
      ];

      return { transactions: mockTransactions, error: null };
    } catch (error) {
      return { transactions: [], error: "An unexpected error occurred" };
    }
  }

  static async syncTransactions(userId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      // Simulate syncing transactions from bank
      // In a real implementation, this would fetch transactions from the bank's API
      // and process them through our EcoScore engine

      // Update last sync time
      const { error } = await supabase
        .from("bank_connections")
        .update({
          last_sync: new Date().toISOString(),
        })
        .eq("user_id", userId);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }
} 