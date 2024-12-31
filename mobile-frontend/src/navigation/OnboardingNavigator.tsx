import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { OnboardingNavigatorListT, OnboardingStageT } from "~types/Types";

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
import { FrequencyStage } from "~screens/onboarding/Stages/FrequencyStage";

const Stack = createNativeStackNavigator<OnboardingNavigatorListT>();

export const ONBOARDING_FLOW = [
    { name: "AgeStage", component: AgeStage },
    { name: "GenderStage", component: GenderStage },
    { name: "HeightStage", component: HeightStage },
    { name: "WeightStage", component: WeightStage },
    { name: "ActivityLevelStage", component: ActivityLevelStage },
    { name: "FrequencyStage", component: FrequencyStage },
    { name: "CurrentFitnessStage", component: CurrentFitnessStage },
    { name: "WeightGoalStage", component: WeightGoalStage },
    { name: "GoalsStage", component: GoalsStage },
    { name: "FocusAreasStage", component: FocusAreasStage },
    { name: "ExistingHealthIssuesStage", component: ExistingHealthIssuesStage },
    { name: "NameStage", component: NameStage },
] as const;

export const OnboardingNavigator = () => {
    const colors = useRecoilValue(themeAtom);

    return (
        <OnboardingProvider>
            <Stack.Navigator
                id={undefined}
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.background },
                    animation: "fade",
                }}
            >
                {ONBOARDING_FLOW.map(({ name, component }, index) => (
                    <Stack.Screen
                        key={name}
                        name={name as keyof OnboardingNavigatorListT}
                        component={component}
                        initialParams={{
                            nextStage: ONBOARDING_FLOW[index + 1]?.name,
                            prevStage: ONBOARDING_FLOW[index - 1]?.name,
                            step: index + 1,
                            totalSteps: ONBOARDING_FLOW.length,
                        }}
                    />
                ))}
            </Stack.Navigator>
        </OnboardingProvider>
    );
};
