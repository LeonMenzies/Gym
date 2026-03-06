import { FC, useState } from "react";
import {
    Alert,
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

const statusColor = (status: Status, primary: string, grey: string) => {
    if (status === "done") return primary;
    if (status === "in-progress") return "#F59E0B";
    return grey;
};

const EMPTY_FORM = { title: "", status: "want" as Status, rating: "" };

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
    const subtype: MediaType = (block?.subtype ?? "movie") as MediaType;

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState(block?.title ?? "Media");
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);

    if (!block) return null;

    const openAdd = () => {
        setEditingItem(null);
        setForm(EMPTY_FORM);
        setModalVisible(true);
    };

    const openEdit = (item: MediaItem) => {
        setEditingItem(item);
        setForm({
            title: item.title,
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
            mediaType: subtype,
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

    const statusCounts = {
        want: block.items.filter((i) => i.status === "want").length,
        "in-progress": block.items.filter((i) => i.status === "in-progress").length,
        done: block.items.filter((i) => i.status === "done").length,
    };

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
                {item.rating !== undefined && (
                    <Text style={[styles.itemRating, { color: "#F59E0B" }]}>★ {item.rating.toFixed(1)}</Text>
                )}
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

            {/* Stats row — status breakdown */}
            <View style={styles.statsRow}>
                <View style={[styles.statChip, { backgroundColor: colors.backgroundSecondary }]}>
                    <Text style={[styles.statCount, { color: colors.grey }]}>{statusCounts.want}</Text>
                    <Text style={[styles.statLabel, { color: colors.grey }]}>Want</Text>
                </View>
                <View style={[styles.statChip, { backgroundColor: colors.backgroundSecondary }]}>
                    <Text style={[styles.statCount, { color: "#F59E0B" }]}>{statusCounts["in-progress"]}</Text>
                    <Text style={[styles.statLabel, { color: colors.grey }]}>Watching</Text>
                </View>
                <View style={[styles.statChip, { backgroundColor: colors.backgroundSecondary }]}>
                    <Text style={[styles.statCount, { color: colors.primary }]}>{statusCounts.done}</Text>
                    <Text style={[styles.statLabel, { color: colors.grey }]}>Done</Text>
                </View>
            </View>

            <FlatList
                data={block.items}
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
                            placeholder={subtype === "tv" ? "Show title..." : "Movie title..."}
                            placeholderTextColor={colors.grey}
                            autoFocus
                        />

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
        gap: 6,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    statCount: { fontSize: 16, fontWeight: "700" },
    statLabel: { fontSize: 12 },
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
    itemRating: { fontSize: 12, marginTop: 2 },
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
