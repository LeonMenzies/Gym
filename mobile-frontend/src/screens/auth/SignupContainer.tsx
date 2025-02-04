import { FC, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRecoilValue } from "recoil";
import { Button } from "~components/Button";
import { usePostApi } from "~hooks/usePostApi";
import { themeAtom } from "~recoil/themeAtom";

type SignupContainerT = {
    navigation: any;
};

export const SignupContainer: FC<SignupContainerT> = ({ navigation }) => {
    const colors = useRecoilValue(themeAtom);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signupResponse, signupLoading, signup] = usePostApi("/auth/signup");

    const handleSignup = () => {
        if (password !== confirmPassword) {
            // TODO: Show error message
            return;
        }
        signup({ email, password });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Create Account</Text>

            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: colors.primary,
                        color: colors.textPrimary,
                        backgroundColor: colors.background,
                    },
                ]}
                placeholder="Email"
                placeholderTextColor={colors.secondary}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: colors.primary,
                        color: colors.textPrimary,
                        backgroundColor: colors.background,
                    },
                ]}
                placeholder="Password"
                placeholderTextColor={colors.secondary}
                value={password}
                onChangeText={setPassword}
            />

            <TextInput
                style={[
                    styles.input,
                    {
                        borderColor: colors.primary,
                        color: colors.textPrimary,
                        backgroundColor: colors.background,
                    },
                ]}
                placeholder="Confirm Password"
                placeholderTextColor={colors.secondary}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <View style={styles.buttonContainer}>
                <Button title="Sign Up" onPress={handleSignup} disabled={signupLoading} />

                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.loginContainer}>
                    <Text style={[styles.loginText, { color: colors.secondary }]}>
                        Already have an account? <Text style={{ color: colors.primary }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 50,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 14,
        fontSize: 16,
    },
    buttonContainer: {
        marginTop: 20,
        gap: 15,
    },
    loginContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    loginText: {
        fontSize: 14,
    },
});
