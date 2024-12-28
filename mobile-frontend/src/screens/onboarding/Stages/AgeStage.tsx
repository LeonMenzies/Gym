import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

export const AgeStage = ({ navigation }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);
    const [age, setAge] = useState(data?.age?.toString() || "");

    const handleNext = async () => {
        if (age) {
            await updateData("age", parseInt(age));
            navigation.navigate("GenderStage");
        }
    };

    return (
        <OnboardingContainer
            currentStep={2}
            totalSteps={8}
            onPressBack={() => navigation.goBack()}
            onPressNext={handleNext}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>How old are you?</Text>
                    <TextInput
                        style={[styles.input, { color: colors.textPrimary, borderColor: colors.backgroundSecondary }]}
                        value={age}
                        onChangeText={setAge}
                        keyboardType="numeric"
                        placeholder="Enter your age"
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
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
});
