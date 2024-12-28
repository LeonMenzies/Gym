import { View, Text, StyleSheet, Pressable } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { useContext } from "react";

const GENDERS = [
    { id: "MALE", label: "Male" },
    { id: "FEMALE", label: "Female" },
    { id: "OTHER", label: "Other" },
];

export const GenderStage = ({ navigation }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    const handleNext = async () => {
        if (data.gender) {
            navigation.navigate("HeightStage");
        }
    };

    return (
        <OnboardingContainer
            currentStep={3}
            totalSteps={8}
            onPressBack={() => navigation.goBack()}
            onPressNext={handleNext}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>What's your gender?</Text>
                    {GENDERS.map((gender) => (
                        <Pressable
                            key={gender.id}
                            style={[styles.option, { borderColor: data?.gender === gender.id ? colors.primary : colors.backgroundSecondary }]}
                            onPress={() => updateData("gender", gender.id)}
                        >
                            <Text style={[styles.optionText, { color: colors.textPrimary }]}>{gender.label}</Text>
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
    optionText: {
        fontSize: 16,
        textAlign: "center",
    },
});
