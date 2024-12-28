import { useContext } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { OnboardingContainer } from "~screens/onboarding/OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

const ACTIVITY_LEVELS = [
    { id: "SEDENTARY", label: "Sedentary", description: "Little to no exercise" },
    { id: "LIGHT", label: "Light", description: "1-3 days/week" },
    { id: "MODERATE", label: "Moderate", description: "3-5 days/week" },
    { id: "VERY_ACTIVE", label: "Very Active", description: "6-7 days/week" },
];

export const ActivityLevelStage = ({ navigation }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    const handleNext = async () => {
        if (data.activityLevel) {
            navigation.navigate("AgeStage");
        }
    };

    const ActivityLevelOption = ({ level, isSelected, onSelect }) => (
        <Pressable style={[styles.option, isSelected && { borderColor: colors.primary }]} onPress={onSelect}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>{level.label}</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>{level.description}</Text>
        </Pressable>
    );

    return (
        <OnboardingContainer
            currentStep={1}
            totalSteps={8}
            onPressBack={() => navigation.goBack()}
            onPressNext={handleNext}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>What's your activity level?</Text>
                    {ACTIVITY_LEVELS.map((level) => (
                        <ActivityLevelOption key={level.id} level={level} isSelected={data?.activityLevel === level.id} onSelect={() => updateData("activityLevel", level.id)} />
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
    label: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
    },
});
