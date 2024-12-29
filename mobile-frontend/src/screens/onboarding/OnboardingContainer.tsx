import { OnboardingProgress } from "~screens/onboarding/OnboardingProgress";
import { FC } from "react";
import { Button } from "~components/Button";
import { View, StyleSheet } from "react-native";

type OnboardingContainerT = {
    complete: boolean;
    navigation: any;
    route: any;
    stage: any;
};

export const OnboardingContainer: FC<OnboardingContainerT> = (props) => {
    const { complete, navigation, route, stage } = props;

    const params = route?.params ?? {
        nextStage: undefined,
        prevStage: undefined,
        step: 1,
        totalSteps: 1,
    };

    const { nextStage, prevStage, step, totalSteps } = params;

    const handleNext = async () => {
        if (complete && nextStage) {
            // await updateData("age", parseInt(age));
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
            <View style={styles.buttonContainer}>
                {prevStage ? <Button title="Back" onPress={handleBack} /> : <View />}
                <Button title={!nextStage ? "Complete" : "Next"} onPress={handleNext} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        height: "100%",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
        padding: 16,
    },
});
