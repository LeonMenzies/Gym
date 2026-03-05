import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "~store/settingsStore";
import {
    BODY_PART_LABELS,
    BODY_PART_ORDER,
    BodyPart,
    Routine,
    RoutineItem,
    STRETCHES,
    useStretchStore,
} from "~store/stretchStore";
import { TimerStackParamList } from "~types/Types";

type Props = NativeStackScreenProps<TimerStackParamList, "StretchBuilder">;
type Nav = NativeStackNavigationProp<TimerStackParamList, "StretchBuilder">;

const DURATION_OPTIONS = [15, 20, 30, 45, 60, 90];

function totalTime(items: RoutineItem[]): string {
    const secs = items.reduce((a, i) => a + i.duration, 0) + Math.max(0, items.length - 1) * 5;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? (s > 0 ? `${m}m ${s}s` : `${m}m`) : `${s}s`;
}

export const StretchBuilderScreen: FC<Props> = () => {
    const route = useRoute<Props["route"]>();
    const nav = useNavigation<Nav>();
    const colors = useTheme();
    const { routines, addRoutine, updateRoutine } = useStretchStore();

    const editingId = route.params?.routineId;
    const existingRoutine = editingId ? routines.find((r) => r.id === editingId) : undefined;

    const [name, setName] = useState(existingRoutine?.name ?? "");
    const [items, setItems] = useState<RoutineItem[]>(existingRoutine?.items ?? []);
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>("neck");
    const [showLibrary, setShowLibrary] = useState(false);

    useEffect(() => {
        if (existingRoutine) {
            setName(existingRoutine.name);
            setItems(existingRoutine.items);
        }
    }, [editingId]);

    const stretchesForPart = STRETCHES.filter((s) => s.bodyPart === selectedBodyPart);
    const addedIds = new Set(items.map((i) => i.stretchId));

    const addStretch = (stretchId: string, defaultDuration: number) => {
        if (addedIds.has(stretchId)) return;
        setItems((prev) => [...prev, { stretchId, duration: defaultDuration }]);
    };

    const removeItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const setDuration = (index: number, duration: number) => {
        setItems((prev) => prev.map((item, i) => (i === index ? { ...item, duration } : item)));
    };

    const moveItem = (index: number, dir: -1 | 1) => {
        const newItems = [...items];
        const target = index + dir;
        if (target < 0 || target >= newItems.length) return;
        [newItems[index], newItems[target]] = [newItems[target], newItems[index]];
        setItems(newItems);
    };

    const handleSave = () => {
        const trimmed = name.trim();
        if (!trimmed) {
            Alert.alert("Name required", "Please give your routine a name.");
            return;
        }
        if (items.length === 0) {
            Alert.alert("Empty routine", "Add at least one stretch.");
            return;
        }
        const routine: Routine = {
            id: editingId ?? `routine_${Date.now()}`,
            name: trimmed,
            items,
        };
        if (editingId) {
            updateRoutine(routine);
        } else {
            addRoutine(routine);
        }
        nav.goBack();
    };

    const stretchName = (stretchId: string) =>
        STRETCHES.find((s) => s.id === stretchId)?.name ?? stretchId;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => nav.goBack()} style={styles.backBtn}>
                    <Text style={[styles.backText, { color: colors.primary }]}>‹ Back</Text>
                </TouchableOpacity>
                <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>
                    {editingId ? "Edit Routine" : "New Routine"}
                </Text>
                <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
                    <Text style={[styles.saveText, { color: colors.primary }]}>Save</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                {/* Name input */}
                <TextInput
                    style={[styles.nameInput, { backgroundColor: colors.backgroundSecondary, color: colors.textPrimary }]}
                    placeholder="Routine name…"
                    placeholderTextColor={colors.textSecondary}
                    value={name}
                    onChangeText={setName}
                    returnKeyType="done"
                />

                {/* Routine items */}
                {items.length > 0 && (
                    <View style={styles.section}>
                        <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
                            Routine · {items.length} stretch{items.length !== 1 ? "es" : ""} · {totalTime(items)}
                        </Text>
                        {items.map((item, index) => (
                            <View
                                key={`${item.stretchId}_${index}`}
                                style={[styles.itemCard, { backgroundColor: colors.backgroundSecondary }]}
                            >
                                <View style={styles.itemReorder}>
                                    <TouchableOpacity onPress={() => moveItem(index, -1)} disabled={index === 0} style={styles.reorderBtn}>
                                        <Text style={[styles.reorderIcon, { color: index === 0 ? colors.lightGrey : colors.textSecondary }]}>▲</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => moveItem(index, 1)} disabled={index === items.length - 1} style={styles.reorderBtn}>
                                        <Text style={[styles.reorderIcon, { color: index === items.length - 1 ? colors.lightGrey : colors.textSecondary }]}>▼</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.itemInfo}>
                                    <Text style={[styles.itemName, { color: colors.textPrimary }]}>
                                        {stretchName(item.stretchId)}
                                    </Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.durationScroll}>
                                        <View style={styles.durationRow}>
                                            {DURATION_OPTIONS.map((d) => (
                                                <TouchableOpacity
                                                    key={d}
                                                    style={[
                                                        styles.durationChip,
                                                        {
                                                            borderColor: colors.primary,
                                                            backgroundColor: item.duration === d ? colors.primary : "transparent",
                                                        },
                                                    ]}
                                                    onPress={() => setDuration(index, d)}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.durationChipText,
                                                            { color: item.duration === d ? colors.white : colors.primary },
                                                        ]}
                                                    >
                                                        {d}s
                                                    </Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                                <TouchableOpacity onPress={() => removeItem(index)} style={styles.removeBtn}>
                                    <Text style={[styles.removeIcon, { color: colors.error }]}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                {/* Add stretches */}
                <TouchableOpacity
                    style={[styles.toggleLibraryBtn, { borderColor: colors.primary }]}
                    onPress={() => setShowLibrary((v) => !v)}
                >
                    <Text style={[styles.toggleLibraryText, { color: colors.primary }]}>
                        {showLibrary ? "▲ Hide library" : "＋ Add stretches"}
                    </Text>
                </TouchableOpacity>

                {showLibrary && (
                    <View style={styles.library}>
                        {/* Body part tabs */}
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bodyPartScroll}>
                            <View style={styles.bodyPartRow}>
                                {BODY_PART_ORDER.map((bp) => (
                                    <TouchableOpacity
                                        key={bp}
                                        style={[
                                            styles.bodyPartChip,
                                            {
                                                backgroundColor: selectedBodyPart === bp ? colors.primary : colors.backgroundSecondary,
                                            },
                                        ]}
                                        onPress={() => setSelectedBodyPart(bp)}
                                    >
                                        <Text
                                            style={[
                                                styles.bodyPartText,
                                                { color: selectedBodyPart === bp ? colors.white : colors.textSecondary },
                                            ]}
                                        >
                                            {BODY_PART_LABELS[bp]}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>

                        {/* Stretches for selected body part */}
                        <View style={styles.stretchGrid}>
                            {stretchesForPart.map((stretch) => {
                                const added = addedIds.has(stretch.id);
                                return (
                                    <TouchableOpacity
                                        key={stretch.id}
                                        style={[
                                            styles.stretchChip,
                                            {
                                                backgroundColor: added ? colors.primary : colors.backgroundSecondary,
                                                opacity: added ? 0.6 : 1,
                                            },
                                        ]}
                                        onPress={() => addStretch(stretch.id, stretch.defaultDuration)}
                                        disabled={added}
                                    >
                                        <Text style={[styles.stretchChipText, { color: added ? colors.white : colors.textPrimary }]}>
                                            {stretch.name}
                                        </Text>
                                        <Text style={[styles.stretchChipDuration, { color: added ? colors.white : colors.textSecondary }]}>
                                            {stretch.defaultDuration}s
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}

                <View style={{ height: 48 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 12,
    },
    backBtn: { padding: 4 },
    backText: { fontSize: 17 },
    headerTitle: { fontSize: 17, fontWeight: "600" },
    saveBtn: { padding: 4 },
    saveText: { fontSize: 17, fontWeight: "600" },
    scrollContent: { padding: 16, gap: 16 },
    nameInput: {
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 17,
    },
    section: { gap: 8 },
    sectionLabel: {
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    itemCard: {
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    itemReorder: { gap: 2 },
    reorderBtn: { padding: 2 },
    reorderIcon: { fontSize: 11 },
    itemInfo: { flex: 1, gap: 8 },
    itemName: { fontSize: 15, fontWeight: "500" },
    durationScroll: {},
    durationRow: { flexDirection: "row", gap: 6 },
    durationChip: {
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 14,
        borderWidth: 1.5,
    },
    durationChipText: { fontSize: 13, fontWeight: "500" },
    removeBtn: { padding: 6 },
    removeIcon: { fontSize: 14, fontWeight: "600" },
    toggleLibraryBtn: {
        borderWidth: 1.5,
        borderRadius: 12,
        paddingVertical: 12,
        alignItems: "center",
    },
    toggleLibraryText: { fontSize: 15, fontWeight: "500" },
    library: { gap: 12 },
    bodyPartScroll: {},
    bodyPartRow: { flexDirection: "row", gap: 8, paddingBottom: 4 },
    bodyPartChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    bodyPartText: { fontSize: 14, fontWeight: "500" },
    stretchGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    stretchChip: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 12,
    },
    stretchChipText: { fontSize: 14, fontWeight: "500" },
    stretchChipDuration: { fontSize: 12 },
});
