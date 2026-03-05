import { FC, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useNotesStore } from "~store/notesStore";
import { useTheme } from "~store/settingsStore";

type Props = {
    navigation: any;
    route: { params: { noteId: string } };
};

export const NoteEditorScreen: FC<Props> = ({ navigation, route }) => {
    const { noteId } = route.params;
    const colors = useTheme();
    const { notes, updateNote, deleteNote } = useNotesStore();

    const note = notes.find((n) => n.id === noteId);
    const [title, setTitle] = useState(note?.title ?? "");
    const [body, setBody] = useState(note?.body ?? "");

    // Auto-save on every change
    useEffect(() => {
        updateNote(noteId, title, body);
    }, [title, body]);

    const handleDelete = () => {
        Alert.alert("Delete note", "This cannot be undone.", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    deleteNote(noteId);
                    navigation.goBack();
                },
            },
        ]);
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                    <Icon name="arrow-left" size={18} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={styles.headerBtn}>
                    <Icon name="trash" size={18} color={colors.grey} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                keyboardDismissMode="interactive"
            >
                <TextInput
                    style={[styles.titleInput, { color: colors.textPrimary }]}
                    placeholder="Title"
                    placeholderTextColor={colors.grey}
                    value={title}
                    onChangeText={setTitle}
                    multiline
                    returnKeyType="next"
                    blurOnSubmit={false}
                />
                <View style={[styles.divider, { backgroundColor: colors.lightGrey }]} />
                <TextInput
                    style={[styles.bodyInput, { color: colors.textPrimary }]}
                    placeholder="Start writing..."
                    placeholderTextColor={colors.grey}
                    value={body}
                    onChangeText={setBody}
                    multiline
                    textAlignVertical="top"
                    scrollEnabled={false}
                />
            </ScrollView>

            {/* Word count */}
            <View style={[styles.footer, { borderTopColor: colors.lightGrey }]}>
                <Text style={[styles.wordCount, { color: colors.grey }]}>
                    {body.trim() ? body.trim().split(/\s+/).length : 0} words
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 56,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    headerBtn: {
        padding: 8,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    titleInput: {
        fontSize: 26,
        fontWeight: "700",
        paddingVertical: 12,
        lineHeight: 34,
    },
    divider: {
        height: 1,
        marginBottom: 12,
    },
    bodyInput: {
        fontSize: 16,
        lineHeight: 26,
        paddingTop: 4,
        minHeight: 300,
    },
    footer: {
        borderTopWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "flex-end",
    },
    wordCount: {
        fontSize: 12,
    },
});
