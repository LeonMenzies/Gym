import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListsScreen } from "~screens/lists/ListsScreen";
import { NoteEditorScreen } from "~screens/notes/NoteEditorScreen";
import { SubscriptionsBlockScreen } from "~screens/notes/SubscriptionsBlockScreen";
import { MediaBlockScreen } from "~screens/notes/MediaBlockScreen";
import { KeyValueBlockScreen } from "~screens/notes/KeyValueBlockScreen";

export type ListsStackParamList = {
    ListsHome: undefined;
    NoteEditor: { blockId: string };
    SubscriptionsBlock: { blockId: string };
    MediaBlock: { blockId: string };
    KeyValueBlock: { blockId: string };
};

const Stack = createNativeStackNavigator<ListsStackParamList>();

export const ListsNavigator = () => (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ListsHome" component={ListsScreen} />
        <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
        <Stack.Screen name="SubscriptionsBlock" component={SubscriptionsBlockScreen} />
        <Stack.Screen name="MediaBlock" component={MediaBlockScreen} />
        <Stack.Screen name="KeyValueBlock" component={KeyValueBlockScreen} />
    </Stack.Navigator>
);
