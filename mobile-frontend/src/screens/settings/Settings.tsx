import { View, StyleSheet } from "react-native";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FC, useEffect } from "react";

import { darkTheme, lightTheme, themeAtom } from "~recoil/themeAtom";
import { SettingsT, ThemeT, UserSettingsT } from "~types/Types";
import { SettingsSelectItem } from "./SettingsSelectItem";
import { SettingsButtonItem } from "screens/settings/SettingsButtonItem";
import { defaultUser, userAtom } from "~recoil/userAtom";
import { usePersistentUser } from "~hooks/usePersistentUser";
import usePostApi from "~hooks/usePostApi";

export const Settings: FC = () => {
    const user = useRecoilValue(userAtom);
    const [, , updateSettings] = usePostApi("/user/settings");
    const { updateUser } = usePersistentUser();
    const setTheme = useSetRecoilState(themeAtom);

    useEffect(() => {
        if (user.settings.theme === "LIGHT") {
            setTheme(lightTheme);
        } else {
            setTheme(darkTheme);
        }
    }, [user]);

    const handleSettingChange = async (setting: keyof UserSettingsT, value: any) => {
        const newSettings = { ...user.settings, [setting]: value };
        updateUser({ ...user, settings: newSettings });
        updateSettings(newSettings);
    };

    const handleLogout = () => {
        updateUser(defaultUser);
    };

    return (
        <View style={styles.container}>
            <SettingsSelectItem
                title={user.settings.theme === "LIGHT" ? "Light Mode" : "Dark Mode"}
                callBack={(e) => handleSettingChange("theme", e ? "LIGHT" : "DARK")}
                value={user.settings.theme === "LIGHT"}
            />
            <SettingsSelectItem title="Use Metric" callBack={(e) => handleSettingChange("metric_type", e ? "METRIC" : "IMPERIAL")} value={user.settings.metric_type === "METRIC"} />
            <SettingsSelectItem title="Notifications" callBack={(e) => handleSettingChange("notification_enabled", e)} value={user.settings.notification_enabled} />
            <SettingsButtonItem title="Logout" buttonTitle="Logout" callBack={handleLogout} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 50,
        padding: 20,
    },
});
