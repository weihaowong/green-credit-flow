import { useState, useEffect } from "react";
import { TransactionService, type TransactionWithMerchant, type CSVTransaction } from "@/services/transactions";

export function useTransactions(userId: string | null) {
  const [transactions, setTransactions] = useState<TransactionWithMerchant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    const { transactions: fetchedTransactions, error: fetchError } = await TransactionService.getTransactions(userId);
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setTransactions(fetchedTransactions);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId]);

  const uploadTransactions = async (csvData: CSVTransaction[]) => {
    if (!userId) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { success, error: uploadError } = await TransactionService.uploadTransactions(userId, csvData);
    
    if (uploadError) {
      setError(uploadError);
      setLoading(false);
      return { success: false, error: uploadError };
    }
    
    // Refresh transactions after upload
    await fetchTransactions();
    setLoading(false);
    return { success: true, error: null };
  };

  const addTransaction = async (transaction: Omit<TransactionWithMerchant, "id" | "user_id" | "created_at">) => {
    if (!userId) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { success, error: addError } = await TransactionService.addTransaction(userId, {
      merchant_id: transaction.merchant_id,
      amount: transaction.amount,
      date: transaction.date,
      eco_score_delta: transaction.eco_score_delta,
      category: transaction.category,
    });
    
    if (addError) {
      setError(addError);
      setLoading(false);
      return { success: false, error: addError };
    }
    
    // Refresh transactions after adding
    await fetchTransactions();
    setLoading(false);
    return { success: true, error: null };
  };

  const deleteTransaction = async (transactionId: string) => {
    if (!userId) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { success, error: deleteError } = await TransactionService.deleteTransaction(transactionId);
    
    if (deleteError) {
      setError(deleteError);
      setLoading(false);
      return { success: false, error: deleteError };
    }
    
    // Refresh transactions after deletion
    await fetchTransactions();
    setLoading(false);
    return { success: true, error: null };
  };

  const getTransactionStats = async () => {
    if (!userId) {
      return { totalTransactions: 0, totalSpent: 0, averageEcoScoreDelta: 0, error: "User not authenticated" };
    }
    
    return await TransactionService.getTransactionStats(userId);
  };

  return {
    transactions,
    loading,
    error,
    uploadTransactions,
    addTransaction,
    deleteTransaction,
    getTransactionStats,
    refreshTransactions: fetchTransactions,
  };
} 