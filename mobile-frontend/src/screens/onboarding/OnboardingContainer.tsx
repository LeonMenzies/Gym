import { OnboardingProgress } from "~screens/onboarding/OnboardingProgress";
import { FC, useContext, useEffect, useState } from "react";
import { Button } from "~components/Button";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { View, StyleSheet, Text } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

type OnboardingContainerT = {
    complete: boolean;
    navigation: any;
    route: any;
    stage: any;
};

export const OnboardingContainer: FC<OnboardingContainerT> = (props) => {
    const { complete, navigation, route, stage } = props;
    const { submitData } = useContext(OnboardingContext);
    const [error, setError] = useState<string | null>(null);
    const colors = useRecoilValue(themeAtom);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const params = route?.params ?? {
        nextStage: undefined,
        prevStage: undefined,
        step: 1,
        totalSteps: 1,
    };

    const { nextStage, prevStage, step, totalSteps } = params;

    const handleNext = async () => {
        if (!complete) {
            setError("Please fill out the form");
        }

        if (complete && nextStage) {
            submitData();
            navigation.navigate(nextStage);
        }
    };

    const handleBack = () => {
        if (prevStage) {
            navigation.navigate(prevStage);
        }
    };

    return (
        <View style={styles.container}>
            <OnboardingProgress progress={step} total={totalSteps} />
            {stage}
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            <View style={styles.buttonContainer}>
                {prevStage ? <Button title="Back" onPress={handleBack} /> : <View />}
                <Button title={!nextStage ? "Complete" : "Next"} onPress={handleNext} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        alignItems: "center",
        height: "100%",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        padding: 16,
    },
    errorContainer: {
        position: "absolute",
        bottom: 100,
        left: 20,
        right: 20,
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
    errorText: {
        fontSize: 16,
    },
});
