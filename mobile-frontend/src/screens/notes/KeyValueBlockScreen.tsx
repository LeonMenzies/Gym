import { FC, useState } from "react";
import {
    Alert,
    Clipboard,
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
import { useNotesStore, KeyValueItem, KeyValueBlock } from "~store/notesStore";
import { useTheme } from "~store/settingsStore";
import { useRouter, useLocalSearchParams } from "expo-router";

const EMPTY_FORM = { label: "", value: "" };

export const KeyValueBlockScreen: FC = () => {
    const router = useRouter();
    const { blockId } = useLocalSearchParams<{ blockId: string }>();
    const colors = useTheme();
    const {
        blocks,
        updateBlockTitle,
        deleteBlock,
        addKeyValueItem,
        updateKeyValueItem,
        deleteKeyValueItem,
    } = useNotesStore();

    const block = blocks.find((b) => b.id === blockId && b.type === "key-value") as
        | KeyValueBlock
        | undefined;

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState(block?.title ?? "Important Info");
    const [modalVisible, setModalVisible] = useState(false);
    const [editingItem, setEditingItem] = useState<KeyValueItem | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    if (!block) return null;

    const openAdd = () => {
        setEditingItem(null);
        setForm(EMPTY_FORM);
        setModalVisible(true);
    };

    const openEdit = (item: KeyValueItem) => {
        setEditingItem(item);
        setForm({ label: item.label, value: item.value });
        setModalVisible(true);
    };

    const handleSave = () => {
        if (!form.label.trim() || !form.value.trim()) {
            Alert.alert("Invalid input", "Label and value are both required.");
            return;
        }
        const payload = { label: form.label.trim(), value: form.value.trim() };
        if (editingItem) {
            updateKeyValueItem(blockId, { ...editingItem, ...payload });
        } else {
            addKeyValueItem(blockId, payload);
        }
        setModalVisible(false);
    };

    const handleCopy = (item: KeyValueItem) => {
        Clipboard.setString(item.value);
        setCopiedId(item.id);
        setTimeout(() => setCopiedId((id) => (id === item.id ? null : id)), 1500);
    };

    const handleDelete = () => {
        Alert.alert("Delete block", "This cannot be undone.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    deleteBlock(blockId);
                    router.back();
                },
            },
        ]);
    };

    const handleDeleteItem = (item: KeyValueItem) => {
        Alert.alert("Remove item", `Remove "${item.label}"?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: () => deleteKeyValueItem(blockId, item.id),
            },
        ]);
    };

    const handleTitleBlur = () => {
        setEditingTitle(false);
        updateBlockTitle(blockId, titleDraft.trim() || "Important Info");
    };

    const renderItem = ({ item }: { item: KeyValueItem }) => {
        const copied = copiedId === item.id;
        return (
            <View style={[styles.kvRow, { backgroundColor: colors.backgroundSecondary }]}>
                <View style={styles.kvContent}>
                    <Text style={[styles.kvLabel, { color: colors.grey }]}>{item.label}</Text>
                    <Text style={[styles.kvValue, { color: colors.textPrimary }]} selectable>
                        {item.value}
                    </Text>
                </View>
                <View style={styles.kvActions}>
                    <TouchableOpacity
                        onPress={() => handleCopy(item)}
                        hitSlop={8}
                        style={[styles.copyBtn, { backgroundColor: copied ? colors.primary + "22" : colors.lightGrey }]}
                    >
                        <Icon name={copied ? "check" : "docs"} size={13} color={copied ? colors.primary : colors.grey} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openEdit(item)} hitSlop={8} style={styles.actionBtn}>
                        <Icon name="pencil" size={13} color={colors.grey} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDeleteItem(item)} hitSlop={8} style={styles.actionBtn}>
                        <Icon name="trash" size={13} color={colors.grey} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerBtn}>
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

            <Text style={[styles.hint, { color: colors.grey }]}>Tap the copy icon to copy a value to clipboard.</Text>

            <FlatList
                data={block.items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, { color: colors.grey }]}>No items yet</Text>
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

                        <Text style={[styles.fieldLabel, { color: colors.grey }]}>Label</Text>
                        <TextInput
                            style={[styles.fieldInput, { color: colors.textPrimary, borderBottomColor: colors.lightGrey }]}
                            value={form.label}
                            onChangeText={(v) => setForm((f) => ({ ...f, label: v }))}
                            placeholder="e.g. SIN Number, Home Address..."
                            placeholderTextColor={colors.grey}
                            autoFocus
                            returnKeyType="next"
                        />

                        <Text style={[styles.fieldLabel, { color: colors.grey }]}>Value</Text>
                        <TextInput
                            style={[styles.fieldInput, styles.valueInput, { color: colors.textPrimary, borderBottomColor: colors.lightGrey }]}
                            value={form.value}
                            onChangeText={(v) => setForm((f) => ({ ...f, value: v }))}
                            placeholder="The value..."
                            placeholderTextColor={colors.grey}
                            multiline
                            textAlignVertical="top"
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
    hint: {
        fontSize: 12,
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    list: { paddingHorizontal: 20, gap: 8, paddingBottom: 100 },
    kvRow: {
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    kvContent: { flex: 1 },
    kvLabel: { fontSize: 12, fontWeight: "600", marginBottom: 4 },
    kvValue: { fontSize: 15, lineHeight: 22 },
    kvActions: { flexDirection: "row", gap: 4, alignItems: "center", paddingTop: 2 },
    copyBtn: {
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    actionBtn: {
        width: 28,
        height: 28,
        alignItems: "center",
        justifyContent: "center",
    },
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
    valueInput: { minHeight: 80 },
    saveBtn: {
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 24,
        marginBottom: 8,
    },
    saveBtnText: { fontSize: 16, fontWeight: "600" },
});
