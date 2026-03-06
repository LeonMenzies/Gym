import { useNotesStore } from "../../store/notesStore";
import type { MediaBlock, SubscriptionsBlock, KeyValueBlock, TextBlock } from "../../store/notesStore";

const initialState = { blocks: [] };

beforeEach(() => {
    useNotesStore.setState(initialState);
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const addText = (title = "My Note") => useNotesStore.getState().addBlock("text", title);
const addSubs = (title = "Subscriptions") => useNotesStore.getState().addBlock("subscriptions", title);
const addMedia = (subtype: "movie" | "tv" = "movie", title = "Movies") =>
    useNotesStore.getState().addBlock("media", title, subtype);
const addKV = (title = "Info") => useNotesStore.getState().addBlock("key-value", title);

const getBlock = <T>(id: string) =>
    useNotesStore.getState().blocks.find((b) => b.id === id) as T;

// ─── addBlock ─────────────────────────────────────────────────────────────────

describe("addBlock", () => {
    it("creates a text block with the given title", () => {
        const id = addText("Notes");
        const block = getBlock<TextBlock>(id);
        expect(block.type).toBe("text");
        expect(block.title).toBe("Notes");
        expect(block.body).toBe("");
    });

    it("creates a subscriptions block", () => {
        const id = addSubs("Bills");
        const block = getBlock<SubscriptionsBlock>(id);
        expect(block.type).toBe("subscriptions");
        expect(block.items).toEqual([]);
    });

    it("creates a media block with subtype", () => {
        const id = addMedia("tv", "Shows");
        const block = getBlock<MediaBlock>(id);
        expect(block.type).toBe("media");
        expect(block.subtype).toBe("tv");
        expect(block.title).toBe("Shows");
    });

    it("defaults media subtype to movie", () => {
        const id = addMedia();
        const block = getBlock<MediaBlock>(id);
        expect(block.subtype).toBe("movie");
    });

    it("creates a key-value block", () => {
        const id = addKV();
        const block = getBlock<KeyValueBlock>(id);
        expect(block.type).toBe("key-value");
        expect(block.items).toEqual([]);
    });

    it("falls back to default title if none provided", () => {
        const id = useNotesStore.getState().addBlock("text");
        const block = getBlock<TextBlock>(id);
        expect(block.title).toBe("Untitled");
    });

    it("prepends new blocks", () => {
        const id1 = addText("First");
        const id2 = addText("Second");
        const { blocks } = useNotesStore.getState();
        expect(blocks[0].id).toBe(id2);
        expect(blocks[1].id).toBe(id1);
    });
});

// ─── updateBlockTitle ─────────────────────────────────────────────────────────

describe("updateBlockTitle", () => {
    it("updates the title", () => {
        const id = addText("Old");
        useNotesStore.getState().updateBlockTitle(id, "New");
        expect(getBlock<TextBlock>(id).title).toBe("New");
    });
});

// ─── deleteBlock ──────────────────────────────────────────────────────────────

describe("deleteBlock", () => {
    it("removes the block", () => {
        const id = addText();
        addText("Keep");
        useNotesStore.getState().deleteBlock(id);
        expect(useNotesStore.getState().blocks).toHaveLength(1);
        expect(useNotesStore.getState().blocks.find((b) => b.id === id)).toBeUndefined();
    });
});

// ─── Text block ───────────────────────────────────────────────────────────────

describe("updateTextBody", () => {
    it("updates the body", () => {
        const id = addText();
        useNotesStore.getState().updateTextBody(id, "Hello world");
        expect(getBlock<TextBlock>(id).body).toBe("Hello world");
    });
});

// ─── Subscriptions block ──────────────────────────────────────────────────────

describe("subscriptions block", () => {
    it("adds a subscription", () => {
        const id = addSubs();
        useNotesStore.getState().addSubscription(id, {
            name: "Netflix",
            amount: 15.99,
            currency: "$",
            cycle: "monthly",
            active: true,
            notes: "",
        });
        const block = getBlock<SubscriptionsBlock>(id);
        expect(block.items).toHaveLength(1);
        expect(block.items[0].name).toBe("Netflix");
        expect(block.items[0].amount).toBe(15.99);
    });

    it("updates a subscription", () => {
        const id = addSubs();
        useNotesStore.getState().addSubscription(id, {
            name: "Netflix", amount: 15.99, currency: "$", cycle: "monthly", active: true, notes: "",
        });
        const sub = getBlock<SubscriptionsBlock>(id).items[0];
        useNotesStore.getState().updateSubscription(id, { ...sub, amount: 19.99 });
        expect(getBlock<SubscriptionsBlock>(id).items[0].amount).toBe(19.99);
    });

    it("deletes a subscription", () => {
        const id = addSubs();
        useNotesStore.getState().addSubscription(id, {
            name: "Netflix", amount: 15.99, currency: "$", cycle: "monthly", active: true, notes: "",
        });
        useNotesStore.getState().addSubscription(id, {
            name: "Spotify", amount: 9.99, currency: "$", cycle: "monthly", active: true, notes: "",
        });
        const subId = getBlock<SubscriptionsBlock>(id).items[0].id;
        useNotesStore.getState().deleteSubscription(id, subId);
        const block = getBlock<SubscriptionsBlock>(id);
        expect(block.items).toHaveLength(1);
        expect(block.items.find((s) => s.id === subId)).toBeUndefined();
    });
});

// ─── Media block ──────────────────────────────────────────────────────────────

describe("media block", () => {
    it("adds a media item", () => {
        const id = addMedia();
        useNotesStore.getState().addMediaItem(id, {
            title: "Inception", mediaType: "movie", status: "want",
        });
        const block = getBlock<MediaBlock>(id);
        expect(block.items).toHaveLength(1);
        expect(block.items[0].title).toBe("Inception");
        expect(block.items[0].status).toBe("want");
    });

    it("updates a media item", () => {
        const id = addMedia();
        useNotesStore.getState().addMediaItem(id, {
            title: "Inception", mediaType: "movie", status: "want",
        });
        const item = getBlock<MediaBlock>(id).items[0];
        useNotesStore.getState().updateMediaItem(id, { ...item, status: "done", rating: 5 });
        const updated = getBlock<MediaBlock>(id).items[0];
        expect(updated.status).toBe("done");
        expect(updated.rating).toBe(5);
    });

    it("deletes a media item", () => {
        const id = addMedia();
        useNotesStore.getState().addMediaItem(id, { title: "A", mediaType: "movie", status: "want" });
        useNotesStore.getState().addMediaItem(id, { title: "B", mediaType: "movie", status: "want" });
        const itemId = getBlock<MediaBlock>(id).items[0].id;
        useNotesStore.getState().deleteMediaItem(id, itemId);
        expect(getBlock<MediaBlock>(id).items).toHaveLength(1);
    });
});

// ─── Key-value block ──────────────────────────────────────────────────────────

describe("key-value block", () => {
    it("adds a key-value item", () => {
        const id = addKV();
        useNotesStore.getState().addKeyValueItem(id, { label: "PIN", value: "1234" });
        const block = getBlock<KeyValueBlock>(id);
        expect(block.items).toHaveLength(1);
        expect(block.items[0].label).toBe("PIN");
        expect(block.items[0].value).toBe("1234");
    });

    it("updates a key-value item", () => {
        const id = addKV();
        useNotesStore.getState().addKeyValueItem(id, { label: "PIN", value: "1234" });
        const item = getBlock<KeyValueBlock>(id).items[0];
        useNotesStore.getState().updateKeyValueItem(id, { ...item, value: "5678" });
        expect(getBlock<KeyValueBlock>(id).items[0].value).toBe("5678");
    });

    it("deletes a key-value item", () => {
        const id = addKV();
        useNotesStore.getState().addKeyValueItem(id, { label: "A", value: "1" });
        useNotesStore.getState().addKeyValueItem(id, { label: "B", value: "2" });
        const itemId = getBlock<KeyValueBlock>(id).items[0].id;
        useNotesStore.getState().deleteKeyValueItem(id, itemId);
        expect(getBlock<KeyValueBlock>(id).items).toHaveLength(1);
    });
});
