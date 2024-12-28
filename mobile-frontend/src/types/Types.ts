import {
  ACCOUNT_ONBOARDING_STATUS,
  ACCOUNT_ACTIVE_STATUS, 
  ACCOUNT_DEACTIVATED_STATUS
} from "~utils/Constants";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export type ActionItemT = {
  key: string;
  action: string;
  isCompleted: boolean;
  timeEstimate: number;
  priority: number;
  areaOfImportance: string;
  dateAdded: string;
  repeat: boolean;
};

export type AreaOfImportanceItemT = {
  key: string;
  AOI: string;
  Color: string;
};

export type AlertT = {
  message: string;
  type: "info" | "error" | "success" | "warning";
};

export type PlanT = {
  key: string;
  date: string;
  finalized: boolean;
  complete: boolean;
  actionKeys: string[];
};

export type SettingsT = {
  timePercent: boolean;
  lightMode: boolean;
  autoComplete: boolean;
  maxPlanTime: number;
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
  accountStatus: typeof ACCOUNT_ONBOARDING_STATUS | typeof ACCOUNT_ACTIVE_STATUS | typeof ACCOUNT_DEACTIVATED_STATUS;
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
  ActivityLevelStage: undefined;
  AgeStage: undefined;
  CurrentFitnessStage: undefined;
  ExistingHealthIssuesStage: undefined;
  FocusAreasStage: undefined;
  GenderStage: undefined;
  GoalsStage: undefined;
  HeightStage: undefined;
  WeightStage: undefined;
  WeightGoalStage: undefined;
  NameStage: undefined;
};