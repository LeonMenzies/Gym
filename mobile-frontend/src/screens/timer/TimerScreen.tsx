import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "~store/settingsStore";
import { Rest } from "~screens/rest/Rest";
import { StretchTimerMode } from "~screens/timer/StretchTimerMode";

type TimerMode = "gym" | "stretch";

export const TimerScreen: FC = () => {
    const [mode, setMode] = useState<TimerMode>("gym");
    const colors = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.toggleContainer}>
                <View style={[styles.togglePill, { backgroundColor: colors.backgroundSecondary }]}>
                    <TouchableOpacity
                        style={[styles.toggleBtn, mode === "gym" && { backgroundColor: colors.primary }]}
                        onPress={() => setMode("gym")}
                    >
                        <Text style={[styles.toggleText, { color: mode === "gym" ? colors.white : colors.textSecondary }]}>
                            Gym
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleBtn, mode === "stretch" && { backgroundColor: colors.primary }]}
                        onPress={() => setMode("stretch")}
                    >
                        <Text style={[styles.toggleText, { color: mode === "stretch" ? colors.white : colors.textSecondary }]}>
                            Stretch
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.content}>
                {mode === "gym" ? <Rest /> : <StretchTimerMode />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    toggleContainer: {
        paddingTop: 60,
        paddingBottom: 8,
        alignItems: "center",
    },
    togglePill: {
        flexDirection: "row",
        borderRadius: 25,
        padding: 4,
    },
    toggleBtn: {
        paddingHorizontal: 36,
        paddingVertical: 10,
        borderRadius: 20,
    },
    toggleText: {
        fontSize: 15,
        fontWeight: "600",
    },
    content: {
        flex: 1,
    },
});
