import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "~store/settingsStore";
import { useRouter } from "expo-router";
import { ActivityType, todayStr, useActivityStore } from "~store/activityStore";
import { useStreakStore } from "~store/streakStore";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const ACTIVITY_COLORS: Record<ActivityType, string> = {
    stretch: "#c8ac97",
    todo:    "#5b9e6e",
    gym:     "#4a90d9",
};

function dateStr(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function buildCalendarCells(year: number, month: number): (number | null)[] {
    const firstDow = new Date(year, month, 1).getDay();
    const offset = (firstDow + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
}

export const DashboardScreen: FC = () => {
    const router = useRouter();
    const colors = useTheme();
    const { log } = useActivityStore();
    const { currentStreak, longestStreak } = useStreakStore();

    const now = new Date();
    const [year, setYear] = useState(now.getFullYear());
    const [month, setMonth] = useState(now.getMonth());

    const today = todayStr();

    const prevMonth = () => {
        if (month === 0) { setMonth(11); setYear(y => y - 1); }
        else setMonth(m => m - 1);
    };
    const nextMonth = () => {
        if (month === 11) { setMonth(0); setYear(y => y + 1); }
        else setMonth(m => m + 1);
    };

    const cells = buildCalendarCells(year, month);
    const weeks: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

    const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
    const activeDays = Object.entries(log).filter(([k]) => k.startsWith(monthPrefix));
    const stretchCount = activeDays.filter(([, v]) => v.includes("stretch")).length;
    const todoCount    = activeDays.filter(([, v]) => v.includes("todo")).length;
    const gymCount     = activeDays.filter(([, v]) => v.includes("gym")).length;

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={[styles.header, { color: colors.textPrimary }]}>Dashboard</Text>
                <TouchableOpacity
                    onPress={() => router.push("/dashboard/settings")}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Icon name="settings" size={22} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>

            {/* Streak card */}
            <View style={[styles.streakCard, { backgroundColor: colors.backgroundSecondary }]}>
                <View style={styles.streakMain}>
                    <View style={[styles.streakIconWrap, { backgroundColor: colors.background }]}>
                        <Ionicons name="flame" size={22} color="#ff6b35" />
                    </View>
                    <View>
                        <Text style={[styles.streakCount, { color: colors.textPrimary }]}>{currentStreak}</Text>
                        <Text style={[styles.streakLabel, { color: colors.textSecondary }]}>day streak</Text>
                    </View>
                </View>
                {longestStreak > 0 && (
                    <View style={[styles.bestBadge, { backgroundColor: colors.background }]}>
                        <Text style={[styles.bestText, { color: colors.textSecondary }]}>Best: {longestStreak}</Text>
                    </View>
                )}
            </View>

            {/* Calendar card — flex: 1 to fill remaining space */}
            <View style={[styles.calendarCard, { backgroundColor: colors.backgroundSecondary }]}>
                <View style={styles.monthRow}>
                    <TouchableOpacity onPress={prevMonth} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <Text style={[styles.monthLabel, { color: colors.textPrimary }]}>
                        {MONTH_NAMES[month]} {year}
                    </Text>
                    <TouchableOpacity onPress={nextMonth} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.dowRow}>
                    {DAYS.map((d) => (
                        <Text key={d} style={[styles.dowLabel, { color: colors.textSecondary }]}>{d}</Text>
                    ))}
                </View>

                <View style={styles.weeksContainer}>
                    {weeks.map((week, wi) => (
                        <View key={wi} style={styles.weekRow}>
                            {week.map((day, di) => {
                                if (!day) return <View key={di} style={styles.dayCell} />;
                                const ds = dateStr(year, month, day);
                                const activities = log[ds] ?? [];
                                const isToday = ds === today;
                                return (
                                    <View key={di} style={styles.dayCell}>
                                        <View style={[
                                            styles.dayCircle,
                                            isToday && { backgroundColor: colors.primary },
                                        ]}>
                                            <Text style={[
                                                styles.dayNum,
                                                { color: isToday ? colors.white : colors.textPrimary },
                                            ]}>
                                                {day}
                                            </Text>
                                        </View>
                                        {activities.length > 0 && (
                                            <View style={styles.dotsRow}>
                                                {(["stretch", "todo", "gym"] as ActivityType[]).map((type) =>
                                                    activities.includes(type) ? (
                                                        <View
                                                            key={type}
                                                            style={[styles.dot, { backgroundColor: ACTIVITY_COLORS[type] }]}
                                                        />
                                                    ) : null
                                                )}
                                            </View>
                                        )}
                                    </View>
                                );
                            })}
                        </View>
                    ))}
                </View>
            </View>

            {/* Summary stats */}
            <View style={[styles.statsCard, { backgroundColor: colors.backgroundSecondary }]}>
                <Text style={[styles.statsTitle, { color: colors.textSecondary }]}>
                    {MONTH_NAMES[month]}
                </Text>
                <View style={styles.statsRow}>
                    {[
                        { label: "Stretch", value: stretchCount, color: ACTIVITY_COLORS.stretch },
                        { label: "Gym",     value: gymCount,     color: ACTIVITY_COLORS.gym },
                        { label: "To-Do",   value: todoCount,    color: ACTIVITY_COLORS.todo },
                    ].map((s) => (
                        <View key={s.label} style={styles.statBox}>
                            <View style={[styles.statAccent, { backgroundColor: s.color }]} />
                            <Text style={[styles.statValue, { color: colors.textPrimary }]}>{s.value}</Text>
                            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{s.label}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 16,
        gap: 12,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 64,
        paddingBottom: 4,
    },
    header: {
        fontSize: 28,
        fontWeight: "700",
    },
    // Streak
    streakCard: {
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    streakMain: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    streakIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    streakCount: {
        fontSize: 28,
        fontWeight: "700",
        lineHeight: 32,
    },
    streakLabel: {
        fontSize: 12,
        fontWeight: "500",
    },
    bestBadge: {
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    bestText: {
        fontSize: 12,
        fontWeight: "500",
    },
    // Calendar — grows to fill space
    calendarCard: {
        flex: 1,
        borderRadius: 16,
        padding: 14,
        gap: 8,
    },
    monthRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    monthLabel: {
        fontSize: 15,
        fontWeight: "600",
    },
    dowRow: {
        flexDirection: "row",
    },
    dowLabel: {
        flex: 1,
        textAlign: "center",
        fontSize: 10,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    weeksContainer: {
        flex: 1,
        gap: 0,
    },
    weekRow: {
        flex: 1,
        flexDirection: "row",
    },
    dayCell: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
    },
    dayCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    dayNum: {
        fontSize: 13,
        fontWeight: "500",
    },
    dotsRow: {
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        height: 6,
    },
    dot: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
    },
    // Stats
    statsCard: {
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    statsTitle: {
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        fontWeight: "600",
    },
    statsRow: {
        flexDirection: "row",
    },
    statBox: {
        flex: 1,
        alignItems: "center",
        gap: 3,
    },
    statAccent: {
        width: 24,
        height: 3,
        borderRadius: 2,
    },
    statValue: {
        fontSize: 24,
        fontWeight: "700",
    },
    statLabel: {
        fontSize: 11,
        textAlign: "center",
    },
});
