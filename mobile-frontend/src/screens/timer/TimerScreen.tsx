import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { CircularTimer } from "~components/CircularTimer";
import { StretchIllustration } from "~components/StretchIllustration";
import { useTheme } from "~store/settingsStore";
import { STRETCHES, useStretchStore } from "~store/stretchStore";
import { useTimerStore } from "~store/timerStore";
import { useActivityStore } from "~store/activityStore";
import { useStreakStore } from "~store/streakStore";
import { TimerStackParamList } from "~types/Types";

type Nav = NativeStackNavigationProp<TimerStackParamList, "TimerHome">;

type TimerMode = "gym" | "stretch";

const MIN_SECONDS = 15;
const MAX_SECONDS = 120;

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}:${s.toString().padStart(2, "0")}` : `${s}s`;
}

function labelForSeconds(s: number): string {
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return rem === 0 ? `${m}m` : `${m}m ${rem}s`;
}

// ─── Gym Timer (countdown) ────────────────────────────────────────────────────

const GymTimer: FC = () => {
    const colors = useTheme();
    const { gymRestSeconds, setGymRestSeconds } = useTimerStore();
    const { logActivity } = useActivityStore();
    const { logActivity: logStreak } = useStreakStore();

    const [timeLeft, setTimeLeft] = useState(gymRestSeconds);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!running) setTimeLeft(gymRestSeconds);
    }, [gymRestSeconds, running]);

    useEffect(() => {
        if (running) {
            const tick = () => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        setRunning(false);
                        logActivity("gym"); logStreak();
                        return 0;
                    }
                    return prev - 1;
                });
            };
            tick(); // fire immediately so animation starts right away
            intervalRef.current = setInterval(tick, 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [running]);

    const handleStartStop = () => {
        if (timeLeft === 0) {
            setTimeLeft(gymRestSeconds);
            setRunning(true);
        } else {
            setRunning((r) => !r);
        }
    };

    const handleReset = () => {
        setTimeLeft(gymRestSeconds);
        setRunning(true);
    };

    const progress = gymRestSeconds > 0 ? timeLeft / gymRestSeconds : 0;
    const progressColor = progress > 0.5 ? colors.primary : progress > 0.25 ? colors.secondary : colors.error;

    return (
        <View style={styles.gymContainer}>
            <TouchableOpacity onPress={handleReset} activeOpacity={0.7}>
                <CircularTimer
                    timeLeft={timeLeft}
                    duration={gymRestSeconds}
                    timeLabel={formatTime(timeLeft)}
                    subLabel="rest"
                    size={338}
                    color={running ? progressColor : colors.primary}
                    bgColor={colors.backgroundSecondary}
                    textColor={colors.textPrimary}
                    subTextColor={colors.textSecondary}
                    backgroundText={formatTime(timeLeft)}
                    showText={false}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.startBtn, { backgroundColor: colors.primary }]}
                onPress={handleStartStop}
            >
                <Text style={[styles.startBtnText, { color: colors.white }]}>
                    {running ? "Pause" : timeLeft === 0 ? "Restart" : "Start"}
                </Text>
            </TouchableOpacity>

            <View style={[styles.sliderSection, { opacity: running ? 0.4 : 1 }]}>
                <Text style={[styles.sliderLabel, { color: colors.textSecondary }]}>Rest duration</Text>
                <Text style={[styles.sliderValue, { color: colors.textPrimary }]}>
                    {labelForSeconds(gymRestSeconds)}
                </Text>
                <Slider
                    style={styles.slider}
                    minimumValue={MIN_SECONDS}
                    maximumValue={MAX_SECONDS}
                    step={15}
                    value={gymRestSeconds}
                    onValueChange={(v) => { if (!running) setGymRestSeconds(v); }}
                    minimumTrackTintColor={colors.primary}
                    maximumTrackTintColor={colors.lightGrey ?? colors.backgroundSecondary}
                    thumbTintColor={colors.primary}
                    disabled={running}
                />
            </View>
        </View>
    );
};

// ─── Stretch routine list ─────────────────────────────────────────────────────

const StretchList: FC = () => {
    const colors = useTheme();
    const nav = useNavigation<Nav>();
    const { routines, deleteRoutine } = useStretchStore();
    const { width: screenWidth } = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState(0);

    const sorted = [...routines].sort((a, b) => b.items.length - a.items.length);

    const SIDE_INSET = 40;
    const CARD_GAP = 12;
    const cardWidth = screenWidth - SIDE_INSET * 2;
    const snapInterval = cardWidth + CARD_GAP;
    const circleSize = cardWidth - 24;
    const illSize = Math.floor(circleSize * 0.2);

    const confirmDelete = (id: string, name: string) => {
        Alert.alert("Delete Routine", `Delete "${name}"?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteRoutine(id) },
        ]);
    };

    const handleLongPress = (id: string, name: string) => {
        Alert.alert(name, undefined, [
            { text: "Edit", onPress: () => nav.navigate("StretchBuilder", { routineId: id }) },
            { text: "Delete", style: "destructive", onPress: () => confirmDelete(id, name) },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    return (
        <View style={{ flex: 1 }}>
            {sorted.length === 0 ? (
                <View style={styles.emptyState}>
                    <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>No routines yet</Text>
                    <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                        Tap + to build your first stretch routine
                    </Text>
                </View>
            ) : (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        decelerationRate="fast"
                        snapToInterval={snapInterval}
                        contentContainerStyle={{ paddingHorizontal: SIDE_INSET - CARD_GAP / 2 }}
                        onMomentumScrollEnd={(e) => {
                            setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / snapInterval));
                        }}
                        style={{ flexGrow: 0 }}
                    >
                        {sorted.map((routine) => {
                            const canStart = routine.items.length > 0;
                            const previewIds = routine.items.slice(0, 3).map((it) => it.stretchId);
                            return (
                                <TouchableOpacity
                                    key={routine.id}
                                    style={[styles.carouselPage, { width: cardWidth, marginHorizontal: CARD_GAP / 2 }]}
                                    onPress={() => canStart && nav.navigate("StretchRunner", { routineId: routine.id })}
                                    onLongPress={() => handleLongPress(routine.id, routine.name)}
                                    activeOpacity={0.85}
                                    delayLongPress={400}
                                >
                                    <View style={[
                                        styles.routineCircle,
                                        {
                                            width: circleSize,
                                            height: circleSize,
                                            borderRadius: circleSize / 2,
                                            backgroundColor: colors.backgroundSecondary,
                                            opacity: canStart ? 1 : 0.5,
                                        },
                                    ]}>
                                        <Text style={[styles.circleName, { color: colors.textPrimary }]} numberOfLines={2}>
                                            {routine.name}
                                        </Text>
                                        {previewIds.length > 0 && (
                                            <View style={styles.illRow}>
                                                {previewIds.map((sid) => (
                                                    <StretchIllustration
                                                        key={sid}
                                                        stretchId={sid}
                                                        size={illSize}
                                                        color={colors.primary}
                                                    />
                                                ))}
                                            </View>
                                        )}
                                        <Text style={[styles.circleCount, { color: colors.textSecondary }]}>
                                            {routine.items.length} stretch{routine.items.length !== 1 ? "es" : ""}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>

                    {/* Pagination dots */}
                    {sorted.length > 1 && (
                        <View style={styles.dotsRow}>
                            {sorted.map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.dot,
                                        {
                                            backgroundColor: colors.primary,
                                            width: i === activeIndex ? 18 : 7,
                                            opacity: i === activeIndex ? 1 : 0.25,
                                        },
                                    ]}
                                />
                            ))}
                        </View>
                    )}

                    <Text style={[styles.holdHint, { color: colors.textSecondary }]}>
                        Hold to edit or delete
                    </Text>
                </View>
            )}

            {/* FAB — New Routine */}
            <TouchableOpacity
                style={[styles.fab, { backgroundColor: colors.primary }]}
                onPress={() => nav.navigate("StretchBuilder", undefined)}
            >
                <Ionicons name="add" size={30} color={colors.white} />
            </TouchableOpacity>
        </View>
    );
};

