import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardScreen } from "~screens/dashboard/DashboardScreen";
import { Settings } from "~screens/settings/Settings";

export type DashboardStackParamList = {
    DashboardHome: undefined;
    Settings: undefined;
};

const Stack = createNativeStackNavigator<DashboardStackParamList>();

export const DashboardNavigator = () => (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashboardHome" component={DashboardScreen} />
        <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
);
