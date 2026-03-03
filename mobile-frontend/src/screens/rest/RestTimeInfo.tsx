import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Modal } from "~components/Modal";
import { useTheme } from "~store/settingsStore";

type RestRestTimeInfoT = {
    modalVisible: boolean;
    setModalVisible: any;
};

export const RestRestTimeInfo: FC<RestRestTimeInfoT> = ({ modalVisible, setModalVisible }) => {
    const colors = useTheme();

    const RestItem = ({ title, time }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemInnerContainer}>
                    <Text style={[styles.itemText, { color: colors.textPrimary }]}>{title}</Text>
                    <Text style={[styles.itemText, { color: colors.textPrimary }]}>{time}</Text>
                </View>
                <View style={[styles.divider, { borderBottomColor: colors.textPrimary }]} />
            </View>
        );
    };

    return (
        <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
            <View>
                <RestItem title={"Strength"} time={"120-240 seconds"} />
                <RestItem title={"Hypertrophy"} time={"30-90 seconds"} />
                <RestItem title={"Endurance"} time={"30 seconds"} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: 300,
    },
    itemInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    itemText: {
        fontSize: 17,
    },
    divider: {
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
