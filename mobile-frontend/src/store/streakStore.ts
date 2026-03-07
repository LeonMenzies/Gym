import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { todayStr } from "./activityStore";

function yesterdayStr(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

type StreakStore = {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string | null;
    logActivity: () => void;
};

export const useStreakStore = create<StreakStore>()(
    persist(
        (set, get) => ({
            currentStreak: 0,
            longestStreak: 0,
            lastActiveDate: null,
            logActivity: () => {
                const today = todayStr();
                const { lastActiveDate, currentStreak, longestStreak } = get();
                if (lastActiveDate === today) return;
                const newStreak = lastActiveDate === yesterdayStr() ? currentStreak + 1 : 1;
                const newLongest = Math.max(longestStreak, newStreak);
                set({ currentStreak: newStreak, longestStreak: newLongest, lastActiveDate: today });
            },
        }),
        {
            name: "streak-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
