import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CircularTimer } from "~components/CircularTimer";
import { StretchIllustration } from "~components/StretchIllustration";
import { useTheme } from "~store/settingsStore";
import { useActivityStore } from "~store/activityStore";
import { useStreakStore } from "~store/streakStore";
import { BODY_PART_LABELS, STRETCHES, useStretchStore } from "~store/stretchStore";

const SWAP_SECONDS = 5;

// "stretch" = active hold (first side or non-bilateral)
// "bilateral" = second side of a bilateral stretch
// "swap" = rest before next stretch
type Phase = "stretch" | "bilateral" | "swap";
type Status = "running" | "paused" | "done";

type TimerRef = {
    countdown: number;
    phase: Phase;
    index: number;
};

export const StretchRunnerScreen: FC = () => {
    useKeepAwake();
    const { routineId } = useLocalSearchParams<{ routineId: string }>();
    const router = useRouter();
    const colors = useTheme();
    const { routines } = useStretchStore();
    const { logActivity } = useActivityStore();
    const { logActivity: logStreak } = useStreakStore();

    const routine = routines.find((r) => r.id === routineId);

    const T = useRef<TimerRef>({ countdown: 0, phase: "stretch", index: 0 });
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
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={[styles.backLink, { color: colors.primary }]}>← Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const items = routine.items;

    const getStretch = (idx: number) => STRETCHES.find((s) => s.id === items[idx]?.stretchId);

    const startTicking = () => {
        clearTimer();
        intervalRef.current = setInterval(() => {
            const t = T.current;
            t.countdown -= 1;

            // Haptic countdown at 3, 2, 1 seconds during hold phases
            if ((t.phase === "stretch" || t.phase === "bilateral") && t.countdown <= 3 && t.countdown > 0) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }

            if (t.countdown > 0) {
                setDisplayCountdown(t.countdown);
                return;
            }

            // Phase ended
            if (t.phase === "stretch") {
                const stretch = getStretch(t.index);
                if (stretch?.bilateral) {
                    // Move to second side
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    t.phase = "bilateral";
                    t.countdown = items[t.index].duration;
                    setDisplayPhase("bilateral");
                    setDisplayCountdown(items[t.index].duration);
                } else {
                    // No bilateral — advance to next
                    advanceToNext(t);
                }
            } else if (t.phase === "bilateral") {
                advanceToNext(t);
            } else {
                // swap ended → start next stretch
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                t.phase = "stretch";
                t.countdown = items[t.index].duration;
                setDisplayPhase("stretch");
                setDisplayCountdown(items[t.index].duration);
            }
        }, 1000);
    };

    const advanceToNext = (t: TimerRef) => {
        const nextIndex = t.index + 1;
        if (nextIndex >= items.length) {
            clearTimer();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            logActivity("stretch");
            logStreak();
            setStatus("done");
        } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            t.phase = "swap";
            t.index = nextIndex;
            t.countdown = SWAP_SECONDS;
            setDisplayPhase("swap");
            setDisplayIndex(nextIndex);
            setDisplayCountdown(SWAP_SECONDS);
        }
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

    const handlePause = () => { clearTimer(); setStatus("paused"); };
    const handleResume = () => { setStatus("running"); startTicking(); };

    const handleReset = () => {
        clearTimer();
        T.current = { countdown: items[0].duration, phase: "stretch", index: 0 };
        setDisplayCountdown(items[0].duration);
        setDisplayPhase("stretch");
        setDisplayIndex(0);
        setStatus("running");
        startTicking();
    };

    const handlePrev = () => {
        clearTimer();
        const prevIndex = T.current.index > 0 ? T.current.index - 1 : 0;
        T.current = { countdown: items[prevIndex].duration, phase: "stretch", index: prevIndex };
        setDisplayCountdown(items[prevIndex].duration);
        setDisplayPhase("stretch");
        setDisplayIndex(prevIndex);
        setStatus("running");
        startTicking();
    };

    const handleNext = () => {
        clearTimer();
        const currentStretchDef = getStretch(T.current.index);

        // If on first side of a bilateral stretch, go to second side
        if (T.current.phase === "stretch" && currentStretchDef?.bilateral) {
            T.current = { ...T.current, phase: "bilateral", countdown: items[T.current.index].duration };
            setDisplayPhase("bilateral");
            setDisplayCountdown(items[T.current.index].duration);
            setStatus("running");
            startTicking();
            return;
        }

        // Otherwise advance to next exercise
        const nextIndex = T.current.index + 1;
        if (nextIndex >= items.length) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            logActivity("stretch");
            logStreak();
            setStatus("done");
            return;
        }
        T.current = { countdown: items[nextIndex].duration, phase: "stretch", index: nextIndex };
        setDisplayCountdown(items[nextIndex].duration);
        setDisplayPhase("stretch");
        setDisplayIndex(nextIndex);
        setStatus("running");
        startTicking();
    };

    // Derived
    const currentItem = items[displayIndex];
    const currentStretch = STRETCHES.find((s) => s.id === currentItem?.stretchId);
    const sideLabel = displayPhase === "bilateral" ? "OTHER SIDE" : (currentStretch?.bilateral ? "FIRST SIDE" : null);

    // ─── Done screen ──────────────────────────────────────────────────────────
    if (status === "done") {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.doneTitle, { color: colors.primary }]}>Complete</Text>
                <Text style={[styles.doneSub, { color: colors.textSecondary }]}>
                    {routine.name} · {items.length} stretch{items.length !== 1 ? "es" : ""}
                </Text>
                <TouchableOpacity
                    style={[styles.outlineBtn, { borderColor: colors.secondary, marginTop: 32 }]}
                    onPress={() => router.back()}
                >
                    <Text style={[styles.outlineBtnText, { color: colors.textSecondary }]}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // ─── Running / Paused ─────────────────────────────────────────────────────
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Back button */}
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
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
                    {sideLabel && (
                        <Text style={[styles.sideLabel, { color: colors.primary }]}>
                            {sideLabel}
                        </Text>
                    )}
                    <Text style={[styles.stretchPart, { color: colors.textSecondary }]}>
                        {currentStretch ? BODY_PART_LABELS[currentStretch.bodyPart] : ""}
                    </Text>
                </>
            )}

            {/* Stretch illustration */}
            {displayPhase !== "swap" && currentStretch && (
                <StretchIllustration
                    stretchId={currentStretch.id}
                    size={88}
                    color={displayPhase === "bilateral" ? colors.secondary : colors.primary}
                />
            )}

            {/* Countdown */}
            <CircularTimer
                timeLeft={displayCountdown}
                duration={displayPhase === "swap" ? SWAP_SECONDS : currentItem?.duration ?? 0}
                timeLabel={`${displayCountdown}`}
                subLabel="seconds"
                size={270}
                color={
                    displayPhase === "swap" ? colors.secondary
                    : displayPhase === "bilateral" ? colors.secondary
                    : colors.primary
                }
                bgColor={colors.backgroundSecondary}
                textColor={colors.textPrimary}
                subTextColor={colors.textSecondary}
            />

            {/* Controls */}
            <View style={styles.controls}>
                <TouchableOpacity
                    style={[styles.iconBtn, { backgroundColor: colors.backgroundSecondary }]}
                    onPress={handlePrev}
                >
                    <Ionicons name="play-skip-back" size={26} color={colors.textSecondary} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.iconBtnCenter, { backgroundColor: colors.primary }]}
                    onPress={status === "running" ? handlePause : handleResume}
                >
                    <Ionicons name={status === "running" ? "pause" : "play"} size={32} color={colors.white} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.iconBtn, { backgroundColor: colors.backgroundSecondary }]}
                    onPress={handleNext}
                >
                    <Ionicons name="play-skip-forward" size={26} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>

            {/* Next up */}
            {displayPhase === "stretch" && displayIndex < items.length - 1 && (
                <Text style={[styles.nextUp, { color: colors.textSecondary }]}>
                    Next: {STRETCHES.find((s) => s.id === items[displayIndex + 1]?.stretchId)?.name}
                </Text>
            )}
            {displayPhase === "bilateral" && (
                <Text style={[styles.nextUp, { color: colors.textSecondary }]}>
                    Then: {displayIndex < items.length - 1
                        ? STRETCHES.find((s) => s.id === items[displayIndex + 1]?.stretchId)?.name
                        : "Done!"}
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
    sideLabel: {
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 2,
        textTransform: "uppercase",
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
    controls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 28,
        marginTop: 8,
    },
    iconBtn: {
        width: 54,
        height: 54,
        borderRadius: 27,
        alignItems: "center",
        justifyContent: "center",
    },
    iconBtnCenter: {
        width: 68,
        height: 68,
        borderRadius: 34,
        alignItems: "center",
        justifyContent: "center",
    },
    nextUp: {
        fontSize: 14,
        marginTop: 8,
    },
    // Done
    doneTitle: {
        fontSize: 48,
        fontWeight: "300",
    },
    doneSub: { fontSize: 17 },
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
