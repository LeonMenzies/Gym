import MaskedView from "@react-native-masked-view/masked-view";
import { FC, useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableHighlight, View } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { ThemeT } from "~types/Types";

interface RestTimerT {
    rest: number;
}

export const RestTimer: FC<RestTimerT> = ({ rest }) => {
    const [rotation, setRotation] = useState(0);
    const { width } = Dimensions.get("window");
    const colors = useRecoilValue(themeAtom);
    const styles = styling(colors, width);

    useEffect(() => {
        const fps = 60;
        const degreesPerFrame = 720 / rest / fps;

        const timer = setInterval(() => {
            if (rotation < 360) {
                setRotation(rotation + degreesPerFrame);
            } else {
                setRotation(0);
            }
        }, 1000 / fps);

        return () => clearInterval(timer);
    }, [rotation, rest]);

    const maskElement = (
        <Image
            style={{
                width: width - 50,
                height: width - 50,
                backgroundColor: "transparent",
                borderRadius: width / 2,
                transform: [{ rotate: `${rotation}deg` }],
            }}
            source={require("~assets/mask.png")}
        />
    );

    return (
        <View style={styles.container}>
            <MaskedView {...{ maskElement }}>
                <TouchableHighlight onPress={() => setRotation(0)} style={styles.button}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: colors.secondary,
                            borderRadius: width / 2,
                        }}
                    />
                </TouchableHighlight>
            </MaskedView>
        </View>
    );
};

const styling = (colors: ThemeT, width: number) =>
    StyleSheet.create({
        container: {
            justifyContent: "center",
            height: "60%",
        },
        button: {
            width: width - 50,
            height: width - 50,
            backgroundColor: colors.primary,
            borderRadius: width / 2,
        },
    });
