import { FC } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SimpleLineIcons as Icon } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTheme } from "~store/settingsStore";
import { ComponentId, MAX_COMPONENTS, useComponentStore } from "~store/componentStore";
import { COMPONENT_REGISTRY, ComponentDef } from "~navigation/componentRegistry";
import { DashboardStackParamList } from "~navigation/DashboardNavigator";

type Nav = NativeStackNavigationProp<DashboardStackParamList, "Library">;

export const LibraryScreen: FC = () => {
    const colors = useTheme();
    const nav = useNavigation<Nav>();
    const { activeComponents, addComponent, removeComponent } = useComponentStore();

    const atMax = activeComponents.length >= MAX_COMPONENTS;

    const renderRow = (def: ComponentDef, active: boolean) => {
        const canAdd = !active && !atMax;
        return (
            <View key={def.id} style={[styles.row, { backgroundColor: colors.backgroundSecondary }]}>
                <View style={[styles.iconWrap, { backgroundColor: active ? colors.primary : colors.background }]}>
                    <Icon name={def.icon as any} size={20} color={active ? colors.white : colors.textSecondary} />
                </View>
                <View style={styles.rowInfo}>
                    <Text style={[styles.rowName, { color: colors.textPrimary }]}>{def.name}</Text>
                    <Text style={[styles.rowDesc, { color: colors.textSecondary }]}>{def.description}</Text>
                </View>
                {active ? (
                    <TouchableOpacity
                        style={[styles.actionBtn, { borderColor: colors.error }]}
                        onPress={() => removeComponent(def.id)}
                    >
                        <Text style={[styles.actionBtnText, { color: colors.error }]}>Remove</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[
                            styles.actionBtn,
                            { borderColor: canAdd ? colors.primary : colors.lightGrey },
                        ]}
                        onPress={() => canAdd && addComponent(def.id)}
                        disabled={!canAdd}
                    >
                        <Text style={[styles.actionBtnText, { color: canAdd ? colors.primary : colors.lightGrey }]}>
                            Add
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    const activeRows = activeComponents.map((id) => {
        const def = COMPONENT_REGISTRY.find((c) => c.id === id)!;
        return renderRow(def, true);
    });

    const inactiveRows = COMPONENT_REGISTRY.filter((c) => !activeComponents.includes(c.id)).map((def) =>
        renderRow(def, false)
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => nav.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color={colors.primary} />
                </TouchableOpacity>
                <View>
                    <Text style={[styles.title, { color: colors.textPrimary }]}>Library</Text>
                    <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                        {activeComponents.length} / {MAX_COMPONENTS} active
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Your setup</Text>
                {activeComponents.length === 0 ? (
                    <View style={[styles.emptySetup, { backgroundColor: colors.backgroundSecondary }]}>
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                            No components added yet. Pick from the library below.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.list}>{activeRows}</View>
                )}
                {atMax && (
                    <Text style={[styles.maxNote, { color: colors.textSecondary }]}>
                        Max {MAX_COMPONENTS} components reached. Remove one to add another.
                    </Text>
                )}

                <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>Available</Text>
                {inactiveRows.length === 0 ? (
                    <View style={[styles.emptySetup, { backgroundColor: colors.backgroundSecondary }]}>
                        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                            All components added.
                        </Text>
                    </View>
                ) : (
                    <View style={styles.list}>{inactiveRows}</View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 60,
        paddingHorizontal: 16,
        paddingBottom: 12,
        gap: 8,
    },
    backBtn: { padding: 4 },
    title: { fontSize: 24, fontWeight: "700" },
    subtitle: { fontSize: 13, marginTop: 1 },
    scroll: { padding: 16, gap: 8, paddingBottom: 40 },
    sectionLabel: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginBottom: 4,
        marginTop: 8,
    },
    list: { gap: 8 },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 14,
        padding: 14,
        gap: 12,
    },
    iconWrap: {
        width: 44,
        height: 44,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    rowInfo: { flex: 1, gap: 2 },
    rowName: { fontSize: 16, fontWeight: "600" },
    rowDesc: { fontSize: 13 },
    actionBtn: {
        borderWidth: 1.5,
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
    },
    actionBtnText: { fontSize: 13, fontWeight: "600" },
    emptySetup: {
        borderRadius: 14,
        padding: 16,
    },
    emptyText: { fontSize: 14, textAlign: "center" },
    maxNote: {
        fontSize: 12,
        textAlign: "center",
        marginTop: 4,
        marginBottom: 4,
    },
});
