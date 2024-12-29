import { FC, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

type Props = {
    progress: number;
    total: number;
};

export const OnboardingProgress: FC<Props> = ({ progress, total }) => {
    const colors = useRecoilValue(themeAtom);
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: (progress / total) * 100,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [progress, total]);

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.progressBar,
                        {
                            backgroundColor: colors.primary,
                            width: progressAnim.interpolate({
                                inputRange: [0, 100],
                                outputRange: ["0%", "100%"],
                            }),
                        },
                    ]}
                />
            </View>
            <View style={styles.dotsContainer}>
                {Array(total)
                    .fill(0)
                    .map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.dot,
                                {
                                    backgroundColor: i < progress ? colors.primary : colors.backgroundSecondary,
                                    transform: [{ scale: i < progress ? 1.2 : 1 }],
                                },
                            ]}
                        />
                    ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        width: "100%",
    },
    container: {
        height: 6,
        backgroundColor: "#E0E0E0",
        borderRadius: 3,
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        borderRadius: 3,
    },
    dotsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
        paddingHorizontal: 2,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
});
