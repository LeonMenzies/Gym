import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Note = {
    id: string;
    title: string;
    body: string;
    createdAt: number;
    updatedAt: number;
};

type NotesStore = {
    notes: Note[];
    addNote: () => string;
    updateNote: (id: string, title: string, body: string) => void;
    deleteNote: (id: string) => void;
};

export const useNotesStore = create<NotesStore>()(
    persist(
        (set) => ({
            notes: [],

            addNote: () => {
                const id = Date.now().toString();
                const now = Date.now();
                set((s) => ({
                    notes: [{ id, title: "", body: "", createdAt: now, updatedAt: now }, ...s.notes],
                }));
                return id;
            },

            updateNote: (id, title, body) =>
                set((s) => ({
                    notes: s.notes
                        .map((n) => (n.id === id ? { ...n, title, body, updatedAt: Date.now() } : n))
                        .sort((a, b) => b.updatedAt - a.updatedAt),
                })),

            deleteNote: (id) =>
                set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
        }),
        {
            name: "notes-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
