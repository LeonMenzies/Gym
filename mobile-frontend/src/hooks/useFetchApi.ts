import { useState, useCallback } from "react";
import axios from "axios";
import { ApiResponse } from "~types/Types";
import { usePersistentUser } from "~hooks/usePersistentUser";
import { defaultUser } from "~recoil/userAtom";

export const useFetchApi = <T>(endpoint: string, initialParams: Record<string, unknown> = {}): [ApiResponse<T>, boolean, (params?: Record<string, unknown>) => Promise<void>] => {
    const [results, setResults] = useState<ApiResponse<T>>({
        success: false,
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const { updateUser } = usePersistentUser();

    const fetchProducts = useCallback(async (params: Record<string, unknown> = initialParams) => {
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
                throw new Error(response.data.message || "Failed to fetch");
            } else {
                setResults(response.data);
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                updateUser(defaultUser);
            }
            setResults({
                success: false,
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    return [results, loading, fetchProducts];
};

export default useFetchApi;
