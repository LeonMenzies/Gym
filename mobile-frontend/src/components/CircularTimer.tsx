import { Audio } from "expo-av";
import { Animated, Easing, Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";
import { FC, useEffect, useRef } from "react";

const BEEP_WAV_BASE64 =
    "UklGRkQDAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YSADAACAgYKDgn56d3l/h42Oh3xxbHF9jZiYjXtpYWd6kaKklXtiVl11lKuvnX1cS1JvlbO7p4BXQEZnlbvHsoVUNjpelMLSvYtSLS1VkcfeyZJRJCFKjcnk0ZlVJh9FgsTj1J9bKB5AgMDi2KVhLB08ervh2qtnLxw3c7bf3bBtMxwzbbDd37ZzNxwvZ6va4bt6PB0sYaXY4sCAQB4oW5/U48SGRR8mVZnR5MmNSiEjUJPN5M2TUCMhSo3J5NGZVSYfRYbE49SfWygeQIDA4tilYSwdPHq74dqrZy8cN3O2392wbTMcM22w3d+2czccL2er2uG7ejwdLGGl2OLAgEAeKFuf1OPEhkUfJlWZ0eTJjUohI1CTzeTNk1AjIUqNyeTRmVUmH0WGxOPUn1soHkCAwOLYpWEsHTx6u+Haq2cvHDdztt/dsG0zHDNtsN3ftnM3HC9nq9rhu3o8HSxhpdjiwIBAHihbn9TjxIZFHyZVmdHkyY1KISNQk83kzZNQIyFKjcnk0ZlVJh9FhsTj1J9bKB5AgMDi2KVhLB08ervh2qtnLxw3c7bf3bBtMxwzbbDd37ZzNxwvZ6va4bt6PB0sYaXY4sCAQB4oW5/U48SGRR8mVZnR5MmNSiEjUJPN5M2TUCMhSo3J5NGZVSYfRYbE49SfWygeQIDA4tilYSwdPHq74dqrZy8cN3O2392wbTMcM22w3d+2czccL2er2uG7ejwdLGGl2OLAgEAeKFuf1OPEhkUfJlWZ0eTJjUohI1CTzeTNk1AjIUqNyeTRmVUmH0WGxOPUn1soHkCAwOLYpWEsHTx6u+Haq2cvHDdztt/dsG0zHDNtsN3ftnM3HC9nq9rhu3o8HSxhpdjiwIBAHihbn9TjxIZFHyZVmdHkyY1KISNQk83kzZNQIyFKjcnk0ZlVJh9FhsTj1J9bKB5AgMDi2KVhLB08ervh2qtnLxw3c7bf3K9uNyI5b6vT0651Qy4+bKLGyqx7TjlFa5m6wKmAWUVNa5GutaSDY1FVbIujqp6Fa1xeb4aZn5eFc2hoc4OPlI+EeXJzeYGHiYaCfn1+fw==";

type Props = {
    timeLeft: number;
    duration: number;
    timeLabel: string;
    subLabel?: string;
    size?: number;
    color: string;
    bgColor: string;
    textColor: string;
    subTextColor?: string;
    backgroundImage?: ImageSourcePropType | null;
    backgroundText?: string;
    flipImage?: boolean;
    showText?: boolean;
    textOpacity?: number;
};

export const CircularTimer: FC<Props> = ({
    timeLeft,
    duration,
    timeLabel,
    subLabel,
    size = 200,
    color,
    bgColor,
    textColor,
    subTextColor,
    backgroundImage,
    backgroundText,
    flipImage = false,
    showText = true,
    textOpacity = 1,
}) => {
    const rotVal = useRef(new Animated.Value(0)).current;
    const prevTimeLeft = useRef(timeLeft);
    const animRef = useRef<Animated.CompositeAnimation | null>(null);

    // Beep on last 3 seconds
    useEffect(() => {
        if (timeLeft > 0 && timeLeft <= 3 && timeLeft < prevTimeLeft.current) {
            Audio.Sound.createAsync(
                { uri: `data:audio/wav;base64,${BEEP_WAV_BASE64}` },
                { shouldPlay: true },
            ).then(({ sound }) => {
                sound.setOnPlaybackStatusUpdate((s) => {
                    if ("didJustFinish" in s && s.didJustFinish) sound.unloadAsync();
                });
            }).catch(() => {});
        }
    }, [timeLeft]);

    useEffect(() => {
        const progress = duration > 0 ? 1 - timeLeft / duration : 0;

        if (animRef.current) animRef.current.stop();

        // If timeLeft jumped up (reset/new phase), snap without animation
        if (timeLeft > prevTimeLeft.current + 1) {
            rotVal.setValue(progress);
        } else {
            animRef.current = Animated.timing(rotVal, {
                toValue: progress,
                duration: 950,
                easing: Easing.linear,
                useNativeDriver: true,
            });
            animRef.current.start();
        }

        prevTimeLeft.current = timeLeft;
    }, [timeLeft, duration]);

    const rotate = rotVal.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const fontSize = size * 0.26;

    return (
        <View
            style={[
                styles.container,
                {
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: bgColor,
                },
            ]}
        >
            {backgroundImage && (
                <Image
                    source={backgroundImage}
                    style={[styles.bgImage, { width: size, height: size, transform: [{ scaleX: flipImage ? -1 : 1 }] }]}
                    resizeMode="cover"
                />
            )}
            {backgroundImage && (
                <View style={[styles.bgDim, { width: size, height: size }]} />
            )}
            {backgroundText && (
                <Text
                    style={[styles.bgText, { color: textColor, width: size * 0.85, fontSize: size * 0.38 }]}
                    adjustsFontSizeToFit
                    numberOfLines={1}
                >
                    {backgroundText}
                </Text>
            )}
            <Animated.Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require("../../assets/mask.png")}
                style={[
                    styles.mask,
                    {
                        width: size * 1.15,
                        height: size * 1.15,
                        transform: [{ rotate }],
                    },
                ]}
                resizeMode="cover"
            />
            {showText && (
                <View style={[styles.center, { opacity: textOpacity }]}>
                    <Text style={[styles.timeText, { color: backgroundImage ? "#fff" : textColor, fontSize }]}>
                        {timeLabel}
                    </Text>
                    {subLabel && (
                        <Text style={[styles.subText, { color: backgroundImage ? "rgba(255,255,255,0.7)" : (subTextColor ?? textColor) }]}>
                            {subLabel}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
    },
    bgImage: {
        position: "absolute",
    },
    bgDim: {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.38)",
    },
    bgText: {
        position: "absolute",
        fontWeight: "800",
        textAlign: "center",
        opacity: 0.18,
        letterSpacing: -2,
    },
    mask: {
        position: "absolute",
        opacity: 0.45,
    },
    center: {
        alignItems: "center",
        justifyContent: "center",
    },
    timeText: {
        fontWeight: "700",
        letterSpacing: -1,
    },
    subText: {
        fontSize: 12,
        marginTop: 2,
        textTransform: "uppercase",
        letterSpacing: 2,
        opacity: 0.6,
    },
});
