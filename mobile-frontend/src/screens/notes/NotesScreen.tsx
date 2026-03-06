import { FC, useRef, useState } from "react";
import { FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import {
    useNotesStore,
    NoteBlock,
    BlockType,
    SubscriptionsBlock,
    MediaBlock,
    KeyValueBlock,
    TextBlock,
} from "~store/notesStore";
import { useTheme } from "~store/settingsStore";

const timeAgo = (ts: number): string => {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d === 1) return "Yesterday";
    return `${d}d ago`;
};

const subsSummary = (block: SubscriptionsBlock): string => {
    const active = block.items.filter((s) => s.active);
    if (active.length === 0) return "No active subscriptions";
    const monthly = active.filter((s) => s.cycle === "monthly").reduce((sum, s) => sum + s.amount, 0);
    const yearly = active.filter((s) => s.cycle === "yearly").reduce((sum, s) => sum + s.amount, 0);
    const total = monthly + yearly / 12;
    return `$${total.toFixed(2)}/mo · ${active.length} active`;
};

const mediaSummary = (block: MediaBlock): string => {
    const movies = block.items.filter((i) => i.mediaType === "movie").length;
    const books = block.items.filter((i) => i.mediaType === "book").length;
    const tv = block.items.filter((i) => i.mediaType === "tv").length;
    const parts: string[] = [];
    if (movies > 0) parts.push(`${movies} movie${movies !== 1 ? "s" : ""}`);
    if (books > 0) parts.push(`${books} book${books !== 1 ? "s" : ""}`);
    if (tv > 0) parts.push(`${tv} show${tv !== 1 ? "s" : ""}`);
    return parts.length > 0 ? parts.join(" · ") : "Empty";
};

const kvSummary = (block: KeyValueBlock): string => {
    const count = block.items.length;
    if (count === 0) return "No items";
    return `${count} item${count !== 1 ? "s" : ""}`;
};

const textSummary = (block: TextBlock): string => {
    if (!block.body.trim()) return "Empty";
    const words = block.body.trim().split(/\s+/).length;
    const preview = block.body.slice(0, 60).replace(/\n/g, " ");
    return `${preview}${block.body.length > 60 ? "…" : ""} · ${words}w`;
};

const BLOCK_DEFS: { type: BlockType; label: string; icon: string; desc: string }[] = [
    { type: "text", label: "Text Note", icon: "note", desc: "Free-form writing" },
    { type: "subscriptions", label: "Subscriptions", icon: "tag", desc: "Track monthly & yearly costs" },
    { type: "media", label: "Media", icon: "film", desc: "Movies, books & TV shows" },
    { type: "key-value", label: "Important Info", icon: "key", desc: "Addresses, IDs & codes" },
];

const blockIcon = (type: BlockType) => BLOCK_DEFS.find((d) => d.type === type)?.icon ?? "note";
const blockLabel = (type: BlockType) => BLOCK_DEFS.find((d) => d.type === type)?.label ?? "Note";

const blockSummary = (block: NoteBlock): string => {
    if (block.type === "text") return textSummary(block);
    if (block.type === "subscriptions") return subsSummary(block);
    if (block.type === "media") return mediaSummary(block);
    return kvSummary(block);
};

const screenFor = (type: BlockType) => {
    if (type === "text") return "NoteEditor";
    if (type === "subscriptions") return "SubscriptionsBlock";
    if (type === "media") return "MediaBlock";
    return "KeyValueBlock";
};

type Props = { navigation: any };

