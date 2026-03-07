import { FC, useEffect, useRef, useState } from "react";
import {
    Alert,
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "~store/settingsStore";
import { GROCERY_SECTION_ID, Recurrence, Task, useTodoStore } from "~store/todoStore";
import { useActivityStore } from "~store/activityStore";
import { useStreakStore } from "~store/streakStore";

const RECURRENCE_ICON: Record<Recurrence, string | null> = {
    none: null,
    daily: "refresh",
    weekly: "reload",
};

const RECURRENCE_LABEL: Record<Recurrence, string> = {
    none: "No repeat",
    daily: "Daily",
    weekly: "Weekly",
};

export const TodoScreen: FC = () => {
    const colors = useTheme();
    const { sections, tasks, addSection, deleteSection, addTask, toggleTask, deleteTask, setRecurrence, resetRecurring } = useTodoStore();
    const { logActivity } = useActivityStore();
    const { logActivity: logStreak } = useStreakStore();

    const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id ?? "default");
    const [inputText, setInputText] = useState("");
    const [showDone, setShowDone] = useState(true);
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        resetRecurring();
    }, []);

    const activeSection = sections.find((s) => s.id === activeSectionId) ?? sections[0];
    const effectiveId = activeSection?.id ?? sections[0]?.id ?? "default";
    const isFirstSection = effectiveId === sections[0]?.id;
    const isGrocery = effectiveId === GROCERY_SECTION_ID;

    const sectionTasks = tasks.filter(
        (t) => t.sectionId === effectiveId || (!t.sectionId && isFirstSection)
    );
    const activeTasks = sectionTasks.filter((t) => !t.completed);
    const completedTasks = sectionTasks.filter((t) => t.completed);
    const displayTasks = showDone ? [...activeTasks, ...completedTasks] : activeTasks;
    const hasCompleted = sectionTasks.some((t) => t.completed);

    const handleAdd = () => {
        if (!inputText.trim()) return;
        addTask(inputText, effectiveId);
        setInputText("");
        inputRef.current?.focus();
    };

    const handleToggle = (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (task && !task.completed) { logActivity("todo"); logStreak(); }
        toggleTask(id);
    };

    const handleAddSection = () => {
        Alert.prompt("New List", "Enter a name for the new list", (name) => {
            if (name?.trim()) addSection(name);
        });
    };

    const handleSectionLongPress = (id: string, name: string) => {
        if (id === GROCERY_SECTION_ID) return; // grocery is permanent
        if (sections.filter((s) => s.id !== GROCERY_SECTION_ID).length <= 1) {
            Alert.alert("Can't delete", "You need at least one list.");
            return;
        }
        Alert.alert(name, undefined, [
            {
                text: "Delete list",
                style: "destructive",
                onPress: () => {
                    const next = sections.find((s) => s.id !== id);
                    if (next) setActiveSectionId(next.id);
                    deleteSection(id);
                },
            },
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const handleTaskLongPress = (task: Task) => {
        if (isGrocery) return; // grocery items don't need recurrence
        const cycles: Recurrence[] = ["none", "daily", "weekly"];
        const currentIdx = cycles.indexOf(task.recurrence);
        const options = cycles.map((r) => ({
            text: r === task.recurrence ? `✓ ${RECURRENCE_LABEL[r]}` : RECURRENCE_LABEL[r],
            onPress: () => setRecurrence(task.id, r),
        }));
        Alert.alert(task.text, "Set repeat", [
            ...options,
            { text: "Cancel", style: "cancel" },
        ]);
    };

    const renderItem = ({ item }: { item: Task }) => (
        <Swipeable
            renderRightActions={() => (
                <TouchableOpacity
                    style={[styles.deleteAction, { backgroundColor: colors.error }]}
                    onPress={() => deleteTask(item.id)}
                >
                    <Icon name="trash" size={15} color="#fff" />
                    <Text style={styles.deleteActionText}>Delete</Text>
                </TouchableOpacity>
            )}
        >
            <TouchableOpacity
                activeOpacity={0.7}
                onLongPress={() => handleTaskLongPress(item)}
                delayLongPress={400}
                style={[styles.taskCard, { backgroundColor: colors.backgroundSecondary }]}
            >
                <TouchableOpacity onPress={() => handleToggle(item.id)} style={styles.checkbox}>
                    <View
                        style={[
                            styles.checkCircle,
                            {
                                borderColor: item.completed ? colors.primary : colors.grey,
                                backgroundColor: item.completed ? colors.primary : "transparent",
                            },
                        ]}
                    >
                        {item.completed && <Icon name="check" size={11} color={colors.white} />}
                    </View>
                </TouchableOpacity>

                <Text
                    style={[
                        styles.taskText,
                        {
                            color: item.completed ? colors.grey : colors.textPrimary,
                            textDecorationLine: item.completed ? "line-through" : "none",
                        },
                    ]}
                >
                    {item.text}
                </Text>

                {item.recurrence !== "none" && (
                    <Icon
                        name={RECURRENCE_ICON[item.recurrence] as any}
                        size={13}
                        color={colors.primary}
                        style={styles.recurrenceIcon}
                    />
                )}
            </TouchableOpacity>
        </Swipeable>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>To-Do</Text>
                {hasCompleted && (
                    <TouchableOpacity onPress={() => setShowDone((v) => !v)}>
                        <Text style={[styles.toggleDone, { color: colors.grey }]}>
                            {showDone ? "Hide done" : "Show done"}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Section tabs */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabsContent}
                style={styles.tabsScroll}
                keyboardShouldPersistTaps="handled"
            >
                {sections.map((section) => {
                    const active = section.id === effectiveId;
                    const grocery = section.id === GROCERY_SECTION_ID;
                    return (
                        <TouchableOpacity
                            key={section.id}
                            style={[
                                styles.tab,
                                { backgroundColor: active ? colors.primary : colors.backgroundSecondary },
                            ]}
                            onPress={() => setActiveSectionId(section.id)}
                            onLongPress={() => handleSectionLongPress(section.id, section.name)}
                            delayLongPress={500}
                        >
                            {grocery && (
                                <Icon
                                    name="basket"
                                    size={13}
                                    color={active ? colors.white : colors.textSecondary}
                                    style={styles.tabIcon}
                                />
                            )}
                            <Text style={[styles.tabText, { color: active ? colors.white : colors.textSecondary }]}>
                                {section.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
                <TouchableOpacity
                    style={[styles.tab, { backgroundColor: colors.backgroundSecondary }]}
                    onPress={handleAddSection}
                >
                    <Ionicons name="add" size={18} color={colors.textSecondary} />
                </TouchableOpacity>
            </ScrollView>

            {/* Input */}
            <View style={[styles.inputRow, { backgroundColor: colors.backgroundSecondary }]}>
                <TextInput
                    ref={inputRef}
                    style={[styles.input, { color: colors.textPrimary }]}
                    placeholder={isGrocery ? "Add item…" : `Add to ${activeSection?.name ?? "list"}…`}
                    placeholderTextColor={colors.grey}
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleAdd}
                    returnKeyType="done"
                    blurOnSubmit={false}
                />
                <TouchableOpacity
                    onPress={handleAdd}
                    style={[styles.addBtn, { backgroundColor: colors.primary, opacity: inputText.trim() ? 1 : 0.4 }]}
                >
                    <Icon name="plus" size={16} color={colors.white} />
                </TouchableOpacity>
            </View>

            {/* Task list */}
            {displayTasks.length === 0 ? (
                <View style={styles.empty}>
                    {isGrocery ? (
                        <View style={styles.groceryEmptyRow}>
                            <Text style={[styles.emptyText, { color: colors.grey }]}>Tap + or use</Text>
                            <Icon name="basket" size={15} color={colors.grey} />
                            <Text style={[styles.emptyText, { color: colors.grey }]}>in a recipe</Text>
                        </View>
                    ) : (
                        <Text style={[styles.emptyText, { color: colors.grey }]}>Nothing here yet</Text>
                    )}
                </View>
            ) : (
                <FlatList
                    data={displayTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    keyboardShouldPersistTaps="handled"
                    onScrollBeginDrag={Keyboard.dismiss}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        flexDirection: "row",
        alignItems: "baseline",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
    },
    toggleDone: {
        fontSize: 14,
    },
    tabsScroll: {
        flexGrow: 0,
    },
    tabsContent: {
        paddingHorizontal: 16,
        gap: 8,
        paddingBottom: 12,
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    tabIcon: {},
    tabText: {
        fontSize: 14,
        fontWeight: "600",
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 16,
        marginBottom: 12,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 4,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
    },
    addBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },
    list: {
        paddingHorizontal: 16,
        gap: 8,
        paddingBottom: 40,
    },
    taskCard: {
        borderRadius: 12,
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    checkbox: {},
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    taskText: {
        flex: 1,
        fontSize: 15,
    },
    recurrenceIcon: {
        opacity: 0.8,
    },
    deleteAction: {
        justifyContent: "center",
        alignItems: "center",
        width: 72,
        borderRadius: 12,
        gap: 4,
        marginLeft: 8,
    },
    deleteActionText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "600",
    },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        fontSize: 16,
    },
    groceryEmptyRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
});
