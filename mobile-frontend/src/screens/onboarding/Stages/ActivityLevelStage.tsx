import { useContext } from "react";
import { TextInput } from "~components/TextInput";
import { OnboardingContainer } from "~screens/onboarding/OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";

export const ActivityLevelStage = ({ navigation }) => {
    const { data, updateData, canProceed } = useContext(OnboardingContext);

    const handleNext = () => {
        if (canProceed("Name")) {
            navigation.navigate("Age");
        }
    };

    return (
        <OnboardingContainer
            currentStep={0}
            totalSteps={11}
            onPressBack={() => {}}
            onPressNext={handleNext}
            stage={
                <TextInput value={data.name} onChangeText={(text) => updateData("activityLevel", text)} placeholder="Enter your name" title={"Activity Level"} maxLength={0} keyboardType={undefined} />
            }
        />
    );
};
