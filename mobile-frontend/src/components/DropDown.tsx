import { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Modal, ScrollView } from "react-native";
import { useRecoilValue } from "recoil";
import { themeAtom } from "~recoil/themeAtom";
import Icon from "react-native-vector-icons/SimpleLineIcons";

type OptionT = {
    label: string;
    value: string;
};

type DropdownT = {
    options: OptionT[];
    value: string | null;
    onChange: (value: string) => void;
    placeholder?: string;
};

export const Dropdown: FC<DropdownT> = ({ options, value, onChange, placeholder = "Select option" }) => {
    const colors = useRecoilValue(themeAtom);
    const [visible, setVisible] = useState(false);

    const selectedOption = options.find((option) => option.value === value);

    return (
        <>
            <TouchableOpacity style={[styles.container, { borderColor: colors.primary }]} onPress={() => setVisible(true)}>
                <Text style={[styles.text, { color: selectedOption ? colors.textPrimary : colors.textSecondary }]}>{selectedOption?.label || placeholder}</Text>
                <Icon name={visible ? "arrow-up" : "arrow-down"} size={16} color={colors.textSecondary} />
            </TouchableOpacity>

            <Modal visible={visible} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={[styles.dropdown, { backgroundColor: colors.background }]}>
                        <ScrollView>
                            {options.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.option,
                                        {
                                            backgroundColor: value === option.value ? colors.primary : colors.background,
                                        },
                                    ]}
                                    onPress={() => {
                                        onChange(option.value);
                                        setVisible(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            {
                                                color: value === option.value ? colors.white : colors.textPrimary,
                                            },
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 16,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 20,
    },
    dropdown: {
        borderRadius: 8,
        maxHeight: 300,
    },
    option: {
        padding: 16,
    },
    optionText: {
        fontSize: 16,
    },
});
