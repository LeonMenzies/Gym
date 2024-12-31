import { FC, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated, TouchableOpacity, Text, DimensionValue } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { useContext } from "react";
import { OnboardingContext, OnboardingData } from "~utils/OnboardingProvider";
import { ONBOARDING_FLOW } from "~navigation/OnboardingNavigator";

type Props = {
    progress: number;
    total: number;
    navigation: any;
};

export const OnboardingProgress: FC<Props> = ({ progress, total, navigation }) => {
    const colors = useRecoilValue(themeAtom);
    const [isExpanded, setIsExpanded] = useState(false);
    const expandAnim = useRef(new Animated.Value(0)).current;
    const stages = ONBOARDING_FLOW;

    const toggleExpand = () => {
        Animated.timing(expandAnim, {
            toValue: isExpanded ? 0 : 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
        setIsExpanded(!isExpanded);
    };

    const width = expandAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [40, 150],
    });

    const getProgressHeight = () => {
        if (progress <= 1) return "0%";
        const availableSpace = 100;
        const stageHeight = availableSpace / (total - 1);
        return (progress - 1) * stageHeight;
    };

    return (
        <TouchableOpacity onPress={toggleExpand} style={styles.wrapper}>
            <Animated.View style={[styles.container, { width }]}>
                <View
                    style={[
                        styles.progressBar,
                        {
                            backgroundColor: colors.primary,
                            height: `${getProgressHeight()}%` as DimensionValue,
                        },
                    ]}
                />
                <View style={styles.dotsContainer}>
                    {stages.map((stage, i) => (
                        <TouchableOpacity key={i} onPress={() => navigation.navigate(stage.name)}>
                            <View
                                style={[
                                    styles.dot,
                                    {
                                        borderColor: colors.primary,
                                        backgroundColor: i <= progress - 1 ? colors.primary : "transparent",
                                    },
                                ]}
                            />
                            {isExpanded && <Text style={[styles.stageName, { color: colors.textPrimary }]}>{stage.name}</Text>}
                        </TouchableOpacity>
                    ))}
                </View>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        minHeight: 250,
    },
    container: {
        borderRadius: 20,
        height: "80%",
    },
    progressBar: {
        width: 6,
        position: "absolute",
        left: "50%",
        transform: [{ translateX: -3 }],
        borderRadius: 3,
    },
    dotsContainer: {
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 2,
        zIndex: 2,
    },
    stageName: {
        fontSize: 14,
    },
});
