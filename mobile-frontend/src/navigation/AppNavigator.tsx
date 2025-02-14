import { View } from "react-native";
import { useRecoilValue } from "recoil";
import { AuthNavigator } from "~navigation/AuthNavigator";
import { OnboardingNavigator } from "~navigation/OnboardingNavigator";
import { TabNavigator } from "~navigation/TabNavigator";
import { themeAtom } from "~recoil/themeAtom";
import { userAtom } from "~recoil/userAtom";
import { ACCOUNT_ACTIVE_STATUS, ACCOUNT_ONBOARDING_STATUS } from "~utils/Constants";

export const AppNavigator = () => {
    const user = useRecoilValue(userAtom);
    const colors = useRecoilValue(themeAtom);

    const renderScreen = () => {
        if (user.jwt && user.account_status === ACCOUNT_ACTIVE_STATUS) {
            return <TabNavigator />;
        }
        if (user.account_status === ACCOUNT_ONBOARDING_STATUS) {
            return <OnboardingNavigator />;
        }
        return <AuthNavigator />;
    };

    return <View style={{ flex: 1, backgroundColor: colors.background }}>{renderScreen()}</View>;
};
