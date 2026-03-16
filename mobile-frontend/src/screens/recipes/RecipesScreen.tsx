import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { FC, useState } from "react";
import { Alert, FlatList, KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTheme } from "~store/settingsStore";
import { Recipe, RecipeType, useRecipeStore } from "~store/recipeStore";

type Props = {
    navigation: any;
};

function metaLabel(r: Recipe): string {
    const parts: string[] = [];
    if (r.prepMins || r.cookMins) parts.push(`${r.prepMins + r.cookMins} min`);
    if (r.servings) parts.push(`serves ${r.servings}`);
    return parts.join(" · ");
}

export const RecipesScreen: FC<Props> = ({ navigation }) => {
    const colors = useTheme();
    const { recipes, addRecipe, importRecipes } = useRecipeStore();
    const [query, setQuery] = useState("");
    const [tab, setTab] = useState<RecipeType>("recipe");
    const [showImport, setShowImport] = useState(false);
    const [jsonText, setJsonText] = useState("");

    const handleImport = () => {
        let parsed: unknown;
        try {
            parsed = JSON.parse(jsonText.trim());
        } catch {
            Alert.alert("Invalid JSON", "The text is not valid JSON.");
            return;
        }

        const items = Array.isArray(parsed) ? parsed : [parsed];
        const { imported, skipped } = importRecipes(items);
        const msg = imported > 0
            ? `Imported ${imported} recipe${imported !== 1 ? "s" : ""}${skipped > 0 ? ` (${skipped} skipped)` : ""}.`
            : "No valid recipes found.";
        Alert.alert("Import complete", msg);
        setShowImport(false);
        setJsonText("");
    };

    const tabRecipes = recipes.filter((r) => (r.type ?? "recipe") === tab);
    const filtered = query.trim()
        ? tabRecipes.filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
        : tabRecipes;

    const handleNew = () => {
        const id = addRecipe(tab);
        navigation.navigate("RecipeEditor", { recipeId: id });
    };

    const renderItem = ({ item }: { item: Recipe }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: colors.backgroundSecondary }]}
            onPress={() => navigation.navigate("RecipeEditor", { recipeId: item.id })}
            activeOpacity={0.75}
        >
            <View style={styles.cardBody}>
                <Text style={[styles.cardName, { color: colors.textPrimary }]} numberOfLines={1}>
                    {item.name || (item.type === "seasoning" ? "Untitled seasoning" : "Untitled recipe")}
                </Text>
                {item.description.length > 0 && (
                    <Text style={[styles.cardDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                        {item.description}
                    </Text>
                )}
                <View style={styles.cardMeta}>
                    {item.ingredients.length > 0 && (
                        <View style={[styles.metaChip, { backgroundColor: colors.background }]}>
                            <Text style={[styles.metaChipText, { color: colors.textSecondary }]}>
                                {item.ingredients.length} ingredient{item.ingredients.length !== 1 ? "s" : ""}
                            </Text>
                        </View>
                    )}
                    {item.steps.length > 0 && (
                        <View style={[styles.metaChip, { backgroundColor: colors.background }]}>
                            <Text style={[styles.metaChipText, { color: colors.textSecondary }]}>
                                {item.steps.length} step{item.steps.length !== 1 ? "s" : ""}
                            </Text>
                        </View>
                    )}
                    {(item.prepMins > 0 || item.cookMins > 0) && (
                        <View style={[styles.metaChip, { backgroundColor: colors.background }]}>
                            <Text style={[styles.metaChipText, { color: colors.textSecondary }]}>
                                {metaLabel(item)}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            <Icon name="arrow-right" size={14} color={colors.grey} />
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.textPrimary }]}>Recipes</Text>
                <View style={styles.headerRight}>
                    {tab === "seasoning" && (
                        <TouchableOpacity onPress={() => navigation.navigate("SpiceList")} style={styles.importBtn} hitSlop={8}>
                            <Icon name="settings" size={18} color={colors.textSecondary} />
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => setShowImport(true)} style={styles.importBtn} hitSlop={8}>
                        <Icon name="cloud-upload" size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.segmentRow, { backgroundColor: colors.backgroundSecondary }]}>
                {(["recipe", "seasoning"] as RecipeType[]).map((t) => (
                    <TouchableOpacity
                        key={t}
                        style={[styles.segmentBtn, tab === t && { backgroundColor: colors.primary }]}
                        onPress={() => { setTab(t); setQuery(""); }}
                    >
                        <Text style={[styles.segmentText, { color: tab === t ? colors.white : colors.textSecondary }]}>
                            {t === "recipe" ? "Recipes" : "Seasonings"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={[styles.searchRow, { backgroundColor: colors.backgroundSecondary }]}>
                <Icon name="magnifier" size={14} color={colors.grey} style={styles.searchIcon} />
                <TextInput
                    style={[styles.searchInput, { color: colors.textPrimary }]}
                    placeholder={tab === "seasoning" ? "Search seasonings..." : "Search recipes..."}
                    placeholderTextColor={colors.grey}
                    value={query}
                    onChangeText={setQuery}
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={() => setQuery("")}>
                        <Icon name="close" size={14} color={colors.grey} />
                    </TouchableOpacity>
                )}
            </View>

            {filtered.length === 0 ? (
                <View style={styles.empty}>
                    <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>
                        {query
                            ? `No matching ${tab === "seasoning" ? "seasonings" : "recipes"}`
                            : `No ${tab === "seasoning" ? "seasonings" : "recipes"} yet`}
                    </Text>
                    {!query && (
                        <Text style={[styles.emptyHint, { color: colors.textSecondary }]}>
                            {tab === "seasoning"
                                ? "Tap + to save your first seasoning mix"
                                : "Tap + to add your first recipe"}
                        </Text>
                    )}
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    keyExtractor={(r) => r.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.list}
                    keyboardShouldPersistTaps="handled"
                />
            )}

            <TouchableOpacity
                style={[styles.fab, { backgroundColor: colors.primary }]}
                onPress={handleNew}
            >
                <Icon name="plus" size={22} color={colors.white} />
            </TouchableOpacity>

            <Modal visible={showImport} animationType="slide" transparent>
                <KeyboardAvoidingView
                    style={styles.modalOverlay}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <View style={[styles.modalSheet, { backgroundColor: colors.backgroundSecondary }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Paste Recipe JSON</Text>
                            <TouchableOpacity onPress={() => { setShowImport(false); setJsonText(""); }} hitSlop={8}>
                                <Icon name="close" size={18} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            style={[styles.jsonInput, { backgroundColor: colors.background, color: colors.textPrimary }]}
                            placeholder={'[\n  { "name": "My Recipe", ... }\n]'}
                            placeholderTextColor={colors.grey}
                            value={jsonText}
                            onChangeText={setJsonText}
                            multiline
                            autoCorrect={false}
                            autoCapitalize="none"
                            textAlignVertical="top"
                        />
                        <TouchableOpacity
                            style={[styles.importConfirmBtn, { backgroundColor: colors.primary, opacity: jsonText.trim() ? 1 : 0.4 }]}
                            onPress={handleImport}
                            disabled={!jsonText.trim()}
                        >
                            <Text style={[styles.importConfirmText, { color: colors.white }]}>Import</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 60 },
    header: {
        paddingHorizontal: 20,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
    },
    headerRight: { flexDirection: "row", alignItems: "center", gap: 4 },
    importBtn: {
        padding: 4,
    },
    segmentRow: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginBottom: 12,
        borderRadius: 12,
        padding: 4,
    },
    segmentBtn: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 9,
        alignItems: "center",
    },
    segmentText: {
        fontSize: 14,
        fontWeight: "600",
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
    searchIcon: { marginRight: 8 },
    searchInput: {
        flex: 1,
        fontSize: 15,
        paddingVertical: 10,
    },
    list: {
        paddingHorizontal: 20,
        gap: 10,
        paddingBottom: 100,
    },
    card: {
        borderRadius: 14,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    cardBody: { flex: 1, gap: 6 },
    cardName: { fontSize: 17, fontWeight: "600" },
    cardDesc: { fontSize: 13, lineHeight: 18 },
    cardMeta: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 2 },
    metaChip: {
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 8,
    },
    metaChipText: { fontSize: 12 },
    empty: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    emptyTitle: { fontSize: 18, fontWeight: "600" },
    emptyHint: { fontSize: 14 },
    fab: {
        position: "absolute",
        bottom: 28,
        right: 24,
        width: 58,
        height: 58,
        borderRadius: 29,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalSheet: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
        gap: 16,
    },
    modalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    modalTitle: { fontSize: 18, fontWeight: "700" },
    jsonInput: {
        borderRadius: 12,
        padding: 12,
        fontSize: 13,
        fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
        minHeight: 200,
        maxHeight: 300,
    },
    importConfirmBtn: {
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
    },
    importConfirmText: { fontSize: 16, fontWeight: "600" },
});
