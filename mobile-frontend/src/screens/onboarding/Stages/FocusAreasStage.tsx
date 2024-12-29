import { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { OnboardingContainer } from "../OnboardingContainer";
import { OnboardingContext } from "~utils/OnboardingProvider";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const FOCUS_AREAS = [
    { id: "CHEST", label: "Chest", icon: "pectorals" },
    { id: "BACK", label: "Back", icon: "human-back" },
    { id: "ARMS", label: "Arms", icon: "arm-flex" },
    { id: "SHOULDERS", label: "Shoulders", icon: "shoulder-human" },
    { id: "LEGS", label: "Legs", icon: "human-legs" },
    { id: "CORE", label: "Core", icon: "human-pregnant" },
];

export const FocusAreasStage = ({ navigation, route }) => {
    const { data, updateData } = useContext(OnboardingContext);
    const colors = useRecoilValue(themeAtom);

    const toggleArea = (areaId: string) => {
        const currentAreas = data.focus_areas || [];
        const updatedAreas = currentAreas.includes(areaId) ? currentAreas.filter((id) => id !== areaId) : [...currentAreas, areaId];
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
                    <View style={styles.grid}>
                        {FOCUS_AREAS.map((area) => {
                            const isSelected = data.focus_areas?.includes(area.id);
                            return (
                                <Pressable
                                    key={area.id}
                                    style={[
                                        styles.areaCard,
                                        {
                                            backgroundColor: isSelected ? colors.primary : colors.background,
                                            borderColor: isSelected ? colors.primary : colors.primary,
                                        },
                                    ]}
                                    onPress={() => toggleArea(area.id)}
                                >
                                    <Icon name={area.icon} size={32} color={isSelected ? colors.white : colors.textPrimary} />
                                    <Text style={[styles.areaText, { color: isSelected ? colors.white : colors.textPrimary }]}>{area.label}</Text>
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
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 16,
    },
    areaCard: {
        width: "48%",
        aspectRatio: 1,
        borderRadius: 12,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
    },
    areaText: {
        marginTop: 8,
        fontSize: 16,
        fontWeight: "500",
    },
});
