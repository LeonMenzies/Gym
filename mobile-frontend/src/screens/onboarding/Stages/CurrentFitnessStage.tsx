import { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

const FITNESS_LEVELS = [
    { id: "BEGINNER", label: "Beginner", description: "New to fitness or returning after a long break" },
    { id: "INTERMEDIATE", label: "Intermediate", description: "Consistent workout routine for 6+ months" },
    { id: "ADVANCED", label: "Advanced", description: "Experienced with various workout types for 1+ years" },
];

export const CurrentFitnessStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    return (
        <OnboardingContainer
            complete={!!data.fitness_level}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>What's your fitness experience?</Text>
                    {FITNESS_LEVELS.map((level) => (
                        <Pressable
                            key={level.id}
                            style={[styles.option, { borderColor: data?.fitness_level === level.id ? colors.primary : colors.primary }]}
                            onPress={() => updateData("fitness_level", level.id)}
                        >
                            <Text style={[styles.optionTitle, { color: colors.textPrimary }]}>{level.label}</Text>
                            <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>{level.description}</Text>
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
