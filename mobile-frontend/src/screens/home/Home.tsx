import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { Button } from "~components/Button";
import { Dropdown } from "~components/DropDown";

const GYMS = [
    { label: "24/7 Fitness", value: "247" },
    { label: "Anytime Fitness", value: "ANYTIME" },
    { label: "PureGym", value: "PURE" },
];

export const Home: FC = () => {
    const colors = useRecoilValue(themeAtom);
    const [selectedGym, setSelectedGym] = React.useState<string | null>(null);

    return (
        <View style={styles.container}>
            <View style={styles.dropdownContainer}>
                <Dropdown options={GYMS} value={selectedGym} onChange={setSelectedGym} placeholder="Select Gym" />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Generate Workout" onPress={() => console.log("Generate workout")} disabled={!selectedGym} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    dropdownContainer: {
        marginTop: 50,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
