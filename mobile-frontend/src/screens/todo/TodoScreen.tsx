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
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { useTheme } from "~store/settingsStore";
import { Task, useTodoStore } from "~store/todoStore";

export const TodoScreen: FC = () => {
    const colors = useTheme();
    const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTodoStore();
    const [inputText, setInputText] = useState("");
    const inputRef = useRef<TextInput>(null);

    const handleAdd = () => {
        if (!inputText.trim()) return;
        addTask(inputText);
        setInputText("");
        inputRef.current?.focus();
    };

    const hasCompleted = tasks.some((t) => t.completed);
    const activeTasks = tasks.filter((t) => !t.completed);
    const completedTasks = tasks.filter((t) => t.completed);
    const sorted = [...activeTasks, ...completedTasks];

    const renderItem = ({ item }: { item: Task }) => (
        <View style={[styles.row, { borderBottomColor: colors.lightGrey }]}>
            <TouchableOpacity onPress={() => toggleTask(item.id)} style={styles.checkbox}>
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
                <Icon name="trash" size={15} color={colors.grey} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>To-Do</Text>
                {hasCompleted && (
                    <TouchableOpacity onPress={clearCompleted}>
                        <Text style={[styles.clearBtn, { color: colors.grey }]}>Clear done</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* Input */}
            <View style={[styles.inputRow, { backgroundColor: colors.backgroundSecondary }]}>
                <TextInput
                    ref={inputRef}
                    style={[styles.input, { color: colors.textPrimary }]}
                    placeholder="Add a task..."
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

            {/* List */}
            {sorted.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={[styles.emptyText, { color: colors.grey }]}>No tasks yet</Text>
                </View>
            ) : (
                <FlatList
                    data={sorted}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    keyboardShouldPersistTaps="handled"
                    onScrollBeginDrag={Keyboard.dismiss}
                    contentContainerStyle={styles.list}
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
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
    },
    clearBtn: {
        fontSize: 14,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 16,
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
        paddingHorizontal: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    checkbox: {
        marginRight: 12,
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    taskText: {
        fontSize: 16,
    },
    deleteBtn: {
        padding: 8,
        marginLeft: 8,
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
