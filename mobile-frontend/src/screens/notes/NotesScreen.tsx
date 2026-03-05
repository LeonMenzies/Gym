import { FC, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useNotesStore, Note } from "~store/notesStore";
import { useTheme } from "~store/settingsStore";

const timeAgo = (ts: number): string => {
    const diff = Date.now() - ts;
    const m = Math.floor(diff / 60000);
    if (m < 1) return "Just now";
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d === 1) return "Yesterday";
    return `${d}d ago`;
};

type Props = {
    navigation: any;
};

export const NotesScreen: FC<Props> = ({ navigation }) => {
    const colors = useTheme();
    const { notes, addNote } = useNotesStore();
    const [query, setQuery] = useState("");

    const filtered = query.trim()
        ? notes.filter(
              (n) =>
                  n.title.toLowerCase().includes(query.toLowerCase()) ||
                  n.body.toLowerCase().includes(query.toLowerCase())
          )
        : notes;

    const handleNew = () => {
        const id = addNote();
        navigation.navigate("NoteEditor", { noteId: id });
    };

    const renderItem = ({ item }: { item: Note }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.backgroundSecondary }]}
            onPress={() => navigation.navigate("NoteEditor", { noteId: item.id })}
            activeOpacity={0.7}
        >
            <View style={styles.cardContent}>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]} numberOfLines={1}>
                    {item.title || "Untitled"}
                </Text>
                {item.body.length > 0 && (
                    <Text style={[styles.cardPreview, { color: colors.grey }]} numberOfLines={2}>
                        {item.body}
                    </Text>
                )}
            </View>
            <Text style={[styles.cardDate, { color: colors.grey }]}>{timeAgo(item.updatedAt)}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>Notes</Text>
                <TouchableOpacity onPress={handleNew} style={[styles.newBtn, { backgroundColor: colors.primary }]}>
                    <Icon name="plus" size={18} color={colors.white} />
                </TouchableOpacity>
            </View>

            <View style={[styles.searchRow, { backgroundColor: colors.backgroundSecondary }]}>
                <Icon name="magnifier" size={14} color={colors.grey} style={styles.searchIcon} />
                <TextInput
                    style={[styles.searchInput, { color: colors.textPrimary }]}
                    placeholder="Search notes..."
                    placeholderTextColor={colors.grey}
                    value={query}
                    onChangeText={setQuery}
                    returnKeyType="search"
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={() => setQuery("")}>
                        <Icon name="close" size={14} color={colors.grey} />
                    </TouchableOpacity>
                )}
            </View>

            {filtered.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={[styles.emptyText, { color: colors.grey }]}>
                        {query ? "No matching notes" : "No notes yet"}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    keyboardShouldPersistTaps="handled"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
    },
    newBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: "center",
        justifyContent: "center",
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        marginBottom: 16,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 2,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        paddingVertical: 10,
    },
    list: {
        paddingHorizontal: 20,
        gap: 10,
    },
    card: {
        borderRadius: 12,
        padding: 14,
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    cardContent: {
        flex: 1,
        gap: 4,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    cardPreview: {
        fontSize: 13,
        lineHeight: 18,
    },
    cardDate: {
        fontSize: 12,
        paddingTop: 2,
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
