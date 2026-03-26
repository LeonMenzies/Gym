import * as Haptics from "expo-haptics";
import { useKeepAwake } from "expo-keep-awake";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useRef, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CircularTimer } from "~components/CircularTimer";
import { useTheme } from "~store/settingsStore";
import { useActivityStore } from "~store/activityStore";
import { useStreakStore } from "~store/streakStore";
import { BODY_PART_LABELS, STRETCHES, useStretchStore } from "~store/stretchStore";
import { TimerStackParamList } from "~types/Types";
import { getBendDataForStretchId, getImageForStretchId } from "~data/stretchBendData";

type Props = NativeStackScreenProps<TimerStackParamList, "StretchRunner">;
type Nav = NativeStackNavigationProp<TimerStackParamList, "StretchRunner">;

const SWAP_SECONDS = 5;

type Phase = "stretch" | "bilateral" | "swap";
type Status = "running" | "paused" | "done";

type TimerRef = {
    countdown: number;
    phase: Phase;
    index: number;
};

export const StretchRunnerScreen: FC<Props> = () => {
    useKeepAwake();
    const route = useRoute<Props["route"]>();
    const nav = useNavigation<Nav>();
    const colors = useTheme();
    const { routines } = useStretchStore();
    const { logActivity } = useActivityStore();
    const { logActivity: logStreak } = useStreakStore();

    const routine = routines.find((r) => r.id === route.params.routineId);

    const T = useRef<TimerRef>({ countdown: 0, phase: "stretch", index: 0 });
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [status, setStatus] = useState<Status>("running");
    const [displayCountdown, setDisplayCountdown] = useState(0);
    const [displayPhase, setDisplayPhase] = useState<Phase>("stretch");
    const [displayIndex, setDisplayIndex] = useState(0);
    const [showInstructions, setShowInstructions] = useState(false);

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

    const getStretch = (idx: number) => STRETCHES.find((s) => s.id === items[idx]?.stretchId);

    const startTicking = () => {
        clearTimer();
        intervalRef.current = setInterval(() => {
            const t = T.current;
            t.countdown -= 1;

            if ((t.phase === "stretch" || t.phase === "bilateral") && t.countdown <= 3 && t.countdown > 0) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }

            if (t.countdown > 0) {
                setDisplayCountdown(t.countdown);
                return;
            }

            if (t.phase === "stretch") {
                const stretch = getStretch(t.index);
                if (stretch?.bilateral) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                    t.phase = "bilateral";
                    t.countdown = items[t.index].duration;
                    setDisplayPhase("bilateral");
                    setDisplayCountdown(items[t.index].duration);
                } else {
                    advanceToNext(t);
                }
            } else if (t.phase === "bilateral") {
                advanceToNext(t);
            } else {
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

        if (T.current.phase === "stretch" && currentStretchDef?.bilateral) {
            T.current = { ...T.current, phase: "bilateral", countdown: items[T.current.index].duration };
            setDisplayPhase("bilateral");
            setDisplayCountdown(items[T.current.index].duration);
            setStatus("running");
            startTicking();
            return;
        }

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
    const currentBendData = currentItem ? getBendDataForStretchId(currentItem.stretchId) : null;
    // For bend-only stretches (not in STRETCHES), use bend data name as display name
    const currentStretchName = currentStretch?.name ?? currentBendData?.name ?? currentItem?.stretchId ?? "";
    const isBilateral = currentStretch?.bilateral ?? false;
    const sideLabel = displayPhase === "bilateral" ? "OTHER SIDE" : (isBilateral ? "FIRST SIDE" : null);
    const currentPhoto = currentItem ? getImageForStretchId(currentItem.stretchId) : null;

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
                    onPress={() => nav.goBack()}
                >
                    <Text style={[styles.outlineBtnText, { color: colors.textSecondary }]}>Back</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // ─── Running / Paused ─────────────────────────────────────────────────────
    const accentColor = displayPhase === "bilateral" ? colors.secondary : colors.primary;

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            {/* Close button */}
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

            {/* ── Timer area ────────────────────────────────────────────────── */}
            <View style={styles.timerArea}>
                {displayPhase === "swap" ? (
                    /* SWAP PHASE */
                    <>
                        <Text style={[styles.swapLabel, { color: colors.secondary ?? colors.primary }]}>GET READY</Text>
                        <Text style={[styles.nextStretchName, { color: colors.textPrimary }]}>
                            {currentStretchName}
                        </Text>
                        {currentStretch && (
                            <Text style={[styles.nextStretchPart, { color: colors.textSecondary }]}>
                                {BODY_PART_LABELS[currentStretch.bodyPart]}
                            </Text>
                        )}
                        <CircularTimer
                            timeLeft={displayCountdown}
                            duration={SWAP_SECONDS}
                            timeLabel={`${displayCountdown}`}
                            subLabel="seconds"
                            size={312}
                            color={colors.secondary ?? colors.primary}
                            bgColor={colors.backgroundSecondary}
                            textColor={colors.textPrimary}
                            subTextColor={colors.textSecondary}
                            backgroundImage={currentPhoto}
                            showText={displayCountdown <= 5}
                            textOpacity={0.5}
                        />
                    </>
                ) : (
                    /* STRETCH / BILATERAL PHASE */
                    <>
                        <Text style={[styles.stretchNumber, { color: colors.textSecondary }]}>
                            {displayIndex + 1} / {items.length}
                        </Text>
                        <View style={styles.stretchNameRow}>
                            <Text style={[styles.stretchName, { color: colors.textPrimary }]}>
                                {currentStretchName}
                            </Text>
                            {currentBendData && (
                                <TouchableOpacity onPress={() => setShowInstructions((v) => !v)} hitSlop={12}>
                                    <Ionicons
                                        name={showInstructions ? "information-circle" : "information-circle-outline"}
                                        size={22}
                                        color={showInstructions ? accentColor : colors.textSecondary}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                        {sideLabel && (
                            <Text style={[styles.sideLabel, { color: accentColor }]}>{sideLabel}</Text>
                        )}
                        <CircularTimer
                            timeLeft={displayCountdown}
                            duration={currentItem?.duration ?? 0}
                            timeLabel={`${displayCountdown}`}
                            subLabel="seconds"
                            size={338}
                            color={accentColor}
                            bgColor={colors.backgroundSecondary}
                            textColor={colors.textPrimary}
                            subTextColor={colors.textSecondary}
                            backgroundImage={currentPhoto}
                            flipImage={displayPhase === "bilateral"}
                            showText={displayCountdown <= 5}
                            textOpacity={0.5}
                        />
                        {currentBendData && currentBendData.benefits.length > 0 && (
                            <View style={styles.benefitsRow}>
                                {currentBendData.benefits.slice(0, 3).map((b) => (
                                    <View key={b} style={[styles.benefitChip, { backgroundColor: colors.backgroundSecondary }]}>
                                        <Text style={[styles.benefitText, { color: colors.textSecondary }]}>{b}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </>
                )}
            </View>

            {/* ── Controls ──────────────────────────────────────────────────── */}
            <View style={styles.controls}>
                <TouchableOpacity
                    style={[styles.iconBtn, { backgroundColor: colors.backgroundSecondary }]}
                    onPress={handlePrev}
                >
                    <Ionicons name="play-skip-back" size={26} color={colors.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.iconBtnCenter, { backgroundColor: accentColor }]}
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

            {/* ── Instructions (toggled) ────────────────────────────────────── */}
            {showInstructions && currentBendData && displayPhase !== "swap" && (
                <ScrollView
                    style={[styles.instructionsPanel, { backgroundColor: colors.backgroundSecondary }]}
                    contentContainerStyle={styles.instructionsContent}
                    showsVerticalScrollIndicator={false}
                >
                    {currentBendData.instructions.map((step, i) => (
                        <View key={i} style={styles.stepRow}>
                            <View style={[styles.stepNum, { backgroundColor: accentColor }]}>
                                <Text style={styles.stepNumText}>{i + 1}</Text>
                            </View>
                            <Text style={[styles.stepText, { color: colors.textPrimary }]}>{step}</Text>
                        </View>
                    ))}
                    {currentBendData.tips.length > 0 && (
                        <View style={styles.tipsRow}>
                            {currentBendData.tips.map((tip, i) => (
                                <Text key={i} style={[styles.tipText, { color: colors.textSecondary }]}>· {tip}</Text>
                            ))}
                        </View>
                    )}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        paddingTop: 56,
        paddingBottom: 24,
        paddingHorizontal: 20,
        gap: 10,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        gap: 10,
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
        marginTop: 16,
    },
    dot: { borderRadius: 8 },
    timerArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        width: "100%",
    },
    stretchNumber: { fontSize: 14, letterSpacing: 0.5 },
    stretchNameRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stretchName: {
        fontSize: 26,
        fontWeight: "600",
        textAlign: "center",
        lineHeight: 32,
    },
    sideLabel: {
        fontSize: 13,
        fontWeight: "700",
        letterSpacing: 2,
        textTransform: "uppercase",
    },
    benefitsRow: {
        flexDirection: "row",
        gap: 6,
        flexWrap: "wrap",
        justifyContent: "center",
    },
    benefitChip: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    benefitText: { fontSize: 12, fontWeight: "500" },
    swapLabel: {
        fontSize: 16,
        fontWeight: "700",
        letterSpacing: 4,
    },
    nextStretchName: {
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
    },
    nextStretchPart: {
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    controls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 28,
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
    instructionsPanel: {
        width: "100%",
        maxHeight: 150,
        borderRadius: 14,
    },
    instructionsContent: {
        padding: 14,
        gap: 10,
    },
    stepRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
    },
    stepNum: {
        width: 22,
        height: 22,
        borderRadius: 11,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 1,
    },
    stepNumText: { color: "#fff", fontSize: 11, fontWeight: "700" },
    stepText: { flex: 1, fontSize: 13, lineHeight: 20 },
    tipsRow: { gap: 4, marginTop: 2 },
    tipText: { fontSize: 12, lineHeight: 18 },
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
