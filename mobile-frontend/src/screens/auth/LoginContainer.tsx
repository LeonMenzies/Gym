import { useEffect, FC, useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { EmailLoginT, UserT } from "~types/Types";
import usePostApi from "hooks/usePostApi";
import { ACCOUNT_DEACTIVATED_STATUS } from "~utils/Constants";
import { usePersistentUser } from "~hooks/usePersistentUser";

type LoginContainerT = {
    showLoginPage: boolean;
    setShowLoginPage: Function;
};

export const LoginContainer: FC<LoginContainerT> = (props) => {
    const { showLoginPage, setShowLoginPage } = props;
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
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={handleEmailSignIn} />
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={5}
                style={{ width: 200, height: 44, marginTop: 20 }}
                onPress={handleAppleSignIn}
            />
            <Button title="Sign Up" onPress={() => setShowLoginPage(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    input: {
        width: "100%",
        padding: 12,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
    },
});

export default LoginContainer;
