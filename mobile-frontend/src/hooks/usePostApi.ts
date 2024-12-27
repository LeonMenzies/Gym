import { useState, useCallback } from "react";
import axios from "axios";
import { ApiResponse } from "~types/Types";

export const usePostApi = <D, T>(endpoint: string): [ApiResponse<T>, boolean, (data: D) => Promise<void>] => {
  const [results, setResults] = useState<ApiResponse<T>>({
    success: false,
    errorMessage: "",
  });
  const [loading, setLoading] = useState(false);
  
  const postProducts = useCallback(
    async (data: D) => {
      try {
        setLoading(true);
        console.log(process.env.REACT_APP_URL_BASE + endpoint);

        const response = await axios.request<ApiResponse<T>>({
          data: data,
          method: "POST",
          url: process.env.REACT_APP_URL_BASE + endpoint,
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

  return [results, loading, postProducts];
};

export default usePostApi;
