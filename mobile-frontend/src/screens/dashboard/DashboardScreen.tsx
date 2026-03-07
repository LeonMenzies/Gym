import { Ionicons } from "@expo/vector-icons";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { FC, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "~store/settingsStore";
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

type Props = { navigation: any };

export const DashboardScreen: FC<Props> = ({ navigation }) => {
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

    const summaryStats: { label: string; value: number; color: string }[] = [
        { label: "Stretch days", value: stretchCount, color: ACTIVITY_COLORS.stretch },
        { label: "Gym days",     value: gymCount,     color: ACTIVITY_COLORS.gym },
        { label: "To-Do days",   value: todoCount,    color: ACTIVITY_COLORS.todo },
    ];

    return (
        <View style={[styles.screen, { backgroundColor: colors.background }]}>
            <View style={styles.headerRow}>
                <Text style={[styles.header, { color: colors.textPrimary }]}>Dashboard</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Settings")}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Icon name="settings" size={22} color={colors.textSecondary} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                {/* Streak card */}
                <View style={[styles.streakCard, { backgroundColor: colors.backgroundSecondary }]}>
                    <View style={styles.streakMain}>
                        <View style={[styles.streakIconWrap, { backgroundColor: colors.background }]}>
                            <Ionicons name="flame" size={26} color="#ff6b35" />
                        </View>
                        <View>
                            <Text style={[styles.streakCount, { color: colors.textPrimary }]}>{currentStreak}</Text>
                            <Text style={[styles.streakLabel, { color: colors.textSecondary }]}>day streak</Text>
                        </View>
                    </View>
                    {longestStreak > 0 && (
                        <View style={[styles.bestBadge, { backgroundColor: colors.background }]}>
                            <Text style={[styles.bestText, { color: colors.textSecondary }]}>Best: {longestStreak} days</Text>
                        </View>
                    )}
                </View>

                {/* Calendar card */}
                <View style={[styles.card, { backgroundColor: colors.backgroundSecondary }]}>
                    <View style={styles.monthRow}>
                        <TouchableOpacity onPress={prevMonth} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Ionicons name="chevron-back" size={22} color={colors.textSecondary} />
                        </TouchableOpacity>
                        <Text style={[styles.monthLabel, { color: colors.textPrimary }]}>
                            {MONTH_NAMES[month]} {year}
                        </Text>
                        <TouchableOpacity onPress={nextMonth} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                            <Ionicons name="chevron-forward" size={22} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dowRow}>
                        {DAYS.map((d) => (
                            <Text key={d} style={[styles.dowLabel, { color: colors.textSecondary }]}>{d}</Text>
                        ))}
                    </View>

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

                {/* Monthly summary — only rendered when there are applicable components */}
                {summaryStats.length > 0 && (
                    <View style={[styles.card, { backgroundColor: colors.backgroundSecondary }]}>
                        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                            {MONTH_NAMES[month]} summary
                        </Text>
                        <View style={styles.statsRow}>
                            {summaryStats.map((s) => (
                                <StatBox
                                    key={s.label}
                                    label={s.label}
                                    value={s.value}
                                    color={s.color}
                                    textColor={colors.textPrimary}
                                    subColor={colors.textSecondary}
                                />
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const StatBox: FC<{ label: string; value: number; color: string; textColor: string; subColor: string }> = ({
    label, value, color, textColor, subColor,
}) => (
    <View style={styles.statBox}>
        <View style={[styles.statAccent, { backgroundColor: color }]} />
        <Text style={[styles.statValue, { color: textColor }]}>{value}</Text>
        <Text style={[styles.statLabel, { color: subColor }]}>{label}</Text>
    </View>
);

const styles = StyleSheet.create({
    screen: { flex: 1 },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 64,
        paddingHorizontal: 20,
        paddingBottom: 8,
    },
    header: {
        fontSize: 28,
        fontWeight: "700",
    },
    scroll: {
        padding: 16,
        gap: 14,
        paddingBottom: 40,
    },
    streakCard: {
        borderRadius: 18,
        padding: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    streakMain: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    streakIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    streakCount: {
        fontSize: 36,
        fontWeight: "700",
        lineHeight: 40,
    },
    streakLabel: {
        fontSize: 13,
        fontWeight: "500",
    },
    bestBadge: {
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    bestText: {
        fontSize: 13,
        fontWeight: "500",
    },
    card: {
        borderRadius: 18,
        padding: 18,
        gap: 14,
    },
    monthRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    monthLabel: {
        fontSize: 17,
        fontWeight: "600",
    },
    dowRow: {
        flexDirection: "row",
    },
    dowLabel: {
        flex: 1,
        textAlign: "center",
        fontSize: 11,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    weekRow: {
        flexDirection: "row",
    },
    dayCell: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 3,
        minHeight: 52,
        gap: 3,
    },
    dayCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    dayNum: {
        fontSize: 14,
        fontWeight: "500",
    },
    dotsRow: {
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        height: 7,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    sectionTitle: {
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        fontWeight: "600",
    },
    statsRow: {
        flexDirection: "row",
        gap: 10,
    },
    statBox: {
        flex: 1,
        alignItems: "center",
        gap: 4,
        paddingVertical: 12,
    },
    statAccent: {
        width: 28,
        height: 4,
        borderRadius: 2,
        marginBottom: 4,
    },
    statValue: {
        fontSize: 32,
        fontWeight: "700",
    },
    statLabel: {
        fontSize: 11,
        textAlign: "center",
    },
});
