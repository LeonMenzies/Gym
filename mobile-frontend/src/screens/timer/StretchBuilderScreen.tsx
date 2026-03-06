import Slider from "@react-native-community/slider";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { NestableScrollContainer, NestableDraggableFlatList, ScaleDecorator, RenderItemParams } from "react-native-draggable-flatlist";
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
import { Ionicons } from "@expo/vector-icons";
import { StretchIllustration } from "~components/StretchIllustration";
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

            <NestableScrollContainer contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
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
                        <NestableDraggableFlatList
                            data={items}
                            keyExtractor={(item, index) => `${item.stretchId}_${index}`}
                            onDragEnd={({ data }) => setItems(data)}
                            renderItem={({ item, drag, isActive, getIndex }: RenderItemParams<RoutineItem>) => {
                                const index = getIndex() ?? 0;
                                return (
                                    <ScaleDecorator>
                                        <Swipeable
                                            renderRightActions={() => (
                                                <TouchableOpacity
                                                    style={[styles.deleteAction, { backgroundColor: colors.error }]}
                                                    onPress={() => removeItem(index)}
                                                >
                                                    <Text style={styles.deleteActionText}>Delete</Text>
                                                </TouchableOpacity>
                                            )}
                                        >
                                            <View style={[styles.itemCard, { backgroundColor: colors.backgroundSecondary, opacity: isActive ? 0.9 : 1 }]}>
                                                <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
                                                    <Ionicons name="reorder-three" size={22} color={colors.lightGrey} />
                                                </TouchableOpacity>
                                                <View style={styles.itemInfo}>
                                                    <View style={styles.itemNameRow}>
                                                        <Text style={[styles.itemName, { color: colors.textPrimary }]}>
                                                            {stretchName(item.stretchId)}
                                                        </Text>
                                                        <Text style={[styles.durationLabel, { color: colors.primary }]}>
                                                            {item.duration}s
                                                        </Text>
                                                    </View>
                                                    <Slider
                                                        style={styles.durationSlider}
                                                        minimumValue={10}
                                                        maximumValue={90}
                                                        step={5}
                                                        value={item.duration}
                                                        onValueChange={(v) => setDuration(index, v)}
                                                        minimumTrackTintColor={colors.primary}
                                                        maximumTrackTintColor={colors.lightGrey}
                                                        thumbTintColor={colors.primary}
                                                    />
                                                </View>
                                            </View>
                                        </Swipeable>
                                    </ScaleDecorator>
                                );
                            }}
                        />
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
                                        <StretchIllustration
                                            stretchId={stretch.id}
                                            size={64}
                                            color={added ? colors.white : colors.primary}
                                        />
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
            </NestableScrollContainer>
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
    dragHandle: { paddingHorizontal: 2 },
    itemInfo: { flex: 1, gap: 4 },
    itemNameRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    itemName: { fontSize: 15, fontWeight: "500", flex: 1 },
    durationLabel: { fontSize: 14, fontWeight: "600" },
    durationSlider: { width: "100%", height: 36 },
    deleteAction: {
        justifyContent: "center",
        alignItems: "center",
        width: 80,
        borderRadius: 12,
        marginLeft: 8,
    },
    deleteActionText: { color: "#fff", fontWeight: "600", fontSize: 14 },
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
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 12,
        width: "47%",
    },
    stretchChipText: { fontSize: 14, fontWeight: "500" },
    stretchChipDuration: { fontSize: 12 },
});
