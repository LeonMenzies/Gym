import { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HEALTH_CONDITIONS = [
    { id: "BACK_PAIN", label: "Back Pain", icon: "human-back" },
    { id: "JOINT_ISSUES", label: "Joint Issues", icon: "bone" },
    { id: "HEART_CONDITION", label: "Heart Condition", icon: "heart-pulse" },
    { id: "HIGH_BLOOD_PRESSURE", label: "High Blood Pressure", icon: "heart" },
    { id: "ASTHMA", label: "Asthma", icon: "lungs" },
    { id: "DIABETES", label: "Diabetes", icon: "diabetes" },
    { id: "NONE", label: "No Health Issues", icon: "check-circle" },
];

export const ExistingHealthIssuesStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    const toggleCondition = (conditionId: string) => {
        if (conditionId === "NONE") {
            updateData("healthIssues", ["NONE"]);
            return;
        }

        const currentConditions = data.healthIssues || [];
        let updatedConditions = currentConditions.includes(conditionId) ? currentConditions.filter((id) => id !== conditionId) : [...currentConditions.filter((id) => id !== "NONE"), conditionId];

        updateData("healthIssues", updatedConditions);
    };

    return (
        <OnboardingContainer
            complete={data.healthIssues.length > 0}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>Do you have any health conditions?</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>This helps us customize your workout plan</Text>

                    <View style={styles.conditionsContainer}>
                        {HEALTH_CONDITIONS.map((condition) => {
                            const isSelected = data.healthIssues?.includes(condition.id);
                            const isNone = condition.id === "NONE";

                            return (
                                <Pressable
                                    key={condition.id}
                                    style={[
                                        styles.condition,
                                        {
                                            backgroundColor: isSelected ? colors.primary : colors.background,
                                            borderColor: isSelected ? colors.primary : colors.backgroundSecondary,
                                        },
                                    ]}
                                    onPress={() => toggleCondition(condition.id)}
                                >
                                    <Icon name={condition.icon} size={24} color={isSelected ? colors.white : colors.textPrimary} />
                                    <Text style={[styles.conditionText, { color: isSelected ? colors.white : colors.textPrimary }]}>{condition.label}</Text>
                                </Pressable>
                            );
                        })}
                    </View>

                    <Text style={[styles.disclaimer, { color: colors.textSecondary }]}>Always consult your healthcare provider before starting any new exercise program</Text>
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
    conditionsContainer: {
        gap: 12,
    },
    condition: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
    },
    conditionText: {
        marginLeft: 12,
        fontSize: 16,
        fontWeight: "500",
    },
    disclaimer: {
        marginTop: 20,
        fontSize: 14,
        textAlign: "center",
        fontStyle: "italic",
    },
});
