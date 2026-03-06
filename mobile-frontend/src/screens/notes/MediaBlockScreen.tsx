import { FC, useState } from "react";
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useNotesStore, MediaItem, MediaBlock } from "~store/notesStore";
import { useTheme } from "~store/settingsStore";

type Props = {
    navigation: any;
    route: { params: { blockId: string } };
};

type MediaType = "movie" | "book" | "tv";
type Status = "want" | "in-progress" | "done";

const STATUS_CYCLE: Status[] = ["want", "in-progress", "done"];
const NEXT_STATUS: Record<Status, Status> = {
    want: "in-progress",
    "in-progress": "done",
    done: "want",
};

const STATUS_LABELS: Record<Status, string> = {
    want: "Want",
    "in-progress": "Watching",
    done: "Done",
};

const TYPE_LABELS: Record<MediaType, string> = {
    movie: "Movie",
    book: "Book",
    tv: "TV Show",
};

const TYPE_ICONS: Record<MediaType, string> = {
    movie: "film",
    book: "book-open",
    tv: "screen-desktop",
};

const FILTER_TABS: { key: MediaType | "all"; label: string }[] = [
    { key: "all", label: "All" },
    { key: "movie", label: "Movies" },
    { key: "book", label: "Books" },
    { key: "tv", label: "TV" },
];

const statusColor = (status: Status, primary: string, grey: string) => {
    if (status === "done") return primary;
    if (status === "in-progress") return "#F59E0B";
    return grey;
};

const EMPTY_FORM = {
    title: "",
    mediaType: "movie" as MediaType,
    status: "want" as Status,
    rating: "",
};

