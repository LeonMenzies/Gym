import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { useContext } from "react";

export const WeightGoalStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);
    const [isMetric, setIsMetric] = useState(true);

    return (
        <OnboardingContainer
            complete={!!data.weight_goal}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>What's your target weight?</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        Current weight: {data.weight}
                        {isMetric ? "kg" : "lbs"}
                    </Text>

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
                        value={data?.weight_goal?.toString()}
                        onChangeText={(v) => updateData("weight_goal", v)}
                        keyboardType="numeric"
                        placeholder={`Target weight in ${isMetric ? "kg" : "lbs"}`}
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
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
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
