import { useContext, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

export const HeightStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);
    const [feet, setFeet] = useState("");
    const [inches, setInches] = useState("");
    const [isMetric, setIsMetric] = useState(true);

    return (
        <OnboardingContainer
            complete={!!data.height}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>What's your height?</Text>

                    <View style={styles.unitToggle}>
                        <Pressable style={[styles.unitButton, { backgroundColor: isMetric ? colors.primary : colors.background }]} onPress={() => setIsMetric(true)}>
                            <Text style={{ color: isMetric ? colors.white : colors.textPrimary }}>CM</Text>
                        </Pressable>
                        <Pressable style={[styles.unitButton, { backgroundColor: !isMetric ? colors.primary : colors.background }]} onPress={() => setIsMetric(false)}>
                            <Text style={{ color: !isMetric ? colors.white : colors.textPrimary }}>FT/IN</Text>
                        </Pressable>
                    </View>

                    {isMetric ? (
                        <TextInput
                            style={[styles.input, { color: colors.textPrimary, borderColor: colors.primary }]}
                            value={data.height?.toString()}
                            onChangeText={(value) => updateData("height", Number(value))}
                            keyboardType="numeric"
                            placeholder="Height in cm"
                            placeholderTextColor={colors.textSecondary}
                        />
                    ) : (
                        <View style={styles.imperialInputs}>
                            <TextInput
                                style={[styles.input, styles.imperialInput, { color: colors.textPrimary, borderColor: colors.primary }]}
                                value={feet}
                                onChangeText={setFeet}
                                keyboardType="numeric"
                                placeholder="Feet"
                                placeholderTextColor={colors.textSecondary}
                            />
                            <TextInput
                                style={[styles.input, styles.imperialInput, { color: colors.textPrimary, borderColor: colors.primary }]}
                                value={inches}
                                onChangeText={setInches}
                                keyboardType="numeric"
                                placeholder="Inches"
                                placeholderTextColor={colors.textSecondary}
                            />
                        </View>
                    )}
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    unitToggle: {
        flexDirection: "row",
        marginBottom: 20,
    },
    unitButton: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    imperialInputs: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imperialInput: {
        width: "48%",
    },
});
