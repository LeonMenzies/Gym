import { useContext } from "react";
import { TextInput } from "~components/TextInput";
import { OnboardingContainer } from "~screens/onboarding/OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";

export const NameStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);

    return (
        <OnboardingContainer
            complete={!!data.fitnessLevel}
            navigation={navigation}
            route={route}
            stage={<TextInput value={data.name} onChangeText={(text) => updateData("name", text)} placeholder="Enter your name" title={""} maxLength={0} keyboardType={undefined} />}
        />
    );
};
