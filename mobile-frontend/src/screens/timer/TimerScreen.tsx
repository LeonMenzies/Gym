import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CircularTimer } from "~components/CircularTimer";
import { useTheme } from "~store/settingsStore";
import { STRETCHES, useStretchStore } from "~store/stretchStore";
import { useTimerStore } from "~store/timerStore";
import { useActivityStore } from "~store/activityStore";
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
                        logActivity("gym");
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
                    size={260}
                    color={running ? progressColor : colors.primary}
                    bgColor={colors.backgroundSecondary}
                    textColor={colors.textPrimary}
                    subTextColor={colors.textSecondary}
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

    const sorted = [...routines].sort((a, b) => b.items.length - a.items.length);

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
                <ScrollView contentContainerStyle={styles.bubblesContent} showsVerticalScrollIndicator={false}>
                    {sorted.map((routine, i) => {
                        const size = Math.max(80, 160 - i * 22);
                        const nameFontSize = Math.max(10, Math.floor(size * 0.13));
                        const countFontSize = Math.max(8, Math.floor(size * 0.09));
                        const canStart = routine.items.length > 0;
                        return (
                            <TouchableOpacity
                                key={routine.id}
                                style={[
                                    styles.bubble,
                                    {
                                        width: size,
                                        height: size,
                                        borderRadius: size / 2,
                                        backgroundColor: colors.backgroundSecondary,
                                        opacity: canStart ? 1 : 0.5,
                                    },
                                ]}
                                onPress={() => canStart && nav.navigate("StretchRunner", { routineId: routine.id })}
                                onLongPress={() => handleLongPress(routine.id, routine.name)}
                                activeOpacity={0.75}
                                delayLongPress={400}
                            >
                                <Text
                                    style={[styles.bubbleName, { color: colors.textPrimary, fontSize: nameFontSize }]}
                                    numberOfLines={3}
                                >
                                    {routine.name}
                                </Text>
                                <Text style={[styles.bubbleCount, { color: colors.textSecondary, fontSize: countFontSize }]}>
                                    {routine.items.length} stretch{routine.items.length !== 1 ? "es" : ""}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
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

export const TimerScreen: FC = () => {
    const [mode, setMode] = useState<TimerMode>("gym");
    const colors = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.toggleContainer}>
                <View style={[styles.togglePill, { backgroundColor: colors.backgroundSecondary }]}>
                    <TouchableOpacity
                        style={mode === "gym" ? [styles.toggleBtn, { backgroundColor: colors.primary }] : styles.toggleBtn}
                        onPress={() => setMode("gym")}
                    >
                        <Text style={[styles.toggleText, { color: mode === "gym" ? colors.white : colors.textSecondary }]}>
                            Gym
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mode === "stretch" ? [styles.toggleBtn, { backgroundColor: colors.primary }] : styles.toggleBtn}
                        onPress={() => setMode("stretch")}
                    >
                        <Text style={[styles.toggleText, { color: mode === "stretch" ? colors.white : colors.textSecondary }]}>
                            Stretch
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                {mode === "gym" ? <GymTimer /> : <StretchList />}
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
    // ── Stretch list ──
    bubblesContent: {
        flexDirection: "row",
        flexWrap: "wrap",
        padding: 20,
        gap: 16,
        justifyContent: "center",
        paddingBottom: 100,
    },
    bubble: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
    bubbleName: {
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 15,
    },
    bubbleCount: {
        marginTop: 3,
        textAlign: "center",
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
