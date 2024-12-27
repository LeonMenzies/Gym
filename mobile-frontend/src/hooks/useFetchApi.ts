import { useState, useCallback } from "react";
import axios from "axios";
import { ApiResponse } from "~types/Types";


export const useFetchApi = <T>(endpoint: string, initialParams: Record<string, unknown> = {}): [ApiResponse<T>, boolean, (params?: Record<string, unknown>) => Promise<void>] => {
  const [results, setResults] = useState<ApiResponse<T>>({
    success: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(
    async (params: Record<string, unknown> = initialParams) => {
      try {
        setLoading(true);
        const allParams = { ...initialParams, ...params };
        const queryParams = new URLSearchParams(allParams as Record<string, string>).toString();

        const response = await axios.request<ApiResponse<T>>({
          method: "GET",
          url: `${process.env.REACT_APP_URL_BASE}${endpoint}?${queryParams}`,
          withCredentials: true,
        });

        if (!response.data.success) {
          throw new Error(response.data.errorMessage || "Failed to fetch");
        } else {
          setResults(response.data);
        }
      } catch (error: any) {
        setResults({
          success: false,
          errorMessage: error.message,
        });
      } finally {        
        setLoading(false);
      }
    },
    []
  );

  return [results, loading, fetchProducts];
};

export default useFetchApi;