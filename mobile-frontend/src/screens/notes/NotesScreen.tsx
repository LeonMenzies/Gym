import { FC, useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import {
    useNotesStore,
    NoteBlock,
    BlockType,
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

const BLOCK_DEFS: { type: BlockType; subtype?: "movie" | "tv"; label: string; icon: string; desc: string }[] = [
    { type: "text", label: "Text Note", icon: "note", desc: "Free-form writing" },
    { type: "subscriptions", label: "Subscriptions", icon: "tag", desc: "Track monthly & yearly costs" },
    { type: "media", subtype: "movie", label: "Movies", icon: "film", desc: "Track movies to watch & rate" },
    { type: "media", subtype: "tv", label: "TV Shows", icon: "screen-desktop", desc: "Track TV shows & series" },
    { type: "key-value", label: "Important Info", icon: "key", desc: "Addresses, IDs & codes" },
];

const blockIcon = (block: NoteBlock): string => {
    if (block.type === "media") return (block.subtype ?? "movie") === "tv" ? "screen-desktop" : "film";
    return BLOCK_DEFS.find((d) => d.type === block.type && !d.subtype)?.icon ?? "note";
};

const blockLabel = (block: NoteBlock): string => {
    if (block.type === "media") return (block.subtype ?? "movie") === "tv" ? "TV Shows" : "Movies";
    return BLOCK_DEFS.find((d) => d.type === block.type && !d.subtype)?.label ?? "Note";
};

const screenFor = (type: BlockType) => {
    if (type === "text") return "NoteEditor";
    if (type === "subscriptions") return "SubscriptionsBlock";
    if (type === "media") return "MediaBlock";
    return "KeyValueBlock";
};

const MAX_PREVIEW = 5;

const renderBlockPreview = (block: NoteBlock, colors: any) => {
    if (block.type === "text") {
        if (!block.body.trim()) {
            return <Text style={[previewStyles.empty, { color: colors.grey }]}>Empty</Text>;
        }
        return (
            <Text style={[previewStyles.text, { color: colors.grey }]} numberOfLines={4}>
                {block.body}
            </Text>
        );
    }

    if (block.type === "media") {
        if (block.items.length === 0) {
            return <Text style={[previewStyles.empty, { color: colors.grey }]}>No items yet</Text>;
        }
        const shown = block.items.slice(0, MAX_PREVIEW);
        const remaining = block.items.length - shown.length;
        return (
            <View style={previewStyles.list}>
                {shown.map((item) => {
                    const dotColor =
                        item.status === "done"
                            ? colors.primary
                            : item.status === "in-progress"
                            ? "#F59E0B"
                            : colors.lightGrey;
                    return (
                        <View key={item.id} style={previewStyles.row}>
                            <View style={[previewStyles.dot, { backgroundColor: dotColor }]} />
                            <Text
                                style={[
                                    previewStyles.rowText,
                                    {
                                        color: item.status === "done" ? colors.grey : colors.textPrimary,
                                        textDecorationLine: item.status === "done" ? "line-through" : "none",
                                        flex: 1,
                                    },
                                ]}
                                numberOfLines={1}
                            >
                                {item.title}
                            </Text>
                            {item.rating !== undefined && (
                                <Text style={[previewStyles.rating, { color: "#F59E0B" }]}>
                                    ★{item.rating.toFixed(1)}
                                </Text>
                            )}
                        </View>
                    );
                })}
                {remaining > 0 && (
                    <Text style={[previewStyles.more, { color: colors.grey }]}>+{remaining} more</Text>
                )}
            </View>
        );
    }

    if (block.type === "subscriptions") {
        if (block.items.length === 0) {
            return <Text style={[previewStyles.empty, { color: colors.grey }]}>No subscriptions yet</Text>;
        }
        const active = block.items.filter((s) => s.active);
        const monthly = active.filter((s) => s.cycle === "monthly").reduce((sum, s) => sum + s.amount, 0);
        const yearly = active.filter((s) => s.cycle === "yearly").reduce((sum, s) => sum + s.amount, 0);
        const total = monthly + yearly / 12;
        const shown = block.items.slice(0, MAX_PREVIEW);
        const remaining = block.items.length - shown.length;
        return (
            <View style={previewStyles.list}>
                {shown.map((sub) => (
                    <View key={sub.id} style={previewStyles.row}>
                        <View
                            style={[
                                previewStyles.dot,
                                { backgroundColor: sub.active ? colors.primary : colors.lightGrey },
                            ]}
                        />
                        <Text
                            style={[previewStyles.rowText, { color: sub.active ? colors.textPrimary : colors.grey, flex: 1 }]}
                            numberOfLines={1}
                        >
                            {sub.name}
                        </Text>
                        <Text style={[previewStyles.amount, { color: colors.grey }]}>
                            {sub.currency}{sub.amount.toFixed(2)}/{sub.cycle === "monthly" ? "mo" : "yr"}
                        </Text>
                    </View>
                ))}
                {remaining > 0 && (
                    <Text style={[previewStyles.more, { color: colors.grey }]}>+{remaining} more</Text>
                )}
                <View style={[previewStyles.divider, { backgroundColor: colors.lightGrey }]} />
                <Text style={[previewStyles.total, { color: colors.primary }]}>
                    ${total.toFixed(2)}/mo · {active.length} active
                </Text>
            </View>
        );
    }

    // key-value
    if (block.items.length === 0) {
        return <Text style={[previewStyles.empty, { color: colors.grey }]}>No items yet</Text>;
    }
    const shown = block.items.slice(0, MAX_PREVIEW);
    const remaining = block.items.length - shown.length;
    return (
        <View style={previewStyles.list}>
            {shown.map((kv) => (
                <View key={kv.id} style={previewStyles.row}>
                    <Text style={[previewStyles.kvLabel, { color: colors.grey }]} numberOfLines={1}>
                        {kv.label}
                    </Text>
                    <Text style={[previewStyles.kvValue, { color: colors.textPrimary }]} numberOfLines={1}>
                        {kv.value}
                    </Text>
                </View>
            ))}
            {remaining > 0 && (
                <Text style={[previewStyles.more, { color: colors.grey }]}>+{remaining} more</Text>
            )}
        </View>
    );
};

const previewStyles = StyleSheet.create({
    empty: { fontSize: 13 },
    text: { fontSize: 14, lineHeight: 20 },
    list: { gap: 6 },
    row: { flexDirection: "row", alignItems: "center", gap: 8 },
    dot: { width: 7, height: 7, borderRadius: 3.5 },
    rowText: { fontSize: 14 },
    rating: { fontSize: 12 },
    amount: { fontSize: 13 },
    more: { fontSize: 12, marginTop: 2 },
    divider: { height: StyleSheet.hairlineWidth, marginVertical: 6 },
    total: { fontSize: 13, fontWeight: "600" },
    kvLabel: { fontSize: 12, fontWeight: "600", width: 90 },
    kvValue: { flex: 1, fontSize: 13 },
});

type BlockDef = typeof BLOCK_DEFS[0];
type Props = { navigation: any };

export const NotesScreen: FC<Props> = ({ navigation }) => {
    const colors = useTheme();
    const { blocks, addBlock } = useNotesStore();
    const [pickerVisible, setPickerVisible] = useState(false);
    const [pendingDef, setPendingDef] = useState<BlockDef | null>(null);
    const [titleDraft, setTitleDraft] = useState("");
    const titleInputRef = useRef<TextInput>(null);

    const handlePickDef = (def: BlockDef) => {
        setPickerVisible(false);
        setTitleDraft("");
        setPendingDef(def);
    };

    const handleCreate = () => {
        if (!pendingDef) return;
        const id = addBlock(pendingDef.type, titleDraft, pendingDef.subtype);
        setPendingDef(null);
        navigation.navigate(screenFor(pendingDef.type), { blockId: id });
    };

    const renderItem = ({ item }: { item: NoteBlock }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.backgroundSecondary }]}
            onPress={() => navigation.navigate(screenFor(item.type), { blockId: item.id })}
            activeOpacity={0.7}
        >
            <View style={styles.cardHeader}>
                <View style={[styles.iconBadge, { backgroundColor: colors.primary + "22" }]}>
                    <Icon name={blockIcon(item) as any} size={18} color={colors.primary} />
                </View>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                    {item.title || blockLabel(item)}
                </Text>
                <Text style={[styles.cardDate, { color: colors.grey }]}>{timeAgo(item.updatedAt)}</Text>
            </View>
            <View style={styles.cardContent}>{renderBlockPreview(item, colors)}</View>
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
                visible={pendingDef !== null}
                transparent
                animationType="slide"
                onRequestClose={() => setPendingDef(null)}
            >
                <KeyboardAvoidingView
                    style={styles.modalOverlay}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        activeOpacity={1}
                        onPress={() => setPendingDef(null)}
                    />
                    <View style={[styles.sheet, { backgroundColor: colors.backgroundSecondary }]}>
                        {pendingDef && (
                            <>
                                <View style={styles.sheetTitleRow}>
                                    <View style={[styles.sheetIcon, { backgroundColor: colors.primary + "22" }]}>
                                        <Icon name={pendingDef.icon as any} size={20} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
                                        Name your {pendingDef.label}
                                    </Text>
                                </View>
                                <TextInput
                                    ref={titleInputRef}
                                    style={[
                                        styles.titleInput,
                                        {
                                            color: colors.textPrimary,
                                            borderBottomColor: colors.primary,
                                            backgroundColor: colors.background,
                                        },
                                    ]}
                                    value={titleDraft}
                                    onChangeText={setTitleDraft}
                                    placeholder={`e.g. My ${pendingDef.label}`}
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
                                key={def.label}
                                style={[styles.sheetRow, { borderBottomColor: colors.lightGrey }]}
                                onPress={() => handlePickDef(def)}
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
    container: { flex: 1, paddingTop: 60 },
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
    list: { paddingHorizontal: 20, gap: 12, paddingBottom: 20 },
    card: {
        borderRadius: 12,
        padding: 14,
        gap: 10,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    iconBadge: {
        width: 36,
        height: 36,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
    },
    cardTitle: { flex: 1, fontSize: 16, fontWeight: "600" },
    cardDate: { fontSize: 12 },
    cardContent: {},
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
