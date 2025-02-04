import { useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { OnboardingContainer } from "../OnboardingContainer";

export const AgeStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    return (
        <OnboardingContainer
            complete={!!data.age}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>How old are you?</Text>
                    <TextInput
                        style={[styles.input, { color: colors.textPrimary, borderColor: colors.primary }]}
                        value={data?.age?.toString() || ""}
                        onChangeText={(v) => updateData("age", v)}
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
