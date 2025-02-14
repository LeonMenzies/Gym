import React, { createContext, useContext, useState, useEffect } from "react";
import { View, Animated } from "react-native";
import { useRecoilValue } from "recoil";
import { userAtom } from "~recoil/userAtom";
import { themeAtom } from "~recoil/themeAtom";
import { NavigationState, Route } from "~types/Types";

const NavigationContext = createContext<{
    navigate: (routeName: string) => void;
    currentRoute: string;
} | null>(null);

export const useNavigation = () => {
    const context = useContext(NavigationContext);
    if (!context) throw new Error("useNavigation must be used within NavigationProvider");
    return context;
};

type Props = {
    routes: Route[];
    initialRoute: string;
};

export const CustomNavigator: React.FC<Props> = ({ routes, initialRoute }) => {
    const [state, setState] = useState<NavigationState>({
        currentRoute: initialRoute,
        history: [initialRoute],
    });
    const user = useRecoilValue(userAtom);
    const colors = useRecoilValue(themeAtom);

    const navigate = (routeName: string) => {
        const route = routes.find((r) => r.name === routeName);
        if (!route) return;

        if (route.requiresAuth && !user.jwt) {
            setState((prev) => ({
                currentRoute: "Login",
                history: [...prev.history, "Login"],
            }));
            return;
        }

        setState((prev) => ({
            currentRoute: routeName,
            history: [...prev.history, routeName],
        }));
    };

    const CurrentComponent = routes.find((r) => r.name === state.currentRoute)?.component;

    return (
        <NavigationContext.Provider value={{ navigate, currentRoute: state.currentRoute }}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>{CurrentComponent && <CurrentComponent />}</View>
        </NavigationContext.Provider>
    );
};
