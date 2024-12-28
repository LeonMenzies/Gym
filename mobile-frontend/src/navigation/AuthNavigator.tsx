import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { themeAtom } from "../recoil/themeAtom";
import { LoginContainer } from "~screens/auth/LoginContainer";
import { SignupContainer } from "~screens/auth/SignupContainer";
import { AuthStackParamList } from "~types/Types";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
    const colors = useRecoilValue(themeAtom);

    return (
        <Stack.Navigator
            id={undefined}
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="Login" component={LoginContainer} />
            <Stack.Screen name="Signup" component={SignupContainer} />
        </Stack.Navigator>
    );
};
