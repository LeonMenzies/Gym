import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";

type Props = {
    progress: number;
    total: number;
};

export const OnboardingProgress: FC<Props> = ({ progress, total }) => {
    const colors = useRecoilValue(themeAtom);

    return (
        <View style={styles.container}>
            <View
                style={[
                    styles.progressBar,
                    {
                        backgroundColor: colors.primary,
                        width: `${(progress / total) * 100}%`,
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 4,
        backgroundColor: "#E0E0E0",
        width: "100%",
    },
    progressBar: {
        height: "100%",
        borderRadius: 2,
    },
});
