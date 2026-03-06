import { useRecipeStore } from "../../store/recipeStore";

let timeCounter = 1000;

beforeEach(() => {
    timeCounter = 1000;
    jest.spyOn(Date, "now").mockImplementation(() => timeCounter++);
    useRecipeStore.setState({ recipes: [] });
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("recipeStore", () => {
    describe("addRecipe", () => {
        it("creates a blank recipe and returns its id", () => {
            const id = useRecipeStore.getState().addRecipe();
            const { recipes } = useRecipeStore.getState();
            expect(recipes).toHaveLength(1);
            expect(recipes[0].id).toBe(id);
            expect(recipes[0].name).toBe("");
            expect(recipes[0].ingredients).toEqual([]);
            expect(recipes[0].steps).toEqual([]);
            expect(recipes[0].servings).toBe(2);
        });

        it("prepends new recipes to the list", () => {
            const id1 = useRecipeStore.getState().addRecipe();
            const id2 = useRecipeStore.getState().addRecipe();
            const { recipes } = useRecipeStore.getState();
            expect(recipes[0].id).toBe(id2);
            expect(recipes[1].id).toBe(id1);
        });
    });

    describe("updateRecipe", () => {
        it("updates an existing recipe", () => {
            const id = useRecipeStore.getState().addRecipe();
            const blank = useRecipeStore.getState().recipes[0];
            useRecipeStore.getState().updateRecipe({
                ...blank,
                name: "Pasta",
                servings: 4,
            });
            const updated = useRecipeStore.getState().recipes[0];
            expect(updated.name).toBe("Pasta");
            expect(updated.servings).toBe(4);
        });

        it("does not affect other recipes", () => {
            const id1 = useRecipeStore.getState().addRecipe();
            useRecipeStore.getState().addRecipe();
            const toUpdate = useRecipeStore.getState().recipes.find((r) => r.id === id1)!;
            useRecipeStore.getState().updateRecipe({ ...toUpdate, name: "Soup" });
            const other = useRecipeStore.getState().recipes.find((r) => r.id !== id1)!;
            expect(other.name).toBe("");
        });
    });

    describe("deleteRecipe", () => {
        it("removes the recipe with the given id", () => {
            const id = useRecipeStore.getState().addRecipe();
            useRecipeStore.getState().addRecipe();
            useRecipeStore.getState().deleteRecipe(id);
            const { recipes } = useRecipeStore.getState();
            expect(recipes).toHaveLength(1);
            expect(recipes.find((r) => r.id === id)).toBeUndefined();
        });
    });
});
