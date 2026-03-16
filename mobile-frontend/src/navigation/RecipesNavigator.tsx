import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RecipeEditorScreen } from "~screens/recipes/RecipeEditorScreen";
import { RecipesScreen } from "~screens/recipes/RecipesScreen";
import { SpiceListScreen } from "~screens/recipes/SpiceListScreen";

export type RecipesStackParamList = {
    RecipesList: undefined;
    RecipeEditor: { recipeId: string };
    SpiceList: undefined;
};

const Stack = createNativeStackNavigator<RecipesStackParamList>();

export const RecipesNavigator = () => (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RecipesList" component={RecipesScreen} />
        <Stack.Screen name="RecipeEditor" component={RecipeEditorScreen} />
        <Stack.Screen name="SpiceList" component={SpiceListScreen} />
    </Stack.Navigator>
);
