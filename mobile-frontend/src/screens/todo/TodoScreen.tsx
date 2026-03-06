import { FC, useRef, useState } from "react";
import {
    Alert,
    Keyboard,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from "react-native-draggable-flatlist";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "~store/settingsStore";
import { Task, useTodoStore } from "~store/todoStore";
import { useActivityStore } from "~store/activityStore";

export const TodoScreen: FC = () => {
    const colors = useTheme();
    const { sections, tasks, addSection, deleteSection, addTask, toggleTask, deleteTask, reorderTasks } = useTodoStore();
    const { logActivity } = useActivityStore();

    const [activeSectionId, setActiveSectionId] = useState<string>(sections[0]?.id ?? "default");
    const [inputText, setInputText] = useState("");
    const [showDone, setShowDone] = useState(true);
    const inputRef = useRef<TextInput>(null);

    const activeSection = sections.find((s) => s.id === activeSectionId) ?? sections[0];
    const effectiveId = activeSection?.id ?? sections[0]?.id ?? "default";
    const isFirstSection = effectiveId === sections[0]?.id;

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
        if (task && !task.completed) logActivity("todo");
        toggleTask(id);
    };

    const handleAddSection = () => {
        Alert.prompt("New List", "Enter a name for the new list", (name) => {
            if (name?.trim()) addSection(name);
        });
    };

    const handleSectionLongPress = (id: string, name: string) => {
        if (sections.length <= 1) {
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

    const renderItem = ({ item, drag, isActive }: RenderItemParams<Task>) => (
        <ScaleDecorator>
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
                <View style={[styles.taskCard, { backgroundColor: colors.backgroundSecondary, opacity: isActive ? 0.9 : 1 }]}>
                    {/* Drag handle */}
                    <TouchableOpacity onLongPress={drag} style={styles.dragHandle}>
                        <Ionicons name="reorder-three" size={22} color={colors.lightGrey} />
                    </TouchableOpacity>

                    {/* Checkbox */}
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

                    {/* Text */}
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
                </View>
            </Swipeable>
        </ScaleDecorator>
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
                    placeholder={`Add to ${activeSection?.name ?? "list"}…`}
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
                    <Text style={[styles.emptyText, { color: colors.grey }]}>Nothing here yet</Text>
                </View>
            ) : (
                <DraggableFlatList
                    data={displayTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    onDragEnd={({ data }) => reorderTasks(effectiveId, data)}
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
    },
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
    dragHandle: {
        paddingHorizontal: 2,
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
});
