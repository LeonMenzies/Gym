import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { OnboardingContainer } from "~screens/onboarding/OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";

const ACTIVITY_LEVELS = [
    { id: "SEDENTARY", label: "Sedentary", description: "Little to no exercise" },
    { id: "LIGHT", label: "Light", description: "1-3 days/week" },
    { id: "MODERATE", label: "Moderate", description: "3-5 days/week" },
    { id: "VERY_ACTIVE", label: "Very Active", description: "6-7 days/week" },
];

export const ActivityLevelStage = ({ navigation, route }) => {
    const { data, options, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    const ActivityLevelOption = ({ level, isSelected, onSelect }) => (
        <Pressable style={[styles.option, isSelected && { borderColor: colors.primary }]} onPress={onSelect}>
            <Text style={[styles.label, { color: colors.textPrimary }]}>{level.label}</Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>{level.description}</Text>
        </Pressable>
    );

    return (
        <OnboardingContainer
            complete={!!data?.activity_level}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>What's your activity level?</Text>
                    {ACTIVITY_LEVELS.map((level) => (
                        <ActivityLevelOption key={level.id} level={level} isSelected={data?.activity_level === level.id} onSelect={() => updateData("activity_level", level.id)} />
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
