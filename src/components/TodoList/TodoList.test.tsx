import {renderWithRedux} from "../../test/utils/renderWithRedux";
import {initialState} from "../../stores/reducers/TodoSlice";
import {screen} from "@testing-library/react";
import TodoList from "./TodoList";
import {FILTER, ITodoSate} from "../../types";

const storeState: ITodoSate = {
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
    filter: FILTER.ALL
}

describe('renders start elements', () => {
    test("if there are no todos", () => {
        renderWithRedux(<TodoList/>, initialState);

        const filterGroup = screen.getByTestId("filter-group");
        const noTodoContainer = screen.getByTestId("no-todos-container");
        const todoList = screen.queryByTestId("list-container");

        expect(filterGroup).toBeInTheDocument();
        expect(noTodoContainer).toBeInTheDocument();
        expect(todoList).toBeNull();
    });
    test("if there are todos", () => {
        renderWithRedux(<TodoList/>, storeState);

        const filterGroup = screen.getByTestId("filter-group");
        const noTodoContainer = screen.queryByTestId("no-todos-container");
        const todoList = screen.getByTestId("list-container");

        expect(filterGroup).toBeInTheDocument();
        expect(todoList).toBeInTheDocument();
        expect(noTodoContainer).toBeNull();
    });
});