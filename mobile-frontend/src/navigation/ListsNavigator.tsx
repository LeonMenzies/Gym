import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListsScreen } from "~screens/lists/ListsScreen";
import { NoteEditorScreen } from "~screens/notes/NoteEditorScreen";

export type ListsStackParamList = {
    ListsHome: undefined;
    NoteEditor: { noteId: string };
};

const Stack = createNativeStackNavigator<ListsStackParamList>();

export const ListsNavigator = () => (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ListsHome" component={ListsScreen} />
        <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
    </Stack.Navigator>
);
