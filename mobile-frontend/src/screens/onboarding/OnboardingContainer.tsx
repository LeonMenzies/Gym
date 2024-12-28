import { OnboardingProgress } from "~screens/onboarding/OnboardingProgress";
import { FC, useContext } from "react";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { Button } from "~components/Button";
import { View, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

type OnboardingContainerT = {
    onPressBack: () => void;
    onPressNext: () => void;
    stage: any;
    currentStep: number;
    totalSteps: number;
};

export const OnboardingContainer: FC<OnboardingContainerT> = ({ onPressBack, onPressNext, stage, currentStep, totalSteps }) => {
    const { progress } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    return (
        <View style={styles.container}>
            <OnboardingProgress progress={currentStep} total={totalSteps} />
            {stage}
            <View style={styles.buttonContainer}>
                {currentStep > 0 && <Button title="Back" onPress={onPressBack} />}
                <Button title={currentStep === totalSteps - 1 ? "Complete" : "Next"} onPress={onPressNext} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        padding: 16,
    },
});
