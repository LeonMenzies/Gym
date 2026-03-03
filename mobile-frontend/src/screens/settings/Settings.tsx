import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useSettingsStore, useTheme } from "~store/settingsStore";
import { SettingsSelectItem } from "~screens/settings/SettingsSelectItem";

export const Settings: FC = () => {
    const colors = useTheme();
    const { theme, metricType, setTheme, setMetricType } = useSettingsStore();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <SettingsSelectItem
                title={theme === "LIGHT" ? "Light Mode" : "Dark Mode"}
                value={theme === "LIGHT"}
                callBack={(val) => setTheme(val ? "LIGHT" : "DARK")}
            />
            <SettingsSelectItem
                title="Use Metric"
                value={metricType === "METRIC"}
                callBack={(val) => setMetricType(val ? "METRIC" : "IMPERIAL")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 60,
        paddingHorizontal: 20,
    },
});
