import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { useContext } from "react";

export const WeightStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);
    const [isMetric, setIsMetric] = useState(true);

    return (
        <OnboardingContainer
            complete={!!data.weight}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>What's your weight?</Text>

                    <View style={styles.unitToggle}>
                        <Pressable style={[styles.unitButton, { backgroundColor: isMetric ? colors.primary : colors.background }]} onPress={() => setIsMetric(true)}>
                            <Text style={{ color: isMetric ? colors.white : colors.textPrimary }}>KG</Text>
                        </Pressable>
                        <Pressable style={[styles.unitButton, { backgroundColor: !isMetric ? colors.primary : colors.background }]} onPress={() => setIsMetric(false)}>
                            <Text style={{ color: !isMetric ? colors.white : colors.textPrimary }}>LBS</Text>
                        </Pressable>
                    </View>

                    <TextInput
                        style={[styles.input, { color: colors.textPrimary, borderColor: colors.primary }]}
                        value={data?.weight?.toString()}
                        onChangeText={(v) => updateData("weight", v)}
                        keyboardType="numeric"
                        placeholder={`Weight in ${isMetric ? "kg" : "lbs"}`}
                        placeholderTextColor={colors.textSecondary}
                    />
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
});
