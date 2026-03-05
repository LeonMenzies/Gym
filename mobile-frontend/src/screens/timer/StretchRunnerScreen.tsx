import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CircularTimer } from "~components/CircularTimer";
import { useTheme } from "~store/settingsStore";
import { BODY_PART_LABELS, STRETCHES, useStretchStore } from "~store/stretchStore";
import { TimerStackParamList } from "~types/Types";

type Props = NativeStackScreenProps<TimerStackParamList, "StretchRunner">;
type Nav = NativeStackNavigationProp<TimerStackParamList, "StretchRunner">;

const SWAP_SECONDS = 5;

type Phase = "stretch" | "swap";
type Status = "running" | "paused" | "done";

export const StretchRunnerScreen: FC<Props> = () => {
    useKeepAwake();
    const route = useRoute<Props["route"]>();
    const nav = useNavigation<Nav>();
    const colors = useTheme();
    const { routines } = useStretchStore();

    const routine = routines.find((r) => r.id === route.params.routineId);

    // Ref-based timer state (no stale closures)
    const T = useRef({ countdown: 0, phase: "stretch" as Phase, index: 0 });
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [status, setStatus] = useState<Status>("running");
    const [displayCountdown, setDisplayCountdown] = useState(0);
    const [displayPhase, setDisplayPhase] = useState<Phase>("stretch");
    const [displayIndex, setDisplayIndex] = useState(0);

    const clearTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    useEffect(() => () => clearTimer(), []);

    if (!routine || routine.items.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.errorText, { color: colors.textSecondary }]}>Routine not found.</Text>
                <TouchableOpacity onPress={() => nav.goBack()}>
                    <Text style={[styles.backLink, { color: colors.primary }]}>← Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const items = routine.items;

    const startTicking = () => {
        clearTimer();
        intervalRef.current = setInterval(() => {
            const t = T.current;
            t.countdown -= 1;

            if (t.countdown > 0) {
                setDisplayCountdown(t.countdown);
                return;
            }

            // Phase ended
            if (t.phase === "stretch") {
                const nextIndex = t.index + 1;
                if (nextIndex >= items.length) {
                    // Done!
                    clearTimer();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    setStatus("done");
                } else {
                    // Start swap phase
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    t.phase = "swap";
                    t.index = nextIndex;
                    t.countdown = SWAP_SECONDS;
                    setDisplayPhase("swap");
                    setDisplayIndex(nextIndex);
                    setDisplayCountdown(SWAP_SECONDS);
                }
            } else {
                // Swap ended → start next stretch
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                t.phase = "stretch";
                t.countdown = items[t.index].duration;
                setDisplayPhase("stretch");
                setDisplayCountdown(items[t.index].duration);
            }
        }, 1000);
    };

    // Auto-start on mount
    useEffect(() => {
        T.current = { countdown: items[0].duration, phase: "stretch", index: 0 };
        setDisplayCountdown(items[0].duration);
        setDisplayPhase("stretch");
        setDisplayIndex(0);
        setStatus("running");
        startTicking();
        return clearTimer;
    }, []);

    const handlePause = () => {
        clearTimer();
        setStatus("paused");
    };

    const handleResume = () => {
        setStatus("running");
        startTicking();
    };

    const handleReset = () => {
        clearTimer();
        T.current = { countdown: items[0].duration, phase: "stretch", index: 0 };
        setDisplayCountdown(items[0].duration);
        setDisplayPhase("stretch");
        setDisplayIndex(0);
        setStatus("running");
        startTicking();
    };

    // Derived
    const currentItem = items[displayIndex];
    const currentStretch = STRETCHES.find((s) => s.id === currentItem?.stretchId);
    const phaseDuration = displayPhase === "stretch" ? currentItem?.duration ?? 0 : SWAP_SECONDS;
    const progressPct = phaseDuration > 0 ? displayCountdown / phaseDuration : 0;

    // ─── Done screen ──────────────────────────────────────────────────────────
    if (status === "done") {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.doneEmoji]}>🎉</Text>
                <Text style={[styles.doneTitle, { color: colors.primary }]}>Complete!</Text>
                <Text style={[styles.doneSub, { color: colors.textSecondary }]}>
                    {routine.name} · {items.length} stretch{items.length !== 1 ? "es" : ""}
                </Text>
                <View style={styles.doneButtons}>
                    <TouchableOpacity
                        style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
                        onPress={handleReset}
                    >
                        <Text style={[styles.primaryBtnText, { color: colors.white }]}>Go Again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.outlineBtn, { borderColor: colors.secondary }]}
                        onPress={() => nav.goBack()}
                    >
                        <Text style={[styles.outlineBtnText, { color: colors.textSecondary }]}>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // ─── Running / Paused ─────────────────────────────────────────────────────
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Back button */}
            <TouchableOpacity style={styles.closeBtn} onPress={() => nav.goBack()}>
                <Text style={[styles.closeText, { color: colors.textSecondary }]}>✕</Text>
            </TouchableOpacity>

            {/* Progress dots */}
            <View style={styles.dotsRow}>
                {items.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: colors.primary,
                                width: i === displayIndex ? 14 : 8,
                                height: i === displayIndex ? 14 : 8,
                                opacity: i < displayIndex ? 0.3 : i === displayIndex ? 1 : 0.15,
                            },
                        ]}
                    />
                ))}
            </View>

            {/* Phase label */}
            {displayPhase === "swap" ? (
                <>
                    <Text style={[styles.swapLabel, { color: colors.secondary }]}>GET READY</Text>
                    <Text style={[styles.nextStretchName, { color: colors.textPrimary }]}>
                        {STRETCHES.find((s) => s.id === items[displayIndex]?.stretchId)?.name}
                    </Text>
                    <Text style={[styles.nextStretchPart, { color: colors.textSecondary }]}>
                        {currentStretch ? BODY_PART_LABELS[currentStretch.bodyPart] : ""}
                    </Text>
                </>
            ) : (
                <>
                    <Text style={[styles.stretchNumber, { color: colors.textSecondary }]}>
                        {displayIndex + 1} / {items.length}
                    </Text>
                    <Text style={[styles.stretchName, { color: colors.textPrimary }]}>
                        {currentStretch?.name ?? ""}
                    </Text>
                    <Text style={[styles.stretchPart, { color: colors.textSecondary }]}>
                        {currentStretch ? BODY_PART_LABELS[currentStretch.bodyPart] : ""}
                    </Text>
                </>
            )}

            {/* Countdown */}
            <CircularTimer
                timeLeft={displayCountdown}
                duration={phaseDuration}
                timeLabel={`${displayCountdown}`}
                subLabel="seconds"
                size={220}
                color={displayPhase === "swap" ? colors.secondary : colors.primary}
                bgColor={colors.backgroundSecondary}
                textColor={colors.textPrimary}
                subTextColor={colors.textSecondary}
            />

            {/* Progress bar */}
            <View style={[styles.progressTrack, { backgroundColor: colors.lightGrey }]}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            backgroundColor: displayPhase === "swap" ? colors.secondary : colors.primary,
                            width: `${Math.max(0, progressPct * 100)}%`,
                        },
                    ]}
                />
            </View>

            {/* Controls */}
            <View style={styles.controls}>
                {status === "running" ? (
                    <TouchableOpacity
                        style={[styles.controlBtn, { borderColor: colors.primary }]}
                        onPress={handlePause}
                    >
                        <Text style={[styles.controlBtnText, { color: colors.primary }]}>Pause</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.controlBtn, { borderColor: colors.primary }]}
                        onPress={handleResume}
                    >
                        <Text style={[styles.controlBtnText, { color: colors.primary }]}>Resume</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.controlBtn, { borderColor: colors.grey }]}
                    onPress={handleReset}
                >
                    <Text style={[styles.controlBtnText, { color: colors.grey }]}>Restart</Text>
                </TouchableOpacity>
            </View>

            {/* Next up */}
            {displayPhase === "stretch" && displayIndex < items.length - 1 && (
                <Text style={[styles.nextUp, { color: colors.textSecondary }]}>
                    Next: {STRETCHES.find((s) => s.id === items[displayIndex + 1]?.stretchId)?.name}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 28,
        gap: 12,
    },
    closeBtn: {
        position: "absolute",
        top: 60,
        right: 24,
        padding: 8,
    },
    closeText: { fontSize: 18, fontWeight: "500" },
    dotsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: "100%",
        marginBottom: 8,
    },
    dot: { borderRadius: 8 },
    stretchNumber: { fontSize: 14, letterSpacing: 0.5 },
    stretchName: {
        fontSize: 32,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 38,
    },
    stretchPart: {
        fontSize: 16,
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    swapLabel: {
        fontSize: 18,
        fontWeight: "700",
        letterSpacing: 4,
    },
    nextStretchName: {
        fontSize: 28,
        fontWeight: "600",
        textAlign: "center",
    },
    nextStretchPart: {
        fontSize: 14,
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    progressTrack: {
        width: "100%",
        height: 5,
        borderRadius: 3,
        marginTop: 12,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        borderRadius: 3,
    },
    controls: {
        flexDirection: "row",
        gap: 14,
        marginTop: 20,
    },
    controlBtn: {
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 25,
        borderWidth: 1.5,
    },
    controlBtnText: {
        fontSize: 16,
        fontWeight: "500",
    },
    nextUp: {
        fontSize: 14,
        marginTop: 8,
    },
    // Done
    doneEmoji: { fontSize: 52 },
    doneTitle: {
        fontSize: 48,
        fontWeight: "300",
    },
    doneSub: { fontSize: 17 },
    doneButtons: {
        gap: 12,
        marginTop: 24,
        alignItems: "center",
    },
    primaryBtn: {
        paddingHorizontal: 56,
        paddingVertical: 16,
        borderRadius: 30,
    },
    primaryBtnText: {
        fontSize: 17,
        fontWeight: "600",
    },
    outlineBtn: {
        paddingHorizontal: 40,
        paddingVertical: 14,
        borderRadius: 30,
        borderWidth: 1.5,
    },
    outlineBtnText: {
        fontSize: 16,
        fontWeight: "500",
    },
    errorText: { fontSize: 17, marginBottom: 16 },
    backLink: { fontSize: 17 },
});
