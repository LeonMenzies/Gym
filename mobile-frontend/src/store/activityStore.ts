import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ActivityType = "stretch" | "todo" | "gym";

// dateStr format: "YYYY-MM-DD"
type ActivityStore = {
    log: Record<string, ActivityType[]>;
    logActivity: (type: ActivityType, dateStr?: string) => void;
};

export const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export const useActivityStore = create<ActivityStore>()(
    persist(
        (set) => ({
            log: {},
            logActivity: (type, dateStr) => {
                const key = dateStr ?? todayStr();
                set((s) => {
                    const existing = s.log[key] ?? [];
                    if (existing.includes(type)) return s;
                    return { log: { ...s.log, [key]: [...existing, type] } };
                });
            },
        }),
        {
            name: "activity-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
