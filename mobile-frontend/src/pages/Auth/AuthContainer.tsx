import { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import LoginContainer from "./LoginContainer";
import SignupContainer from "./SignupContainer";

export const AuthContainer: FC<any> = () => {
    const [showLoginPage, setShowLoginPage] = useState(true);

    return (
        <View style={styles.container}>
            {showLoginPage ? (
                <LoginContainer
                    showLoginPage={showLoginPage}
                    setShowLoginPage={setShowLoginPage}
                />
            ) : (
                <SignupContainer
                    showLoginPage={showLoginPage}
                    setShowLoginPage={setShowLoginPage}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%",
    },
});

export default LoginContainer;
