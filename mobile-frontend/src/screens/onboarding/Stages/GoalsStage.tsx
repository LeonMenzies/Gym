import { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

const FITNESS_GOALS = [
    { id: "BUILD_MUSCLE", label: "Build Muscle" },
    { id: "LOSE_FAT", label: "Lose Fat" },
    { id: "IMPROVE_STRENGTH", label: "Improve Strength" },
    { id: "INCREASE_ENDURANCE", label: "Increase Endurance" },
    { id: "IMPROVE_FLEXIBILITY", label: "Improve Flexibility" },
    { id: "BETTER_HEALTH", label: "Better Health" },
    { id: "SPORTS_PERFORMANCE", label: "Sports Performance" },
];

export const GoalsStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    const toggleGoal = (goalId: string) => {
        const currentGoals = data.goals || [];
        const updatedGoals = currentGoals.includes(goalId) ? currentGoals.filter((id) => id !== goalId) : [...currentGoals, goalId];
        updateData("goals", updatedGoals);
    };

    return (
        <OnboardingContainer
            complete={!!data.fitnessLevel}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>What are your fitness goals?</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Select all that apply</Text>
                    <View style={styles.goalsContainer}>
                        {FITNESS_GOALS.map((goal) => {
                            const isSelected = data.goals?.includes(goal.id);
                            return (
                                <Pressable
                                    key={goal.id}
                                    style={[
                                        styles.goalChip,
                                        {
                                            backgroundColor: isSelected ? colors.primary : colors.background,
                                            borderColor: isSelected ? colors.primary : colors.backgroundSecondary,
                                        },
                                    ]}
                                    onPress={() => toggleGoal(goal.id)}
                                >
                                    <Text style={[styles.goalText, { color: isSelected ? colors.white : colors.textPrimary }]}>{goal.label}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
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
    goalsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    goalChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 8,
        marginBottom: 8,
    },
    goalText: {
        fontSize: 16,
    },
});
