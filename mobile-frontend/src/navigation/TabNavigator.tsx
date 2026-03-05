import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useTheme } from "~store/settingsStore";

import { ListsNavigator } from "~navigation/ListsNavigator";
import { TimerNavigator } from "~navigation/TimerNavigator";
import { DashboardScreen } from "~screens/dashboard/DashboardScreen";
import { RecipesScreen } from "~screens/recipes/RecipesScreen";
import { Settings } from "~screens/settings/Settings";
import { TabParamList } from "~types/Types";

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
    const colors = useTheme();

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
                name="Timer"
                component={TimerNavigator}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="clock" size={22} color={color} />,
                }}
            />
            <Tab.Screen
                name="Recipes"
                component={RecipesScreen}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="notebook" size={22} color={color} />,
                }}
            />
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="grid" size={22} color={color} />,
                }}
            />
            <Tab.Screen
                name="Lists"
                component={ListsNavigator}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="list" size={22} color={color} />,
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="settings" size={22} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};
