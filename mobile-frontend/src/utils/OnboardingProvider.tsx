import { createContext, useEffect, useState } from "react";
import { useFetchApi } from "~hooks/useFetchApi";
import { usePostApi } from "~hooks/usePostApi";
import { OptionsData, OptionsResponse } from "~types/Types";

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
    options: OptionsData;
    updateData: (key: keyof OnboardingData, value: any) => Promise<void>;
    submitData: () => Promise<void>;
};

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }) => {
    const [data, setData] = useState<OnboardingData>({});
    const [options, setOptions] = useState(null);
    const [currentDatabaseVersion, setCurrentDatabaseVersion] = useState<OnboardingData>({});
    const [loading, setLoading] = useState(true);

    const [fetchUserInfoResponse, , fetchUserInfoData] = useFetchApi<OnboardingData>("/user/info");
    const [fetchOptionsResponse, , fetchOptionsData] = useFetchApi<OptionsResponse>("/user/options");
    const [postUserInfoResponse, , postUserInfoData] = usePostApi<Partial<OnboardingData>, OnboardingData>("/user/info");

    useEffect(() => {
        const loadInitialData = async () => {
            await Promise.all([fetchUserInfoData(), fetchOptionsData()]);
            setLoading(false);
        };
        loadInitialData();
    }, []);

    useEffect(() => {
        if (fetchOptionsResponse?.success) {
            setOptions(fetchOptionsResponse.data);
        }
    }, [fetchOptionsResponse]);

    useEffect(() => {
        if (fetchOptionsResponse?.success) {
            setOptions(fetchOptionsResponse.data);
        }
    }, [fetchOptionsResponse]);

    useEffect(() => {
        if (fetchUserInfoResponse && fetchUserInfoResponse.success) {
            setData(fetchUserInfoResponse.data);
            setCurrentDatabaseVersion(fetchUserInfoResponse.data);
        }
    }, [fetchUserInfoResponse]);

    useEffect(() => {
        if (postUserInfoResponse && postUserInfoResponse.success) {
            setData(postUserInfoResponse.data);
            setCurrentDatabaseVersion(fetchUserInfoResponse.data);
        }
    }, [postUserInfoResponse]);

    const updateOnboardingData = async (key: keyof OnboardingData, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const submitOnboardingData = async () => {
        if (data !== currentDatabaseVersion) {
            postUserInfoData(data);
        }
    };

    if (loading || !data || !options) {
        return null;
    }

    return (
        <OnboardingContext.Provider
            value={{
                data,
                options,
                updateData: updateOnboardingData,
                submitData: submitOnboardingData,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};