// ─── Screen ───────────────────────────────────────────────────────────────────

const MODES: { key: TimerMode; label: string }[] = [
    { key: "gym", label: "Gym" },
    { key: "stretch", label: "Stretch" },
];

export const TimerScreen: FC = () => {
    const [mode, setMode] = useState<TimerMode>("gym");
    const colors = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.toggleContainer}>
                <View style={[styles.togglePill, { backgroundColor: colors.backgroundSecondary }]}>
                    {MODES.map(({ key, label }) => (
                        <TouchableOpacity
                            key={key}
                            style={mode === key ? [styles.toggleBtn, { backgroundColor: colors.primary }] : styles.toggleBtn}
                            onPress={() => setMode(key)}
                        >
                            <Text style={[styles.toggleText, { color: mode === key ? colors.white : colors.textSecondary }]}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.content}>
                {mode === "gym" && <GymTimer />}
                {mode === "stretch" && <StretchList />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    toggleContainer: {
        paddingTop: 60,
        paddingBottom: 8,
        alignItems: "center",
    },
    togglePill: {
        flexDirection: "row",
        borderRadius: 25,
        padding: 4,
    },
    toggleBtn: {
        paddingHorizontal: 36,
        paddingVertical: 10,
        borderRadius: 20,
    },
    toggleText: {
        fontSize: 15,
        fontWeight: "600",
    },
    content: { flex: 1 },
    // ── Gym timer ──
    gymContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        gap: 36,
    },
    startBtn: {
        paddingHorizontal: 64,
        paddingVertical: 14,
        borderRadius: 30,
    },
    startBtnText: {
        fontSize: 17,
        fontWeight: "700",
    },
    sliderSection: {
        width: "100%",
        alignItems: "center",
        gap: 6,
    },
    sliderLabel: {
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    sliderValue: {
        fontSize: 28,
        fontWeight: "700",
    },
    slider: {
        width: "100%",
        height: 40,
    },
    // ── Stretch carousel ──
    carouselPage: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 24,
    },
    routineCircle: {
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: 28,
    },
    circleName: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
    },
    illRow: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    circleCount: {
        fontSize: 13,
    },
    dotsRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        paddingTop: 16,
    },
    dot: {
        height: 7,
        borderRadius: 4,
    },
    holdHint: {
        textAlign: "center",
        fontSize: 12,
        marginTop: 10,
        opacity: 0.6,
    },
    emptyState: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "600",
    },
    emptySubtitle: {
        fontSize: 15,
        textAlign: "center",
    },
    fab: {
        position: "absolute",
        bottom: 28,
        right: 24,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
});