export const MediaBlockScreen: FC<Props> = ({ navigation, route }) => {
    const { blockId } = route.params;
    const colors = useTheme();
    const {
        blocks,
        updateBlockTitle,
        deleteBlock,
        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
    } = useNotesStore();

    const block = blocks.find((b) => b.id === blockId && b.type === "media") as MediaBlock | undefined;

    const [filter, setFilter] = useState<MediaType | "all">("all");
    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState(block?.title ?? "Media");
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);

    if (!block) return null;

    const filtered = filter === "all" ? block.items : block.items.filter((i) => i.mediaType === filter);

    const openAdd = () => {
        setEditingItem(null);
        setForm({ ...EMPTY_FORM, mediaType: filter !== "all" ? filter : "movie" });
        setModalVisible(true);
    };

    const openEdit = (item: MediaItem) => {
        setEditingItem(item);
        setForm({
            title: item.title,
            mediaType: item.mediaType,
            status: item.status,
            rating: item.rating !== undefined ? item.rating.toString() : "",
        });
        setModalVisible(true);
    };

    const cycleStatus = (item: MediaItem) => {
        updateMediaItem(blockId, { ...item, status: NEXT_STATUS[item.status] });
    };

    const handleSave = () => {
        if (!form.title.trim()) {
            Alert.alert("Invalid input", "Please enter a title.");
            return;
        }
        const rating = form.rating ? parseFloat(form.rating) : undefined;
        const payload: Omit<MediaItem, "id"> = {
            title: form.title.trim(),
            mediaType: form.mediaType,
            status: form.status,
            ...(rating !== undefined && !isNaN(rating) ? { rating: Math.min(5, Math.max(0, rating)) } : {}),
        };
        if (editingItem) {
            updateMediaItem(blockId, { ...editingItem, ...payload });
        } else {
            addMediaItem(blockId, payload);
        }
        setModalVisible(false);
    };

    const handleDelete = () => {
        Alert.alert("Delete block", "This cannot be undone.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    deleteBlock(blockId);
                    navigation.goBack();
                },
            },
        ]);
    };

    const handleDeleteItem = (item: MediaItem) => {
        Alert.alert("Remove item", `Remove "${item.title}"?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: () => deleteMediaItem(blockId, item.id),
            },
        ]);
    };

    const handleTitleBlur = () => {
        setEditingTitle(false);
        updateBlockTitle(blockId, titleDraft.trim() || "Media");
    };

    // Stats
    const counts: Record<MediaType, number> = { movie: 0, book: 0, tv: 0 };
    block.items.forEach((i) => counts[i.mediaType]++);

    const renderItem = ({ item }: { item: MediaItem }) => (
        <View style={[styles.itemRow, { backgroundColor: colors.backgroundSecondary }]}>
            <TouchableOpacity
                style={[styles.statusBtn, { borderColor: statusColor(item.status, colors.primary, colors.grey) }]}
                onPress={() => cycleStatus(item)}
                hitSlop={4}
            >
                {item.status === "done" ? (
                    <Icon name="check" size={11} color={colors.primary} />
                ) : item.status === "in-progress" ? (
                    <View style={[styles.inProgressDot, { backgroundColor: "#F59E0B" }]} />
                ) : null}
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBody} onPress={() => openEdit(item)} activeOpacity={0.7}>
                <Text
                    style={[
                        styles.itemTitle,
                        {
                            color: item.status === "done" ? colors.grey : colors.textPrimary,
                            textDecorationLine: item.status === "done" ? "line-through" : "none",
                        },
                    ]}
                    numberOfLines={1}
                >
                    {item.title}
                </Text>
                <View style={styles.itemMeta}>
                    <Text style={[styles.itemType, { color: colors.grey }]}>{TYPE_LABELS[item.mediaType]}</Text>
                    {item.rating !== undefined && (
                        <Text style={[styles.itemRating, { color: "#F59E0B" }]}>★ {item.rating.toFixed(1)}</Text>
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.statusPill, { backgroundColor: statusColor(item.status, colors.primary, colors.lightGrey) + "33" }]}
                onPress={() => cycleStatus(item)}
            >
                <Text
                    style={[styles.statusPillText, { color: statusColor(item.status, colors.primary, colors.grey) }]}
                >
                    {STATUS_LABELS[item.status]}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteItem(item)} hitSlop={8} style={styles.deleteBtn}>
                <Icon name="trash" size={14} color={colors.grey} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                    <Icon name="arrow-left" size={18} color={colors.primary} />
                </TouchableOpacity>
                {editingTitle ? (
                    <TextInput
                        style={[styles.titleInput, { color: colors.textPrimary, borderBottomColor: colors.primary }]}
                        value={titleDraft}
                        onChangeText={setTitleDraft}
                        onBlur={handleTitleBlur}
                        autoFocus
                        returnKeyType="done"
                        onSubmitEditing={handleTitleBlur}
                    />
                ) : (
                    <TouchableOpacity onPress={() => setEditingTitle(true)} style={styles.titleBtn}>
                        <Text style={[styles.titleText, { color: colors.textPrimary }]}>{block.title}</Text>
                        <Icon name="pencil" size={13} color={colors.grey} style={styles.pencil} />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={handleDelete} style={styles.headerBtn}>
                    <Icon name="trash" size={18} color={colors.grey} />
                </TouchableOpacity>
            </View>

            {/* Stats row */}
            <View style={styles.statsRow}>
                {(["movie", "book", "tv"] as MediaType[]).map((t) => (
                    <View key={t} style={[styles.statChip, { backgroundColor: colors.backgroundSecondary }]}>
                        <Icon name={TYPE_ICONS[t] as any} size={14} color={colors.grey} />
                        <Text style={[styles.statCount, { color: colors.textPrimary }]}>{counts[t]}</Text>
                        <Text style={[styles.statLabel, { color: colors.grey }]}>{TYPE_LABELS[t]}s</Text>
                    </View>
                ))}
            </View>

            {/* Filter pills */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
                {FILTER_TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab.key}
                        style={[
                            styles.filterPill,
                            {
                                backgroundColor: filter === tab.key ? colors.primary : colors.backgroundSecondary,
                            },
                        ]}
                        onPress={() => setFilter(tab.key)}
                    >
                        <Text
                            style={[
                                styles.filterText,
                                { color: filter === tab.key ? colors.white : colors.grey },
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, { color: colors.grey }]}>Nothing here yet</Text>
                }
            />

            <TouchableOpacity style={[styles.addBtn, { backgroundColor: colors.primary }]} onPress={openAdd}>
                <Icon name="plus" size={18} color={colors.white} />
                <Text style={[styles.addBtnText, { color: colors.white }]}>Add item</Text>
            </TouchableOpacity>

            {/* Add / Edit Modal */}
            <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <KeyboardAvoidingView
                    style={styles.modalWrap}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setModalVisible(false)} />
                    <View style={[styles.sheet, { backgroundColor: colors.backgroundSecondary }]}>
                        <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
                            {editingItem ? "Edit item" : "Add item"}
                        </Text>

                        <Text style={[styles.fieldLabel, { color: colors.grey }]}>Title</Text>
                        <TextInput
                            style={[styles.fieldInput, { color: colors.textPrimary, borderBottomColor: colors.lightGrey }]}
                            value={form.title}
                            onChangeText={(v) => setForm((f) => ({ ...f, title: v }))}
                            placeholder="Movie, book or show title..."
                            placeholderTextColor={colors.grey}
                            autoFocus
                        />

                        <Text style={[styles.fieldLabel, { color: colors.grey }]}>Type</Text>
                        <View style={styles.toggleRow}>
                            {(["movie", "book", "tv"] as MediaType[]).map((t) => (
                                <TouchableOpacity
                                    key={t}
                                    style={[
                                        styles.toggleBtn,
                                        { backgroundColor: form.mediaType === t ? colors.primary : colors.lightGrey },
                                    ]}
                                    onPress={() => setForm((f) => ({ ...f, mediaType: t }))}
                                >
                                    <Text style={[styles.toggleText, { color: form.mediaType === t ? colors.white : colors.textPrimary }]}>
                                        {TYPE_LABELS[t]}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={[styles.fieldLabel, { color: colors.grey }]}>Status</Text>
                        <View style={styles.toggleRow}>
                            {STATUS_CYCLE.map((s) => (
                                <TouchableOpacity
                                    key={s}
                                    style={[
                                        styles.toggleBtn,
                                        { backgroundColor: form.status === s ? colors.primary : colors.lightGrey },
                                    ]}
                                    onPress={() => setForm((f) => ({ ...f, status: s }))}
                                >
                                    <Text style={[styles.toggleText, { color: form.status === s ? colors.white : colors.textPrimary }]}>
                                        {STATUS_LABELS[s]}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={[styles.fieldLabel, { color: colors.grey }]}>Rating (0–5, optional)</Text>
                        <TextInput
                            style={[styles.fieldInput, { color: colors.textPrimary, borderBottomColor: colors.lightGrey }]}
                            value={form.rating}
                            onChangeText={(v) => setForm((f) => ({ ...f, rating: v }))}
                            placeholder="e.g. 4.5"
                            placeholderTextColor={colors.grey}
                            keyboardType="decimal-pad"
                        />

                        <TouchableOpacity
                            style={[styles.saveBtn, { backgroundColor: colors.primary }]}
                            onPress={handleSave}
                        >
                            <Text style={[styles.saveBtnText, { color: colors.white }]}>
                                {editingItem ? "Save changes" : "Add"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 56 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    headerBtn: { padding: 8 },
    titleBtn: { flexDirection: "row", alignItems: "center", flex: 1, justifyContent: "center" },
    titleText: { fontSize: 20, fontWeight: "700" },
    pencil: { marginLeft: 6 },
    titleInput: {
        flex: 1,
        fontSize: 20,
        fontWeight: "700",
        textAlign: "center",
        borderBottomWidth: 1,
        paddingBottom: 2,
        marginHorizontal: 8,
    },
    statsRow: {
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    statChip: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    statCount: { fontSize: 15, fontWeight: "700" },
    statLabel: { fontSize: 12 },
    filterRow: { paddingHorizontal: 20, gap: 8, marginBottom: 12 },
    filterPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    filterText: { fontSize: 14, fontWeight: "600" },
    list: { paddingHorizontal: 20, gap: 8, paddingBottom: 100 },
    itemRow: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        padding: 12,
        gap: 10,
    },
    statusBtn: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    inProgressDot: { width: 8, height: 8, borderRadius: 4 },
    itemBody: { flex: 1 },
    itemTitle: { fontSize: 15, fontWeight: "600" },
    itemMeta: { flexDirection: "row", gap: 8, marginTop: 2 },
    itemType: { fontSize: 12 },
    itemRating: { fontSize: 12 },
    statusPill: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusPillText: { fontSize: 12, fontWeight: "600" },
    deleteBtn: { paddingLeft: 4 },
    emptyText: { textAlign: "center", marginTop: 40, fontSize: 15 },
    addBtn: {
        position: "absolute",
        bottom: 30,
        left: 20,
        right: 20,
        borderRadius: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        gap: 8,
    },
    addBtnText: { fontSize: 16, fontWeight: "600" },
    modalWrap: { flex: 1 },
    modalOverlay: { flex: 1 },
    sheet: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        paddingBottom: 40,
    },
    sheetTitle: { fontSize: 18, fontWeight: "700", marginBottom: 16 },
    fieldLabel: { fontSize: 12, fontWeight: "600", marginBottom: 6, marginTop: 14 },
    fieldInput: {
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    toggleRow: { flexDirection: "row", gap: 8, marginTop: 4 },
    toggleBtn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    toggleText: { fontSize: 13, fontWeight: "600" },
    saveBtn: {
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 24,
        marginBottom: 8,
    },
    saveBtnText: { fontSize: 16, fontWeight: "600" },
});
