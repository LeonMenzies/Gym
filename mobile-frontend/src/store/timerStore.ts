import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TimerStore = {
    gymRestSeconds: number;
    setGymRestSeconds: (s: number) => void;
};

export const useTimerStore = create<TimerStore>()(
    persist(
        (set) => ({
            gymRestSeconds: 30,
            setGymRestSeconds: (gymRestSeconds) => set({ gymRestSeconds }),
        }),
        {
            name: "timer-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
