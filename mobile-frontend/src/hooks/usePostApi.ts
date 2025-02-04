import axios from "axios";
import { useCallback, useState } from "react";
import { usePersistentUser } from "~hooks/usePersistentUser";
import { defaultUser } from "~recoil/userAtom";
import { ApiResponse } from "~types/Types";

export const usePostApi = <D, T>(endpoint: string): [ApiResponse<T>, boolean, (data: D) => Promise<void>] => {
    const [results, setResults] = useState<ApiResponse<T>>({
        success: false,
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const { updateUser } = usePersistentUser();

    const postProducts = useCallback(async (data: D) => {
        try {
            setLoading(true);

            const response = await axios.request<ApiResponse<T>>({
                data: data,
                method: "POST",
                url: process.env.REACT_APP_URL_BASE + endpoint,
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

    return [results, loading, postProducts];
};
