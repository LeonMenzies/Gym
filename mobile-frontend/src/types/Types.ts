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

export type TabParamList = {
    Dashboard: undefined;
    Timer: undefined;
    Todo: undefined;
    Notes: undefined;
    Settings: undefined;
};

export type TimerStackParamList = {
    TimerHome: undefined;
    StretchBuilder: { routineId?: string } | undefined;
    StretchRunner: { routineId: string };
};
