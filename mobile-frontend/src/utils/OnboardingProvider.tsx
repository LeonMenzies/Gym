import { createContext, useContext, useState } from "react";

export type OnboardingData = {
    name?: string;
    age?: number;
    gender?: string;
    height?: number;
    weight?: number;
    activityLevel?: string;
    weightGoal?: string;
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

    const updateData = (key: keyof OnboardingData, value: any) => {
        setData((prev) => ({ ...prev, [key]: value }));
    };

    const calculateProgress = () => {
        const totalFields = Object.keys(data).length;
        const filledFields = Object.values(data).filter(Boolean).length;
        return (filledFields / totalFields) * 100;
    };

    const canProceed = (stage: string): boolean => {
        switch (stage) {
            case "Name":
                return !!data.name;
            case "Age":
                return !!data.age;
            // ...other validations
            default:
                return true;
        }
    };

    return (
        <OnboardingContext.Provider
            value={{
                data,
                progress: calculateProgress(),
                updateData,
                canProceed,
            }}
        >
            {children}
        </OnboardingContext.Provider>
    );
};
