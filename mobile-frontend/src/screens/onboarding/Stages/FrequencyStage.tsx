import { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

const FREQUENCY_OPTIONS = [
    { id: "2", label: "2x per week", description: "Perfect for beginners" },
    { id: "3", label: "3x per week", description: "Most popular choice" },
    { id: "4", label: "4x per week", description: "Intermediate level" },
    { id: "5", label: "5x per week", description: "Advanced training" },
    { id: "6", label: "6x per week", description: "Intensive program" },
];

export const FrequencyStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    return (
        <OnboardingContainer
            complete={!!data.weekly_frequency}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>How often would you like to work out?</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>You can always adjust this later</Text>

                    {FREQUENCY_OPTIONS.map((option) => (
                        <Pressable
                            key={option.id}
                            style={[
                                styles.option,
                                {
                                    borderColor: data?.weekly_frequency === option.id ? colors.primary : colors.secondary,
                                },
                            ]}
                            onPress={() => updateData("weekly_frequency", option.id)}
                        >
                            <Text style={[styles.optionTitle, { color: colors.textPrimary }]}>{option.label}</Text>
                            <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>{option.description}</Text>
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
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
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
