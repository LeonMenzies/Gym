import { Tabs } from "expo-router";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useTheme } from "~store/settingsStore";

export default function TabLayout() {
    const colors = useTheme();

    return (
        <Tabs
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
            <Tabs.Screen
                name="timer"
                options={{
                    tabBarLabel: "Timer",
                    tabBarIcon: ({ color }) => <Icon name="clock" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="todo"
                options={{
                    tabBarLabel: "To-Do",
                    tabBarIcon: ({ color }) => <Icon name="check" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{
                    tabBarLabel: "Dashboard",
                    tabBarIcon: ({ color }) => <Icon name="grid" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="recipes"
                options={{
                    tabBarLabel: "Recipes",
                    tabBarIcon: ({ color }) => <Icon name="notebook" size={22} color={color} />,
                }}
            />
            <Tabs.Screen
                name="notes"
                options={{
                    tabBarLabel: "Notes",
                    tabBarIcon: ({ color }) => <Icon name="note" size={22} color={color} />,
                }}
            />
        </Tabs>
    );
}
