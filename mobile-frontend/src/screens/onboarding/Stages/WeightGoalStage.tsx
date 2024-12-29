import { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

const WEIGHT_GOALS = [
    { id: "LOSE", label: "Lose Weight", description: "Reduce body fat and get leaner" },
    { id: "MAINTAIN", label: "Maintain Weight", description: "Stay at current weight and improve fitness" },
    { id: "GAIN", label: "Gain Weight", description: "Build muscle and increase strength" },
];

export const WeightGoalStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    return (
        <OnboardingContainer
            complete={!!data.fitnessLevel}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>What's your weight goal?</Text>
                    {WEIGHT_GOALS.map((goal) => (
                        <Pressable
                            key={goal.id}
                            style={[styles.option, { borderColor: data?.weightGoal === goal.id ? colors.primary : colors.backgroundSecondary }]}
                            onPress={() => updateData("weightGoal", goal.id)}
                        >
                            <Text style={[styles.optionTitle, { color: colors.textPrimary }]}>{goal.label}</Text>
                            <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>{goal.description}</Text>
                        </Pressable>
                    ))}
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
    option: {
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 12,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 14,
    },
});
