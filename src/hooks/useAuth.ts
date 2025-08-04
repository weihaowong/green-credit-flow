import { useState, useEffect } from "react";
import { AuthService, type AuthUser } from "@/services/auth";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session
    const checkAuth = async () => {
      try {
        const { user: currentUser, error: authError } = await AuthService.getCurrentUser();
        if (authError) {
          setError(authError);
        } else {
          setUser(currentUser);
        }
      } catch (err) {
        setError("Failed to check authentication status");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = AuthService.onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    const { user: newUser, error: signUpError } = await AuthService.signUp({ email, password });
    
    if (signUpError) {
      setError(signUpError);
      setLoading(false);
      return { success: false, error: signUpError };
    }
    
    setUser(newUser);
    setLoading(false);
    return { success: true, error: null };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    const { user: authUser, error: signInError } = await AuthService.signIn({ email, password });
    
    if (signInError) {
      setError(signInError);
      setLoading(false);
      return { success: false, error: signInError };
    }
    
    setUser(authUser);
    setLoading(false);
    return { success: true, error: null };
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    
    const { error: signOutError } = await AuthService.signOut();
    
    if (signOutError) {
      setError(signOutError);
      setLoading(false);
      return { success: false, error: signOutError };
    }
    
    setUser(null);
    setLoading(false);
    return { success: true, error: null };
  };

  return {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!user,
  };
} 