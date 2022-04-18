import {render, screen} from "@testing-library/react";
import TodoItem from "./TodoItem";

const pendingTodo = {
    id: "KrS6Qx1BJ4wpB9LJ",
    title: "buy milk",
    isDone: false,
    creationsDate: 1650037433053
};

const doneTodo = {
    id: "KrS6Qx1BJ4wpB9LJ",
    title: "buy milk",
    isDone: true,
    creationsDate: 1650037433053
};

test('renders start elements', () => {
    render(<TodoItem todo={pendingTodo} changeStatus={()=>{}} deleteTodo={()=>{}}/>);

    const checkboxElement = screen.getByTestId("checkbox-todo");
    const todoLabel = screen.getByTestId("todo-title");
    const deleteButton = screen.getByTestId("delete-button");

    expect(checkboxElement).toBeInTheDocument();
    expect(todoLabel).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
});

describe("states todo", () => {
    test("when todo is pending", () => {
        render(<TodoItem todo={pendingTodo} changeStatus={()=>{}} deleteTodo={()=>{}}/>);

        const todoContainer = screen.getByTestId("todo-container");
        const actionContainer = screen.getByTestId("action-container");
        const checkboxElement = screen.getByTestId("checkbox-todo");

        expect(todoContainer).not.toHaveClass("todoItem_done");
        expect(actionContainer).not.toHaveClass("todoItem__action_done");
        expect(checkboxElement).not.toHaveClass("Mui-checked");
    });
    test("when todo is done", () => {
        render(<TodoItem todo={doneTodo} changeStatus={()=>{}} deleteTodo={()=>{}}/>);

        const todoContainer = screen.getByTestId("todo-container");
        const actionContainer = screen.getByTestId("action-container");
        const checkboxElement = screen.getByTestId("checkbox-todo");

        expect(todoContainer).toHaveClass("todoItem_done");
        expect(actionContainer).toHaveClass("todoItem__action_done");
        expect(checkboxElement).toHaveClass("Mui-checked");
    });
});