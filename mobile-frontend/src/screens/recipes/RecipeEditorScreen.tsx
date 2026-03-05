import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { FC, useEffect, useRef, useState } from "react";
import {
    Alert,
    FlatList,
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
import { Ingredient, Recipe, useRecipeStore } from "~store/recipeStore";

type Props = {
    navigation: any;
    route: { params: { recipeId: string } };
};

export const RecipeEditorScreen: FC<Props> = ({ navigation, route }) => {
    const colors = useTheme();
    const { recipes, updateRecipe, deleteRecipe } = useRecipeStore();
    const recipeId = route.params.recipeId;

    const original = recipes.find((r) => r.id === recipeId);

    const [name, setName] = useState(original?.name ?? "");
    const [description, setDescription] = useState(original?.description ?? "");
    const [prepMins, setPrepMins] = useState(String(original?.prepMins ?? 0));
    const [cookMins, setCookMins] = useState(String(original?.cookMins ?? 0));
    const [servings, setServings] = useState(String(original?.servings ?? 2));
    const [ingredients, setIngredients] = useState<Ingredient[]>(original?.ingredients ?? []);
    const [steps, setSteps] = useState<string[]>(original?.steps ?? []);

    const isDirty = useRef(false);

    useEffect(() => {
        isDirty.current = true;
    }, [name, description, prepMins, cookMins, servings, ingredients, steps]);

    const save = () => {
        if (!original) return;
        const updated: Recipe = {
            ...original,
            name,
            description,
            prepMins: parseInt(prepMins) || 0,
            cookMins: parseInt(cookMins) || 0,
            servings: parseInt(servings) || 1,
            ingredients,
            steps,
        };
        updateRecipe(updated);
    };

    const handleBack = () => {
        save();
        navigation.goBack();
    };

    const handleDelete = () => {
        Alert.alert("Delete Recipe", "Are you sure?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => {
                    deleteRecipe(recipeId);
                    navigation.goBack();
                },
            },
        ]);
    };

    // Ingredients
    const addIngredient = () => {
        const newIng: Ingredient = {
            id: `ing_${Date.now()}`,
            amount: "",
            name: "",
        };
        setIngredients((prev) => [...prev, newIng]);
    };

    const updateIngredient = (id: string, field: "amount" | "name", value: string) => {
        setIngredients((prev) =>
            prev.map((ing) => (ing.id === id ? { ...ing, [field]: value } : ing))
        );
    };

    const removeIngredient = (id: string) => {
        setIngredients((prev) => prev.filter((ing) => ing.id !== id));
    };

    // Steps
    const addStep = () => {
        setSteps((prev) => [...prev, ""]);
    };

    const updateStep = (index: number, value: string) => {
        setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));
    };

    const removeStep = (index: number) => {
        setSteps((prev) => prev.filter((_, i) => i !== index));
    };

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
                <TouchableOpacity onPress={handleDelete} style={s.headerBtn}>
                    <Icon name="trash" size={16} color={colors.error} />
                </TouchableOpacity>
            </View>

            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={s.scroll}
                keyboardShouldPersistTaps="handled"
            >
                {/* Name */}
                <TextInput
                    style={[s.titleInput, { color: colors.textPrimary }]}
                    placeholder="Recipe name"
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

                {/* Meta row */}
                <View style={s.metaRow}>
                    <View style={s.metaField}>
                        <Text style={[s.metaLabel, { color: colors.textSecondary }]}>Prep (min)</Text>
                        <TextInput
                            style={[s.metaInput, { color: colors.textPrimary, backgroundColor: colors.backgroundSecondary }]}
                            value={prepMins}
                            onChangeText={setPrepMins}
                            keyboardType="number-pad"
                            placeholder="0"
                            placeholderTextColor={colors.grey}
                        />
                    </View>
                    <View style={s.metaField}>
                        <Text style={[s.metaLabel, { color: colors.textSecondary }]}>Cook (min)</Text>
                        <TextInput
                            style={[s.metaInput, { color: colors.textPrimary, backgroundColor: colors.backgroundSecondary }]}
                            value={cookMins}
                            onChangeText={setCookMins}
                            keyboardType="number-pad"
                            placeholder="0"
                            placeholderTextColor={colors.grey}
                        />
                    </View>
                    <View style={s.metaField}>
                        <Text style={[s.metaLabel, { color: colors.textSecondary }]}>Serves</Text>
                        <TextInput
                            style={[s.metaInput, { color: colors.textPrimary, backgroundColor: colors.backgroundSecondary }]}
                            value={servings}
                            onChangeText={setServings}
                            keyboardType="number-pad"
                            placeholder="2"
                            placeholderTextColor={colors.grey}
                        />
                    </View>
                </View>

                {/* Ingredients */}
                <View style={s.section}>
                    <View style={s.sectionHeader}>
                        <Text style={[s.sectionTitle, { color: colors.textPrimary }]}>Ingredients</Text>
                        <TouchableOpacity onPress={addIngredient} style={[s.addBtn, { backgroundColor: colors.backgroundSecondary }]}>
                            <Icon name="plus" size={14} color={colors.primary} />
                        </TouchableOpacity>
                    </View>

                    {ingredients.length === 0 && (
                        <Text style={[s.emptyHint, { color: colors.grey }]}>No ingredients yet</Text>
                    )}

                    {ingredients.map((ing) => (
                        <View key={ing.id} style={[s.ingredientRow, { backgroundColor: colors.backgroundSecondary }]}>
                            <TextInput
                                style={[s.amountInput, { color: colors.textPrimary }]}
                                placeholder="Amount"
                                placeholderTextColor={colors.grey}
                                value={ing.amount}
                                onChangeText={(v) => updateIngredient(ing.id, "amount", v)}
                            />
                            <View style={[s.divider, { backgroundColor: colors.background }]} />
                            <TextInput
                                style={[s.ingNameInput, { color: colors.textPrimary }]}
                                placeholder="Ingredient"
                                placeholderTextColor={colors.grey}
                                value={ing.name}
                                onChangeText={(v) => updateIngredient(ing.id, "name", v)}
                            />
                            <TouchableOpacity onPress={() => removeIngredient(ing.id)} style={s.removeBtn}>
                                <Icon name="close" size={12} color={colors.grey} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Steps */}
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
        headerBtn: {
            padding: 8,
        },
        scroll: {
            paddingHorizontal: 20,
            paddingTop: 8,
        },
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
        metaRow: {
            flexDirection: "row",
            gap: 12,
            marginBottom: 28,
        },
        metaField: {
            flex: 1,
            gap: 6,
        },
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
        section: {
            marginBottom: 28,
            gap: 10,
        },
        sectionHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: "700",
        },
        addBtn: {
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
        },
        emptyHint: {
            fontSize: 14,
            textAlign: "center",
            paddingVertical: 10,
        },
        ingredientRow: {
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 12,
            overflow: "hidden",
        },
        amountInput: {
            width: 80,
            paddingHorizontal: 12,
            paddingVertical: 12,
            fontSize: 14,
        },
        divider: {
            width: 1,
            height: "100%",
            minHeight: 44,
        },
        ingNameInput: {
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: 12,
            fontSize: 14,
        },
        removeBtn: {
            padding: 12,
        },
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
        stepNumberText: {
            fontSize: 12,
            fontWeight: "700",
        },
        stepInput: {
            flex: 1,
            fontSize: 14,
            lineHeight: 20,
        },
    });
