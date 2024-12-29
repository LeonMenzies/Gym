import { createContext, useEffect, useState } from "react";
import useFetchApi from "~hooks/useFetchApi";
import usePostApi from "~hooks/usePostApi";

export type OnboardingData = {
    name?: string;
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    activity_level?: string;
    weight_goal?: string;
    fitness_level?: string;
    weekly_frequency?: string;
    goals?: string[];
    focus_areas?: string[];
    health_issues?: string[];
};

type OnboardingContextType = {
    data: OnboardingData;
    updateData: (key: keyof OnboardingData, value: any) => Promise<void>;
    submitData: () => Promise<void>;
};

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }) => {
    const [data, setData] = useState<OnboardingData>({});
    const [loading, setLoading] = useState(true);
    const [fetchUserInfoResponse, , fetchUserInfoData] = useFetchApi<OnboardingData>("/user/info");
    const [postUserInfoResponse, , postUserInfoData] = usePostApi<Partial<OnboardingData>, OnboardingData>("/user/info");

    useEffect(() => {
        const loadInitialData = async () => {
            await fetchUserInfoData();
            setLoading(false);
        };
        loadInitialData();
    }, []);

    useEffect(() => {
        if (fetchUserInfoResponse) {
            setData(fetchUserInfoResponse.data);
        }
    }, [fetchUserInfoResponse]);

    useEffect(() => {
        if (postUserInfoResponse) {
            setData(postUserInfoResponse.data);
        }
    }, [postUserInfoResponse]);

    const updateOnboardingData = async (key: keyof OnboardingData, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const submitOnboardingData = async () => {
        postUserInfoData(data);
    };

    if (loading || !data) {
        return null;
    }

    return (
        <OnboardingContext.Provider
            value={{
                data,
                updateData: updateOnboardingData,
                submitData: submitOnboardingData,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};
