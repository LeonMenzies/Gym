import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StretchBuilderScreen } from "~screens/timer/StretchBuilderScreen";
import { StretchRunnerScreen } from "~screens/timer/StretchRunnerScreen";
import { TimerScreen } from "~screens/timer/TimerScreen";
import { TimerStackParamList } from "~types/Types";

const Stack = createNativeStackNavigator<TimerStackParamList>();

export const TimerNavigator = () => (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TimerHome" component={TimerScreen} />
        <Stack.Screen name="StretchBuilder" component={StretchBuilderScreen} />
        <Stack.Screen name="StretchRunner" component={StretchRunnerScreen} />
    </Stack.Navigator>
);
