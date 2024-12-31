import { useEffect, FC, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { EmailLoginT, UserT } from "~types/Types";
import usePostApi from "hooks/usePostApi";
import { ACCOUNT_DEACTIVATED_STATUS } from "~utils/Constants";
import { usePersistentUser } from "~hooks/usePersistentUser";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { Button } from "~components/Button";

type LoginContainerT = {
    navigation: any;
};

export const LoginContainer: FC<LoginContainerT> = ({ navigation }) => {
    const colors = useRecoilValue(themeAtom);
    const [email, setEmail] = useState("leon.menzies@hotmail.com");
    const [password, setPassword] = useState("Testing123!");
    const [postLoginResponse, postLoginLoading, postLogin] = usePostApi<EmailLoginT, UserT>("/auth/login");
    const { updateUser } = usePersistentUser();

    const handleEmailSignIn = () => {
        postLogin({ email, password });
    };

    useEffect(() => {
        if (postLoginResponse.success && postLoginResponse.data) {
            if (postLoginResponse.data.account_status != ACCOUNT_DEACTIVATED_STATUS) {
                updateUser(postLoginResponse.data);
            }
        }

        //TODO: Handle error message on screen
    }, [postLoginResponse]);

    const handleAppleSignIn = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
            });

            const response = await fetch("http://your-backend-url/api/apple", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    token: credential.identityToken,
                }),
            });

            const data = await response.json();

            // Handle the response from your backend
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Welcome Back</Text>

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
                placeholderTextColor={colors.textSecondary}
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
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.buttonContainer}>
                <Button title="Login" onPress={handleEmailSignIn} disabled={postLoginLoading} />

                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={14}
                    style={styles.appleButton}
                    onPress={handleAppleSignIn}
                />

                <TouchableOpacity onPress={() => navigation.navigate("Signup")} style={styles.signUpContainer}>
                    <Text style={[styles.signUpText, { color: colors.secondary }]}>
                        Don't have an account? <Text style={{ color: colors.primary }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
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
    appleButton: {
        width: "100%",
        height: 50,
    },
    signUpContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    signUpText: {
        fontSize: 14,
    },
});
