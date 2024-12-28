import { View, StyleSheet } from "react-native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { FC, useEffect } from "react";

import { darkTheme, lightTheme, themeAtom } from "~recoil/themeAtom";
import { SettingsT, ThemeT } from "~types/Types";
import { SettingsSelectItem } from "./SettingsSelectItem";
import { settingsAtom } from "~recoil/settingsAtom";
import { getSettings, saveSettings } from "~utils/SettingsHandler";
import { SettingsButtonItem } from "screens/settings/SettingsButtonItem";
import { defaultUser } from "~recoil/userAtom";
import { usePersistentUser } from "~hooks/usePersistentUser";

export const Settings: FC<any> = () => {
    const [settings, setSettings] = useRecoilState(settingsAtom);
    const setTheme = useSetRecoilState(themeAtom);
    const { updateUser } = usePersistentUser();

    const colors = useRecoilValue(themeAtom);
    const styles = styling(colors);

    useEffect(() => {
        getSettings(setSettings);
    }, [settings]);

    const onChange = (settingName: string, value: boolean, numberValue: number = 0) => {
        let newSettings: SettingsT;

        switch (settingName) {
            case "lightMode":
                newSettings = { ...settings, lightMode: value };
                setTheme(value ? lightTheme : darkTheme);
                break;
            case "timePercent":
                newSettings = { ...settings, timePercent: value };
                break;
            case "maxPlanTime":
                newSettings = { ...settings, maxPlanTime: numberValue };
                break;
            case "autoComplete":
                newSettings = { ...settings, autoComplete: value };
                break;
            default:
                newSettings = settings;
        }

        setSettings(newSettings);
        saveSettings(newSettings);
    };

    const handleLogout = () => {
        updateUser(defaultUser);
    };

    return (
        <View style={styles.container}>
            <SettingsSelectItem title={settings.lightMode ? "Light Mode" : "Dark Mode"} callBack={(e) => onChange("lightMode", e)} value={settings.lightMode} />
            <SettingsButtonItem title={"Logout"} buttonTitle={"Logout"} callBack={() => handleLogout()} />
        </View>
    );
};

const styling = (colors: ThemeT) =>
    StyleSheet.create({
        container: {
            alignItems: "center",
            marginTop: 50,
            padding: 20,
        },
    });
