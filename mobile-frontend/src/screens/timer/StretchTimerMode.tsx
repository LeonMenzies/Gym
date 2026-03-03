import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";
import { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "~store/settingsStore";

const HOLD_OPTIONS = [15, 20, 30, 45, 60];
const REST_OPTIONS = [5, 10, 15, 20, 30];

type Phase = "hold" | "rest";
type Status = "idle" | "running" | "paused" | "done";

export const StretchTimerMode: FC = () => {
    const colors = useTheme();
    useKeepAwake();

    // Config — only editable while idle
    const [holdDuration, setHoldDuration] = useState(30);
    const [restDuration, setRestDuration] = useState(10);
    const [totalReps, setTotalReps] = useState(3);

    // Display state — only for rendering
    const [status, setStatus] = useState<Status>("idle");
    const [displayCountdown, setDisplayCountdown] = useState(30);
    const [displayPhase, setDisplayPhase] = useState<Phase>("hold");
    const [displayRep, setDisplayRep] = useState(1);

    // Ref-based timer state — drives interval logic with no stale closures
    const T = useRef({ countdown: 30, phase: "hold" as Phase, currentRep: 1 });
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
    };

    useEffect(() => () => clearTimer(), []);

    const startTicking = (hold: number, rest: number, reps: number) => {
        clearTimer();
        intervalRef.current = setInterval(() => {
            const t = T.current;
            t.countdown -= 1;

            if (t.countdown > 0) {
                setDisplayCountdown(t.countdown);
                return;
            }

            // Phase complete
            if (t.phase === "hold") {
                if (t.currentRep >= reps) {
                    // All done
                    clearTimer();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    setDisplayCountdown(0);
                    setStatus("done");
                } else {
                    // Start rest
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    t.phase = "rest";
                    t.countdown = rest;
                    setDisplayPhase("rest");
                    setDisplayCountdown(rest);
                }
            } else {
                // Start next hold
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                t.currentRep += 1;
                t.phase = "hold";
                t.countdown = hold;
                setDisplayRep(t.currentRep);
                setDisplayPhase("hold");
                setDisplayCountdown(hold);
            }
        }, 1000);
    };

    const handleStart = () => {
        T.current = { countdown: holdDuration, phase: "hold", currentRep: 1 };
        setDisplayCountdown(holdDuration);
        setDisplayPhase("hold");
        setDisplayRep(1);
        setStatus("running");
        startTicking(holdDuration, restDuration, totalReps);
    };

    const handlePause = () => {
        clearTimer();
        setStatus("paused");
    };

    const handleResume = () => {
        // Re-capture current config from state at resume time
        const hold = holdDuration;
        const rest = restDuration;
        const reps = totalReps;
        setStatus("running");
        startTicking(hold, rest, reps);
    };

    const handleReset = () => {
        clearTimer();
        T.current = { countdown: holdDuration, phase: "hold", currentRep: 1 };
        setDisplayCountdown(holdDuration);
        setDisplayPhase("hold");
        setDisplayRep(1);
        setStatus("idle");
    };

    const phaseDuration = displayPhase === "hold" ? holdDuration : restDuration;
    const progressPct = phaseDuration > 0 ? displayCountdown / phaseDuration : 0;

    // ─── Idle: config screen ─────────────────────────────────────────────────
    if (status === "idle") {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Hold duration</Text>
                <View style={styles.chipRow}>
                    {HOLD_OPTIONS.map((s) => (
                        <TouchableOpacity
                            key={s}
                            style={[styles.chip, { borderColor: colors.primary, backgroundColor: holdDuration === s ? colors.primary : "transparent" }]}
                            onPress={() => setHoldDuration(s)}
                        >
                            <Text style={[styles.chipText, { color: holdDuration === s ? colors.white : colors.primary }]}>{s}s</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Rest between reps</Text>
                <View style={styles.chipRow}>
                    {REST_OPTIONS.map((s) => (
                        <TouchableOpacity
                            key={s}
                            style={[styles.chip, { borderColor: colors.primary, backgroundColor: restDuration === s ? colors.primary : "transparent" }]}
                            onPress={() => setRestDuration(s)}
                        >
                            <Text style={[styles.chipText, { color: restDuration === s ? colors.white : colors.primary }]}>{s}s</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Reps</Text>
                <View style={styles.repRow}>
                    <TouchableOpacity style={styles.repBtn} onPress={() => setTotalReps((r) => Math.max(1, r - 1))}>
                        <Text style={[styles.repBtnText, { color: colors.primary }]}>−</Text>
                    </TouchableOpacity>
                    <Text style={[styles.repValue, { color: colors.textPrimary }]}>{totalReps}</Text>
                    <TouchableOpacity style={styles.repBtn} onPress={() => setTotalReps((r) => Math.min(10, r + 1))}>
                        <Text style={[styles.repBtnText, { color: colors.primary }]}>+</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary }]} onPress={handleStart}>
                    <Text style={[styles.primaryBtnText, { color: colors.white }]}>Start</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // ─── Done ────────────────────────────────────────────────────────────────
    if (status === "done") {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.doneTitle, { color: colors.primary }]}>Complete</Text>
                <Text style={[styles.doneSubtitle, { color: colors.textSecondary }]}>
                    {totalReps} / {totalReps} reps
                </Text>
                <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: colors.primary, marginTop: 32 }]} onPress={handleReset}>
                    <Text style={[styles.primaryBtnText, { color: colors.white }]}>Restart</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // ─── Running / Paused ────────────────────────────────────────────────────
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.repLabel, { color: colors.textSecondary }]}>
                Rep {displayRep} / {totalReps}
            </Text>

            <View style={styles.dotsRow}>
                {Array.from({ length: totalReps }, (_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: colors.primary,
                                width: i === displayRep - 1 ? 14 : 10,
                                height: i === displayRep - 1 ? 14 : 10,
                                opacity: i < displayRep - 1 ? 0.35 : i === displayRep - 1 ? 1 : 0.15,
                            },
                        ]}
                    />
                ))}
            </View>

            <Text style={[styles.countdownNumber, { color: colors.textPrimary }]}>{displayCountdown}</Text>
            <Text style={[styles.countdownLabel, { color: colors.textSecondary }]}>seconds</Text>

            <Text style={[styles.phaseLabel, { color: displayPhase === "hold" ? colors.primary : colors.secondary }]}>
                {displayPhase === "hold" ? "HOLD" : "REST"}
            </Text>

            <View style={[styles.progressTrack, { backgroundColor: colors.lightGrey }]}>
                <View
                    style={[
                        styles.progressFill,
                        {
                            backgroundColor: displayPhase === "hold" ? colors.primary : colors.secondary,
                            width: `${Math.max(0, progressPct * 100)}%`,
                        },
                    ]}
                />
            </View>

            <View style={styles.controls}>
                {status === "running" ? (
                    <TouchableOpacity style={[styles.controlBtn, { borderColor: colors.primary }]} onPress={handlePause}>
                        <Text style={[styles.controlBtnText, { color: colors.primary }]}>Pause</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={[styles.controlBtn, { borderColor: colors.primary }]} onPress={handleResume}>
                        <Text style={[styles.controlBtnText, { color: colors.primary }]}>Resume</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={[styles.controlBtn, { borderColor: colors.grey }]} onPress={handleReset}>
                    <Text style={[styles.controlBtnText, { color: colors.grey }]}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 28,
        gap: 16,
    },
    // ── Config ──
    sectionLabel: {
        fontSize: 13,
        fontWeight: "500",
        letterSpacing: 0.5,
        alignSelf: "flex-start",
        marginTop: 4,
    },
    chipRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        alignSelf: "flex-start",
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1.5,
    },
    chipText: {
        fontSize: 14,
        fontWeight: "500",
    },
    repRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 28,
    },
    repBtn: {
        padding: 10,
    },
    repBtnText: {
        fontSize: 32,
        fontWeight: "300",
    },
    repValue: {
        fontSize: 40,
        fontWeight: "600",
        minWidth: 40,
        textAlign: "center",
    },
    primaryBtn: {
        paddingHorizontal: 56,
        paddingVertical: 16,
        borderRadius: 30,
        marginTop: 8,
    },
    primaryBtnText: {
        fontSize: 17,
        fontWeight: "600",
    },
    // ── Done ──
    doneTitle: {
        fontSize: 52,
        fontWeight: "300",
    },
    doneSubtitle: {
        fontSize: 18,
    },
    // ── Running ──
    repLabel: {
        fontSize: 15,
    },
    dotsRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    dot: {
        borderRadius: 8,
    },
    countdownNumber: {
        fontSize: 100,
        fontWeight: "200",
        lineHeight: 108,
    },
    countdownLabel: {
        fontSize: 15,
        marginTop: -8,
    },
    phaseLabel: {
        fontSize: 22,
        fontWeight: "700",
        letterSpacing: 5,
        marginTop: 4,
    },
    progressTrack: {
        width: "100%",
        height: 5,
        borderRadius: 3,
        marginTop: 8,
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
});
