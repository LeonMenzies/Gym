import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "~components/Button";
import { useTheme } from "~store/settingsStore";

type SettingsT = {
    title: string;
    buttonTitle: string;
    callBack: Function;
};

export const SettingsButtonItem: FC<SettingsT> = ({ title, buttonTitle, callBack }) => {
    const colors = useTheme();

    return (
        <View style={styles.container}>
            <View style={styles.itemInnerContainer}>
                <Text style={[styles.itemText, { color: colors.textPrimary }]}>{title}</Text>
                <Button title={buttonTitle} onPress={callBack} />
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
        paddingLeft: 8,
        height: 60,
    },
    itemText: {
        fontSize: 17,
    },
    divider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
