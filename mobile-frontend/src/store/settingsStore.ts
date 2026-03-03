import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ThemeT } from "~types/Types";

export const lightTheme: ThemeT = {
    primary: "#887160",
    secondary: "#a3a3a3",
    accent: "#887160",
    background: "#cac6c3",
    backgroundSecondary: "#e6e6e6",
    textPrimary: "#000000",
    textSecondary: "#6e6e6e",
    black: "#000000",
    white: "#ffffff",
    lightGrey: "#e5e5e5",
    grey: "#828282",
    error: "#900000",
    success: "#009000",
};

export const darkTheme: ThemeT = {
    primary: "#c8ac97",
    secondary: "#414141",
    accent: "#c8ac97",
    background: "#181818",
    backgroundSecondary: "#414141",
    textPrimary: "#ddcfcf",
    textSecondary: "#a0a0a0",
    black: "#000000",
    white: "#ffffff",
    lightGrey: "#dadada",
    grey: "#b1b1b1",
    error: "#cc0000",
    success: "#00bb00",
};

type SettingsStore = {
    theme: "LIGHT" | "DARK";
    metricType: "METRIC" | "IMPERIAL";
    colors: ThemeT;
    setTheme: (theme: "LIGHT" | "DARK") => void;
    setMetricType: (type: "METRIC" | "IMPERIAL") => void;
};

export const useSettingsStore = create<SettingsStore>()(
    persist(
        (set) => ({
            theme: "LIGHT",
            metricType: "METRIC",
            colors: lightTheme,
            setTheme: (theme) =>
                set({ theme, colors: theme === "LIGHT" ? lightTheme : darkTheme }),
            setMetricType: (metricType) => set({ metricType }),
        }),
        {
            name: "settings-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export const useTheme = () => useSettingsStore((s) => s.colors);
