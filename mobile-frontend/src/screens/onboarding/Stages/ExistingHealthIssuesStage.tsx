import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { OnboardingContainer } from "../OnboardingContainer";

const HEALTH_ISSUE_ICONS = [
    { name: "Back Pain", icon: "human" },
    { name: "Joint Issues", icon: "bone" },
    { name: "Heart Condition", icon: "heart-pulse" },
    { name: "High Blood Pressure", icon: "heart" },
    { name: "Asthma", icon: "lungs" },
    { name: "Diabetes", icon: "diabetes" },
    { name: "No Health Issues", icon: "check-circle" },
];

export const ExistingHealthIssuesStage = ({ navigation, route }) => {
    const { data, options, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    const toggleCondition = (conditionId: string) => {
        if (conditionId === "NONE") {
            updateData("health_issues", ["NONE"]);
            return;
        }

        const currentConditions = data.health_issues || [];
        let updatedConditions = currentConditions.includes(conditionId) ? currentConditions.filter((id) => id !== conditionId) : [...currentConditions.filter((id) => id !== "NONE"), conditionId];

        updateData("health_issues", updatedConditions);
    };

    return (
        <OnboardingContainer
            complete={data.health_issues.length > 0}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>Do you have any health conditions?</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>This helps us customize your workout plan</Text>

                    <View style={styles.conditionsContainer}>
                        {options.health_issues.map((condition) => {
                            const isSelected = data.health_issues?.includes(condition.name);
                            const isNone = condition.id === "NONE";

                            return (
                                <Pressable
                                    key={condition.id}
                                    style={[
                                        styles.condition,
                                        {
                                            backgroundColor: isSelected ? colors.primary : colors.background,
                                            borderColor: isSelected ? colors.primary : colors.primary,
                                        },
                                    ]}
                                    onPress={() => toggleCondition(condition.name)}
                                >
                                    <Icon name={HEALTH_ISSUE_ICONS.find((i) => i.name === condition.name)?.icon || "help-circle"} size={24} color={isSelected ? colors.white : colors.textPrimary} />
                                    <Text style={[styles.conditionText, { color: isSelected ? colors.white : colors.textPrimary }]}>{condition.name}</Text>
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
