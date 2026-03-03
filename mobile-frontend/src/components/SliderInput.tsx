import { FC } from "react";
import { Text, StyleSheet, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "~store/settingsStore";
import { ThemeT } from "~types/Types";

type SliderInputT = {
    title: string;
    min: number;
    max: number;
    markerColor: string;
    onChange: (value: number) => void;
    value: number;
    showLabel: boolean;
    increment: number;
};

export const SliderInput: FC<SliderInputT> = ({ title, min, max, markerColor, onChange, value, showLabel, increment }) => {
    const colors = useTheme();
    const styles = styling(colors);

    const generateNumbers = (): number[] => {
        return Array.from({ length: Math.floor((max - min) / increment) + 1 }, (_, index) => min + index * increment);
    };

    const setValue = (val: number) => {
        onChange(generateNumbers().reduce((closest, current) => (Math.abs(current - val) < Math.abs(closest - val) ? current : closest)));
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.title}>{value}</Text>
            </View>
            <Slider
                    minimumValue={min}
                    maximumValue={max}
                    thumbTintColor={markerColor}
                    minimumTrackTintColor={markerColor}
                    onValueChange={setValue}
                    value={value}
                />
        </View>
    );
};

const styling = (colors: ThemeT) =>
    StyleSheet.create({
        container: {
            width: "100%",
            padding: 10,
            zIndex: 2,
        },
        title: {
            fontSize: 15,
            color: colors.grey,
        },
        headerContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 8,
        },
        input: {
            fontSize: 17,
            padding: 5,
            color: colors.textPrimary,
            borderBottomColor: colors.textPrimary,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
    });
