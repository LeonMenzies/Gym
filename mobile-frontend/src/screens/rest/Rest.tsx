import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { useKeepAwake } from "expo-keep-awake";

import { RestTimer } from "screens/rest/RestTimer";
import { themeAtom } from "~recoil/themeAtom";
import { ThemeT } from "~types/Types";
import { RestRestTimeInfo } from "screens/rest/RestTimeInfo";
import { RestSetTime } from "screens/rest/RestSetTime";

export const Rest: FC<any> = () => {
    const [sliderValue, setSliderValue] = useState(60);
    const [infoModal, setInfoModal] = useState(false);
    const colors = useRecoilValue(themeAtom);
    const styles = styling(colors);
    useKeepAwake();

    return (
        <View style={styles.container}>
            <RestSetTime sliderValue={sliderValue} setSliderValue={setSliderValue} />
            <RestTimer rest={sliderValue} />
            <RestRestTimeInfo modalVisible={infoModal} setModalVisible={setInfoModal} />
        </View>
    );
};

const styling = (colors: ThemeT) =>
    StyleSheet.create({
        container: {
            paddingTop: 50,
            flex: 1,
            alignItems: "center",
        },
    });
