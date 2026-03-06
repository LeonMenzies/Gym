import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Section = {
    id: string;
    name: string;
};

export type Task = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
    sectionId: string;
};

const DEFAULT_SECTION_ID = "default";

type TodoStore = {
    sections: Section[];
    tasks: Task[];
    addSection: (name: string) => void;
    deleteSection: (id: string) => void;
    addTask: (text: string, sectionId: string) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    reorderTasks: (sectionId: string, orderedTasks: Task[]) => void;
    moveTask: (id: string, direction: 1 | -1) => void;
    clearCompleted: () => void;
};

export const useTodoStore = create<TodoStore>()(
    persist(
        (set) => ({
            sections: [{ id: DEFAULT_SECTION_ID, name: "To-Do" }],
            tasks: [],

            addSection: (name) =>
                set((s) => ({
                    sections: [...s.sections, { id: `section_${Date.now()}`, name: name.trim() }],
                })),

            deleteSection: (id) =>
                set((s) => ({
                    sections: s.sections.filter((sec) => sec.id !== id),
                    tasks: s.tasks.filter((t) => t.sectionId !== id),
                })),

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
                        },
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

            reorderTasks: (sectionId, orderedTasks) =>
                set((s) => {
                    const orderedIds = new Set(orderedTasks.map((t) => t.id));
                    const rest = s.tasks.filter((t) => t.sectionId !== sectionId || !orderedIds.has(t.id));
                    return { tasks: [...rest, ...orderedTasks] };
                }),

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
        }),
        {
            name: "todo-storage",
            storage: createJSONStorage(() => AsyncStorage),
            version: 2,
            migrate: (state: any, version: number) => {
                if (version < 2) {
                    return {
                        ...state,
                        sections: [{ id: DEFAULT_SECTION_ID, name: "To-Do" }],
                        tasks: (state.tasks ?? []).map((t: any) => ({
                            ...t,
                            sectionId: t.sectionId ?? DEFAULT_SECTION_ID,
                        })),
                    };
                }
                return state;
            },
        }
    )
);
