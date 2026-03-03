import { useKeepAwake } from "expo-keep-awake";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "~store/settingsStore";
import { RestSetTime } from "~screens/rest/RestSetTime";
import { RestRestTimeInfo } from "~screens/rest/RestTimeInfo";
import { RestTimer } from "~screens/rest/RestTimer";

export const Rest: FC<any> = () => {
    const [sliderValue, setSliderValue] = useState(60);
    const [infoModal, setInfoModal] = useState(false);
    const colors = useTheme();
    useKeepAwake();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <RestSetTime sliderValue={sliderValue} setSliderValue={setSliderValue} />
            <RestTimer rest={sliderValue} />
            <RestRestTimeInfo modalVisible={infoModal} setModalVisible={setInfoModal} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        alignItems: "center",
    },
});
