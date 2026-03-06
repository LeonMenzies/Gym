import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useTheme } from "~store/settingsStore";
import { useComponentStore } from "~store/componentStore";
import { COMPONENT_REGISTRY } from "~navigation/componentRegistry";
import { DashboardNavigator } from "~navigation/DashboardNavigator";
import { TabParamList } from "~types/Types";

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
    const colors = useTheme();
    const { activeComponents } = useComponentStore();

    // Center Dashboard: split active components left and right of it
    const dashboardPos = Math.floor(activeComponents.length / 2);
    const leftComponents = activeComponents.slice(0, dashboardPos);
    const rightComponents = activeComponents.slice(dashboardPos);

    const renderComponent = (id: string) => {
        const def = COMPONENT_REGISTRY.find((c) => c.id === id)!;
        const tabName = (def.id.charAt(0).toUpperCase() + def.id.slice(1)) as keyof TabParamList;
        return (
            <Tab.Screen
                key={id}
                name={tabName}
                component={def.navigator}
                options={{
                    tabBarLabel: def.tabLabel,
                    tabBarIcon: ({ color }) => <Icon name={def.icon as any} size={22} color={color} />,
                }}
            />
        );
    };

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
            {leftComponents.map(renderComponent)}

            <Tab.Screen
                name="Dashboard"
                component={DashboardNavigator}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="grid" size={22} color={color} />,
                }}
            />

            {rightComponents.map(renderComponent)}
        </Tab.Navigator>
    );
};
