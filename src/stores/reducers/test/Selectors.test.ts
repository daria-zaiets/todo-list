import {initialState, isTodoInList, todos} from "../TodoSlice";
import {FILTER, ITodoSate} from "../../../types";

const filterIsAllState: ITodoSate = {
    todosMap: {
        "KrS6Qx1BJ4wpB9LJ": {
            id: "KrS6Qx1BJ4wpB9LJ",
            title: "buy milk",
            isDone: false,
            creationsDate: 1650037433053
        },
        "2eP0g4dqoz1GJ7A2": {
            id:"2eP0g4dqoz1GJ7A2",
            title: "buy toy",
            isDone: true,
            creationsDate: 1650037981713
        }
    },
    pendingTodos: ["KrS6Qx1BJ4wpB9LJ"],
    doneTodos: ["2eP0g4dqoz1GJ7A2"],
    filter: FILTER.ALL
};

const filterIsPendingState = {...filterIsAllState, filter: FILTER.PENDING};
const filterIsDoneState = {...filterIsAllState, filter: FILTER.DONE};
const onlyPendingTodosState: ITodoSate = {
    todosMap: {
        "KrS6Qx1BJ4wpB9LJ": {
            id: "KrS6Qx1BJ4wpB9LJ",
            title: "buy milk",
            isDone: false,
            creationsDate: 1650037433053
        }
    },
    pendingTodos: ["KrS6Qx1BJ4wpB9LJ"],
    doneTodos: [],
    filter: FILTER.DONE
};

describe("todo list", () => {
    test("when todosMap has no todos and filter is anything", () => {
        expect(todos({ todoReducer: initialState})).toEqual([]);
    });

    test("when todosMap has pending and done todos filter is All", () => {
        expect(todos({ todoReducer: filterIsAllState}))
            .toEqual(Object.values(filterIsAllState.todosMap));
    });

    test("when todosMap has pending and done todos filter is Pending", () => {
        expect(todos({ todoReducer: filterIsPendingState}))
            .toEqual([{
                id: "KrS6Qx1BJ4wpB9LJ",
                title: "buy milk",
                isDone: false,
                creationsDate: 1650037433053
            }]);
    });

    test("when todosMap has pending and done todos filter is Done", () => {
        expect(todos({ todoReducer: filterIsDoneState}))
            .toEqual([{
                id:"2eP0g4dqoz1GJ7A2",
                title: "buy toy",
                isDone: true,
                creationsDate: 1650037981713
            }]);
    });

    test("when todosMap has one todo's status and filter is another status", () => {
        expect(todos({ todoReducer: onlyPendingTodosState})).toEqual([]);
    });
});

describe("isTodoInList", () => {
    test("if state is default", () => {
        const isTodo = isTodoInList({todoReducer: initialState});
        expect(isTodo("buy milk")).toBe(false);
    });

    describe("if state has todos", () => {
        test("when store has no duplicate", () => {
            const isTodo = isTodoInList({todoReducer: filterIsAllState});
            expect(isTodo("wash the cup")).toBe(false);

        });

        test("when store has duplicate", () => {
            const isTodo = isTodoInList({todoReducer: filterIsAllState});
            expect(isTodo("buy milk")).toBe(true);

        });
    });
});