import todoSlice, {addTodo, changeStatus, deleteTodo, setFilter} from "../TodoSlice";
import {FILTER, ITodoSate} from "../../../types";

const storeState: ITodoSate = {
    todosMap: {
        "2eP0g4dqoz1Gh7A2": {
            id:"2eP0g4dqoz1Gh7A2",
            title: "buy toy",
            isDone: true,
            creationsDate: 1650037981713
        }
    },
    pendingTodos: [],
    doneTodos: ["2eP0g4dqoz1Gh7A2"],
    filter: FILTER.ALL
};

const newStoreState: ITodoSate = {
    todosMap: {
        "2eP0g4dqoz1Gh7A2": {
            id:"2eP0g4dqoz1Gh7A2",
            title: "buy toy",
            isDone: false,
            creationsDate: 1650037981713
        }
    },
    pendingTodos: ["2eP0g4dqoz1Gh7A2"],
    doneTodos: [],
    filter: FILTER.ALL
};

const todosCount = (todoState: ITodoSate) => Object.keys(todoState.todosMap).length;

test("add todo", () => {
    const newState = todoSlice(storeState, addTodo("buy milk"));
    expect(todosCount(newState)).toBe(todosCount(storeState) + 1);
    expect(newState.pendingTodos.length).toBe(storeState.pendingTodos.length + 1);
    localStorage.setItem("todoDataStore", JSON.stringify(newState.todosMap));
});

test("change status", () => {
    expect(todoSlice(storeState, changeStatus("2eP0g4dqoz1Gh7A2"))).toEqual(newStoreState);
});

test("delete todo", () => {
    expect(todoSlice(storeState, deleteTodo("2eP0g4dqoz1GJ7A2"))).toEqual(storeState);
});

describe("set filter", () => {
    test("when first click on Done filter item", () => {
        expect(todoSlice(storeState, setFilter(FILTER.DONE)))
            .toEqual({...storeState, filter: FILTER.DONE});
    });
    test("when second click on Done filter item", () => {
        expect(todoSlice({...storeState, filter: FILTER.DONE}, setFilter(FILTER.DONE)))
            .toEqual({...storeState, filter: FILTER.ALL});
    });

});