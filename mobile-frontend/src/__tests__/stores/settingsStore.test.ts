import { useSettingsStore, lightTheme, darkTheme } from "../../store/settingsStore";

beforeEach(() => {
    useSettingsStore.setState({ theme: "LIGHT", metricType: "METRIC", colors: lightTheme });
});

describe("settingsStore", () => {
    it("defaults to light theme and metric units", () => {
        const { theme, metricType } = useSettingsStore.getState();
        expect(theme).toBe("LIGHT");
        expect(metricType).toBe("METRIC");
    });

    describe("setTheme", () => {
        it("switches to dark theme and updates colors", () => {
            useSettingsStore.getState().setTheme("DARK");
            const { theme, colors } = useSettingsStore.getState();
            expect(theme).toBe("DARK");
            expect(colors).toEqual(darkTheme);
        });

        it("switches back to light theme and updates colors", () => {
            useSettingsStore.getState().setTheme("DARK");
            useSettingsStore.getState().setTheme("LIGHT");
            const { theme, colors } = useSettingsStore.getState();
            expect(theme).toBe("LIGHT");
            expect(colors).toEqual(lightTheme);
        });
    });

    describe("setMetricType", () => {
        it("switches to imperial", () => {
            useSettingsStore.getState().setMetricType("IMPERIAL");
            expect(useSettingsStore.getState().metricType).toBe("IMPERIAL");
        });

        it("switches back to metric", () => {
            useSettingsStore.getState().setMetricType("IMPERIAL");
            useSettingsStore.getState().setMetricType("METRIC");
            expect(useSettingsStore.getState().metricType).toBe("METRIC");
        });
    });
});
