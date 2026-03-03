import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Task = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
};

type TodoStore = {
    tasks: Task[];
    addTask: (text: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    clearCompleted: () => void;
};

export const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            tasks: [],

            addTask: (text) =>
                set((s) => ({
                    tasks: [
                        {
                            id: Date.now().toString(),
                            text: text.trim(),
                            completed: false,
                            createdAt: Date.now(),
                        },
                        ...s.tasks,
                    ],
                })),

            toggleTask: (id) =>
                set((s) => ({
                    tasks: s.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
                })),

            deleteTask: (id) =>
                set((s) => ({
                    tasks: s.tasks.filter((t) => t.id !== id),
                })),

            clearCompleted: () =>
                set((s) => ({
                    tasks: s.tasks.filter((t) => !t.completed),
                })),
        }),
        {
            name: "todo-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
