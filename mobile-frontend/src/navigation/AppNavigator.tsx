import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";

import { userAtom } from "~recoil/userAtom";
import { ACCOUNT_ACTIVE_STATUS, ACCOUNT_ONBOARDING_STATUS } from "~utils/Constants";
import { RootStackParamList } from "~types/Types";

import { AuthNavigator } from "~navigation/AuthNavigator";
import { TabNavigator } from "~navigation/TabNavigator";
import { OnboardingNavigator } from "~navigation/OnboardingNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    const user = useRecoilValue(userAtom);

    const fetchStack = () => {
        if (user.jwt && user.account_status == ACCOUNT_ACTIVE_STATUS) {
            return <Stack.Screen name="Main" component={TabNavigator} />;
        } else if (user.account_status == ACCOUNT_ONBOARDING_STATUS) {
            return <Stack.Screen name="Onboarding" component={OnboardingNavigator} />;
        } else {
            return <Stack.Screen name="Auth" component={AuthNavigator} />;
        }
    };

    return (
        <NavigationContainer>
            <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
                {fetchStack()}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
