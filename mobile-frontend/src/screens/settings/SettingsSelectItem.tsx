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
        <View style={styles.container}>
            <View style={styles.itemInnerContainer}>
                <Text style={[styles.itemText, { color: colors.textPrimary }]}>{title}</Text>
                <Switch
                    trackColor={{ false: colors.secondary, true: colors.secondary }}
                    thumbColor={colors.primary}
                    onValueChange={callBack}
                    value={value}
                />
            </View>
            <View style={[styles.divider, { borderBottomColor: colors.textPrimary }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    itemInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        height: 60,
    },
    itemText: {
        fontSize: 17,
    },
    divider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
