import { useTimerStore } from "../../store/timerStore";

beforeEach(() => {
    useTimerStore.setState({ gymRestSeconds: 30 });
});

describe("timerStore", () => {
    it("has a default rest time of 30 seconds", () => {
        expect(useTimerStore.getState().gymRestSeconds).toBe(30);
    });

    it("updates the rest time", () => {
        useTimerStore.getState().setGymRestSeconds(90);
        expect(useTimerStore.getState().gymRestSeconds).toBe(90);
    });

    it("can set rest time to zero", () => {
        useTimerStore.getState().setGymRestSeconds(0);
        expect(useTimerStore.getState().gymRestSeconds).toBe(0);
    });
});
