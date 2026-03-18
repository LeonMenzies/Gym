import { Component } from "react";
import { ScrollView, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Slot } from "expo-router";

class ErrorBoundary extends Component<{ children: React.ReactNode }, { error: Error | null }> {
    state = { error: null };
    static getDerivedStateFromError(error: Error) {
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

export default function RootLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ErrorBoundary>
                <Slot />
            </ErrorBoundary>
        </GestureHandlerRootView>
    );
}
