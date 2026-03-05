import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Ingredient = {
    id: string;
    amount: string;
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
