import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { OnboardingNavigatorListT } from "~types/Types";

import { NameStage } from "~screens/onboarding/Stages/NameStage";
import { ActivityLevelStage } from "~screens/onboarding/Stages/ActivityLevelStage";
import { OnboardingProvider } from "~utils/OnboardingProvider";
import { AgeStage } from "~screens/onboarding/Stages/AgeStage";
import { GenderStage } from "~screens/onboarding/Stages/GenderStage";
import { CurrentFitnessStage } from "~screens/onboarding/Stages/CurrentFitnessStage";
import { WeightStage } from "~screens/onboarding/Stages/WeightStage";
import { HeightStage } from "~screens/onboarding/Stages/HeightStage";
import { WeightGoalStage } from "~screens/onboarding/Stages/WeightGoalStage";
import { GoalsStage } from "~screens/onboarding/Stages/GoalsStage";
import { FocusAreasStage } from "~screens/onboarding/Stages/FocusAreasStage";
import { ExistingHealthIssuesStage } from "~screens/onboarding/Stages/ExistingHealthIssuesStage";

const Stack = createNativeStackNavigator<OnboardingNavigatorListT>();

export const OnboardingNavigator = () => {
    const colors = useRecoilValue(themeAtom);

    return (
        <OnboardingProvider>
            <Stack.Navigator
                id={undefined}
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background },
                    animation: "slide_from_right",
                }}
            >
                <Stack.Screen name="ActivityLevelStage" component={ActivityLevelStage} />
                <Stack.Screen name="AgeStage" component={AgeStage} />
                <Stack.Screen name="CurrentFitnessStage" component={CurrentFitnessStage} />
                <Stack.Screen name="ExistingHealthIssuesStage" component={ExistingHealthIssuesStage} />
                <Stack.Screen name="FocusAreasStage" component={FocusAreasStage} />
                <Stack.Screen name="GenderStage" component={GenderStage} />
                <Stack.Screen name="GoalsStage" component={GoalsStage} />
                <Stack.Screen name="HeightStage" component={HeightStage} />
                <Stack.Screen name="WeightStage" component={WeightStage} />
                <Stack.Screen name="WeightGoalStage" component={WeightGoalStage} />
                <Stack.Screen name="NameStage" component={NameStage} />
            </Stack.Navigator>
        </OnboardingProvider>
    );
};
