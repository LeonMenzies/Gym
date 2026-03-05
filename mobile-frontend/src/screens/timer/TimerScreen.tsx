import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CircularTimer } from "~components/CircularTimer";
import { useTheme } from "~store/settingsStore";
import { STRETCHES, useStretchStore } from "~store/stretchStore";
import { useTimerStore } from "~store/timerStore";
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

    const [timeLeft, setTimeLeft] = useState(gymRestSeconds);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (!running) setTimeLeft(gymRestSeconds);
    }, [gymRestSeconds, running]);

    useEffect(() => {
        if (running) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current!);
                        setRunning(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
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
        setRunning(false);
        setTimeLeft(gymRestSeconds);
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
                    size={200}
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
                <View style={styles.sliderTicks}>
                    {[15, 30, 45, 60, 75, 90, 105, 120].map((s) => (
                        <Text key={s} style={[styles.sliderTick, { color: colors.textSecondary }]}>
                            {s < 60 ? `${s}s` : `${s / 60}m`}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
};

// ─── Stretch routine list ─────────────────────────────────────────────────────

const StretchList: FC = () => {
    const colors = useTheme();
    const nav = useNavigation<Nav>();
    const { routines, deleteRoutine } = useStretchStore();

    const stretchCount = (items: { stretchId: string; duration: number }[]) => {
        return `${items.length} stretch${items.length !== 1 ? "es" : ""}`;
    };

    const totalDuration = (items: { stretchId: string; duration: number }[]) => {
        const total = items.reduce((acc, item) => acc + item.duration, 0) + Math.max(0, items.length - 1) * 5;
        const m = Math.floor(total / 60);
        const s = total % 60;
        return m > 0 ? (s > 0 ? `~${m}m ${s}s` : `~${m}m`) : `${s}s`;
    };

    const handleDelete = (id: string, name: string) => {
        Alert.alert("Delete Routine", `Delete "${name}"?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => deleteRoutine(id) },
        ]);
    };

    const stretchName = (stretchId: string) => {
        return STRETCHES.find((s) => s.id === stretchId)?.name ?? stretchId;
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.listContent}>
                {routines.length === 0 && (
                    <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                        No routines yet. Create one below.
                    </Text>
                )}
                {routines.map((routine) => (
                    <View
                        key={routine.id}
                        style={[styles.routineCard, { backgroundColor: colors.backgroundSecondary }]}
                    >
                        <View style={styles.routineInfo}>
                            <Text style={[styles.routineName, { color: colors.textPrimary }]}>{routine.name}</Text>
                            <Text style={[styles.routineMeta, { color: colors.textSecondary }]}>
                                {stretchCount(routine.items)} · {totalDuration(routine.items)}
                            </Text>
                            {routine.items.length > 0 && (
                                <Text style={[styles.routinePreview, { color: colors.textSecondary }]} numberOfLines={1}>
                                    {routine.items.slice(0, 3).map((item) => stretchName(item.stretchId)).join(", ")}
                                    {routine.items.length > 3 ? "…" : ""}
                                </Text>
                            )}
                        </View>
                        <View style={styles.routineActions}>
                            <TouchableOpacity
                                style={[styles.actionBtn, { backgroundColor: colors.primary }]}
                                onPress={() => nav.navigate("StretchRunner", { routineId: routine.id })}
                                disabled={routine.items.length === 0}
                            >
                                <Text style={[styles.actionBtnText, { color: colors.white }]}>Start</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionBtnOutline, { borderColor: colors.secondary }]}
                                onPress={() => nav.navigate("StretchBuilder", { routineId: routine.id })}
                            >
                                <Text style={[styles.actionBtnOutlineText, { color: colors.textSecondary }]}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.deleteBtn}
                                onPress={() => handleDelete(routine.id, routine.name)}
                            >
                                <Text style={[styles.deleteBtnText, { color: colors.error }]}>✕</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <View style={[styles.newRoutineBar, { backgroundColor: colors.background }]}>
                <TouchableOpacity
                    style={[styles.newRoutineBtn, { backgroundColor: colors.primary }]}
                    onPress={() => nav.navigate("StretchBuilder", undefined)}
                >
                    <Text style={[styles.newRoutineBtnText, { color: colors.white }]}>+ New Routine</Text>
                </TouchableOpacity>
            </View>
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
    sliderTicks: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 8,
    },
    sliderTick: {
        fontSize: 10,
        textAlign: "center",
    },
    // ── Stretch list ──
    listContent: {
        padding: 16,
        gap: 12,
        paddingBottom: 8,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 48,
        fontSize: 15,
    },
    routineCard: {
        borderRadius: 14,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    routineInfo: {
        flex: 1,
        gap: 3,
    },
    routineName: {
        fontSize: 17,
        fontWeight: "600",
    },
    routineMeta: {
        fontSize: 13,
    },
    routinePreview: {
        fontSize: 12,
        marginTop: 2,
    },
    routineActions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    actionBtn: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    actionBtnText: {
        fontSize: 14,
        fontWeight: "600",
    },
    actionBtnOutline: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
    },
    actionBtnOutlineText: {
        fontSize: 14,
        fontWeight: "500",
    },
    deleteBtn: {
        padding: 6,
    },
    deleteBtnText: {
        fontSize: 16,
        fontWeight: "600",
    },
    newRoutineBar: {
        padding: 16,
        paddingBottom: 24,
    },
    newRoutineBtn: {
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center",
    },
    newRoutineBtnText: {
        fontSize: 16,
        fontWeight: "600",
    },
});
