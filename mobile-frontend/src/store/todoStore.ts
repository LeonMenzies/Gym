import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Ingredient } from "./recipeStore";

export const GROCERY_SECTION_ID = "grocery_list";

export type Section = {
    id: string;
    name: string;
};

export type Recurrence = "none" | "daily" | "weekly";

export type Task = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
    sectionId: string;
    recurrence: Recurrence;
    completedAt: string | null; // YYYY-MM-DD
};

const DEFAULT_SECTION_ID = "default";

const DEFAULT_SECTIONS: Section[] = [
    { id: DEFAULT_SECTION_ID, name: "To-Do" },
    { id: GROCERY_SECTION_ID, name: "Grocery" },
];

function todayDateStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daysBetween(dateA: string, dateB: string): number {
    const a = new Date(dateA).getTime();
    const b = new Date(dateB).getTime();
    return Math.floor(Math.abs(a - b) / 86400000);
}

type TodoStore = {
    sections: Section[];
    tasks: Task[];
    addSection: (name: string) => void;
    deleteSection: (id: string) => void;
    addTask: (text: string, sectionId: string) => void;
    addToGrocery: (ingredients: Ingredient[]) => number;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    moveTask: (id: string, direction: 1 | -1) => void;
    clearCompleted: () => void;
    setRecurrence: (id: string, recurrence: Recurrence) => void;
    resetRecurring: () => void;
};

export const useTodoStore = create<TodoStore>()(
    persist(
        (set, get) => ({
            sections: DEFAULT_SECTIONS,
            tasks: [],

            addSection: (name) =>
                set((s) => ({
                    sections: [...s.sections, { id: `section_${Date.now()}`, name: name.trim() }],
                })),

            deleteSection: (id) => {
                if (id === GROCERY_SECTION_ID) return;
                set((s) => ({
                    sections: s.sections.filter((sec) => sec.id !== id),
                    tasks: s.tasks.filter((t) => t.sectionId !== id),
                }));
            },

            addTask: (text, sectionId) =>
                set((s) => ({
                    tasks: [
                        ...s.tasks,
                        {
                            id: `task_${Date.now()}`,
                            text: text.trim(),
                            completed: false,
                            createdAt: Date.now(),
                            sectionId,
                            recurrence: "none",
                            completedAt: null,
                        },
                    ],
                })),

            addToGrocery: (ingredients) => {
                const existing = get().tasks
                    .filter((t) => t.sectionId === GROCERY_SECTION_ID && !t.completed)
                    .map((t) => t.text.toLowerCase());
                const newTasks: Task[] = ingredients
                    .filter((ing) => ing.name.trim())
                    .filter((ing) => {
                        const label = ing.amount.trim()
                            ? `${ing.amount.trim()} ${ing.name.trim()}`
                            : ing.name.trim();
                        return !existing.includes(label.toLowerCase());
                    })
                    .map((ing) => ({
                        id: `task_${Date.now()}_${Math.random()}`,
                        text: ing.amount.trim()
                            ? `${ing.amount.trim()} ${ing.name.trim()}`
                            : ing.name.trim(),
                        completed: false,
                        createdAt: Date.now(),
                        sectionId: GROCERY_SECTION_ID,
                        recurrence: "none" as Recurrence,
                        completedAt: null,
                    }));
                if (newTasks.length > 0) {
                    set((s) => ({ tasks: [...s.tasks, ...newTasks] }));
                }
                return newTasks.length;
            },

            toggleTask: (id) =>
                set((s) => ({
                    tasks: s.tasks.map((t) => {
                        if (t.id !== id) return t;
                        const completing = !t.completed;
                        return {
                            ...t,
                            completed: completing,
                            completedAt: completing ? todayDateStr() : t.completedAt,
                        };
                    }),
                })),

            deleteTask: (id) =>
                set((s) => ({
                    tasks: s.tasks.filter((t) => t.id !== id),
                })),

            moveTask: (id, direction) =>
                set((s) => {
                    const task = s.tasks.find((t) => t.id === id);
                    if (!task) return {};
                    const sectionTasks = s.tasks.filter((t) => t.sectionId === task.sectionId);
                    const idx = sectionTasks.findIndex((t) => t.id === id);
                    const target = idx + direction;
                    if (target < 0 || target >= sectionTasks.length) return {};
                    const reordered = [...sectionTasks];
                    [reordered[idx], reordered[target]] = [reordered[target], reordered[idx]];
                    const others = s.tasks.filter((t) => t.sectionId !== task.sectionId);
                    return { tasks: [...others, ...reordered] };
                }),

            clearCompleted: () =>
                set((s) => ({
                    tasks: s.tasks.filter((t) => !t.completed),
                })),

            setRecurrence: (id, recurrence) =>
                set((s) => ({
                    tasks: s.tasks.map((t) =>
                        t.id === id ? { ...t, recurrence, completedAt: null } : t
                    ),
                })),

            resetRecurring: () => {
                const today = todayDateStr();
                set((s) => ({
                    tasks: s.tasks.map((t) => {
                        if (!t.completed || t.recurrence === "none" || !t.completedAt) return t;
                        const days = daysBetween(t.completedAt, today);
                        if (t.recurrence === "daily" && days >= 1) {
                            return { ...t, completed: false, completedAt: null };
                        }
                        if (t.recurrence === "weekly" && days >= 7) {
                            return { ...t, completed: false, completedAt: null };
                        }
                        return t;
                    }),
                }));
            },
        }),
        {
            name: "todo-storage",
            storage: createJSONStorage(() => AsyncStorage),
            version: 3,
            migrate: (state: any, version: number) => {
                let s = state;
                if (version < 2) {
                    s = {
                        ...s,
                        sections: [{ id: DEFAULT_SECTION_ID, name: "To-Do" }],
                        tasks: (s.tasks ?? []).map((t: any) => ({
                            ...t,
                            sectionId: t.sectionId ?? DEFAULT_SECTION_ID,
                        })),
                    };
                }
                if (version < 3) {
                    // Add grocery section if not present
                    const hasGrocery = (s.sections ?? []).some((sec: any) => sec.id === GROCERY_SECTION_ID);
                    s = {
                        ...s,
                        sections: hasGrocery
                            ? s.sections
                            : [...(s.sections ?? []), { id: GROCERY_SECTION_ID, name: "Grocery" }],
                        tasks: (s.tasks ?? []).map((t: any) => ({
                            ...t,
                            recurrence: t.recurrence ?? "none",
                            completedAt: t.completedAt ?? null,
                        })),
                    };
                }
                return s;
            },
        }
    )
);
