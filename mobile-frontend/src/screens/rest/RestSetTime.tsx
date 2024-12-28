import { FC } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useRecoilValue } from "recoil";
import Slider from "react-native-a11y-slider";

import { themeAtom } from "~recoil/themeAtom";
import { ThemeT } from "~types/Types";

type RestSetTimeT = {
  setSliderValue: Function;
  sliderValue: any;
};

export const RestSetTime: FC<RestSetTimeT> = ({ sliderValue, setSliderValue }) => {
  const colors = useRecoilValue(themeAtom);
  const styles = styling(colors);

  const setValue = (value: number) => {
    setSliderValue(
      [30, 60, 90, 120, 180, 240].reduce((closest, current) =>
        Math.abs(current - value) < Math.abs(closest - value) ? current : closest
      )
    );
  };

  return (
    <View style={styles.container}>
      <Slider
        min={1}
        max={240}
        markerColor={colors.primary}
        onChange={(values: number[]) => setValue(values[0])}
        values={[sliderValue]}
        showLabel={false}
      />
      <Text style={styles.sliderValue}>{sliderValue}</Text>
    </View>
  );
};

const styling = (colors: ThemeT) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      margin: 20,
      width: "90%",
    },
    sliderValue: {
      fontSize: 24,
      color: colors.primary,
    },
  });
