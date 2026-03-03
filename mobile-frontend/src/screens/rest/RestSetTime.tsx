import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useTheme } from "~store/settingsStore";

type RestSetTimeT = {
    setSliderValue: Function;
    sliderValue: any;
};

export const RestSetTime: FC<RestSetTimeT> = ({ sliderValue, setSliderValue }) => {
    const colors = useTheme();

    const setValue = (value: number) => {
        setSliderValue([30, 60, 90, 120, 180, 240].reduce((closest, current) => (Math.abs(current - value) < Math.abs(closest - value) ? current : closest)));
    };

    return (
        <View style={styles.container}>
            <Slider
                    minimumValue={1}
                    maximumValue={240}
                    thumbTintColor={colors.primary}
                    minimumTrackTintColor={colors.primary}
                    onValueChange={(val: number) => setValue(val)}
                    value={sliderValue}
                />
            <Text style={[styles.sliderValue, { color: colors.primary }]}>{sliderValue}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
        margin: 20,
        width: "90%",
    },
    sliderValue: {
        fontSize: 24,
    },
});
