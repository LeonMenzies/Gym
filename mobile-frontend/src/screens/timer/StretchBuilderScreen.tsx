import Slider from "@react-native-community/slider";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FC, useEffect, useState } from "react";
import {
    Alert,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
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
import { getBendDataForStretchId, getImageForStretchId } from "~data/stretchBendData";
import type { BendStretch } from "~data/stretchBendData";

function totalTime(items: RoutineItem[]): string {
    const secs = items.reduce((a, i) => a + i.duration, 0) + Math.max(0, items.length - 1) * 5;
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? (s > 0 ? `${m}m ${s}s` : `${m}m`) : `${s}s`;
}

// ─── Stretch Info Modal ────────────────────────────────────────────────────────

type InfoModalProps = {
    stretchId: string;
    stretchName: string;
    bendData: BendStretch;
    onClose: () => void;
};

const StretchInfoModal: FC<InfoModalProps> = ({ stretchId, stretchName, bendData, onClose }) => {
    const colors = useTheme();
    const photo = getImageForStretchId(stretchId);

    return (
        <Modal animationType="slide" transparent presentationStyle="pageSheet">
            <View style={[infoStyles.sheet, { backgroundColor: colors.background }]}>
                {/* Header */}
                <View style={infoStyles.header}>
                    <View style={infoStyles.headerText}>
                        <Text style={[infoStyles.title, { color: colors.textPrimary }]}>{stretchName}</Text>
                        {bendData.benefits.length > 0 && (
                            <Text style={[infoStyles.benefits, { color: colors.primary }]}>
                                {bendData.benefits.join(" · ")}
                            </Text>
                        )}
                    </View>
                    <TouchableOpacity onPress={onClose} style={infoStyles.closeBtn}>
                        <Text style={[infoStyles.closeText, { color: colors.textSecondary }]}>✕</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={infoStyles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Photo */}
                    {photo && (
                        <View style={[infoStyles.photoContainer, { backgroundColor: colors.backgroundSecondary }]}>
                            <Image source={photo} style={infoStyles.photo} resizeMode="cover" />
                        </View>
                    )}

                    {/* Instructions */}
                    <View style={[infoStyles.section, { backgroundColor: colors.backgroundSecondary }]}>
                        <Text style={[infoStyles.sectionTitle, { color: colors.primary }]}>How To</Text>
                        {bendData.instructions.map((step, i) => (
                            <View key={i} style={infoStyles.stepRow}>
                                <View style={[infoStyles.stepNum, { backgroundColor: colors.primary }]}>
                                    <Text style={infoStyles.stepNumText}>{i + 1}</Text>
                                </View>
                                <Text style={[infoStyles.stepText, { color: colors.textPrimary }]}>{step}</Text>
                            </View>
                        ))}
                    </View>

                    {/* Tips */}
                    {bendData.tips.length > 0 && (
                        <View style={[infoStyles.section, { backgroundColor: colors.backgroundSecondary }]}>
                            <Text style={[infoStyles.sectionTitle, { color: colors.primary }]}>Tips</Text>
                            {bendData.tips.map((tip, i) => (
                                <View key={i} style={infoStyles.bulletRow}>
                                    <Text style={[infoStyles.bullet, { color: colors.primary }]}>•</Text>
                                    <Text style={[infoStyles.bulletText, { color: colors.textPrimary }]}>{tip}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Modifications */}
                    {bendData.modifications.length > 0 && (
                        <View style={[infoStyles.section, { backgroundColor: colors.backgroundSecondary }]}>
                            <Text style={[infoStyles.sectionTitle, { color: colors.primary }]}>Modifications</Text>
                            {bendData.modifications.map((mod, i) => (
                                <View key={i} style={infoStyles.bulletRow}>
                                    <Text style={[infoStyles.bullet, { color: colors.secondary ?? colors.primary }]}>→</Text>
                                    <Text style={[infoStyles.bulletText, { color: colors.textPrimary }]}>{mod}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={{ height: 40 }} />
                </ScrollView>
            </View>
        </Modal>
    );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

export const StretchBuilderScreen: FC = () => {
    const { routineId } = useLocalSearchParams<{ routineId?: string }>();
    const router = useRouter();
    const colors = useTheme();
    const { routines, addRoutine, updateRoutine } = useStretchStore();

    const editingId = routineId;
    const existingRoutine = editingId ? routines.find((r) => r.id === editingId) : undefined;

    const [name, setName] = useState(existingRoutine?.name ?? "");
    const [items, setItems] = useState<RoutineItem[]>(existingRoutine?.items ?? []);
    const [selectedBodyPart, setSelectedBodyPart] = useState<BodyPart>("neck");
    const [showLibrary, setShowLibrary] = useState(false);
    const [infoStretchId, setInfoStretchId] = useState<string | null>(null);

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
        router.back();
    };

    const stretchName = (stretchId: string) =>
        STRETCHES.find((s) => s.id === stretchId)?.name ?? stretchId;

    const infoStretch = infoStretchId ? STRETCHES.find((s) => s.id === infoStretchId) : null;
    const infoBendData = infoStretchId ? getBendDataForStretchId(infoStretchId) : null;

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
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
                        <View style={styles.itemList}>
                            {items.map((item, index) => {
                                const photo = getImageForStretchId(item.stretchId);
                                return (
                                    <Swipeable
                                        key={`${item.stretchId}_${index}`}
                                        renderRightActions={() => (
                                            <TouchableOpacity
                                                style={[styles.deleteAction, { backgroundColor: colors.error }]}
                                                onPress={() => removeItem(index)}
                                            >
                                                <Text style={styles.deleteActionText}>Delete</Text>
                                            </TouchableOpacity>
                                        )}
                                    >
                                        <View style={[styles.itemCard, { backgroundColor: colors.backgroundSecondary }]}>
                                            {photo && (
                                                <Image source={photo} style={styles.itemThumb} resizeMode="cover" />
                                            )}
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
                                );
                            })}
                        </View>
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
                                const hasBendData = !!getBendDataForStretchId(stretch.id);
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
                                        onLongPress={() => setInfoStretchId(stretch.id)}
                                        delayLongPress={400}
                                        disabled={added}
                                    >
                                        <StretchIllustration
                                            stretchId={stretch.id}
                                            size={72}
                                            color={added ? colors.white : colors.primary}
                                        />
                                        <Text style={[styles.stretchChipText, { color: added ? colors.white : colors.textPrimary }]}>
                                            {stretch.name}
                                        </Text>
                                        <Text style={[styles.stretchChipDuration, { color: added ? colors.white : colors.textSecondary }]}>
                                            {stretch.defaultDuration}s
                                        </Text>
                                        {hasBendData && !added && (
                                            <Text style={[styles.infoHint, { color: colors.textSecondary }]}>
                                                hold for info
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}

                <View style={{ height: 48 }} />
            </ScrollView>

            {/* Stretch info modal */}
            {infoStretchId && infoStretch && infoBendData && (
                <StretchInfoModal
                    stretchId={infoStretchId}
                    stretchName={infoStretch.name}
                    bendData={infoBendData}
                    onClose={() => setInfoStretchId(null)}
                />
            )}
        </View>
    );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

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
    itemList: { gap: 8 },
    itemCard: {
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    itemThumb: {
        width: 52,
        height: 52,
        borderRadius: 8,
    },
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
    stretchChipText: { fontSize: 14, fontWeight: "500", textAlign: "center" },
    stretchChipDuration: { fontSize: 12 },
    infoHint: { fontSize: 10, opacity: 0.6 },
});

const infoStyles = StyleSheet.create({
    sheet: {
        flex: 1,
        marginTop: 60,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: 20,
        paddingBottom: 12,
    },
    headerText: { flex: 1, gap: 4 },
    title: { fontSize: 22, fontWeight: "700", lineHeight: 28 },
    benefits: { fontSize: 13, fontWeight: "500", letterSpacing: 0.3 },
    closeBtn: { padding: 4, marginLeft: 16 },
    closeText: { fontSize: 20 },
    scrollContent: { paddingHorizontal: 16, gap: 12 },
    photoContainer: {
        borderRadius: 16,
        overflow: "hidden",
        height: 220,
    },
    photo: { width: "100%", height: "100%" },
    section: {
        borderRadius: 14,
        padding: 16,
        gap: 12,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "700",
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 2,
    },
    stepRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    stepNum: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    stepNumText: { color: "#fff", fontSize: 12, fontWeight: "700" },
    stepText: { flex: 1, fontSize: 15, lineHeight: 22 },
    bulletRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    bullet: { fontSize: 16, lineHeight: 22, flexShrink: 0 },
    bulletText: { flex: 1, fontSize: 15, lineHeight: 22 },
});
