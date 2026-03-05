import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useRef, useState } from "react";
import {
    FlatList,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { NotesScreen } from "~screens/notes/NotesScreen";
import { useTheme } from "~store/settingsStore";
import { Task, useTodoStore } from "~store/todoStore";
import { useActivityStore } from "~store/activityStore";
import { ListsStackParamList } from "~navigation/ListsNavigator";

type Nav = NativeStackNavigationProp<ListsStackParamList, "ListsHome">;
type Mode = "todo" | "notes";

// ─── Todo content ─────────────────────────────────────────────────────────────

const TodoContent: FC = () => {
    const colors = useTheme();
    const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTodoStore();
    const { logActivity } = useActivityStore();
    const [inputText, setInputText] = useState("");
    const inputRef = useRef<TextInput>(null);

    const handleAdd = () => {
        if (!inputText.trim()) return;
        addTask(inputText);
        setInputText("");
        inputRef.current?.focus();
    };

    const handleToggle = (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (task && !task.completed) logActivity("todo");
        toggleTask(id);
    };

    const hasCompleted = tasks.some((t) => t.completed);
    const active = tasks.filter((t) => !t.completed);
    const completed = tasks.filter((t) => t.completed);
    const sorted = [...active, ...completed];

    const renderItem = ({ item }: { item: Task }) => (
        <View style={[styles.row, { borderBottomColor: colors.lightGrey }]}>
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
                        flex: 1,
                    },
                ]}
            >
                {item.text}
            </Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteBtn}>
                <Icon name="close" size={14} color={colors.grey} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.todoContainer}>
            {tasks.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={[styles.emptyText, { color: colors.grey }]}>No tasks yet</Text>
                </View>
            ) : (
                <FlatList
                    data={sorted}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.taskList}
                />
            )}

            {hasCompleted && (
                <TouchableOpacity
                    style={styles.clearBtn}
                    onPress={clearCompleted}
                >
                    <Text style={[styles.clearBtnText, { color: colors.textSecondary }]}>
                        Clear completed
                    </Text>
                </TouchableOpacity>
            )}

            <View style={[styles.inputBar, { backgroundColor: colors.backgroundSecondary }]}>
                <TextInput
                    ref={inputRef}
                    style={[styles.input, { color: colors.textPrimary }]}
                    placeholder="Add a task…"
                    placeholderTextColor={colors.grey}
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={handleAdd}
                    returnKeyType="done"
                    blurOnSubmit={false}
                />
                <TouchableOpacity
                    onPress={handleAdd}
                    style={[styles.addBtn, { backgroundColor: colors.primary }]}
                    disabled={!inputText.trim()}
                >
                    <Icon name="plus" size={18} color={colors.white} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// ─── Combined screen ──────────────────────────────────────────────────────────

export const ListsScreen: FC = () => {
    const colors = useTheme();
    const navigation = useNavigation<Nav>();
    const [mode, setMode] = useState<Mode>("todo");

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.toggleContainer}>
                <View style={[styles.togglePill, { backgroundColor: colors.backgroundSecondary }]}>
                    <TouchableOpacity
                        style={mode === "todo" ? [styles.toggleBtn, { backgroundColor: colors.primary }] : styles.toggleBtn}
                        onPress={() => { Keyboard.dismiss(); setMode("todo"); }}
                    >
                        <Text style={[styles.toggleText, { color: mode === "todo" ? colors.white : colors.textSecondary }]}>
                            To-Do
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={mode === "notes" ? [styles.toggleBtn, { backgroundColor: colors.primary }] : styles.toggleBtn}
                        onPress={() => { Keyboard.dismiss(); setMode("notes"); }}
                    >
                        <Text style={[styles.toggleText, { color: mode === "notes" ? colors.white : colors.textSecondary }]}>
                            Notes
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                {mode === "todo"
                    ? <TodoContent />
                    : <NotesScreen navigation={navigation} />
                }
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

    // ── Todo styles ──
    todoContainer: { flex: 1 },
    taskList: { paddingBottom: 8 },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    checkbox: { marginRight: 14 },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    taskText: { fontSize: 16 },
    deleteBtn: { padding: 6 },
    clearBtn: {
        alignItems: "center",
        paddingVertical: 12,
    },
    clearBtnText: { fontSize: 14 },
    inputBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 10,
        paddingBottom: 28,
        gap: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 8,
    },
    addBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
    },

    // ── Shared ──
    empty: { flex: 1, alignItems: "center", justifyContent: "center" },
    emptyText: { fontSize: 16 },
});
