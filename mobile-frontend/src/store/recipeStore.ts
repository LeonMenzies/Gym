import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type IngredientUnit =
    | "" | "g" | "kg" | "ml" | "L"
    | "tsp" | "tbsp" | "cup"
    | "oz" | "lb" | "fl oz" | "piece";

export type Ingredient = {
    id: string;
    amount: string;
    unit: IngredientUnit;
    name: string;
};

export type Recipe = {
    id: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    steps: string[];
    prepMins: number;
    cookMins: number;
    servings: number;
    createdAt: number;
};

type RecipeStore = {
    recipes: Recipe[];
    addRecipe: () => string;
    updateRecipe: (recipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
};

// ─── Unit helpers ─────────────────────────────────────────────────────────────

const METRIC_UNITS: IngredientUnit[] = ["g", "kg", "ml", "L"];
const IMPERIAL_UNITS: IngredientUnit[] = ["oz", "lb", "fl oz", "cup"];

type ConversionMap = Partial<Record<IngredientUnit, { to: IngredientUnit; factor: number }>>;

const TO_IMPERIAL: ConversionMap = {
    g:  { to: "oz",    factor: 1 / 28.3495 },
    kg: { to: "lb",    factor: 1 / 0.453592 },
    ml: { to: "fl oz", factor: 1 / 29.5735 },
    L:  { to: "cup",   factor: 1 / 0.236588 },
};

const TO_METRIC: ConversionMap = {
    oz:    { to: "g",  factor: 28.3495 },
    lb:    { to: "kg", factor: 0.453592 },
    "fl oz": { to: "ml", factor: 29.5735 },
    cup:   { to: "ml", factor: 236.588 },
};

function convertAmount(amount: string, factor: number): string {
    const n = parseFloat(amount);
    if (isNaN(n) || amount.trim() === "") return amount;
    const result = n * factor;
    return result % 1 === 0 ? String(result) : result.toFixed(1).replace(/\.0$/, "");
}

export function convertIngredients(ingredients: Ingredient[], toSystem: "metric" | "imperial"): Ingredient[] {
    const map = toSystem === "imperial" ? TO_IMPERIAL : TO_METRIC;
    return ingredients.map((ing) => {
        const conv = map[ing.unit];
        if (!conv) return ing;
        return { ...ing, amount: convertAmount(ing.amount, conv.factor), unit: conv.to };
    });
}

export function detectSystem(ingredients: Ingredient[]): "metric" | "imperial" | "mixed" | "none" {
    const hasMetric = ingredients.some((i) => METRIC_UNITS.includes(i.unit));
    const hasImperial = ingredients.some((i) => IMPERIAL_UNITS.includes(i.unit));
    if (hasMetric && hasImperial) return "mixed";
    if (hasMetric) return "metric";
    if (hasImperial) return "imperial";
    return "none";
}

const blankRecipe = (id: string): Recipe => ({
    id,
    name: "",
    description: "",
    ingredients: [],
    steps: [],
    prepMins: 0,
    cookMins: 0,
    servings: 2,
    createdAt: Date.now(),
});

export const useRecipeStore = create<RecipeStore>()(
    persist(
        (set) => ({
            recipes: [],

            addRecipe: () => {
                const id = `recipe_${Date.now()}`;
                set((s) => ({ recipes: [blankRecipe(id), ...s.recipes] }));
                return id;
            },

            updateRecipe: (recipe) =>
                set((s) => ({
                    recipes: s.recipes.map((r) => (r.id === recipe.id ? recipe : r)),
                })),

            deleteRecipe: (id) =>
                set((s) => ({ recipes: s.recipes.filter((r) => r.id !== id) })),
        }),
        {
            name: "recipe-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
