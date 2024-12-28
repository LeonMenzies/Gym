import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, FC } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import DraggableFlatList from "react-native-draggable-flatlist";
import { HomeHeader } from "screens/home/HomeHeader";
import { actionsAtom } from "~recoil/actionsAtom";
import { alertAtom } from "~recoil/alertAtom";
import { HomeActionSection } from "screens/home/HomeActionSection";
import { PlanT, ThemeT, ActionItemT } from "~types/Types";
import { planAtom } from "~recoil/planAtom";
import { themeAtom } from "~recoil/themeAtom";
import { settingsAtom } from "~recoil/settingsAtom";
import { TODAY_PLAN } from "~utils/Constants";
import { getTheme } from "~utils/SettingsHandler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Home: FC<any> = () => {
    const setAlert = useSetRecoilState(alertAtom);
    const [plan, setPlan] = useRecoilState<PlanT>(planAtom);
    const [actions, setActions] = useRecoilState(actionsAtom);
    const [areasOfImportance, setAreasOfImportance] = useState([]);
    const [percent, setPercent] = useState(0);
    const setTheme = useSetRecoilState(themeAtom);
    const settings = useRecoilValue(settingsAtom);
    const colors = useRecoilValue(themeAtom);
    const styles = styling(colors);
    const totalTime: number = actions.reduce((total: number, action: ActionItemT) => {
        let toAdd = 0;
        if (plan.actionKeys.includes(action.key)) {
            toAdd = Number(action.timeEstimate);
        }
        return total + toAdd;
    }, 0);

    useEffect(() => {
        getTheme(setTheme);
    }, []);

    useEffect(() => {
        let completeTasks = 0;
        let completeTime = 0;
        let totalTime = 0;

        actions.forEach((action: ActionItemT) => {
            if (plan.actionKeys.includes(action.key)) {
                totalTime += Number(action.timeEstimate);
                if (action.isCompleted) {
                    completeTasks++;
                    completeTime += Number(action.timeEstimate);
                }
            }
        });

        const denominator = settings.timePercent ? totalTime : plan.actionKeys.length;
        const numerator = settings.timePercent ? completeTime : completeTasks;

        const calculatedPercent = denominator !== 0 && !isNaN(denominator) ? (numerator / denominator) * 100 : 0;

        // Not using this logic for now
        // if (calculatedPercent == 100) {
        //   updatePlan(setAlert, setPlan, { ...plan, complete: true }, TODAY_PLAN);
        // }
        setPercent(calculatedPercent);
    }, [actions]);

    return (
        <View style={styles.container}>
            <HomeHeader percent={percent} totalTime={totalTime} />
        </View>
    );
};

const styling = (colors: ThemeT) =>
    StyleSheet.create({
        container: {
            alignItems: "center",
            height: "100%",
        },
    });
