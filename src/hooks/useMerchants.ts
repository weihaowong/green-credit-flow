import { useState, useEffect } from "react";
import { MerchantService, type Merchant, type CSVMerchant } from "@/services/merchants";

export function useMerchants() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMerchants = async () => {
    setLoading(true);
    setError(null);
    
    const { merchants: fetchedMerchants, error: fetchError } = await MerchantService.getMerchants();
    
    if (fetchError) {
      setError(fetchError);
    } else {
      setMerchants(fetchedMerchants);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchMerchants();
  }, []);

  const uploadMerchants = async (csvData: CSVMerchant[]) => {
    setLoading(true);
    setError(null);
    
    const { success, error: uploadError } = await MerchantService.uploadMerchants(csvData);
    
    if (uploadError) {
      setError(uploadError);
      setLoading(false);
      return { success: false, error: uploadError };
    }
    
    // Refresh merchants after upload
    await fetchMerchants();
    setLoading(false);
    return { success: true, error: null };
  };

  const addMerchant = async (merchant: Omit<Merchant, "id" | "created_at" | "updated_at">) => {
    setLoading(true);
    setError(null);
    
    const { success, error: addError } = await MerchantService.addMerchant({
      name: merchant.name,
      green_score: merchant.green_score,
      category: merchant.category,
    });
    
    if (addError) {
      setError(addError);
      setLoading(false);
      return { success: false, error: addError };
    }
    
    // Refresh merchants after adding
    await fetchMerchants();
    setLoading(false);
    return { success: true, error: null };
  };

  const updateMerchant = async (id: string, updates: Partial<Merchant>) => {
    setLoading(true);
    setError(null);
    
    const { success, error: updateError } = await MerchantService.updateMerchant(id, updates);
    
    if (updateError) {
      setError(updateError);
      setLoading(false);
      return { success: false, error: updateError };
    }
    
    // Refresh merchants after updating
    await fetchMerchants();
    setLoading(false);
    return { success: true, error: null };
  };

  const deleteMerchant = async (id: string) => {
    setLoading(true);
    setError(null);
    
    const { success, error: deleteError } = await MerchantService.deleteMerchant(id);
    
    if (deleteError) {
      setError(deleteError);
      setLoading(false);
      return { success: false, error: deleteError };
    }
    
    // Refresh merchants after deletion
    await fetchMerchants();
    setLoading(false);
    return { success: true, error: null };
  };

  const searchMerchants = async (query: string) => {
    setLoading(true);
    setError(null);
    
    const { merchants: searchResults, error: searchError } = await MerchantService.searchMerchants(query);
    
    if (searchError) {
      setError(searchError);
      setLoading(false);
      return { merchants: [], error: searchError };
    }
    
    setLoading(false);
    return { merchants: searchResults, error: null };
  };

  const getMerchantsByCategory = async (category: string) => {
    setLoading(true);
    setError(null);
    
    const { merchants: categoryMerchants, error: categoryError } = await MerchantService.getMerchantsByCategory(category);
    
    if (categoryError) {
      setError(categoryError);
      setLoading(false);
      return { merchants: [], error: categoryError };
    }
    
    setLoading(false);
    return { merchants: categoryMerchants, error: null };
  };

  const getMerchantStats = async () => {
    return await MerchantService.getMerchantStats();
  };

  return {
    merchants,
    loading,
    error,
    uploadMerchants,
    addMerchant,
    updateMerchant,
    deleteMerchant,
    searchMerchants,
    getMerchantsByCategory,
    getMerchantStats,
    refreshMerchants: fetchMerchants,
  };
} 