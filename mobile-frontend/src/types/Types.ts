export interface ApiResponse<T> {
  success: boolean;
  errorMessage: string;
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
  accountStatus: "active" | "deactivated" | "onboarding" ;
};

export type EmailLoginT = {
  email: string;å
  password: string;
};