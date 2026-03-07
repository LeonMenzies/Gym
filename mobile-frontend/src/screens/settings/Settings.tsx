import { FC, useState } from "react";
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useSettingsStore, useTheme } from "~store/settingsStore";
import { useTimerStore } from "~store/timerStore";
import { SettingsSelectItem } from "~screens/settings/SettingsSelectItem";
import { exportData, importData, clearAllData } from "~utils/dataService";
import {
    requestNotificationPermission,
    scheduleReminder,
    cancelReminder,
    STRETCH_REMINDER_ID,
    TODO_REMINDER_ID,
} from "~utils/notifications";

type Props = { navigation: any };

type PickerState = {
    visible: boolean;
    target: "stretch" | "todo" | null;
    date: Date;
};

export const Settings: FC<Props> = ({ navigation }) => {
    const colors = useTheme();
    const { theme, metricType, stretchReminder, todoReminder, setTheme, setMetricType, setStretchReminder, setTodoReminder } = useSettingsStore();
    const { gymRestSeconds, setGymRestSeconds } = useTimerStore();

    const [picker, setPicker] = useState<PickerState>({ visible: false, target: null, date: new Date() });
    const [pickerDate, setPickerDate] = useState(new Date());

    const formatTime = (h: number, m: number) => {
        const period = h >= 12 ? "PM" : "AM";
        const hour = h % 12 === 0 ? 12 : h % 12;
        const min = String(m).padStart(2, "0");
        return `${hour}:${min} ${period}`;
    };

    const openPicker = async (target: "stretch" | "todo") => {
        const config = target === "stretch" ? stretchReminder : todoReminder;
        const d = new Date();
        d.setHours(config.hour, config.minute, 0, 0);
        setPickerDate(d);
        setPicker({ visible: true, target, date: d });
    };

    const handlePickerConfirm = async () => {
        const { target } = picker;
        const hour = pickerDate.getHours();
        const minute = pickerDate.getMinutes();
        setPicker((p) => ({ ...p, visible: false }));

        if (target === "stretch") {
            await scheduleReminder(STRETCH_REMINDER_ID, "Time to stretch", "Your daily stretch routine is waiting.", hour, minute);
            setStretchReminder({ enabled: true, hour, minute });
        } else if (target === "todo") {
            await scheduleReminder(TODO_REMINDER_ID, "Check your to-do list", "See what's on your list today.", hour, minute);
            setTodoReminder({ enabled: true, hour, minute });
        }
    };

    const handleStretchToggle = async (enabled: boolean) => {
        if (enabled) {
            const granted = await requestNotificationPermission();
            if (!granted) {
                Alert.alert("Permission denied", "Enable notifications in iOS Settings to use reminders.");
                return;
            }
            await openPicker("stretch");
        } else {
            await cancelReminder(STRETCH_REMINDER_ID);
            setStretchReminder({ enabled: false, hour: stretchReminder.hour, minute: stretchReminder.minute });
        }
    };

    const handleTodoToggle = async (enabled: boolean) => {
        if (enabled) {
            const granted = await requestNotificationPermission();
            if (!granted) {
                Alert.alert("Permission denied", "Enable notifications in iOS Settings to use reminders.");
                return;
            }
            await openPicker("todo");
        } else {
            await cancelReminder(TODO_REMINDER_ID);
            setTodoReminder({ enabled: false, hour: todoReminder.hour, minute: todoReminder.minute });
        }
    };

    const handleImport = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: "application/json", copyToCacheDirectory: true });
            if (result.canceled) return;
            const json = await FileSystem.readAsStringAsync(result.assets[0].uri);
            const success = await importData(json);
            if (success) Alert.alert("Import successful", "Your data has been restored. Please restart the app.");
        } catch (e) {
            Alert.alert("Import failed", String(e));
        }
    };

    const handleClear = () => {
        Alert.alert("Clear all data", "This will permanently delete all your app data. This cannot be undone.", [
            { text: "Cancel", style: "cancel" },
            { text: "Clear", style: "destructive", onPress: async () => { await clearAllData(); Alert.alert("Done", "All data cleared. Please restart the app."); } },
        ]);
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
                    <SettingsSelectItem title="Dark Mode" value={theme === "DARK"} callBack={(val) => setTheme(val ? "DARK" : "LIGHT")} />
                </View>

                <Text style={s.sectionLabel}>Units</Text>
                <View style={s.section}>
                    <SettingsSelectItem title="Use Metric" value={metricType === "METRIC"} callBack={(val) => setMetricType(val ? "METRIC" : "IMPERIAL")} />
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
                            minimumValue={15} maximumValue={120} step={15}
                            value={gymRestSeconds} onValueChange={setGymRestSeconds}
                            minimumTrackTintColor={colors.primary}
                            maximumTrackTintColor={colors.lightGrey}
                            thumbTintColor={colors.primary}
                        />
                    </View>
                </View>

                <Text style={s.sectionLabel}>Reminders</Text>
                <View style={s.section}>
                    <SettingsSelectItem title="Daily stretch reminder" value={stretchReminder.enabled} callBack={handleStretchToggle} />
                    {stretchReminder.enabled && (
                        <>
                            <View style={[s.divider, { backgroundColor: colors.background }]} />
                            <TouchableOpacity style={s.row} onPress={() => openPicker("stretch")}>
                                <Icon name="clock" size={18} color={colors.primary} style={s.rowIcon} />
                                <Text style={s.rowText}>Time</Text>
                                <Text style={[s.timeValue, { color: colors.primary }]}>
                                    {formatTime(stretchReminder.hour, stretchReminder.minute)}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <View style={[s.divider, { backgroundColor: colors.background }]} />
                    <SettingsSelectItem title="Daily to-do reminder" value={todoReminder.enabled} callBack={handleTodoToggle} />
                    {todoReminder.enabled && (
                        <>
                            <View style={[s.divider, { backgroundColor: colors.background }]} />
                            <TouchableOpacity style={s.row} onPress={() => openPicker("todo")}>
                                <Icon name="clock" size={18} color={colors.primary} style={s.rowIcon} />
                                <Text style={s.rowText}>Time</Text>
                                <Text style={[s.timeValue, { color: colors.primary }]}>
                                    {formatTime(todoReminder.hour, todoReminder.minute)}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
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

            {/* Time picker modal */}
            <Modal visible={picker.visible} transparent animationType="fade">
                <View style={s.pickerOverlay}>
                    <TouchableOpacity style={StyleSheet.absoluteFillObject} onPress={() => setPicker((p) => ({ ...p, visible: false }))} />
                    <View style={[s.pickerCard, { backgroundColor: colors.backgroundSecondary }]}>
                        <View style={s.pickerHeader}>
                            <TouchableOpacity onPress={() => setPicker((p) => ({ ...p, visible: false }))}>
                                <Text style={[s.pickerCancel, { color: colors.textSecondary }]}>Cancel</Text>
                            </TouchableOpacity>
                            <Text style={[s.pickerTitle, { color: colors.textPrimary }]}>Set time</Text>
                            <TouchableOpacity onPress={handlePickerConfirm}>
                                <Text style={[s.pickerDone, { color: colors.primary }]}>Done</Text>
                            </TouchableOpacity>
                        </View>
                        <DateTimePicker
                            value={pickerDate}
                            mode="time"
                            display="spinner"
                            onChange={(_, date) => { if (date) setPickerDate(date); }}
                            style={s.picker}
                            textColor={colors.textPrimary}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = (colors: ReturnType<typeof useTheme>) =>
    StyleSheet.create({
        container: { flex: 1, backgroundColor: colors.background, paddingTop: 60, paddingHorizontal: 20 },
        header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 28 },
        backBtn: { width: 36, height: 36, alignItems: "center", justifyContent: "center" },
        title: { fontSize: 20, fontWeight: "700", color: colors.textPrimary },
        sectionLabel: {
            fontSize: 12, fontWeight: "600", color: colors.textSecondary,
            textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6, marginLeft: 4,
        },
        section: { backgroundColor: colors.backgroundSecondary, borderRadius: 12, marginBottom: 28, overflow: "hidden" },
        row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 16 },
        rowIcon: { marginRight: 12, width: 20 },
        rowText: { flex: 1, fontSize: 16, color: colors.textPrimary },
        timeValue: { fontSize: 16, fontWeight: "500" },
        divider: { height: 1, marginLeft: 48 },
        sliderRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4 },
        sliderValue: { fontSize: 16, fontWeight: "600", color: colors.primary },
        sliderWrapper: { paddingHorizontal: 16, paddingBottom: 8 },
        slider: { width: "100%", height: 40 },
        // Picker modal
        pickerOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            alignItems: "center",
            justifyContent: "center",
        },
        pickerCard: {
            width: "80%",
            borderRadius: 18,
            overflow: "hidden",
        },
        pickerHeader: {
            flexDirection: "row", alignItems: "center", justifyContent: "space-between",
            paddingHorizontal: 20, paddingVertical: 14,
            borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.lightGrey,
        },
        pickerCancel: { fontSize: 16 },
        pickerTitle: { fontSize: 16, fontWeight: "600" },
        pickerDone: { fontSize: 16, fontWeight: "600" },
        picker: { width: "100%" },
    });
