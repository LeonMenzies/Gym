import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { OnboardingNavigatorListT } from "~types/Types";

import { NameStage } from "~screens/onboarding/Stages/NameStage";
import { ActivityLevelStage } from "~screens/onboarding/Stages/ActivityLevelStage";

const Stack = createNativeStackNavigator<OnboardingNavigatorListT>();

export const OnboardingNavigator = () => {
    const colors = useRecoilValue(themeAtom);

    return (
        <Stack.Navigator
            id={undefined}
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.background },
                animation: "slide_from_right",
            }}
        >
            <Stack.Screen name="ActivityLevelStage" component={ActivityLevelStage} />
            {/* <Stack.Screen name="AgeStage" component={AgeStage} />
            <Stack.Screen name="CurrentFitnessStage" component={CurrentFitnessStage} />
            <Stack.Screen name="ExistingHealthIssuesStage" component={ExistingHealthIssuesStage} />
            <Stack.Screen name="FocusAreasStage" component={FocusAreasStage} />
            <Stack.Screen name="GenderStage" component={GenderStage} />
            <Stack.Screen name="GoalsStage" component={GoalsStage} />
            <Stack.Screen name="HeightStage" component={HeightStage} />
            <Stack.Screen name="WeightStage" component={WeightStage} />
            <Stack.Screen name="WeightGoalStage" component={WeightGoalStage} /> */}
            <Stack.Screen name="NameStage" component={NameStage} />
        </Stack.Navigator>
    );
};
