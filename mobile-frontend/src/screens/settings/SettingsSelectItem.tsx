import { FC } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "~store/settingsStore";

type SettingsT = {
    title: string;
    callBack: (value: boolean) => void;
    value: boolean;
};

export const SettingsSelectItem: FC<SettingsT> = ({ title, callBack, value }) => {
    const colors = useTheme();
    return (
        <View style={[styles.row, { paddingHorizontal: 16 }]}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>{title}</Text>
            <Switch
                trackColor={{ false: colors.grey, true: colors.primary }}
                thumbColor={colors.white}
                ios_backgroundColor={colors.grey}
                onValueChange={callBack}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
    },
    label: {
        fontSize: 16,
    },
});
