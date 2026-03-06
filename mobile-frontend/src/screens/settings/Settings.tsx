import { FC } from "react";
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useSettingsStore, useTheme } from "~store/settingsStore";
import { useTimerStore } from "~store/timerStore";
import { SettingsSelectItem } from "~screens/settings/SettingsSelectItem";
import { exportData, importData, clearAllData } from "~utils/dataService";

type Props = { navigation: any };

export const Settings: FC<Props> = ({ navigation }) => {
    const colors = useTheme();
    const { theme, metricType, setTheme, setMetricType } = useSettingsStore();
    const { gymRestSeconds, setGymRestSeconds } = useTimerStore();

    const handleImport = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/json",
                copyToCacheDirectory: true,
            });
            if (result.canceled) return;
            const asset = result.assets[0];
            const json = await FileSystem.readAsStringAsync(asset.uri);
            const success = await importData(json);
            if (success) {
                Alert.alert(
                    "Import successful",
                    "Your data has been restored. Please restart the app for all changes to take effect.",
                );
            }
        } catch (e) {
            Alert.alert("Import failed", String(e));
        }
    };

    const handleClear = () => {
        Alert.alert(
            "Clear all data",
            "This will permanently delete all your app data. This cannot be undone.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Clear",
                    style: "destructive",
                    onPress: async () => {
                        await clearAllData();
                        Alert.alert("Done", "All data cleared. Please restart the app.");
                    },
                },
            ],
        );
    };

    const s = styles(colors);

    const formatSeconds = (secs: number) => {
        if (secs < 60) return `${secs}s`;
        const m = Math.floor(secs / 60);
        const rem = secs % 60;
        return rem === 0 ? `${m}m` : `${m}m ${rem}s`;
    };

    return (
        <View style={s.container}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Icon name="arrow-left" size={18} color={colors.primary} />
                </TouchableOpacity>
                <Text style={s.title}>Settings</Text>
                <View style={s.backBtn} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={s.sectionLabel}>Appearance</Text>
                <View style={s.section}>
                    <SettingsSelectItem
                        title="Dark Mode"
                        value={theme === "DARK"}
                        callBack={(val) => setTheme(val ? "DARK" : "LIGHT")}
                    />
                </View>

                <Text style={s.sectionLabel}>Units</Text>
                <View style={s.section}>
                    <SettingsSelectItem
                        title="Use Metric"
                        value={metricType === "METRIC"}
                        callBack={(val) => setMetricType(val ? "METRIC" : "IMPERIAL")}
                    />
                </View>

                <Text style={s.sectionLabel}>Gym Timer</Text>
                <View style={s.section}>
                    <View style={s.sliderRow}>
                        <Text style={s.rowText}>Default rest duration</Text>
                        <Text style={s.sliderValue}>{formatSeconds(gymRestSeconds)}</Text>
                    </View>
                    <View style={s.sliderWrapper}>
                        <Slider
                            style={s.slider}
                            minimumValue={15}
                            maximumValue={120}
                            step={15}
                            value={gymRestSeconds}
                            onValueChange={setGymRestSeconds}
                            minimumTrackTintColor={colors.primary}
                            maximumTrackTintColor={colors.lightGrey}
                            thumbTintColor={colors.primary}
                        />
                    </View>
                </View>

                <Text style={s.sectionLabel}>Data</Text>
                <View style={s.section}>
                    <TouchableOpacity style={s.row} onPress={exportData} activeOpacity={0.7}>
                        <Icon name="cloud-upload" size={18} color={colors.primary} style={s.rowIcon} />
                        <Text style={s.rowText}>Export backup</Text>
                        <Icon name="arrow-right" size={14} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <View style={[s.divider, { backgroundColor: colors.backgroundSecondary }]} />
                    <TouchableOpacity style={s.row} onPress={handleImport} activeOpacity={0.7}>
                        <Icon name="cloud-download" size={18} color={colors.primary} style={s.rowIcon} />
                        <Text style={s.rowText}>Import backup</Text>
                        <Icon name="arrow-right" size={14} color={colors.textSecondary} />
                    </TouchableOpacity>
                    <View style={[s.divider, { backgroundColor: colors.backgroundSecondary }]} />
                    <TouchableOpacity style={s.row} onPress={handleClear} activeOpacity={0.7}>
                        <Icon name="trash" size={18} color={colors.error} style={s.rowIcon} />
                        <Text style={[s.rowText, { color: colors.error }]}>Clear all data</Text>
                        <Icon name="arrow-right" size={14} color={colors.error} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = (colors: ReturnType<typeof useTheme>) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: 60,
            paddingHorizontal: 20,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
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
            color: colors.textPrimary,
        },
        sectionLabel: {
            fontSize: 12,
            fontWeight: "600",
            color: colors.textSecondary,
            textTransform: "uppercase",
            letterSpacing: 0.8,
            marginBottom: 6,
            marginLeft: 4,
        },
        section: {
            backgroundColor: colors.backgroundSecondary,
            borderRadius: 12,
            marginBottom: 28,
            overflow: "hidden",
        },
        row: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
        },
        rowIcon: {
            marginRight: 12,
            width: 20,
        },
        rowText: {
            flex: 1,
            fontSize: 16,
            color: colors.textPrimary,
        },
        divider: {
            height: 1,
            marginLeft: 48,
        },
        sliderRow: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 4,
        },
        sliderValue: {
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary,
        },
        sliderWrapper: {
            paddingHorizontal: 16,
            paddingBottom: 8,
        },
        slider: {
            width: "100%",
            height: 40,
        },
    });
