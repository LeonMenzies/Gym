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

export type RecipeType = "recipe" | "seasoning";

export type Recipe = {
    id: string;
    type: RecipeType;
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
    addRecipe: (type?: RecipeType) => string;
    updateRecipe: (recipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
    importRecipes: (data: unknown[]) => { imported: number; skipped: number };
};

// ─── Common spices list ───────────────────────────────────────────────────────

export const COMMON_SPICES = [
    "Allspice", "Basil", "Bay leaf", "Black pepper", "Brown sugar",
    "Cardamom", "Caraway seeds", "Cayenne", "Celery salt", "Chili flakes",
    "Chili powder", "Cinnamon", "Citric acid", "Cloves", "Coriander",
    "Cornstarch", "Cream of tartar", "Cumin", "Curry powder", "Dill",
    "Fennel seeds", "Five spice", "Garam masala", "Garlic powder", "Ginger",
    "Kosher salt", "Lemon pepper", "Marjoram", "MSG", "Mustard powder",
    "Nutmeg", "Onion powder", "Oregano", "Paprika", "Parsley",
    "Rosemary", "Sage", "Salt", "Sea salt", "Smoked paprika",
    "Star anise", "Sugar", "Sumac", "Thyme", "Turmeric",
    "Vanilla", "White pepper", "Za'atar",
];

// ─── Seeded data ──────────────────────────────────────────────────────────────

const CLUBHOUSE_BBQ_CHICKEN: Recipe = {
    id: "seasoning_clubhouse_bbq_chicken_v1",
    type: "seasoning",
    name: "Club House La Grille BBQ Chicken Seasoning",
    description: "Makes ~200g. Mix together and store in an airtight jar.",
    ingredients: [
        { id: "cs_1",  amount: "6",   unit: "tbsp", name: "Salt" },
        { id: "cs_2",  amount: "3",   unit: "tbsp", name: "Paprika" },
        { id: "cs_3",  amount: "1",   unit: "tbsp", name: "Smoked paprika" },
        { id: "cs_4",  amount: "2",   unit: "tbsp", name: "Garlic powder" },
        { id: "cs_5",  amount: "2",   unit: "tbsp", name: "Onion powder" },
        { id: "cs_6",  amount: "1.5", unit: "tbsp", name: "Sugar" },
        { id: "cs_7",  amount: "1",   unit: "tsp",  name: "Black pepper" },
        { id: "cs_8",  amount: "1",   unit: "tsp",  name: "Cumin" },
        { id: "cs_9",  amount: "0.5", unit: "tsp",  name: "Cayenne" },
        { id: "cs_10", amount: "1",   unit: "tsp",  name: "Cornstarch" },
        { id: "cs_11", amount: "0.5", unit: "tsp",  name: "Citric acid" },
        { id: "cs_12", amount: "0.5", unit: "tsp",  name: "MSG" },
    ],
    steps: [],
    prepMins: 0,
    cookMins: 0,
    servings: 1,
    createdAt: 1710000000000,
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

const blankRecipe = (id: string, type: RecipeType = "recipe"): Recipe => ({
    id,
    type,
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

            addRecipe: (type = "recipe") => {
                const id = `recipe_${Date.now()}`;
                set((s) => ({ recipes: [blankRecipe(id, type), ...s.recipes] }));
                return id;
            },

            updateRecipe: (recipe) =>
                set((s) => ({
                    recipes: s.recipes.map((r) => (r.id === recipe.id ? recipe : r)),
                })),

            deleteRecipe: (id) =>
                set((s) => ({ recipes: s.recipes.filter((r) => r.id !== id) })),

            importRecipes: (data) => {
                const VALID_UNITS: IngredientUnit[] = ["", "g", "kg", "ml", "L", "tsp", "tbsp", "cup", "oz", "lb", "fl oz", "piece"];
                let imported = 0;
                let skipped = 0;
                const toAdd: Recipe[] = [];

                for (const item of data) {
                    if (!item || typeof item !== "object") { skipped++; continue; }
                    const r = item as Record<string, unknown>;
                    if (typeof r.name !== "string") { skipped++; continue; }

                    const ingredients: Ingredient[] = [];
                    if (Array.isArray(r.ingredients)) {
                        for (const ing of r.ingredients) {
                            if (!ing || typeof ing !== "object") continue;
                            const i = ing as Record<string, unknown>;
                            const unit = typeof i.unit === "string" && VALID_UNITS.includes(i.unit as IngredientUnit)
                                ? (i.unit as IngredientUnit) : "";
                            ingredients.push({
                                id: `ing_${Date.now()}_${Math.random()}`,
                                amount: typeof i.amount === "string" ? i.amount : String(i.amount ?? ""),
                                unit,
                                name: typeof i.name === "string" ? i.name : "",
                            });
                        }
                    }

                    const steps: string[] = Array.isArray(r.steps)
                        ? r.steps.filter((s) => typeof s === "string")
                        : [];

                    toAdd.push({
                        id: `recipe_${Date.now()}_${Math.random()}`,
                        type: r.type === "seasoning" ? "seasoning" : "recipe",
                        name: r.name,
                        description: typeof r.description === "string" ? r.description : "",
                        ingredients,
                        steps,
                        prepMins: typeof r.prepMins === "number" ? r.prepMins : 0,
                        cookMins: typeof r.cookMins === "number" ? r.cookMins : 0,
                        servings: typeof r.servings === "number" ? r.servings : 2,
                        createdAt: Date.now(),
                    });
                    imported++;
                }

                if (toAdd.length > 0) {
                    set((s) => ({ recipes: [...toAdd, ...s.recipes] }));
                }
                return { imported, skipped };
            },
        }),
        {
            name: "recipe-storage",
            storage: createJSONStorage(() => AsyncStorage),
            version: 1,
            migrate: (state: unknown, version: number) => {
                const s = (state ?? {}) as { recipes?: Recipe[] };
                if (version === 0) {
                    // Seed built-in seasonings for first-time / existing users
                    const already = (s.recipes ?? []).some((r) => r.id === CLUBHOUSE_BBQ_CHICKEN.id);
                    return {
                        ...s,
                        recipes: already ? s.recipes : [CLUBHOUSE_BBQ_CHICKEN, ...(s.recipes ?? [])],
                    };
                }
                return s;
            },
        }
    )
);
