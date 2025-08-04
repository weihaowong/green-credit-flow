import { useState, useEffect } from "react";
import { BankConnectionService, type BankConnection, type BankAccount } from "@/services/bankConnection";

export function useBankConnection(userId: string | null) {
  const [connection, setConnection] = useState<BankConnection | null>(null);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBankConnection = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    
    const { connection: fetchedConnection, error: fetchError } = await BankConnectionService.getBankConnection(userId);
    
    if (fetchError && fetchError !== "No rows returned") {
      setError(fetchError);
    } else {
      setConnection(fetchedConnection);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    if (userId) {
      fetchBankConnection();
    }
  }, [userId]);

  const connectBank = async (bankName: string = "GLC Bank") => {
    if (!userId) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { success, error: connectError } = await BankConnectionService.connectBank(userId, bankName);
    
    if (connectError) {
      setError(connectError);
      setLoading(false);
      return { success: false, error: connectError };
    }
    
    // Refresh connection after connecting
    await fetchBankConnection();
    setLoading(false);
    return { success: true, error: null };
  };

  const disconnectBank = async () => {
    if (!userId) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { success, error: disconnectError } = await BankConnectionService.disconnectBank(userId);
    
    if (disconnectError) {
      setError(disconnectError);
      setLoading(false);
      return { success: false, error: disconnectError };
    }
    
    // Refresh connection after disconnecting
    await fetchBankConnection();
    setLoading(false);
    return { success: true, error: null };
  };

  const refreshBankData = async () => {
    if (!userId) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { success, error: refreshError } = await BankConnectionService.refreshBankData(userId);
    
    if (refreshError) {
      setError(refreshError);
      setLoading(false);
      return { success: false, error: refreshError };
    }
    
    // Refresh connection after updating
    await fetchBankConnection();
    setLoading(false);
    return { success: true, error: null };
  };

  const fetchBankAccounts = async () => {
    if (!userId) {
      setError("User not authenticated");
      return { accounts: [], error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { accounts: fetchedAccounts, error: accountsError } = await BankConnectionService.getBankAccounts(userId);
    
    if (accountsError) {
      setError(accountsError);
      setLoading(false);
      return { accounts: [], error: accountsError };
    }
    
    setAccounts(fetchedAccounts);
    setLoading(false);
    return { accounts: fetchedAccounts, error: null };
  };

  const syncTransactions = async () => {
    if (!userId) {
      setError("User not authenticated");
      return { success: false, error: "User not authenticated" };
    }
    
    setLoading(true);
    setError(null);
    
    const { success, error: syncError } = await BankConnectionService.syncTransactions(userId);
    
    if (syncError) {
      setError(syncError);
      setLoading(false);
      return { success: false, error: syncError };
    }
    
    // Refresh connection after syncing
    await fetchBankConnection();
    setLoading(false);
    return { success: true, error: null };
  };

  const getTransactionHistory = async (days: number = 30) => {
    if (!userId) {
      setError("User not authenticated");
      return { transactions: [], error: "User not authenticated" };
    }
    
    return await BankConnectionService.getTransactionHistory(userId, days);
  };

  return {
    connection,
    accounts,
    loading,
    error,
    connectBank,
    disconnectBank,
    refreshBankData,
    fetchBankAccounts,
    syncTransactions,
    getTransactionHistory,
    refreshConnection: fetchBankConnection,
    isConnected: connection?.is_connected || false,
  };
} 