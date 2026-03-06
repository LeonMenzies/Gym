import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { useSettingsStore, useTheme } from "~store/settingsStore";
import { SettingsSelectItem } from "~screens/settings/SettingsSelectItem";

type Props = { navigation: any };

export const Settings: FC<Props> = ({ navigation }) => {
    const colors = useTheme();
    const { theme, metricType, setTheme, setMetricType } = useSettingsStore();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={18} color={colors.primary} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.textPrimary }]}>Settings</Text>
                <View style={styles.backBtn} />
            </View>
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
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
    },
    backBtn: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
    },
});
