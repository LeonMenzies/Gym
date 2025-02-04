import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { Button } from "~components/Button";
import { themeAtom } from "~recoil/themeAtom";
import { ThemeT } from "~types/Types";

type SettingsT = {
    title: string;
    buttonTitle: string;
    callBack: Function;
};

export const SettingsButtonItem: FC<SettingsT> = ({ title, buttonTitle, callBack }) => {
    const colors = useRecoilValue(themeAtom);
    const styles = styling(colors);

    return (
        <View style={styles.container}>
            <View style={styles.itemInnerContainer}>
                <Text style={styles.itemText}>{title}</Text>
                <Button title={buttonTitle} onPress={callBack} />
            </View>
            <View style={styles.divider} />
        </View>
    );
};

const styling = (colors: ThemeT) =>
    StyleSheet.create({
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
            color: colors.textPrimary,
        },
        divider: {
            borderBottomColor: colors.textPrimary,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
    });
