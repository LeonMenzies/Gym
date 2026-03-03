import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "~store/settingsStore";

export const RecipesScreen: FC = () => {
    const colors = useTheme();
    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Recipes</Text>
            <Text style={{ color: colors.textSecondary }}>Coming soon</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "600",
        marginBottom: 8,
    },
});
