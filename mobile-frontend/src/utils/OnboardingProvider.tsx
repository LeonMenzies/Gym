import { createContext, useContext, useEffect, useState } from "react";
import { useOnboardingData } from "~hooks/useOnboardingData";

export type OnboardingData = {
    name?: string;
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    activityLevel?: string;
    weightGoal?: string;
    fitnessLevel?: string;
    frequency?: string;
    goals?: string[];
    focusAreas?: string[];
    healthIssues?: string[];
};

type OnboardingContextType = {
    data: OnboardingData;
    progress: number;
    updateData: (key: keyof OnboardingData, value: any) => void;
    canProceed: (stage: string) => boolean;
};

export const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }) => {
    const [data, setData] = useState<OnboardingData>({});
    const [loading, setLoading] = useState(true);
    const { fetchData, updateData } = useOnboardingData();

    useEffect(() => {
        const loadInitialData = async () => {
            await fetchData();
            setLoading(false);
        };
        loadInitialData();
    }, []);

    const updateOnboardingData = async (key: keyof OnboardingData, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }));
        await updateData({ [key]: value });
    };

    const calculateProgress = () => {
        const totalFields = 8; // Total number of required fields
        const filledFields = Object.values(data).filter(Boolean).length;
        return (filledFields / totalFields) * 100;
    };

    const canProceed = (stage: string) => {
        // Implement your logic to determine if the user can proceed to the next stage
        return true; // Placeholder implementation
    };

    if (loading) {
        return null; // Or loading spinner
    }

    return (
        <OnboardingContext.Provider
            value={{
                data,
                progress: calculateProgress(),
                updateData: updateOnboardingData,
                canProceed,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};
