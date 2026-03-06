import { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { ScrollView, Text, View } from "react-native";

class ErrorBoundary extends Component {
    state = { error: null };
    static getDerivedStateFromError(error) {
        return { error };
    }
    render() {
        if (this.state.error) {
            return (
                <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 20, paddingTop: 60 }}>
                    <Text style={{ color: "red", fontWeight: "bold", fontSize: 16, marginBottom: 12 }}>CRASH</Text>
                    <Text style={{ color: "black", fontSize: 13 }}>{String(this.state.error)}</Text>
                    <Text style={{ color: "#666", fontSize: 11, marginTop: 12 }}>{this.state.error?.stack}</Text>
                </ScrollView>
            );
        }
        return this.props.children;
    }
}

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ErrorBoundary>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </ErrorBoundary>
        </GestureHandlerRootView>
    );
}