export const NotesScreen: FC<Props> = ({ navigation }) => {
    const colors = useTheme();
    const { blocks, addBlock } = useNotesStore();
    const [pickerVisible, setPickerVisible] = useState(false);
    const [pendingType, setPendingType] = useState<BlockType | null>(null);
    const [titleDraft, setTitleDraft] = useState("");
    const titleInputRef = useRef<TextInput>(null);

    const handlePickType = (type: BlockType) => {
        setPickerVisible(false);
        setTitleDraft("");
        setPendingType(type);
    };

    const handleCreate = () => {
        if (!pendingType) return;
        const id = addBlock(pendingType, titleDraft);
        setPendingType(null);
        navigation.navigate(screenFor(pendingType), { blockId: id });
    };

    const renderItem = ({ item }: { item: NoteBlock }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.backgroundSecondary }]}
            onPress={() => navigation.navigate(screenFor(item.type), { blockId: item.id })}
            activeOpacity={0.7}
        >
            <View style={[styles.iconBadge, { backgroundColor: colors.primary + "22" }]}>
                <Icon name={blockIcon(item.type) as any} size={18} color={colors.primary} />
            </View>
            <View style={styles.cardBody}>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                    {item.title || blockLabel(item.type)}
                </Text>
                <Text style={[styles.cardSummary, { color: colors.grey }]} numberOfLines={1}>
                    {blockSummary(item)}
                </Text>
            </View>
            <Text style={[styles.cardDate, { color: colors.grey }]}>{timeAgo(item.updatedAt)}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>Notes</Text>
                <TouchableOpacity
                    onPress={() => setPickerVisible(true)}
                    style={[styles.addBtn, { backgroundColor: colors.primary }]}
                >
                    <Icon name="plus" size={18} color={colors.white} />
                </TouchableOpacity>
            </View>

            {blocks.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={[styles.emptyText, { color: colors.grey }]}>No blocks yet</Text>
                </View>
            ) : (
                <FlatList
                    data={blocks}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                />
            )}

            {/* Title input modal */}
            <Modal
                visible={pendingType !== null}
                transparent
                animationType="slide"
                onRequestClose={() => setPendingType(null)}
            >
                <KeyboardAvoidingView
                    style={styles.modalOverlay}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={() => setPendingType(null)}
                    />
                    <View style={[styles.sheet, { backgroundColor: colors.backgroundSecondary }]}>
                        {pendingType && (
                            <>
                                <View style={styles.sheetTitleRow}>
                                    <View style={[styles.sheetIcon, { backgroundColor: colors.primary + "22" }]}>
                                        <Icon name={blockIcon(pendingType) as any} size={20} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
                                        Name your {BLOCK_DEFS.find((d) => d.type === pendingType)?.label}
                                    </Text>
                                </View>
                                <TextInput
                                    ref={titleInputRef}
                                    style={[styles.titleInput, { color: colors.textPrimary, borderBottomColor: colors.primary, backgroundColor: colors.background }]}
                                    value={titleDraft}
                                    onChangeText={setTitleDraft}
                                    placeholder={`e.g. ${pendingType === "media" ? "Movies to Watch" : pendingType === "subscriptions" ? "My Subscriptions" : pendingType === "key-value" ? "Passwords & IDs" : "My Notes"}`}
                                    placeholderTextColor={colors.grey}
                                    autoFocus
                                    returnKeyType="done"
                                    onSubmitEditing={handleCreate}
                                />
                                <TouchableOpacity
                                    style={[styles.createBtn, { backgroundColor: colors.primary }]}
                                    onPress={handleCreate}
                                >
                                    <Text style={[styles.createBtnText, { color: colors.white }]}>Create</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* Block type picker */}
            <Modal
                visible={pickerVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setPickerVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setPickerVisible(false)}
                >
                    <View
                        style={[styles.sheet, { backgroundColor: colors.backgroundSecondary }]}
                        onStartShouldSetResponder={() => true}
                    >
                        <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>Add block</Text>
                        {BLOCK_DEFS.map((def) => (
                            <TouchableOpacity
                                key={def.type}
                                style={[styles.sheetRow, { borderBottomColor: colors.lightGrey }]}
                                onPress={() => handlePickType(def.type)}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.sheetIcon, { backgroundColor: colors.primary + "22" }]}>
                                    <Icon name={def.icon as any} size={20} color={colors.primary} />
                                </View>
                                <View style={styles.sheetText}>
                                    <Text style={[styles.sheetLabel, { color: colors.textPrimary }]}>
                                        {def.label}
                                    </Text>
                                    <Text style={[styles.sheetDesc, { color: colors.grey }]}>
                                        {def.desc}
                                    </Text>
                                </View>
                                <Icon name="arrow-right" size={14} color={colors.grey} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    title: { fontSize: 32, fontWeight: "700" },
    addBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
    },
    list: { paddingHorizontal: 20, gap: 10 },
    card: {
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    iconBadge: {
        width: 40,
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    cardBody: { flex: 1, gap: 3 },
    cardTitle: { fontSize: 16, fontWeight: "600" },
    cardSummary: { fontSize: 13 },
    cardDate: { fontSize: 12 },
    empty: { flex: 1, alignItems: "center", justifyContent: "center" },
    emptyText: { fontSize: 16 },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
    },
    sheet: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 16,
    },
    sheetRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    sheetIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    sheetText: { flex: 1 },
    sheetLabel: { fontSize: 16, fontWeight: "600" },
    sheetDesc: { fontSize: 13, marginTop: 2 },
    sheetTitleRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
    titleInput: {
        fontSize: 16,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        borderBottomWidth: 2,
        marginBottom: 20,
    },
    createBtn: {
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: "center",
        marginBottom: 8,
    },
    createBtnText: { fontSize: 16, fontWeight: "600" },
});
