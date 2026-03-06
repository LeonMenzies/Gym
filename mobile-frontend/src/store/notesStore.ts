import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// ─── Types ───────────────────────────────────────────────────────────────────

export type TextBlock = {
    id: string;
    type: "text";
    title: string;
    body: string;
    createdAt: number;
    updatedAt: number;
};

export type Subscription = {
    id: string;
    name: string;
    amount: number;
    currency: string;
    cycle: "monthly" | "yearly";
    active: boolean;
    notes: string;
};

export type SubscriptionsBlock = {
    id: string;
    type: "subscriptions";
    title: string;
    items: Subscription[];
    createdAt: number;
    updatedAt: number;
};

export type MediaItem = {
    id: string;
    title: string;
    mediaType: "movie" | "book" | "tv";
    status: "want" | "in-progress" | "done";
    rating?: number;
};

export type MediaBlock = {
    id: string;
    type: "media";
    subtype?: "movie" | "tv";
    title: string;
    items: MediaItem[];
    createdAt: number;
    updatedAt: number;
};

export type KeyValueItem = {
    id: string;
    label: string;
    value: string;
};

export type KeyValueBlock = {
    id: string;
    type: "key-value";
    title: string;
    items: KeyValueItem[];
    createdAt: number;
    updatedAt: number;
};

export type NoteBlock = TextBlock | SubscriptionsBlock | MediaBlock | KeyValueBlock;
export type BlockType = NoteBlock["type"];

// ─── Store ───────────────────────────────────────────────────────────────────

type NotesStore = {
    blocks: NoteBlock[];
    addBlock: (type: BlockType, title?: string, subtype?: "movie" | "tv") => string;
    updateBlockTitle: (id: string, title: string) => void;
    deleteBlock: (id: string) => void;
    // Text block
    updateTextBody: (id: string, body: string) => void;
    // Subscriptions block
    addSubscription: (blockId: string, sub: Omit<Subscription, "id">) => void;
    updateSubscription: (blockId: string, sub: Subscription) => void;
    deleteSubscription: (blockId: string, subId: string) => void;
    // Media block
    addMediaItem: (blockId: string, item: Omit<MediaItem, "id">) => void;
    updateMediaItem: (blockId: string, item: MediaItem) => void;
    deleteMediaItem: (blockId: string, itemId: string) => void;
    // Key-value block
    addKeyValueItem: (blockId: string, item: Omit<KeyValueItem, "id">) => void;
    updateKeyValueItem: (blockId: string, item: KeyValueItem) => void;
    deleteKeyValueItem: (blockId: string, itemId: string) => void;
};

const newId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const touch = <T extends NoteBlock>(block: T): T => ({ ...block, updatedAt: Date.now() });

const defaultTitles: Record<BlockType, string> = {
    text: "Untitled",
    subscriptions: "Subscriptions",
    media: "Media",
    "key-value": "Important Info",
};

export const useNotesStore = create<NotesStore>()(
    persist(
        (set) => ({
            blocks: [],

            addBlock: (type, title, subtype) => {
                const id = newId();
                const now = Date.now();
                const base = { id, title: title?.trim() || defaultTitles[type], createdAt: now, updatedAt: now };
                let block: NoteBlock;
                if (type === "text") block = { ...base, type: "text", body: "" };
                else if (type === "subscriptions") block = { ...base, type: "subscriptions", items: [] };
                else if (type === "media") block = { ...base, type: "media", subtype: subtype ?? "movie", items: [] };
                else block = { ...base, type: "key-value", items: [] };
                set((s) => ({ blocks: [block, ...s.blocks] }));
                return id;
            },

            updateBlockTitle: (id, title) =>
                set((s) => ({
                    blocks: s.blocks.map((b) => (b.id === id ? touch({ ...b, title }) : b)),
                })),

            deleteBlock: (id) =>
                set((s) => ({ blocks: s.blocks.filter((b) => b.id !== id) })),

            updateTextBody: (id, body) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === id && b.type === "text" ? touch({ ...b, body }) : b
                    ),
                })),

            addSubscription: (blockId, sub) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === blockId && b.type === "subscriptions"
                            ? touch({ ...b, items: [...b.items, { ...sub, id: newId() }] })
                            : b
                    ),
                })),

            updateSubscription: (blockId, sub) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === blockId && b.type === "subscriptions"
                            ? touch({ ...b, items: b.items.map((i) => (i.id === sub.id ? sub : i)) })
                            : b
                    ),
                })),

            deleteSubscription: (blockId, subId) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === blockId && b.type === "subscriptions"
                            ? touch({ ...b, items: b.items.filter((i) => i.id !== subId) })
                            : b
                    ),
                })),

            addMediaItem: (blockId, item) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === blockId && b.type === "media"
                            ? touch({ ...b, items: [...b.items, { ...item, id: newId() }] })
                            : b
                    ),
                })),

            updateMediaItem: (blockId, item) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === blockId && b.type === "media"
                            ? touch({ ...b, items: b.items.map((i) => (i.id === item.id ? item : i)) })
                            : b
                    ),
                })),

            deleteMediaItem: (blockId, itemId) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === blockId && b.type === "media"
                            ? touch({ ...b, items: b.items.filter((i) => i.id !== itemId) })
                            : b
                    ),
                })),

            addKeyValueItem: (blockId, item) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === blockId && b.type === "key-value"
                            ? touch({ ...b, items: [...b.items, { ...item, id: newId() }] })
                            : b
                    ),
                })),

            updateKeyValueItem: (blockId, item) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === blockId && b.type === "key-value"
                            ? touch({ ...b, items: b.items.map((i) => (i.id === item.id ? item : i)) })
                            : b
                    ),
                })),

            deleteKeyValueItem: (blockId, itemId) =>
                set((s) => ({
                    blocks: s.blocks.map((b) =>
                        b.id === blockId && b.type === "key-value"
                            ? touch({ ...b, items: b.items.filter((i) => i.id !== itemId) })
                            : b
                    ),
                })),
        }),
        {
            name: "notes-blocks-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
