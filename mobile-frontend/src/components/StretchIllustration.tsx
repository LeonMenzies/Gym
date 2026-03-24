import React, { FC } from "react";
import { Image, View } from "react-native";
import { getImageForStretchId } from "~data/stretchBendData";

type Props = {
    stretchId: string;
    size?: number;
    color?: string;
};

export const StretchIllustration: FC<Props> = ({ stretchId, size = 80, color = "#888" }) => {
    const photo = getImageForStretchId(stretchId);

    if (photo) {
        return (
            <View style={{ width: size, height: size, borderRadius: size * 0.15, overflow: "hidden" }}>
                <Image source={photo} style={{ width: size, height: size }} resizeMode="cover" />
            </View>
        );
    }

    // Placeholder for unmapped stretches
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size * 0.15,
                backgroundColor: color + "20",
                alignItems: "center",
                justifyContent: "center",
            }}
        />
    );
};
