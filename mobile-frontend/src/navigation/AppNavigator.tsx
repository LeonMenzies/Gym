import { TabNavigator } from "~navigation/TabNavigator";
import { useTheme } from "~store/settingsStore";
import { View } from "react-native";

export const AppNavigator = () => {
    const colors = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <TabNavigator />
        </View>
    );
};
