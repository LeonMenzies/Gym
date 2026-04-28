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
    spices: string[];
    addRecipe: (type?: RecipeType) => string;
    updateRecipe: (recipe: Recipe) => void;
    deleteRecipe: (id: string) => void;
    importRecipes: (data: unknown[]) => { imported: number; skipped: number };
    addSpice: (name: string) => void;
    removeSpice: (name: string) => void;
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

// ─── Umami import (2025-2026) ─────────────────────────────────────────────────

const UMAMI_RECIPES: Recipe[] = [
    {
        id: "recipe_umami_agranola_v1",
        type: "recipe",
        name: "Air Fryer Granola (High Protein)",
        description: "",
        prepMins: 5,
        cookMins: 20,
        servings: 5,
        createdAt: 1759335953000,
        ingredients: [
            { id: "u_agr_1", amount: "1.5",  unit: "cup",  name: "rolled oats (old-fashioned)" },
            { id: "u_agr_2", amount: "0.5",  unit: "cup",  name: "raw unsalted nuts (almonds, walnuts, cashews)" },
            { id: "u_agr_3", amount: "0.25", unit: "cup",  name: "almond flour" },
            { id: "u_agr_4", amount: "2",    unit: "tbsp", name: "hemp seeds" },
            { id: "u_agr_5", amount: "2",    unit: "tbsp", name: "melted coconut oil" },
            { id: "u_agr_6", amount: "3",    unit: "tbsp", name: "almond butter" },
            { id: "u_agr_7", amount: "3",    unit: "tbsp", name: "honey or maple syrup" },
            { id: "u_agr_8", amount: "1",    unit: "tsp",  name: "vanilla extract" },
            { id: "u_agr_9", amount: "0.75", unit: "tsp",  name: "cinnamon" },
        ],
        steps: [
            "Dry Ingredients: In a large bowl, combine the rolled oats, raw unsalted nuts, almond flour, and hemp seeds.",
            "Combine: In a medium bowl, whisk together the melted coconut oil, almond butter, honey, vanilla extract, and cinnamon. Pour wet ingredients over dry and stir well.",
            "Bake: Line the air fryer basket with parchment. Press the granola mixture on top. Bake at 300°F (150°C) for 10 minutes. Flip the granola with a spatula, press it down, and bake until brown and toasty, about 10 more minutes.",
            "Cool: Without stirring, let the granola cool fully in the basket. Break into bite-sized clusters and transfer to a resealable container.",
        ],
    },
    {
        id: "recipe_umami_bananabread_v1",
        type: "recipe",
        name: "Chocolate Chip Banana Bread",
        description: "",
        prepMins: 15,
        cookMins: 60,
        servings: 1,
        createdAt: 1770517725000,
        ingredients: [
            { id: "u_bb_1",  amount: "1.5",  unit: "cup", name: "ripe mashed banana (3–4 medium)" },
            { id: "u_bb_2",  amount: "0.5",  unit: "cup", name: "packed light brown sugar" },
            { id: "u_bb_3",  amount: "0.5",  unit: "cup", name: "granulated sugar" },
            { id: "u_bb_4",  amount: "0.5",  unit: "cup", name: "unsalted butter, melted" },
            { id: "u_bb_5",  amount: "2",    unit: "",    name: "large eggs" },
            { id: "u_bb_6",  amount: "1",    unit: "tsp", name: "vanilla extract" },
            { id: "u_bb_7",  amount: "0.5",  unit: "cup", name: "2% Greek yogurt (or sour cream)" },
            { id: "u_bb_8",  amount: "1.33", unit: "cup", name: "all-purpose flour" },
            { id: "u_bb_9",  amount: "1",    unit: "tsp", name: "baking soda" },
            { id: "u_bb_10", amount: "0.5",  unit: "tsp", name: "salt" },
            { id: "u_bb_11", amount: "0.75", unit: "cup", name: "mini chocolate chips" },
        ],
        steps: [
            "Preheat oven to 325°F (165°C). Grease and line a 9×5 loaf pan with parchment paper.",
            "In a bowl, whisk together the flour, baking soda, and salt. Set aside.",
            "In a separate bowl, mix the melted butter and sugars until paste-like, about 1–2 minutes of vigorous whisking.",
            "Add the mashed bananas, eggs, yogurt, and vanilla to the butter-sugar mixture and mix well.",
            "Fold in the dry ingredients, then fold in the chocolate chips.",
            "Pour the batter into the prepared loaf pan. Sprinkle extra chocolate chips on top if desired.",
            "Bake for 1 hour to 1 hour 15 minutes, until a toothpick comes out with a few moist crumbs. Cool completely before removing from the pan.",
        ],
    },
    {
        id: "recipe_umami_pgranola_v1",
        type: "recipe",
        name: "Protein Granola",
        description: "",
        prepMins: 5,
        cookMins: 13,
        servings: 8,
        createdAt: 1759335879000,
        ingredients: [
            { id: "u_pgr_1", amount: "2",    unit: "cup", name: "rolled oats (gluten free if needed)" },
            { id: "u_pgr_2", amount: "1",    unit: "cup", name: "protein powder" },
            { id: "u_pgr_3", amount: "0.33", unit: "cup", name: "peanut butter" },
            { id: "u_pgr_4", amount: "0.25", unit: "cup", name: "maple syrup or honey" },
            { id: "u_pgr_5", amount: "1",    unit: "cup", name: "mix-ins of choice" },
        ],
        steps: [
            "Preheat oven to 180°C (350°F). Line a large baking tray with parchment paper.",
            "In a large bowl, combine oats and protein powder. In a microwave-safe bowl, heat peanut butter and maple syrup in 20-second bursts until melted.",
            "Pour wet ingredients into dry and mix until fully incorporated.",
            "Spread mixture on the tray in an even layer. Bake for 13–15 minutes, stirring halfway through.",
            "Remove from oven, stir once more, and let cool completely. Transfer to a bowl and add mix-ins.",
        ],
    },
    {
        id: "recipe_umami_crepes_v1",
        type: "recipe",
        name: "Basic Crêpes",
        description: "",
        prepMins: 10,
        cookMins: 20,
        servings: 4,
        createdAt: 1743180961000,
        ingredients: [
            { id: "u_cre_1", amount: "2",    unit: "",    name: "large eggs" },
            { id: "u_cre_2", amount: "0.5",  unit: "cup", name: "milk" },
            { id: "u_cre_3", amount: "0.5",  unit: "cup", name: "water" },
            { id: "u_cre_4", amount: "0.25", unit: "tsp", name: "salt" },
            { id: "u_cre_5", amount: "1",    unit: "cup", name: "all-purpose flour" },
            { id: "u_cre_6", amount: "2",    unit: "tbsp", name: "butter, melted" },
        ],
        steps: [
            "Whisk eggs, milk, water, and salt together in a large bowl. Add flour and butter and whisk vigorously until smooth.",
            "Heat a lightly oiled pan over medium-high heat. Pour about 1/4 cup of batter per crêpe and tilt the pan so it coats the surface evenly.",
            "Cook until the top is no longer wet and the bottom is light brown, 1–2 minutes. Flip and cook about 1 minute more. Serve hot.",
        ],
    },
    {
        id: "recipe_umami_soufflepancakes_v1",
        type: "recipe",
        name: "Fluffy Japanese Soufflé Pancakes",
        description: "",
        prepMins: 15,
        cookMins: 30,
        servings: 3,
        createdAt: 1743962715000,
        ingredients: [
            { id: "u_jsp_1", amount: "2",    unit: "",     name: "large eggs" },
            { id: "u_jsp_2", amount: "1.5",  unit: "tbsp", name: "whole milk" },
            { id: "u_jsp_3", amount: "0.25", unit: "tsp",  name: "pure vanilla extract" },
            { id: "u_jsp_4", amount: "0.25", unit: "cup",  name: "cake flour" },
            { id: "u_jsp_5", amount: "0.5",  unit: "tsp",  name: "baking powder" },
            { id: "u_jsp_6", amount: "2",    unit: "tbsp", name: "sugar" },
            { id: "u_jsp_7", amount: "1",    unit: "tbsp", name: "neutral oil (for greasing)" },
            { id: "u_jsp_8", amount: "2",    unit: "tbsp", name: "water (for steaming)" },
        ],
        steps: [
            "Prepare Egg Whites: Separate the eggs. Place the egg whites in the freezer for 15 minutes.",
            "Make Egg Yolk Mixture: Whisk egg yolks with milk and vanilla until frothy. Sift in flour and baking powder, whisk to combine. Set aside.",
            "Make Meringue: Beat chilled egg whites until frothy. Gradually add sugar in 3 parts. Beat on high until stiff, glossy peaks form.",
            "Fold: Add one-third of the meringue to the yolk mixture and whisk. Fold in half the remaining meringue. Add the yolk mixture into the last meringue portion and fold gently until smooth.",
            "Preheat Pan: Heat a nonstick pan over low heat (300°F/150°C). Lightly grease with oil and wipe off excess.",
            "Cook First Side: Scoop two small mounds per pancake (3 pancakes total). Add 1 Tbsp water to empty spots and cover. After 2 minutes, add another scoop to each. Cover and cook 6–7 minutes total.",
            "Flip gently using an offset spatula once pancakes are firm enough to move.",
            "Cook Second Side: Add 1 Tbsp water, cover, and cook for 4–5 minutes.",
        ],
    },
    {
        id: "recipe_umami_belgianwaffle_v1",
        type: "recipe",
        name: "Homemade Belgian Waffle",
        description: "",
        prepMins: 15,
        cookMins: 20,
        servings: 8,
        createdAt: 1757878706000,
        ingredients: [
            { id: "u_bwaf_1", amount: "2.25", unit: "cup",  name: "all purpose flour" },
            { id: "u_bwaf_2", amount: "1",    unit: "tbsp", name: "baking powder" },
            { id: "u_bwaf_3", amount: "3",    unit: "tbsp", name: "sugar" },
            { id: "u_bwaf_4", amount: "0.5",  unit: "tsp",  name: "salt" },
            { id: "u_bwaf_5", amount: "1",    unit: "tsp",  name: "cinnamon" },
            { id: "u_bwaf_6", amount: "2",    unit: "",     name: "large eggs, separated" },
            { id: "u_bwaf_7", amount: "0.5",  unit: "cup",  name: "vegetable oil" },
            { id: "u_bwaf_8", amount: "2",    unit: "cup",  name: "milk" },
            { id: "u_bwaf_9", amount: "1",    unit: "tsp",  name: "vanilla extract" },
        ],
        steps: [
            "Preheat your waffle iron and spray with non-stick cooking spray.",
            "In a large bowl, whisk together the flour, baking powder, sugar, salt, and cinnamon.",
            "In a medium bowl, beat the egg whites with a hand mixer until stiff peaks form. Set aside.",
            "In a separate medium bowl, mix together the egg yolks, vegetable oil, milk, and vanilla extract.",
            "Add the egg yolk mixture to the dry ingredients and mix well. Fold in the egg whites.",
            "Pour batter onto the hot waffle iron and cook per manufacturer's directions.",
            "Serve immediately with butter, syrup, powdered sugar, or your favourite toppings.",
        ],
    },
    {
        id: "recipe_umami_buttermilkpancakes_v1",
        type: "recipe",
        name: "Light and Fluffy Buttermilk Pancakes",
        description: "Makes 16 pancakes",
        prepMins: 15,
        cookMins: 20,
        servings: 6,
        createdAt: 1771733820000,
        ingredients: [
            { id: "u_bpk_1",  amount: "10",  unit: "oz",   name: "all purpose flour (about 2 cups)" },
            { id: "u_bpk_2",  amount: "1",   unit: "tsp",  name: "baking powder" },
            { id: "u_bpk_3",  amount: "0.5", unit: "tsp",  name: "baking soda" },
            { id: "u_bpk_4",  amount: "1",   unit: "tsp",  name: "kosher salt" },
            { id: "u_bpk_5",  amount: "1",   unit: "tbsp", name: "sugar" },
            { id: "u_bpk_6",  amount: "2",   unit: "",     name: "large eggs, separated" },
            { id: "u_bpk_7",  amount: "1.5", unit: "cup",  name: "buttermilk" },
            { id: "u_bpk_8",  amount: "1",   unit: "cup",  name: "sour cream" },
            { id: "u_bpk_9",  amount: "4",   unit: "tbsp", name: "unsalted butter, melted" },
            { id: "u_bpk_10", amount: "",    unit: "",     name: "warm maple syrup, to serve" },
        ],
        steps: [
            "Dry Mix: Combine flour, baking powder, baking soda, salt, and sugar in a medium bowl and whisk until homogenous.",
            "In a clean bowl, whisk egg whites until stiff peaks form. In a large bowl, whisk egg yolks, buttermilk, and sour cream until smooth. Drizzle in melted butter while whisking. Fold in egg whites until just combined. Pour over dry mix and fold until just combined — batter should still have plenty of lumps.",
            "Heat a large nonstick skillet over medium heat for 5 minutes. Wipe with a paper towel. Use a 1/4-cup measure to place 4 pancakes in the skillet. Cook until bubbles form and bottoms are golden, about 2 minutes. Flip and cook until golden, about 2 minutes more. Serve with warm maple syrup.",
        ],
    },
    {
        id: "recipe_umami_overnightoats_v1",
        type: "recipe",
        name: "High Protein Overnight Oats",
        description: "Chill overnight or at least 5 hours before eating.",
        prepMins: 5,
        cookMins: 0,
        servings: 1,
        createdAt: 1766966293000,
        ingredients: [
            { id: "u_oat_1", amount: "0.5", unit: "cup",  name: "old-fashioned rolled oats" },
            { id: "u_oat_2", amount: "1",   unit: "",     name: "scoop protein powder (about 30g)" },
            { id: "u_oat_3", amount: "0.5", unit: "tbsp", name: "chia seeds" },
            { id: "u_oat_4", amount: "0.5", unit: "cup",  name: "milk" },
            { id: "u_oat_5", amount: "0.25",unit: "cup",  name: "non-fat greek yogurt" },
            { id: "u_oat_6", amount: "1-2", unit: "tsp",  name: "maple syrup or honey (optional)" },
        ],
        steps: [
            "Combine oats, protein powder, and chia seeds in a mason jar or Tupperware.",
            "Pour in milk, yogurt, and maple syrup. Mix well, making sure to break up any chunks of protein powder stuck on the bottom.",
            "Cover and refrigerate overnight or for at least 5 hours.",
            "Before eating, add toppings or extra flavourings of your choice.",
        ],
    },
    {
        id: "recipe_umami_buffalopockets_v1",
        type: "recipe",
        name: "Buffalo Chicken Hot Pockets",
        description: "Makes 10. High-protein dough: self-rising flour + Greek yogurt.",
        prepMins: 30,
        cookMins: 25,
        servings: 10,
        createdAt: 1765830303000,
        ingredients: [
            { id: "u_bhp_1",  amount: "500",  unit: "g",    name: "self rising flour (dough)" },
            { id: "u_bhp_2",  amount: "520",  unit: "g",    name: "Greek yogurt 0% fat (dough)" },
            { id: "u_bhp_3",  amount: "1",    unit: "tbsp", name: "garlic salt (dough)" },
            { id: "u_bhp_4",  amount: "1",    unit: "tbsp", name: "Italian seasoning (dough)" },
            { id: "u_bhp_5",  amount: "40",   unit: "oz",   name: "chicken breast" },
            { id: "u_bhp_6",  amount: "0.5",  unit: "tbsp", name: "garlic salt (filling)" },
            { id: "u_bhp_7",  amount: "0.5",  unit: "tbsp", name: "smoked paprika" },
            { id: "u_bhp_8",  amount: "2",    unit: "tbsp", name: "ranch seasoning" },
            { id: "u_bhp_9",  amount: "0.5",  unit: "tbsp", name: "black pepper (filling)" },
            { id: "u_bhp_10", amount: "4",    unit: "tbsp", name: "tomato salsa" },
            { id: "u_bhp_11", amount: "1",    unit: "cup",  name: "diced white onions" },
            { id: "u_bhp_12", amount: "0.5",  unit: "cup",  name: "buffalo sauce (filling)" },
            { id: "u_bhp_13", amount: "3.5",  unit: "cup",  name: "fat free mozzarella" },
            { id: "u_bhp_14", amount: "10",   unit: "g",    name: "fresh chives" },
            { id: "u_bhp_15", amount: "1.5",  unit: "cup",  name: "cottage cheese (sauce)" },
            { id: "u_bhp_16", amount: "2",    unit: "oz",   name: "1/3 fat cream cheese (sauce)" },
            { id: "u_bhp_17", amount: "0.5",  unit: "tbsp", name: "garlic salt (sauce)" },
            { id: "u_bhp_18", amount: "0.5",  unit: "tbsp", name: "black pepper (sauce)" },
            { id: "u_bhp_19", amount: "0.5",  unit: "tbsp", name: "onion powder (sauce)" },
            { id: "u_bhp_20", amount: "0.5",  unit: "cup",  name: "buffalo sauce (sauce)" },
            { id: "u_bhp_21", amount: "0.25", unit: "cup",  name: "fat free milk (sauce)" },
        ],
        steps: [
            "Dough: Mix self-rising flour, Greek yogurt, garlic salt, and Italian seasoning until a dough forms. Knead briefly until smooth.",
            "Chicken Filling: Season chicken with garlic salt, smoked paprika, ranch seasoning, and black pepper. Cook until done, then shred. Mix with salsa, onions, buffalo sauce, mozzarella, and chives.",
            "Buffalo Sauce: Blend cottage cheese, cream cheese, garlic salt, black pepper, onion powder, buffalo sauce, and milk until smooth.",
            "Assemble: Divide dough into 10 portions. Flatten each into a circle, add filling, seal, and shape into pockets.",
            "Bake at 400°F (200°C) for 20–25 minutes until golden.",
            "Freeze: Wrap in aluminium foil or airtight freezer bags. Store frozen for up to 1 month.",
            "Reheat: Wrap in a wet paper towel and microwave for 3–4 minutes. Air fry or pan-toast for a few minutes if you like it crispy.",
        ],
    },
    {
        id: "recipe_umami_freshpasta_v1",
        type: "recipe",
        name: "Homemade Fresh Pasta",
        description: "Makes about 1 lb (6 servings).",
        prepMins: 50,
        cookMins: 35,
        servings: 6,
        createdAt: 1743215198000,
        ingredients: [
            { id: "u_fpas_1", amount: "9", unit: "oz", name: "all-purpose flour (about 2 cups), plus more for dusting" },
            { id: "u_fpas_2", amount: "2", unit: "",   name: "whole large eggs" },
            { id: "u_fpas_3", amount: "4", unit: "",   name: "egg yolks" },
            { id: "u_fpas_4", amount: "1", unit: "tsp", name: "kosher salt" },
        ],
        steps: [
            "Make the Dough: Pour flour in a mound on a clean work surface. Make a 4-inch well in the centre. Pour in whole eggs, egg yolks, and salt; beat with a fork. Gradually incorporate flour into the eggs until a wet dough forms.",
            "Using a bench knife, fold additional flour into the dough until it feels firm and dry and can form a craggy ball, 2–5 minutes.",
            "Knead: Press the heel of your hand into the dough, pushing forward and down. Rotate 45° and repeat. Continue until smooth and elastic. Add flour if too wet; spray water if too dry.",
            "Wrap tightly in plastic wrap and rest on the counter for 30 minutes.",
            "Roll the Pasta: Cut dough into quarters. Flatten one quarter to 1/2 inch thick. Pass through pasta maker at widest setting 3 times.",
            "Fold both ends to meet at the centre, fold in half, flatten to 1/2 inch, and pass through 3 more times. Narrow the setting by 1 notch and repeat, reducing thickness each pass until dough is very delicate and slightly translucent.",
            "Lay rolled dough on a floured parchment-lined surface. Cover with plastic wrap. Repeat with remaining quarters. Cut into 12–14 inch segments for noodles.",
            "Cut Noodles: Feed dough through the pasta cutter or cut by hand to desired width. Dust lightly with flour, curl into nests, and place on parchment. Freeze on the baking sheet if not cooking immediately (keeps up to 3 weeks).",
            "Cook: Bring a large pot of salted water to a rolling boil. Cook pasta, tasting regularly, until just set with a definite bite, about 1.5–2 minutes. Drain, toss with sauce, and serve.",
        ],
    },
    {
        id: "recipe_umami_lambtwirls_v1",
        type: "recipe",
        name: "Lamb & Halloumi Sausage Roll Twirls",
        description: "Makes 12 twirls. Serve with yoghurt dipping sauce.",
        prepMins: 20,
        cookMins: 20,
        servings: 12,
        createdAt: 1765884351000,
        ingredients: [
            { id: "u_lam_1",  amount: "500", unit: "g",    name: "lamb mince (or mince of choice)" },
            { id: "u_lam_2",  amount: "1",   unit: "",     name: "bunch spring onions (white ends), finely diced" },
            { id: "u_lam_3",  amount: "1",   unit: "",     name: "bunch fresh parsley, finely chopped" },
            { id: "u_lam_4",  amount: "1",   unit: "tbsp", name: "cumin" },
            { id: "u_lam_5",  amount: "1",   unit: "tbsp", name: "coriander seeds" },
            { id: "u_lam_6",  amount: "1",   unit: "tbsp", name: "sesame seeds" },
            { id: "u_lam_7",  amount: "1",   unit: "tbsp", name: "salt" },
            { id: "u_lam_8",  amount: "1",   unit: "tbsp", name: "black pepper" },
            { id: "u_lam_9",  amount: "100", unit: "g",    name: "halloumi, grated" },
            { id: "u_lam_10", amount: "1",   unit: "",     name: "pack ready roll puff pastry" },
            { id: "u_lam_11", amount: "2",   unit: "",     name: "eggs" },
            { id: "u_lam_12", amount: "1",   unit: "tsp",  name: "paprika (optional, for egg wash)" },
            { id: "u_lam_13", amount: "1",   unit: "tsp",  name: "turmeric (optional, for egg wash)" },
            { id: "u_lam_14", amount: "",    unit: "",     name: "butter, for greasing" },
            { id: "u_lam_15", amount: "",    unit: "",     name: "extra halloumi, for topping" },
            { id: "u_lam_16", amount: "",    unit: "",     name: "honey or maple syrup, for glazing" },
            { id: "u_lam_17", amount: "300", unit: "g",    name: "Greek yoghurt 5% (for dipping sauce)" },
            { id: "u_lam_18", amount: "2",   unit: "tbsp", name: "sesame oil (for dipping sauce)" },
            { id: "u_lam_19", amount: "1",   unit: "",     name: "bunch spring onions (green ends), finely diced (for sauce)" },
            { id: "u_lam_20", amount: "2",   unit: "",     name: "cloves garlic, minced (for sauce)" },
            { id: "u_lam_21", amount: "0.5", unit: "",     name: "lemon, juiced (for sauce)" },
            { id: "u_lam_22", amount: "2",   unit: "",     name: "big pinches salt (for sauce)" },
            { id: "u_lam_23", amount: "",    unit: "",     name: "fresh cracked black pepper (for sauce)" },
        ],
        steps: [
            "Preheat oven to 200°C (400°F).",
            "Toast cumin, coriander, and sesame seeds in a dry pan over medium heat. Combine lamb mince, spring onion whites, parsley, toasted seeds, salt, pepper, and grated halloumi in a large bowl. Mix well.",
            "Spread puff pastry flat. Press the meat mixture evenly across the entire surface.",
            "Whisk eggs with optional paprika and turmeric. Brush inside the roll and on the exterior while rolling up lengthways.",
            "Cut the log into 12 pieces — mark halfway, then quarter, then each quarter into 3.",
            "Grease a cupcake tray with butter (or use a flat tray with baking paper). Place twirls in the tray. Brush with egg wash and bake for 15 minutes.",
            "Brush with glaze (honey or maple syrup) and add extra halloumi. Bake at highest heat for a further 5 minutes until golden brown.",
            "Remove from tins immediately to a drying rack to prevent sogginess.",
            "Dipping Sauce: Mix Greek yoghurt, sesame oil, spring onion greens, garlic, lemon juice, salt, and pepper. Serve alongside the twirls.",
        ],
    },
    {
        id: "recipe_umami_buffalowings_v1",
        type: "recipe",
        name: "Air Fryer Buffalo Wings",
        description: "",
        prepMins: 60,
        cookMins: 18,
        servings: 6,
        createdAt: 1759108946000,
        ingredients: [
            { id: "u_afbw_1",  amount: "4",   unit: "lb",   name: "chicken wings" },
            { id: "u_afbw_2",  amount: "2",   unit: "tsp",  name: "smoked paprika" },
            { id: "u_afbw_3",  amount: "1.5", unit: "tsp",  name: "garlic powder" },
            { id: "u_afbw_4",  amount: "1.5", unit: "tsp",  name: "onion powder" },
            { id: "u_afbw_5",  amount: "1",   unit: "tsp",  name: "dried thyme" },
            { id: "u_afbw_6",  amount: "0.5", unit: "tsp",  name: "black pepper" },
            { id: "u_afbw_7",  amount: "0.5", unit: "",     name: "stick butter, melted" },
            { id: "u_afbw_8",  amount: "0.5", unit: "cup",  name: "Frank's hot sauce" },
            { id: "u_afbw_9",  amount: "0.5", unit: "cup",  name: "chunky blue cheese dressing" },
            { id: "u_afbw_10", amount: "3",   unit: "tbsp", name: "crumbled blue cheese or gorgonzola (optional)" },
        ],
        steps: [
            "Pat chicken wings dry with paper towels and transfer to a large bowl.",
            "Season with smoked paprika, garlic powder, onion powder, dried thyme, and black pepper. Marinate for at least 30 minutes, or as long as overnight.",
            "Air fry wings in batches at 400°F (200°C) for 18 minutes. Keep finished batches warm in an oven at 170°F while cooking the rest.",
            "While wings cook, whisk together the melted butter and Frank's hot sauce until emulsified.",
            "Optionally, mix blue cheese dressing with crumbled blue cheese or gorgonzola.",
            "Toss cooked wings in the buffalo sauce and serve with blue cheese sauce.",
        ],
    },
    {
        id: "recipe_umami_sausagepasta_v1",
        type: "recipe",
        name: "Spicy Italian Sausage Pasta",
        description: "",
        prepMins: 10,
        cookMins: 20,
        servings: 4,
        createdAt: 1767842859000,
        ingredients: [
            { id: "u_sisp_1",  amount: "8",   unit: "oz",   name: "uncooked penne" },
            { id: "u_sisp_2",  amount: "11",  unit: "oz",   name: "hot Italian sausages" },
            { id: "u_sisp_3",  amount: "3",   unit: "",     name: "cloves garlic, minced" },
            { id: "u_sisp_4",  amount: "0.5", unit: "cup",  name: "chicken broth or white wine" },
            { id: "u_sisp_5",  amount: "0.5", unit: "tbsp", name: "flour" },
            { id: "u_sisp_6",  amount: "14",  unit: "oz",   name: "can diced tomatoes (with juices)" },
            { id: "u_sisp_7",  amount: "0.5", unit: "cup",  name: "heavy/whipping cream" },
            { id: "u_sisp_8",  amount: "",    unit: "",     name: "salt & pepper, to taste" },
            { id: "u_sisp_9",  amount: "",    unit: "",     name: "small handful fresh basil" },
            { id: "u_sisp_10", amount: "",    unit: "",     name: "freshly grated parmesan, to taste" },
        ],
        steps: [
            "Bring a large pot of salted water to a boil. Cook pasta al dente per package directions.",
            "Remove sausage meat from casings and crumble into a skillet. Cook over medium-high heat for 5–6 minutes until browned. Remove to a plate and drain most of the fat.",
            "Add garlic to the skillet, then pour in chicken broth. Sprinkle in flour and whisk until dissolved, scraping up any browned bits. Cook until significantly reduced, 1–2 minutes.",
            "Add diced tomatoes, cream, and sausage. Simmer until sauce thickens to your liking. Season with salt and pepper.",
            "Just before serving, add torn basil and toss with the drained pasta. Serve with freshly grated parmesan.",
        ],
    },
];

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
            spices: [...COMMON_SPICES],

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

            addSpice: (name) =>
                set((s) => {
                    const trimmed = name.trim();
                    if (!trimmed || s.spices.includes(trimmed)) return s;
                    return { spices: [...s.spices, trimmed].sort((a, b) => a.localeCompare(b)) };
                }),

            removeSpice: (name) =>
                set((s) => ({ spices: s.spices.filter((sp) => sp !== name) })),
        }),
        {
            name: "recipe-storage",
            storage: createJSONStorage(() => AsyncStorage),
            version: 3,
            migrate: (state: unknown, version: number) => {
                const s = (state ?? {}) as { recipes?: Recipe[]; spices?: string[] };
                if (version === 0) {
                    const already = (s.recipes ?? []).some((r) => r.id === CLUBHOUSE_BBQ_CHICKEN.id);
                    return {
                        ...s,
                        recipes: already ? s.recipes : [CLUBHOUSE_BBQ_CHICKEN, ...(s.recipes ?? [])],
                        spices: [...COMMON_SPICES],
                    };
                }
                if (version === 1) {
                    return { ...s, spices: [...COMMON_SPICES] };
                }
                if (version === 2) {
                    const existingIds = new Set((s.recipes ?? []).map((r) => r.id));
                    const toAdd = UMAMI_RECIPES.filter((r) => !existingIds.has(r.id));
                    return { ...s, recipes: [...toAdd, ...(s.recipes ?? [])] };
                }
                return s;
            },
        }
    )
);
