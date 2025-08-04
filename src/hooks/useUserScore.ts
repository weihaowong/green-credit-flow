import { useState, useEffect } from "react";
import { UserService, type UserScore } from "@/services/users";

export function useUserScore(userId: string | null) {
  const [score, setScore] = useState<UserScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserScore = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    const { score: fetchedScore, error: fetchError } = await UserService.getUserScore(userId);
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setScore(fetchedScore);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchUserScore();
    }
  }, [userId]);

  const updateEcoScore = async (delta: number) => {
    if (!userId) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { success, error: updateError } = await UserService.updateEcoScore(userId, delta);
    
    if (updateError) {
      setError(updateError);
      setLoading(false);
      return { success: false, error: updateError };
    }
    
    // Refresh score after updating
    await fetchUserScore();
    setLoading(false);
    return { success: true, error: null };
  };

  const resetMonthlyEcoScore = async () => {
    if (!userId) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { success, error: resetError } = await UserService.resetMonthlyEcoScore(userId);
    
    if (resetError) {
      setError(resetError);
      setLoading(false);
      return { success: false, error: resetError };
    }
    
    // Refresh score after resetting
    await fetchUserScore();
    setLoading(false);
    return { success: true, error: null };
  };

  const getScoreHistory = async (months: number = 6) => {
    if (!userId) {
      return { history: [], error: "User not authenticated" };
    }
    
    return await UserService.getScoreHistory(userId, months);
  };

  const getScoreBreakdown = async () => {
    if (!userId) {
      return { breakdown: null, error: "User not authenticated" };
    }
    
    return await UserService.getScoreBreakdown(userId);
  };

  const getScoreRecommendations = async () => {
    if (!userId) {
      return { recommendations: [], error: "User not authenticated" };
    }
    
    return await UserService.getScoreRecommendations(userId);
  };

  return {
    score,
    loading,
    error,
    updateEcoScore,
    resetMonthlyEcoScore,
    getScoreHistory,
    getScoreBreakdown,
    getScoreRecommendations,
    refreshScore: fetchUserScore,
  };
} 