import { ACCOUNT_ACTIVE_STATUS, ACCOUNT_DEACTIVATED_STATUS, ACCOUNT_ONBOARDING_STATUS } from "~utils/Constants";

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export type Route = {
    name: string;
    component: React.ComponentType<any>;
    protected?: boolean;
    requiresAuth?: boolean;
};

export type NavigationState = {
    currentRoute: string;
    history: string[];
};

export type ThemeT = {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    backgroundSecondary: string;
    textPrimary: string;
    textSecondary: string;
    black: string;
    white: string;
    lightGrey: string;
    grey: string;
    error: string;
    success: string;
};

export type UserT = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    jwt: string;
    account_status: typeof ACCOUNT_ONBOARDING_STATUS | typeof ACCOUNT_ACTIVE_STATUS | typeof ACCOUNT_DEACTIVATED_STATUS;
    settings: UserSettingsT;
};

export type UserSettingsT = {
    theme: "LIGHT" | "DARK";
    metric_type: "METRIC" | "IMPERIAL";
    notification_enabled: boolean;
};

export type EmailLoginT = {
    email: string;
    password: string;
};

export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    Onboarding: undefined;
};

export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
};

export type TabParamList = {
    Home: undefined;
    Rest: undefined;
    Settings: undefined;
};

export type OnboardingNavigatorListT = {
    ActivityLevelStage: OnboardingNavigatorListItemT;
    AgeStage: OnboardingNavigatorListItemT;
    CurrentFitnessStage: OnboardingNavigatorListItemT;
    ExistingHealthIssuesStage: OnboardingNavigatorListItemT;
    FocusAreasStage: OnboardingNavigatorListItemT;
    GenderStage: OnboardingNavigatorListItemT;
    GoalsStage: OnboardingNavigatorListItemT;
    HeightStage: OnboardingNavigatorListItemT;
    WeightStage: OnboardingNavigatorListItemT;
    WeightGoalStage: OnboardingNavigatorListItemT;
    NameStage: OnboardingNavigatorListItemT;
};

export type OnboardingNavigatorListItemT = {
    nextStage: string;
    prevStage: string;
    step: number;
    totalSteps: number;
};

export type OnboardingStageT = {
    name: string;
    component: React.ComponentType<any>;
};

interface OptionItem {
    id: string | number;
    name: string;
}

export interface OptionsData {
    activity_levels: OptionItem[];
    fitness_levels: OptionItem[];
    focus_areas: OptionItem[];
    genders: OptionItem[];
    goals: OptionItem[];
    health_issues: OptionItem[];
}

export interface OptionsResponse {
    data: OptionsData;
    success: boolean;
}
