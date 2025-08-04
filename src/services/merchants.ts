import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

export interface Merchant {
  id: string;
  name: string;
  green_score: number;
  category: string | null;
  created_at: string;
  updated_at: string;
}

export interface CSVMerchant {
  merchant_id?: string;
  name: string;
  green_score: number;
  category?: string;
}

export class MerchantService {
  static async getMerchants(): Promise<{ merchants: Merchant[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("merchants")
        .select("*")
        .order("green_score", { ascending: false });

      if (error) {
        return { merchants: [], error: error.message };
      }

      return { merchants: data as Merchant[], error: null };
    } catch (error) {
      return { merchants: [], error: "An unexpected error occurred" };
    }
  }

  static async getMerchantById(id: string): Promise<{ merchant: Merchant | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("merchants")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return { merchant: null, error: error.message };
      }

      return { merchant: data as Merchant, error: null };
    } catch (error) {
      return { merchant: null, error: "An unexpected error occurred" };
    }
  }

  static async searchMerchants(query: string): Promise<{ merchants: Merchant[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("merchants")
        .select("*")
        .ilike("name", `%${query}%`)
        .order("green_score", { ascending: false });

      if (error) {
        return { merchants: [], error: error.message };
      }

      return { merchants: data as Merchant[], error: null };
    } catch (error) {
      return { merchants: [], error: "An unexpected error occurred" };
    }
  }

  static async uploadMerchants(merchants: CSVMerchant[]): Promise<{ success: boolean; error: string | null }> {
    try {
      const processedMerchants: TablesInsert<"merchants">[] = merchants.map(merchant => ({
        name: merchant.name,
        green_score: merchant.green_score,
        category: merchant.category || null,
      }));

      const { error } = await supabase
        .from("merchants")
        .insert(processedMerchants);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async addMerchant(merchant: Omit<TablesInsert<"merchants">, "id" | "created_at" | "updated_at">): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("merchants")
        .insert(merchant);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async updateMerchant(id: string, updates: Partial<TablesInsert<"merchants">>): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("merchants")
        .update(updates)
        .eq("id", id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async deleteMerchant(id: string): Promise<{ success: boolean; error: string | null }> {
    try {
      const { error } = await supabase
        .from("merchants")
        .delete()
        .eq("id", id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  }

  static async getMerchantsByCategory(category: string): Promise<{ merchants: Merchant[]; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from("merchants")
        .select("*")
        .eq("category", category)
        .order("green_score", { ascending: false });

      if (error) {
        return { merchants: [], error: error.message };
      }

      return { merchants: data as Merchant[], error: null };
    } catch (error) {
      return { merchants: [], error: "An unexpected error occurred" };
    }
  }

  static async getMerchantStats(): Promise<{ 
    totalMerchants: number; 
    averageGreenScore: number; 
    topCategory: string | null; 
    error: string | null 
  }> {
    try {
      const { data, error } = await supabase
        .from("merchants")
        .select("green_score, category");

      if (error) {
        return { totalMerchants: 0, averageGreenScore: 0, topCategory: null, error: error.message };
      }

      const totalMerchants = data.length;
      const averageGreenScore = data.length > 0 
        ? data.reduce((sum, m) => sum + m.green_score, 0) / data.length 
        : 0;

      // Find top category
      const categoryCounts = data.reduce((acc, merchant) => {
        if (merchant.category) {
          acc[merchant.category] = (acc[merchant.category] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const topCategory = Object.keys(categoryCounts).length > 0
        ? Object.entries(categoryCounts).sort(([,a], [,b]) => b - a)[0][0]
        : null;

      return { 
        totalMerchants, 
        averageGreenScore, 
        topCategory, 
        error: null 
      };
    } catch (error) {
      return { totalMerchants: 0, averageGreenScore: 0, topCategory: null, error: "An unexpected error occurred" };
    }
  }
} 