import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { FC, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "~store/settingsStore";
import { useRecipeStore } from "~store/recipeStore";

type Props = { navigation: any };

export const SpiceListScreen: FC<Props> = ({ navigation }) => {
    const colors = useTheme();
    const { spices, addSpice, removeSpice } = useRecipeStore();
    const [newSpice, setNewSpice] = useState("");
    const [search, setSearch] = useState("");

    const handleAdd = () => {
        const trimmed = newSpice.trim();
        if (!trimmed) return;
        if (spices.includes(trimmed)) {
            Alert.alert("Already exists", `"${trimmed}" is already in your spice list.`);
            return;
        }
        addSpice(trimmed);
        setNewSpice("");
    };

    const handleRemove = (name: string) => {
        Alert.alert("Remove spice", `Remove "${name}" from the list?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Remove", style: "destructive", onPress: () => removeSpice(name) },
        ]);
    };

    const filtered = search.trim()
        ? spices.filter((sp) => sp.toLowerCase().includes(search.toLowerCase()))
        : spices;

    const s = styles(colors);

    return (
        <View style={[s.container, { backgroundColor: colors.background }]}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Icon name="arrow-left" size={18} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={[s.title, { color: colors.textPrimary }]}>Spice List</Text>
                <View style={{ width: 34 }} />
            </View>

            <View style={[s.addRow, { backgroundColor: colors.backgroundSecondary }]}>
                <TextInput
                    style={[s.addInput, { color: colors.textPrimary }]}
                    placeholder="Add a spice..."
                    placeholderTextColor={colors.grey}
                    value={newSpice}
                    onChangeText={setNewSpice}
                    onSubmitEditing={handleAdd}
                    returnKeyType="done"
                    autoCapitalize="words"
                />
                <TouchableOpacity
                    onPress={handleAdd}
                    style={[s.addBtn, { backgroundColor: colors.primary, opacity: newSpice.trim() ? 1 : 0.4 }]}
                    disabled={!newSpice.trim()}
                >
                    <Icon name="plus" size={16} color={colors.white} />
                </TouchableOpacity>
            </View>

            <View style={[s.searchRow, { backgroundColor: colors.backgroundSecondary }]}>
                <Icon name="magnifier" size={13} color={colors.grey} style={{ marginRight: 6 }} />
                <TextInput
                    style={[s.searchInput, { color: colors.textPrimary }]}
                    placeholder="Search spices..."
                    placeholderTextColor={colors.grey}
                    value={search}
                    onChangeText={setSearch}
                    autoCorrect={false}
                    returnKeyType="search"
                />
                {search.length > 0 && (
                    <TouchableOpacity onPress={() => setSearch("")} hitSlop={8}>
                        <Icon name="close" size={12} color={colors.grey} />
                    </TouchableOpacity>
                )}
            </View>

            <Text style={[s.count, { color: colors.textSecondary }]}>
                {search.trim() ? `${filtered.length} of ${spices.length}` : `${spices.length}`} spices
            </Text>

            <FlatList
                data={filtered}
                keyExtractor={(sp) => sp}
                contentContainerStyle={s.list}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                    <View style={[s.row, { backgroundColor: colors.backgroundSecondary }]}>
                        <Text style={[s.spiceName, { color: colors.textPrimary }]}>{item}</Text>
                        <TouchableOpacity onPress={() => handleRemove(item)} hitSlop={8}>
                            <Icon name="close" size={13} color={colors.grey} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = (colors: any) => StyleSheet.create({
    container: { flex: 1, paddingTop: 60 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backBtn: { padding: 4 },
    title: { fontSize: 24, fontWeight: "700" },
    addRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        borderRadius: 12,
        paddingLeft: 14,
        paddingRight: 6,
        paddingVertical: 6,
        marginBottom: 12,
        gap: 8,
    },
    addInput: { flex: 1, fontSize: 15, paddingVertical: 6 },
    addBtn: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: "center",
        justifyContent: "center",
    },
    searchRow: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: 8,
    },
    searchInput: { flex: 1, fontSize: 14, paddingVertical: 9 },
    count: { fontSize: 13, paddingHorizontal: 20, marginBottom: 8 },
    list: { paddingHorizontal: 20, gap: 8, paddingBottom: 40 },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
    },
    spiceName: { fontSize: 15 },
});
