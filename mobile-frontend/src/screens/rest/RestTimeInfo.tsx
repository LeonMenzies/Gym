import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { Modal } from "~components/Modal";
import { themeAtom } from "~recoil/themeAtom";
import { ThemeT } from "~types/Types";

type RestRestTimeInfoT = {
    modalVisible: boolean;
    setModalVisible: any;
};

export const RestRestTimeInfo: FC<RestRestTimeInfoT> = ({ modalVisible, setModalVisible }) => {
    const colors = useRecoilValue(themeAtom);
    const styles = styling(colors);

    const RestItem = ({ title, time }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemInnerContainer}>
                    <Text style={styles.itemText}>{title}</Text>
                    <Text style={styles.itemText}>{time}</Text>
                </View>
                <View style={styles.divider} />
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

const styling = (colors: ThemeT) =>
    StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        modalView: {
            margin: 20,
            backgroundColor: colors.background,
            padding: 35,
            height: "30%",
            width: "80%",
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            elevation: 5,
            justifyContent: "space-between",
        },
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
            color: colors.textPrimary,
        },
        divider: {
            borderBottomColor: colors.textPrimary,
            borderBottomWidth: StyleSheet.hairlineWidth,
        },
    });
