import { useEffect, FC, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

type SignupContainerT = {
    showLoginPage: boolean;
    setShowLoginPage: Function;
};

export const SignupContainer: FC<SignupContainerT> = (props) => {
    const { showLoginPage, setShowLoginPage } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async () => {
        if (password !== confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://your-backend-url/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
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
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignup} />
            <Button
                title="Back to Login"
                onPress={() => setShowLoginPage(true)}
            />
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

export default SignupContainer;
