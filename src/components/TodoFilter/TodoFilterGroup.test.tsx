import {renderWithRedux} from "../../test/utils/renderWithRedux";
import {initialState} from "../../stores/reducers/TodoSlice";
import {screen} from "@testing-library/react";
import TodoFilterGroup from "./TodoFilterGroup";
import userEvent from "@testing-library/user-event";

test("renders start elements", () => {
    renderWithRedux(<TodoFilterGroup/>, initialState);

    const filterItems = screen.getAllByTestId('filter-item');
    filterItems.forEach(filterItem => {
        expect(filterItem).toBeInTheDocument();
    });
});

const defaultState = jest.fn(() => {
    renderWithRedux(<TodoFilterGroup/>, initialState);

    const itemAll = screen.getByText("All");
    expect(itemAll).toHaveClass("filterItem_active");

    const itemPending = screen.getByText("Pending");
    expect(itemPending).not.toHaveClass("filterItem_active");

    const itemDone = screen.getByText("Done");
    expect(itemDone).not.toHaveClass("filterItem_active");
});

test("default filter group state", defaultState);

test("click one of filter items", () => {
    renderWithRedux(<TodoFilterGroup/>, initialState);

    userEvent.click(screen.getByText("Pending"));
    expect(screen.getByText("Pending")).toHaveClass("filterItem_active");

    const itemAll = screen.getByText("All");
    expect(itemAll).not.toHaveClass("filterItem_active");

    const itemDone = screen.getByText("Done");
    expect(itemDone).not.toHaveClass("filterItem_active");

    userEvent.click(screen.getByText("Pending"));
    defaultState();
})