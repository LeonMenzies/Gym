import { LoginContainer } from "~screens/auth/LoginContainer";
import { SignupContainer } from "~screens/auth/SignupContainer";
import { CustomNavigator } from "~navigation/CustomNavigator";

const routes = [
    {
        name: "login",
        component: LoginContainer,
        protected: false,
    },
    {
        name: "signup",
        component: SignupContainer,
        protected: false,
    },
];

export const AuthNavigator = () => {
    return <CustomNavigator routes={routes} initialRoute="login" />;
};
