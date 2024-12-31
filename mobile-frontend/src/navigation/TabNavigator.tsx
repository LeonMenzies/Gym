import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "screens/home/Home";
import { Rest } from "screens/rest/Rest";
import { Settings } from "screens/settings/Settings";
import { TabParamList } from "~types/Types";

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
    const colors = useRecoilValue(themeAtom);

    return (
        <Tab.Navigator
            id={undefined}
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.secondary,
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Rest"
                component={Rest}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="clock" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="settings" size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};
