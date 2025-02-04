import { FC, useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { Button } from "~components/Button";
import { usePersistentUser } from "~hooks/usePersistentUser";
import { usePostApi } from "~hooks/usePostApi";
import { themeAtom } from "~recoil/themeAtom";
import { OnboardingProgress } from "~screens/onboarding/OnboardingProgress";
import { UserT } from "~types/Types";
import { OnboardingContext } from "~utils/OnboardingProvider";

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
    const [postUserInfoResponse, , postCompleteOnobarding] = usePostApi<{}, UserT>("/user/complete-onboarding");
    const { updateUser } = usePersistentUser();

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (postUserInfoResponse && postUserInfoResponse.success) {
            updateUser(postUserInfoResponse.data);
        } else if (postUserInfoResponse && !postUserInfoResponse.success) {
            setError(postUserInfoResponse.message);
        }
    }, [postUserInfoResponse]);

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

    const handleComplete = async () => {
        if (!complete) {
            setError("Please fill out the form");
        }

        if (complete) {
            await submitData();
            postCompleteOnobarding({});
        }
    };

    const handleBack = () => {
        if (prevStage) {
            navigation.navigate(prevStage);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.innercContainer}>
                <OnboardingProgress progress={step} total={totalSteps} navigation={navigation} />
                <View style={{ flex: 1 }}>{stage}</View>
                <View style={{ width: 50 }} />
            </View>
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            <View style={styles.buttonContainer}>
                {prevStage ? <Button title="Back" onPress={handleBack} /> : <View />}
                {nextStage ? <Button title="Next" onPress={handleNext} /> : <Button title="Complete" onPress={handleComplete} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 70,
        height: "100%",
    },
    innercContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
    },
    buttonContainer: {
        padding: 24,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
    },
    errorText: {
        width: "100%",
        textAlign: "center",
        fontSize: 16,
    },
});
