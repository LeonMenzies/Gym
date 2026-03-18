import { VStack, HStack, Text, Spacer } from "@expo/ui/swift-ui";
import { font, foregroundStyle, frame, padding } from "@expo/ui/swift-ui/modifiers";
import { createWidget, WidgetEnvironment } from "expo-widgets";

export type StreakProps = {
    currentStreak: number;
    longestStreak: number;
};

const StreakWidget = (props: StreakProps, context: WidgetEnvironment) => {
    "widget";
    const { currentStreak, longestStreak } = props;
    const isSmall = context.widgetFamily === "systemSmall";

    if (isSmall) {
        return (
            <VStack modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity }), padding({ all: 16 })]}>
                <Text modifiers={[font({ size: 48, weight: "bold" }), foregroundStyle("#FF6B35")]}>
                    {String(currentStreak)}
                </Text>
                <Text modifiers={[font({ size: 13, weight: "semibold" })]}>
                    DAY STREAK
                </Text>
                <Spacer />
                <Text modifiers={[font({ size: 11 }), foregroundStyle("#888888")]}>
                    Best: {String(longestStreak)}
                </Text>
            </VStack>
        );
    }

    // systemMedium
    return (
        <HStack modifiers={[frame({ maxWidth: Infinity, maxHeight: Infinity }), padding({ all: 16 })]}>
            <VStack modifiers={[frame({ maxWidth: Infinity })]} >
                <Text modifiers={[font({ size: 48, weight: "bold" }), foregroundStyle("#FF6B35")]}>
                    {String(currentStreak)}
                </Text>
                <Text modifiers={[font({ size: 13, weight: "semibold" })]}>
                    CURRENT STREAK
                </Text>
                <Text modifiers={[font({ size: 11 }), foregroundStyle("#888888")]}>
                    days in a row
                </Text>
            </VStack>
            <VStack modifiers={[frame({ maxWidth: Infinity })]}>
                <Text modifiers={[font({ size: 36, weight: "bold" })]}>
                    {String(longestStreak)}
                </Text>
                <Text modifiers={[font({ size: 13, weight: "semibold" })]}>
                    BEST
                </Text>
                <Text modifiers={[font({ size: 11 }), foregroundStyle("#888888")]}>
                    all time
                </Text>
            </VStack>
        </HStack>
    );
};

export const StreakWidgetInstance = createWidget("StreakWidget", StreakWidget);
