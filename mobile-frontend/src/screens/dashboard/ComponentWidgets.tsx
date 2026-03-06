import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "~store/settingsStore";
import { useTodoStore } from "~store/todoStore";
import { useNotesStore } from "~store/notesStore";
import { useRecipeStore } from "~store/recipeStore";
import { useStretchStore } from "~store/stretchStore";
import { useActivityStore, todayStr } from "~store/activityStore";
import { ComponentId } from "~store/componentStore";

// ─── Shared sub-components ────────────────────────────────────────────────────

const WidgetStat: FC<{ value: string | number; label: string; accent: string }> = ({ value, label, accent }) => {
    const colors = useTheme();
    return (
        <View style={styles.stat}>
            <View style={[styles.statAccent, { backgroundColor: accent }]} />
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>{value}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{label}</Text>
        </View>
    );
};

const WidgetCard: FC<{ title: string; icon: string; accent: string; children: React.ReactNode }> = ({
    title, icon, accent, children,
}) => {
    const colors = useTheme();
    return (
        <View style={[styles.card, { backgroundColor: colors.backgroundSecondary }]}>
            <View style={styles.cardHeader}>
                <View style={[styles.cardDot, { backgroundColor: accent }]} />
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{title}</Text>
                <Text style={styles.cardIcon}>{icon}</Text>
            </View>
            <View style={styles.statsRow}>{children}</View>
        </View>
    );
};

// ─── Individual widgets ───────────────────────────────────────────────────────

export const TodoWidget: FC = () => {
    const { tasks } = useTodoStore();
    const { log } = useActivityStore();
    const pending = tasks.filter((t) => !t.completed).length;
    const total = tasks.length;
    const doneToday = log[todayStr()]?.includes("todo") ?? false;

    return (
        <WidgetCard title="To-Do" icon="✅" accent="#5b9e6e">
            <WidgetStat value={pending} label="pending" accent="#5b9e6e" />
            <WidgetStat value={total - pending} label="done" accent="#5b9e6e" />
            <WidgetStat value={doneToday ? "Yes" : "No"} label="today" accent="#5b9e6e" />
        </WidgetCard>
    );
};

export const TimerWidget: FC = () => {
    const { routines } = useStretchStore();
    const { log } = useActivityStore();
    const today = todayStr();
    const stretchToday = log[today]?.includes("stretch") ?? false;
    const gymToday = log[today]?.includes("gym") ?? false;

    return (
        <WidgetCard title="Timer" icon="⏱️" accent="#4a90d9">
            <WidgetStat value={routines.length} label="routines" accent="#4a90d9" />
            <WidgetStat value={stretchToday ? "Done" : "—"} label="stretch" accent="#4a90d9" />
            <WidgetStat value={gymToday ? "Done" : "—"} label="gym" accent="#4a90d9" />
        </WidgetCard>
    );
};

export const NotesWidget: FC = () => {
    const { blocks } = useNotesStore();

    return (
        <WidgetCard title="Notes" icon="📝" accent="#9b6dbd">
            <WidgetStat value={blocks.length} label="notes" accent="#9b6dbd" />
        </WidgetCard>
    );
};

export const RecipesWidget: FC = () => {
    const { recipes } = useRecipeStore();

    return (
        <WidgetCard title="Recipes" icon="🍳" accent="#d4824a">
            <WidgetStat value={recipes.length} label="recipes" accent="#d4824a" />
        </WidgetCard>
    );
};

// ─── Registry map ─────────────────────────────────────────────────────────────

export const COMPONENT_WIDGETS: Record<ComponentId, FC> = {
    todo: TodoWidget,
    timer: TimerWidget,
    notes: NotesWidget,
    recipes: RecipesWidget,
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    card: {
        borderRadius: 18,
        padding: 16,
        gap: 12,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    cardDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: "700",
        flex: 1,
    },
    cardIcon: {
        fontSize: 18,
    },
    statsRow: {
        flexDirection: "row",
        gap: 8,
    },
    stat: {
        flex: 1,
        alignItems: "center",
        gap: 3,
    },
    statAccent: {
        width: 20,
        height: 3,
        borderRadius: 2,
        marginBottom: 2,
    },
    statValue: {
        fontSize: 22,
        fontWeight: "700",
    },
    statLabel: {
        fontSize: 11,
        textAlign: "center",
    },
});
