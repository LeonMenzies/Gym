import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { OnboardingContainer } from "../OnboardingContainer";

export const FocusAreasStage = ({ navigation, route }) => {
    const { data, options, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    const toggleArea = (areaName: string) => {
        const currentAreas = data.focus_areas || [];
        const updatedAreas = currentAreas.includes(areaName) ? currentAreas.filter((name) => name !== areaName) : [...currentAreas, areaName];
        updateData("focus_areas", updatedAreas);
    };

    return (
        <OnboardingContainer
            complete={data.focus_areas.length > 0}
            navigation={navigation}
            route={route}
            stage={
                <View style={styles.container}>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>Which areas would you like to focus on?</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Select all that apply</Text>
                    <View style={styles.areasContainer}>
                        {options.focus_areas.map((area) => {
                            const isSelected = data.focus_areas?.includes(area.name);
                            return (
                                <Pressable
                                    key={area.id}
                                    style={[
                                        styles.areaChip,
                                        {
                                            backgroundColor: isSelected ? colors.primary : colors.background,
                                            borderColor: isSelected ? colors.primary : colors.primary,
                                        },
                                    ]}
                                    onPress={() => toggleArea(area.name)}
                                >
                                    <Text style={[styles.areaText, { color: isSelected ? colors.white : colors.textPrimary }]}>{area.name}</Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    areasContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    areaChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 8,
        marginBottom: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    chipIcon: {
        marginRight: 8,
    },
    areaText: {
        fontSize: 16,
    },
});
