import { useContext } from "react";
import { TextInput } from "~components/TextInput";
import { OnboardingContainer } from "~screens/onboarding/OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";

export const NameStage = ({ navigation }) => {
    const { data, updateData } = useContext(OnboardingContext);

    const handleNext = async () => {
        await updateData("name", name);
        navigation.navigate("AgeStage");
    };

    return (
        <OnboardingContainer
            currentStep={0}
            totalSteps={8}
            onPressBack={() => {}}
            onPressNext={handleNext}
            stage={<TextInput value={data.name} onChangeText={(text) => updateData("name", text)} placeholder="Enter your name" title={""} maxLength={0} keyboardType={undefined} />}
        />
    );
};
