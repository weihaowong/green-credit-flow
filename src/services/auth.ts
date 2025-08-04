import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert } from "@/integrations/supabase/types";

export interface AuthUser {
  id: string;
  email: string;
  base_score: number;
  eco_score: number;
  eco_score_month: number;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export class AuthService {
  static async signUp(data: SignUpData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (authData.user) {
        // Create user profile in our users table
        const userProfile: TablesInsert<"users"> = {
          id: authData.user.id,
          email: data.email,
          base_score: 650, // Default base score
          eco_score: 0,
          eco_score_month: new Date().getMonth() + 1,
        };

        const { error: profileError } = await supabase
          .from("users")
          .insert(userProfile);

        if (profileError) {
          return { user: null, error: profileError.message };
        }

        return { user: userProfile as AuthUser, error: null };
      }

      return { user: null, error: "Sign up failed" };
    } catch (error) {
      return { user: null, error: "An unexpected error occurred" };
    }
  }

  static async signIn(data: SignInData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        return { user: null, error: authError.message };
      }

      if (authData.user) {
        // Get user profile from our users table
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single();

        if (profileError) {
          return { user: null, error: profileError.message };
        }

        return { user: userProfile as AuthUser, error: null };
      }

      return { user: null, error: "Sign in failed" };
    } catch (error) {
      return { user: null, error: "An unexpected error occurred" };
    }
  }

  static async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      return { error: "An unexpected error occurred" };
    }
  }

  static async getCurrentUser(): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        return { user: null, error: authError?.message || "No authenticated user" };
      }

      // Get user profile from our users table
      const { data: userProfile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        return { user: null, error: profileError.message };
      }

      return { user: userProfile as AuthUser, error: null };
    } catch (error) {
      return { user: null, error: "An unexpected error occurred" };
    }
  }

  static async onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const { data: userProfile } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();

        callback(userProfile as AuthUser);
      } else if (event === "SIGNED_OUT") {
        callback(null);
      }
    });
  }
} 