import { useTodoStore } from "../../store/todoStore";

const initialState = { tasks: [] };
let timeCounter = 1000;

beforeEach(() => {
    timeCounter = 1000;
    jest.spyOn(Date, "now").mockImplementation(() => timeCounter++);
    useTodoStore.setState(initialState);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe("todoStore", () => {
    describe("addTask", () => {
        it("adds a task to the list", () => {
            useTodoStore.getState().addTask("Buy groceries", "default");
            const { tasks } = useTodoStore.getState();
            expect(tasks).toHaveLength(1);
            expect(tasks[0].text).toBe("Buy groceries");
            expect(tasks[0].completed).toBe(false);
            expect(tasks[0].id).toBeDefined();
        });

        it("trims whitespace from task text", () => {
            useTodoStore.getState().addTask("  Clean house  ", "default");
            const { tasks } = useTodoStore.getState();
            expect(tasks[0].text).toBe("Clean house");
        });

        it("appends new tasks to the list", () => {
            useTodoStore.getState().addTask("First", "default");
            useTodoStore.getState().addTask("Second", "default");
            const { tasks } = useTodoStore.getState();
            expect(tasks[0].text).toBe("First");
            expect(tasks[1].text).toBe("Second");
        });
    });

    describe("toggleTask", () => {
        it("marks an incomplete task as completed", () => {
            useTodoStore.getState().addTask("Test task", "default");
            const id = useTodoStore.getState().tasks[0].id;
            useTodoStore.getState().toggleTask(id);
            expect(useTodoStore.getState().tasks[0].completed).toBe(true);
        });

        it("marks a completed task as incomplete", () => {
            useTodoStore.getState().addTask("Test task", "default");
            const id = useTodoStore.getState().tasks[0].id;
            useTodoStore.getState().toggleTask(id);
            useTodoStore.getState().toggleTask(id);
            expect(useTodoStore.getState().tasks[0].completed).toBe(false);
        });

        it("only toggles the specified task", () => {
            useTodoStore.getState().addTask("Task A", "default");
            useTodoStore.getState().addTask("Task B", "default");
            const idA = useTodoStore.getState().tasks[0].id;
            useTodoStore.getState().toggleTask(idA);
            const { tasks } = useTodoStore.getState();
            expect(tasks.find((t) => t.id === idA)?.completed).toBe(true);
            expect(tasks.find((t) => t.text === "Task B")?.completed).toBe(false);
        });
    });

    describe("deleteTask", () => {
        it("removes the specified task", () => {
            useTodoStore.getState().addTask("Delete me", "default");
            useTodoStore.getState().addTask("Keep me", "default");
            const idToDelete = useTodoStore.getState().tasks.find((t) => t.text === "Delete me")!.id;
            useTodoStore.getState().deleteTask(idToDelete);
            const { tasks } = useTodoStore.getState();
            expect(tasks).toHaveLength(1);
            expect(tasks[0].text).toBe("Keep me");
        });
    });

    describe("clearCompleted", () => {
        it("removes all completed tasks", () => {
            useTodoStore.getState().addTask("Done 1", "default");
            useTodoStore.getState().addTask("Done 2", "default");
            useTodoStore.getState().addTask("Pending", "default");
            const allTasks = useTodoStore.getState().tasks;
            const done1 = allTasks.find((t) => t.text === "Done 1")!;
            const done2 = allTasks.find((t) => t.text === "Done 2")!;
            useTodoStore.getState().toggleTask(done1.id);
            useTodoStore.getState().toggleTask(done2.id);
            useTodoStore.getState().clearCompleted();
            const { tasks } = useTodoStore.getState();
            expect(tasks).toHaveLength(1);
            expect(tasks[0].text).toBe("Pending");
        });

        it("does nothing when no tasks are completed", () => {
            useTodoStore.getState().addTask("Still here", "default");
            useTodoStore.getState().clearCompleted();
            expect(useTodoStore.getState().tasks).toHaveLength(1);
        });
    });
});
