import { useStretchStore } from "../../store/stretchStore";
import type { Routine } from "../../store/stretchStore";

const makeRoutine = (id: string, name: string): Routine => ({
    id,
    name,
    items: [{ stretchId: "neck_side_tilt", duration: 30 }],
});

beforeEach(() => {
    useStretchStore.setState({ routines: [] });
});

describe("stretchStore", () => {
    describe("addRoutine", () => {
        it("adds a routine", () => {
            useStretchStore.getState().addRoutine(makeRoutine("r1", "Morning"));
            const { routines } = useStretchStore.getState();
            expect(routines).toHaveLength(1);
            expect(routines[0].name).toBe("Morning");
        });

        it("appends routines in order", () => {
            useStretchStore.getState().addRoutine(makeRoutine("r1", "Morning"));
            useStretchStore.getState().addRoutine(makeRoutine("r2", "Evening"));
            const { routines } = useStretchStore.getState();
            expect(routines[0].name).toBe("Morning");
            expect(routines[1].name).toBe("Evening");
        });
    });

    describe("updateRoutine", () => {
        it("updates the matching routine", () => {
            useStretchStore.getState().addRoutine(makeRoutine("r1", "Morning"));
            useStretchStore.getState().updateRoutine({ ...makeRoutine("r1", "Morning"), name: "Updated" });
            expect(useStretchStore.getState().routines[0].name).toBe("Updated");
        });

        it("does not affect other routines", () => {
            useStretchStore.getState().addRoutine(makeRoutine("r1", "A"));
            useStretchStore.getState().addRoutine(makeRoutine("r2", "B"));
            useStretchStore.getState().updateRoutine({ ...makeRoutine("r1", "A"), name: "A-updated" });
            const b = useStretchStore.getState().routines.find((r) => r.id === "r2")!;
            expect(b.name).toBe("B");
        });
    });

    describe("deleteRoutine", () => {
        it("removes the routine with the given id", () => {
            useStretchStore.getState().addRoutine(makeRoutine("r1", "A"));
            useStretchStore.getState().addRoutine(makeRoutine("r2", "B"));
            useStretchStore.getState().deleteRoutine("r1");
            const { routines } = useStretchStore.getState();
            expect(routines).toHaveLength(1);
            expect(routines[0].id).toBe("r2");
        });
    });
});
