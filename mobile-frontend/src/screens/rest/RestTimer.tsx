import { FC, useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "~store/settingsStore";

interface RestTimerT {
    rest: number;
}

const SIZE = 300;

export const RestTimer: FC<RestTimerT> = ({ rest }) => {
    const colors = useTheme();
    const fillHeight = useRef(new Animated.Value(SIZE)).current;
    const animRef = useRef<Animated.CompositeAnimation | null>(null);

    const startTimer = () => {
        fillHeight.setValue(SIZE);
        animRef.current = Animated.timing(fillHeight, {
            toValue: 0,
            duration: rest * 1000,
            useNativeDriver: false,
        });
        animRef.current.start(({ finished }) => {
            if (finished) startTimer();
        });
    };

    useEffect(() => {
        startTimer();
        return () => { animRef.current?.stop(); };
    }, [rest]);

    const handleReset = () => {
        animRef.current?.stop();
        startTimer();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleReset} activeOpacity={0.85}>
                <View style={[styles.circle, { backgroundColor: colors.secondary }]}>
                    <Animated.View
                        style={[styles.fill, { backgroundColor: colors.primary, height: fillHeight }]}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
    },
    circle: {
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        overflow: "hidden",
        justifyContent: "flex-end",
    },
    fill: {
        width: SIZE,
    },
});
