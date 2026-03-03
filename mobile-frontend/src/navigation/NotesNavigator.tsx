import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NoteEditorScreen } from "~screens/notes/NoteEditorScreen";
import { NotesScreen } from "~screens/notes/NotesScreen";

export type NotesStackParamList = {
    NotesList: undefined;
    NoteEditor: { noteId: string };
};

const Stack = createNativeStackNavigator<NotesStackParamList>();

export const NotesNavigator = () => (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NotesList" component={NotesScreen} />
        <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
    </Stack.Navigator>
);
