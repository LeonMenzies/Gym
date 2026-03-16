import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { FC, useEffect, useRef, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useTheme } from "~store/settingsStore";
import { Ingredient, IngredientUnit, Recipe, convertIngredients, detectSystem, useRecipeStore } from "~store/recipeStore";
import { useTodoStore } from "~store/todoStore";

type Props = {
    navigation: any;
    route: { params: { recipeId: string } };
};

const ALL_UNITS: IngredientUnit[] = ["", "g", "kg", "ml", "L", "tsp", "tbsp", "cup", "oz", "lb", "fl oz", "piece"];
const UNIT_LABEL: Record<IngredientUnit, string> = {
    "":     "–",
    g:      "g",
    kg:     "kg",
    ml:     "ml",
    L:      "L",
    tsp:    "tsp",
    tbsp:   "tbsp",
    cup:    "cup",
    oz:     "oz",
    lb:     "lb",
    "fl oz": "fl oz",
    piece:  "pc",
};

function pickUnit(current: IngredientUnit, onSelect: (u: IngredientUnit) => void) {
    Alert.alert("Select unit", undefined, [
        ...ALL_UNITS.map((u) => ({
            text: current === u ? `${UNIT_LABEL[u]} ✓` : UNIT_LABEL[u],
            onPress: () => onSelect(u),
        })),
        { text: "Cancel", style: "cancel" as const },
    ]);
}

