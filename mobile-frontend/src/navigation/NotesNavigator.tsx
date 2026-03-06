import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NoteEditorScreen } from "~screens/notes/NoteEditorScreen";
import { NotesScreen } from "~screens/notes/NotesScreen";
import { SubscriptionsBlockScreen } from "~screens/notes/SubscriptionsBlockScreen";
import { MediaBlockScreen } from "~screens/notes/MediaBlockScreen";
import { KeyValueBlockScreen } from "~screens/notes/KeyValueBlockScreen";

export type NotesStackParamList = {
    NotesList: undefined;
    NoteEditor: { blockId: string };
    SubscriptionsBlock: { blockId: string };
    MediaBlock: { blockId: string };
    KeyValueBlock: { blockId: string };
};

const Stack = createNativeStackNavigator<NotesStackParamList>();

export const NotesNavigator = () => (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="NotesList" component={NotesScreen} />
        <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
        <Stack.Screen name="SubscriptionsBlock" component={SubscriptionsBlockScreen} />
        <Stack.Screen name="MediaBlock" component={MediaBlockScreen} />
        <Stack.Screen name="KeyValueBlock" component={KeyValueBlockScreen} />
    </Stack.Navigator>
);
