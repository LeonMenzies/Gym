import { FC, useState } from "react";
import {
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useNotesStore, Subscription, SubscriptionsBlock } from "~store/notesStore";
import { useTheme } from "~store/settingsStore";

type Props = {
    navigation: any;
    route: { params: { blockId: string } };
};

const EMPTY_FORM = {
    name: "",
    amount: "",
    currency: "$",
    cycle: "monthly" as "monthly" | "yearly",
    active: true,
    notes: "",
};

export const SubscriptionsBlockScreen: FC<Props> = ({ navigation, route }) => {
    const { blockId } = route.params;
    const colors = useTheme();
    const {
        blocks,
        updateBlockTitle,
        deleteBlock,
        addSubscription,
        updateSubscription,
        deleteSubscription,
    } = useNotesStore();

    const block = blocks.find((b) => b.id === blockId && b.type === "subscriptions") as
        | SubscriptionsBlock
        | undefined;

    const [editingTitle, setEditingTitle] = useState(false);
    const [titleDraft, setTitleDraft] = useState(block?.title ?? "Subscriptions");
    const [modalVisible, setModalVisible] = useState(false);
    const [editingSub, setEditingSub] = useState<Subscription | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);

    if (!block) return null;

    // Cost summary
    const active = block.items.filter((s) => s.active);
    const monthlyTotal =
        active.filter((s) => s.cycle === "monthly").reduce((sum, s) => sum + s.amount, 0) +
        active.filter((s) => s.cycle === "yearly").reduce((sum, s) => sum + s.amount, 0) / 12;
    const yearlyTotal =
        active.filter((s) => s.cycle === "monthly").reduce((sum, s) => sum + s.amount, 0) * 12 +
        active.filter((s) => s.cycle === "yearly").reduce((sum, s) => sum + s.amount, 0);

    const openAdd = () => {
        setEditingSub(null);
        setForm(EMPTY_FORM);
        setModalVisible(true);
    };

    const openEdit = (sub: Subscription) => {
        setEditingSub(sub);
        setForm({
            name: sub.name,
            amount: sub.amount.toString(),
            currency: sub.currency,
            cycle: sub.cycle,
            active: sub.active,
            notes: sub.notes,
        });
        setModalVisible(true);
    };

    const handleSave = () => {
        const amount = parseFloat(form.amount);
        if (!form.name.trim() || isNaN(amount) || amount < 0) {
            Alert.alert("Invalid input", "Please enter a name and a valid amount.");
            return;
        }
        const payload = {
            name: form.name.trim(),
            amount,
            currency: form.currency || "$",
            cycle: form.cycle,
            active: form.active,
            notes: form.notes,
        };
        if (editingSub) {
            updateSubscription(blockId, { ...editingSub, ...payload });
        } else {
            addSubscription(blockId, payload);
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

    const handleDeleteSub = (sub: Subscription) => {
        Alert.alert("Remove subscription", `Remove "${sub.name}"?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: () => deleteSubscription(blockId, sub.id),
            },
        ]);
    };

    const handleTitleBlur = () => {
        setEditingTitle(false);
        updateBlockTitle(blockId, titleDraft.trim() || "Subscriptions");
    };

    const renderItem = ({ item }: { item: Subscription }) => (
        <TouchableOpacity
            style={[styles.subRow, { backgroundColor: colors.backgroundSecondary }]}
            onPress={() => openEdit(item)}
            activeOpacity={0.8}
        >
            <View style={[styles.activeDot, { backgroundColor: item.active ? colors.primary : colors.grey }]} />
            <View style={styles.subInfo}>
                <Text style={[styles.subName, { color: item.active ? colors.textPrimary : colors.grey }]}>
                    {item.name}
                </Text>
                {item.notes.length > 0 && (
                    <Text style={[styles.subNotes, { color: colors.grey }]} numberOfLines={1}>
                        {item.notes}
                    </Text>
                )}
            </View>
            <View style={styles.subRight}>
                <Text style={[styles.subAmount, { color: colors.textPrimary }]}>
                    {item.currency}{item.amount.toFixed(2)}
                </Text>
                <Text style={[styles.subCycle, { color: colors.grey }]}>/{item.cycle === "monthly" ? "mo" : "yr"}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteSub(item)} style={styles.deleteBtn} hitSlop={8}>
                <Icon name="trash" size={14} color={colors.grey} />
            </TouchableOpacity>
        </TouchableOpacity>
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

            {/* Summary */}
            <View style={[styles.summary, { backgroundColor: colors.backgroundSecondary }]}>
                <View style={styles.summaryItem}>
                    <Text style={[styles.summaryValue, { color: colors.primary }]}>
                        ${monthlyTotal.toFixed(2)}
                    </Text>
                    <Text style={[styles.summaryLabel, { color: colors.grey }]}>per month</Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: colors.lightGrey }]} />
                <View style={styles.summaryItem}>
                    <Text style={[styles.summaryValue, { color: colors.primary }]}>
                        ${yearlyTotal.toFixed(2)}
                    </Text>
                    <Text style={[styles.summaryLabel, { color: colors.grey }]}>per year</Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: colors.lightGrey }]} />
                <View style={styles.summaryItem}>
                    <Text style={[styles.summaryValue, { color: colors.textPrimary }]}>
                        {active.length}/{block.items.length}
                    </Text>
                    <Text style={[styles.summaryLabel, { color: colors.grey }]}>active</Text>
                </View>
            </View>

            <FlatList
                data={block.items}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={[styles.emptyText, { color: colors.grey }]}>No subscriptions yet</Text>
                }
            />

            <TouchableOpacity
                style={[styles.addBtn, { backgroundColor: colors.primary }]}
                onPress={openAdd}
            >
                <Icon name="plus" size={18} color={colors.white} />
                <Text style={[styles.addBtnText, { color: colors.white }]}>Add subscription</Text>
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
                            {editingSub ? "Edit subscription" : "Add subscription"}
                        </Text>

                        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                            <Text style={[styles.fieldLabel, { color: colors.grey }]}>Name</Text>
                            <TextInput
                                style={[styles.fieldInput, { color: colors.textPrimary, borderBottomColor: colors.lightGrey }]}
                                value={form.name}
                                onChangeText={(v) => setForm((f) => ({ ...f, name: v }))}
                                placeholder="Netflix, Spotify..."
                                placeholderTextColor={colors.grey}
                                returnKeyType="next"
                            />

                            <View style={styles.row}>
                                <View style={styles.rowLeft}>
                                    <Text style={[styles.fieldLabel, { color: colors.grey }]}>Amount</Text>
                                    <TextInput
                                        style={[styles.fieldInput, { color: colors.textPrimary, borderBottomColor: colors.lightGrey }]}
                                        value={form.amount}
                                        onChangeText={(v) => setForm((f) => ({ ...f, amount: v }))}
                                        placeholder="0.00"
                                        placeholderTextColor={colors.grey}
                                        keyboardType="decimal-pad"
                                    />
                                </View>
                                <View style={styles.rowRight}>
                                    <Text style={[styles.fieldLabel, { color: colors.grey }]}>Currency</Text>
                                    <TextInput
                                        style={[styles.fieldInput, { color: colors.textPrimary, borderBottomColor: colors.lightGrey }]}
                                        value={form.currency}
                                        onChangeText={(v) => setForm((f) => ({ ...f, currency: v }))}
                                        placeholder="$"
                                        placeholderTextColor={colors.grey}
                                        maxLength={3}
                                    />
                                </View>
                            </View>

                            <Text style={[styles.fieldLabel, { color: colors.grey }]}>Billing cycle</Text>
                            <View style={styles.toggleRow}>
                                {(["monthly", "yearly"] as const).map((c) => (
                                    <TouchableOpacity
                                        key={c}
                                        style={[
                                            styles.toggleBtn,
                                            {
                                                backgroundColor:
                                                    form.cycle === c ? colors.primary : colors.lightGrey,
                                            },
                                        ]}
                                        onPress={() => setForm((f) => ({ ...f, cycle: c }))}
                                    >
                                        <Text
                                            style={[
                                                styles.toggleText,
                                                { color: form.cycle === c ? colors.white : colors.textPrimary },
                                            ]}
                                        >
                                            {c.charAt(0).toUpperCase() + c.slice(1)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.switchRow}>
                                <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>Active</Text>
                                <Switch
                                    value={form.active}
                                    onValueChange={(v) => setForm((f) => ({ ...f, active: v }))}
                                    trackColor={{ true: colors.primary }}
                                />
                            </View>

                            <Text style={[styles.fieldLabel, { color: colors.grey }]}>Notes (optional)</Text>
                            <TextInput
                                style={[styles.fieldInput, { color: colors.textPrimary, borderBottomColor: colors.lightGrey }]}
                                value={form.notes}
                                onChangeText={(v) => setForm((f) => ({ ...f, notes: v }))}
                                placeholder="Any notes..."
                                placeholderTextColor={colors.grey}
                                multiline
                            />

                            <TouchableOpacity
                                style={[styles.saveBtn, { backgroundColor: colors.primary }]}
                                onPress={handleSave}
                            >
                                <Text style={[styles.saveBtnText, { color: colors.white }]}>
                                    {editingSub ? "Save changes" : "Add"}
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
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
    summary: {
        flexDirection: "row",
        marginHorizontal: 20,
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
    },
    summaryItem: { flex: 1, alignItems: "center" },
    summaryValue: { fontSize: 20, fontWeight: "700" },
    summaryLabel: { fontSize: 12, marginTop: 2 },
    summaryDivider: { width: 1, marginVertical: 4 },
    list: { paddingHorizontal: 20, gap: 8, paddingBottom: 100 },
    subRow: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 12,
        padding: 14,
        gap: 10,
    },
    activeDot: { width: 8, height: 8, borderRadius: 4 },
    subInfo: { flex: 1 },
    subName: { fontSize: 15, fontWeight: "600" },
    subNotes: { fontSize: 12, marginTop: 2 },
    subRight: { flexDirection: "row", alignItems: "baseline", gap: 1 },
    subAmount: { fontSize: 15, fontWeight: "600" },
    subCycle: { fontSize: 12 },
    deleteBtn: { paddingLeft: 8 },
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
    // Modal
    modalWrap: { flex: 1 },
    modalOverlay: { flex: 1 },
    sheet: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        paddingBottom: 40,
        maxHeight: "85%",
    },
    sheetTitle: { fontSize: 18, fontWeight: "700", marginBottom: 20 },
    fieldLabel: { fontSize: 12, fontWeight: "600", marginBottom: 6, marginTop: 14 },
    fieldInput: {
        fontSize: 16,
        paddingVertical: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    row: { flexDirection: "row", gap: 16 },
    rowLeft: { flex: 2 },
    rowRight: { flex: 1 },
    toggleRow: { flexDirection: "row", gap: 10, marginTop: 4 },
    toggleBtn: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
    },
    toggleText: { fontSize: 14, fontWeight: "600" },
    switchRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 4,
    },
    switchLabel: { fontSize: 16 },
    saveBtn: {
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 24,
        marginBottom: 8,
    },
    saveBtnText: { fontSize: 16, fontWeight: "600" },
});
