import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

type Props = {
    message: string;
};

export const ErrorMessage: React.FC<Props> = ({ message }) => {
    const colors = useRecoilValue(themeAtom);

    if (!message) return null;

    return (
        <View style={[styles.container, { backgroundColor: colors.error + "20" }]}>
            <Text style={[styles.text, { color: colors.error }]}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
    },
    text: {
        fontSize: 14,
        textAlign: "center",
    },
});