export const RecipeEditorScreen: FC<Props> = ({ navigation, route }) => {
    const colors = useTheme();
    const { recipes, spices, updateRecipe, deleteRecipe } = useRecipeStore();
    const { addToGrocery } = useTodoStore();
    const recipeId = route.params.recipeId;

    const original = recipes.find((r) => r.id === recipeId);
    const isSeasoning = original?.type === "seasoning";

    const [name, setName] = useState(original?.name ?? "");
    const [description, setDescription] = useState(original?.description ?? "");
    const [prepMins, setPrepMins] = useState(String(original?.prepMins ?? 0));
    const [cookMins, setCookMins] = useState(String(original?.cookMins ?? 0));
    const [servings, setServings] = useState(String(original?.servings ?? 2));
    const [ingredients, setIngredients] = useState<Ingredient[]>(
        (original?.ingredients ?? []).map((ing) => ({ unit: "" as IngredientUnit, ...ing }))
    );
    const [steps, setSteps] = useState<string[]>(original?.steps ?? []);
    const [spiceSearch, setSpiceSearch] = useState("");

    const isDirty = useRef(false);
    useEffect(() => { isDirty.current = true; }, [name, description, prepMins, cookMins, servings, ingredients, steps]);

    const save = () => {
        if (!original) return;
        updateRecipe({
            ...original,
            name,
            description,
            prepMins: parseInt(prepMins) || 0,
            cookMins: parseInt(cookMins) || 0,
            servings: parseInt(servings) || 1,
            ingredients,
            steps,
        });
    };

    const handleBack = () => { save(); navigation.goBack(); };

    const handleAddToGrocery = () => {
        if (ingredients.length === 0) {
            Alert.alert("No ingredients", `Add ingredients to this ${isSeasoning ? "seasoning" : "recipe"} first.`);
            return;
        }
        save();
        const added = addToGrocery(ingredients);
        Alert.alert(
            "Added to Grocery",
            added === 0
                ? "All ingredients are already in your grocery list."
                : `${added} item${added !== 1 ? "s" : ""} added to your Grocery list.`
        );
    };

    const handleDelete = () => {
        Alert.alert(`Delete ${isSeasoning ? "Seasoning" : "Recipe"}`, "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: () => { deleteRecipe(recipeId); navigation.goBack(); } },
        ]);
    };

    const handleConvert = () => {
        const system = detectSystem(ingredients);
        if (system === "none") return;
        const target = system === "imperial" ? "metric" : "imperial";
        const label = target === "metric" ? "metric (g, ml, L)" : "imperial (oz, lb, fl oz, cup)";
        Alert.alert("Convert units", `Convert all to ${label}?`, [
            { text: "Cancel", style: "cancel" },
            { text: "Convert", onPress: () => setIngredients((prev) => convertIngredients(prev, target)) },
        ]);
    };

    const addIngredient = () =>
        setIngredients((prev) => [...prev, { id: `ing_${Date.now()}`, amount: "", unit: "", name: "" }]);

    const updateIngredient = (id: string, field: keyof Ingredient, value: string) =>
        setIngredients((prev) => prev.map((ing) => ing.id === id ? { ...ing, [field]: value } : ing));

    const setIngredientUnit = (id: string, unit: IngredientUnit) =>
        setIngredients((prev) => prev.map((ing) => ing.id === id ? { ...ing, unit } : ing));

    const removeIngredient = (id: string) =>
        setIngredients((prev) => prev.filter((ing) => ing.id !== id));

    const addStep = () => setSteps((prev) => [...prev, ""]);
    const updateStep = (index: number, value: string) =>
        setSteps((prev) => prev.map((s, i) => i === index ? value : s));
    const removeStep = (index: number) =>
        setSteps((prev) => prev.filter((_, i) => i !== index));

    const addSpiceToMix = (spice: string) => {
        const already = ingredients.some((ing) => ing.name.toLowerCase() === spice.toLowerCase());
        if (already) return;
        setIngredients((prev) => [...prev, { id: `ing_${Date.now()}`, amount: "", unit: "", name: spice }]);
    };

    const system = detectSystem(ingredients);
    const canConvert = system !== "none";

    const filteredSpices = spiceSearch.trim()
        ? spices.filter((sp) => sp.toLowerCase().includes(spiceSearch.toLowerCase()))
        : spices;

    const s = styles(colors);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={0}
        >
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity onPress={handleBack} style={s.headerBtn}>
                    <Icon name="arrow-left" size={18} color={colors.textPrimary} />
                </TouchableOpacity>
                <View style={s.headerRight}>
                    <TouchableOpacity onPress={handleAddToGrocery} style={s.headerBtn}>
                        <Icon name="basket" size={18} color={colors.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete} style={s.headerBtn}>
                        <Icon name="trash" size={16} color={colors.error} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={{ flex: 1 }} contentContainerStyle={s.scroll} keyboardShouldPersistTaps="handled">
                {/* Name */}
                <TextInput
                    style={[s.titleInput, { color: colors.textPrimary }]}
                    placeholder={isSeasoning ? "Seasoning name" : "Recipe name"}
                    placeholderTextColor={colors.grey}
                    value={name}
                    onChangeText={setName}
                    returnKeyType="next"
                    autoFocus={!name}
                />

                {/* Description */}
                <TextInput
                    style={[s.descInput, { color: colors.textPrimary }]}
                    placeholder="Description (optional)"
                    placeholderTextColor={colors.grey}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    returnKeyType="default"
                />

                {/* Meta row — hidden for seasonings */}
                {!isSeasoning && (
                    <View style={s.metaRow}>
                        {[
                            { label: "Prep (min)", value: prepMins, set: setPrepMins },
                            { label: "Cook (min)", value: cookMins, set: setCookMins },
                            { label: "Serves",     value: servings,  set: setServings },
                        ].map(({ label, value, set }) => (
                            <View key={label} style={s.metaField}>
                                <Text style={[s.metaLabel, { color: colors.textSecondary }]}>{label}</Text>
                                <TextInput
                                    style={[s.metaInput, { color: colors.textPrimary, backgroundColor: colors.backgroundSecondary }]}
                                    value={value}
                                    onChangeText={set}
                                    keyboardType="number-pad"
                                    placeholder="0"
                                    placeholderTextColor={colors.grey}
                                />
                            </View>
                        ))}
                    </View>
                )}

                {/* ── Seasoning: inline spice browser ─────────────────────── */}
                {isSeasoning && (
                    <View style={s.section}>
                        <View style={s.sectionHeader}>
                            <Text style={[s.sectionTitle, { color: colors.textPrimary }]}>Add Spices</Text>
                        </View>

                        <View style={[s.spiceSearchRow, { backgroundColor: colors.backgroundSecondary }]}>
                            <Icon name="magnifier" size={13} color={colors.grey} style={{ marginRight: 6 }} />
                            <TextInput
                                style={[s.spiceSearchInput, { color: colors.textPrimary }]}
                                placeholder="Search spices..."
                                placeholderTextColor={colors.grey}
                                value={spiceSearch}
                                onChangeText={setSpiceSearch}
                                autoCorrect={false}
                                returnKeyType="search"
                            />
                            {spiceSearch.length > 0 && (
                                <TouchableOpacity onPress={() => setSpiceSearch("")} hitSlop={8}>
                                    <Icon name="close" size={12} color={colors.grey} />
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={[s.spiceGrid, { backgroundColor: colors.backgroundSecondary }]}>
                            {filteredSpices.length === 0 && (
                                <Text style={[s.emptyHint, { color: colors.grey }]}>No spices match</Text>
                            )}
                            {filteredSpices.map((spice) => {
                                const added = ingredients.some(
                                    (ing) => ing.name.toLowerCase() === spice.toLowerCase()
                                );
                                return (
                                    <TouchableOpacity
                                        key={spice}
                                        style={[
                                            s.spiceChip,
                                            added
                                                ? { backgroundColor: colors.primary }
                                                : { backgroundColor: colors.background },
                                        ]}
                                        onPress={() => {
                                            if (added) {
                                                const ing = ingredients.find(
                                                    (i) => i.name.toLowerCase() === spice.toLowerCase()
                                                );
                                                if (ing) removeIngredient(ing.id);
                                            } else {
                                                addSpiceToMix(spice);
                                            }
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={[s.spiceChipText, { color: added ? colors.white : colors.textPrimary }]}>
                                            {spice}
                                        </Text>
                                        {added && <Icon name="check" size={11} color={colors.white} style={{ marginLeft: 4 }} />}
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>
                )}

                {/* Ingredients / Mix */}
                <View style={s.section}>
                    <View style={s.sectionHeader}>
                        <Text style={[s.sectionTitle, { color: colors.textPrimary }]}>
                            {isSeasoning ? "Mix" : "Ingredients"}
                        </Text>
                        <View style={s.sectionActions}>
                            {canConvert && (
                                <TouchableOpacity onPress={handleConvert} style={[s.actionBtn, { backgroundColor: colors.backgroundSecondary }]}>
                                    <Icon name="refresh" size={13} color={colors.primary} />
                                    <Text style={[s.actionBtnText, { color: colors.primary }]}>
                                        {system === "metric" ? "→ imperial" : system === "imperial" ? "→ metric" : "convert"}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            {!isSeasoning && (
                                <TouchableOpacity onPress={addIngredient} style={[s.addBtn, { backgroundColor: colors.backgroundSecondary }]}>
                                    <Icon name="plus" size={14} color={colors.primary} />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {ingredients.length === 0 && (
                        <Text style={[s.emptyHint, { color: colors.grey }]}>
                            {isSeasoning ? "Tap spices above to add them" : "No ingredients yet"}
                        </Text>
                    )}

                    {ingredients.map((ing) => (
                        <View key={ing.id} style={[s.ingredientRow, { backgroundColor: colors.backgroundSecondary }]}>
                            <TextInput
                                style={[s.amountInput, { color: colors.textPrimary }]}
                                placeholder="Qty"
                                placeholderTextColor={colors.grey}
                                value={ing.amount}
                                onChangeText={(v) => updateIngredient(ing.id, "amount", v)}
                                keyboardType="decimal-pad"
                            />
                            <TouchableOpacity
                                style={[s.unitBtn, { borderColor: colors.lightGrey }]}
                                onPress={() => pickUnit(ing.unit, (u) => setIngredientUnit(ing.id, u))}
                            >
                                <Text style={[s.unitText, { color: ing.unit ? colors.primary : colors.grey }]}>
                                    {UNIT_LABEL[ing.unit]}
                                </Text>
                            </TouchableOpacity>
                            <View style={[s.divider, { backgroundColor: colors.background }]} />
                            {isSeasoning ? (
                                <Text style={[s.ingNameText, { color: colors.textPrimary }]} numberOfLines={1}>
                                    {ing.name}
                                </Text>
                            ) : (
                                <TextInput
                                    style={[s.ingNameInput, { color: colors.textPrimary }]}
                                    placeholder="Ingredient"
                                    placeholderTextColor={colors.grey}
                                    value={ing.name}
                                    onChangeText={(v) => updateIngredient(ing.id, "name", v)}
                                />
                            )}
                            <TouchableOpacity onPress={() => removeIngredient(ing.id)} style={s.removeBtn}>
                                <Icon name="close" size={12} color={colors.grey} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Steps — hidden for seasonings */}
                {!isSeasoning && (
                    <View style={s.section}>
                        <View style={s.sectionHeader}>
                            <Text style={[s.sectionTitle, { color: colors.textPrimary }]}>Steps</Text>
                            <TouchableOpacity onPress={addStep} style={[s.addBtn, { backgroundColor: colors.backgroundSecondary }]}>
                                <Icon name="plus" size={14} color={colors.primary} />
                            </TouchableOpacity>
                        </View>

                        {steps.length === 0 && (
                            <Text style={[s.emptyHint, { color: colors.grey }]}>No steps yet</Text>
                        )}

                        {steps.map((step, index) => (
                            <View key={index} style={[s.stepRow, { backgroundColor: colors.backgroundSecondary }]}>
                                <View style={[s.stepNumber, { backgroundColor: colors.primary }]}>
                                    <Text style={[s.stepNumberText, { color: colors.white }]}>{index + 1}</Text>
                                </View>
                                <TextInput
                                    style={[s.stepInput, { color: colors.textPrimary }]}
                                    placeholder={`Step ${index + 1}`}
                                    placeholderTextColor={colors.grey}
                                    value={step}
                                    onChangeText={(v) => updateStep(index, v)}
                                    multiline
                                />
                                <TouchableOpacity onPress={() => removeStep(index)} style={s.removeBtn}>
                                    <Icon name="close" size={12} color={colors.grey} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                )}

                <View style={{ height: 60 }} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = (colors: any) =>
    StyleSheet.create({
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 60,
            paddingHorizontal: 20,
            paddingBottom: 12,
        },
        headerRight: { flexDirection: "row", alignItems: "center" },
        headerBtn: { padding: 8 },
        scroll: { paddingHorizontal: 20, paddingTop: 8 },
        titleInput: {
            fontSize: 28,
            fontWeight: "700",
            marginBottom: 10,
            paddingVertical: 4,
        },
        descInput: {
            fontSize: 15,
            lineHeight: 22,
            marginBottom: 20,
            paddingVertical: 4,
            minHeight: 44,
        },
        metaRow: { flexDirection: "row", gap: 12, marginBottom: 28 },
        metaField: { flex: 1, gap: 6 },
        metaLabel: {
            fontSize: 12,
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: 0.5,
        },
        metaInput: {
            borderRadius: 10,
            paddingHorizontal: 12,
            paddingVertical: 10,
            fontSize: 15,
            textAlign: "center",
        },
        section: { marginBottom: 28, gap: 10 },
        sectionHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        sectionTitle: { fontSize: 18, fontWeight: "700" },
        sectionActions: { flexDirection: "row", alignItems: "center", gap: 8 },
        actionBtn: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 14,
        },
        actionBtnText: { fontSize: 12, fontWeight: "600" },
        addBtn: {
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
        },
        emptyHint: { fontSize: 14, textAlign: "center", paddingVertical: 10 },
        // ── Spice browser ────────────────────────────────────────────────────────
        spiceSearchRow: {
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 4,
        },
        spiceSearchInput: {
            flex: 1,
            fontSize: 14,
            paddingVertical: 9,
        },
        spiceGrid: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
            borderRadius: 14,
            padding: 12,
        },
        spiceChip: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingVertical: 7,
            borderRadius: 20,
        },
        spiceChipText: { fontSize: 14 },
        // ── Ingredient rows ───────────────────────────────────────────────────────
        ingredientRow: {
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 12,
            overflow: "hidden",
        },
        amountInput: {
            width: 72,
            paddingHorizontal: 10,
            paddingVertical: 12,
            fontSize: 14,
        },
        unitBtn: {
            paddingHorizontal: 6,
            paddingVertical: 12,
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderRightWidth: StyleSheet.hairlineWidth,
            alignItems: "center",
            width: 48,
        },
        unitText: { fontSize: 12, fontWeight: "600" },
        divider: { width: 1, height: "100%", minHeight: 44 },
        ingNameInput: {
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 12,
            fontSize: 14,
        },
        ingNameText: {
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 12,
            fontSize: 14,
        },
        removeBtn: { padding: 12 },
        stepRow: {
            flexDirection: "row",
            alignItems: "flex-start",
            borderRadius: 12,
            padding: 12,
            gap: 10,
        },
        stepNumber: {
            width: 24,
            height: 24,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 1,
            flexShrink: 0,
        },
        stepNumberText: { fontSize: 12, fontWeight: "700" },
        stepInput: { flex: 1, fontSize: 14, lineHeight: 20 },
    });
