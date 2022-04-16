import {screen} from '@testing-library/react';
import TodoAddContainer, {ERROR_TEXT} from './TodoAddContainer';
import userEvent from "@testing-library/user-event";
import {renderWithRedux} from "../../test/utils/renderWithRedux";
import {initialState} from "../../stores/reducers/TodoSlice";

test('renders start elements', () => {
    renderWithRedux(<TodoAddContainer/>, initialState);

    const inputElement = screen.getByTestId('add-item-field');
    const buttonElement = screen.getByTestId('add-item-button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
});

describe('form state', () => {
    test("default state", () => {
        renderWithRedux(<TodoAddContainer/>, initialState);

        const inputElement = screen.getByTestId('add-item-field');
        const buttonElement = screen.getByTestId('add-item-button');

        expect(inputElement).toHaveValue("");
        expect(buttonElement).toHaveClass("Mui-disabled");
    });

    test("type spaces in input", () => {
        renderWithRedux(<TodoAddContainer/>, initialState);

        const inputElement = screen.getByTestId('add-item-field');
        const buttonElement = screen.getByTestId('add-item-button');

        userEvent.type(inputElement, "   ");
        expect(buttonElement).toHaveClass("Mui-disabled");
    });
    test("type chars in input", () => {
        renderWithRedux(<TodoAddContainer/>, initialState);

        const inputElement = screen.getByTestId('add-item-field');
        const buttonElement = screen.getByTestId('add-item-button');

        userEvent.type(inputElement, "buy milk");
        expect(buttonElement).not.toHaveClass("Mui-disabled");
    })
});

describe("input errors", () => {
    describe("empty field error", () => {
        test("when type spaces in input and press enterKey", () => {
            renderWithRedux(<TodoAddContainer/>, initialState);

            userEvent.type(screen.getByTestId('add-item-field'), " {enter}");
            expect(screen.getByText(ERROR_TEXT.EMPTY_FILED)).toBeInTheDocument();
        })

        test("when type nothing in input and press enterKey", () => {
            renderWithRedux(<TodoAddContainer/>, initialState);

            userEvent.type(screen.getByTestId('add-item-field'), "{enter}");
            expect(screen.getByText(ERROR_TEXT.EMPTY_FILED)).toBeInTheDocument();
        });
    });

    describe("todo title's duplicate error", () => {
        const identicalTitlesCount = 2;

        test("when click button", () => {
            renderWithRedux(<TodoAddContainer/>, initialState);

            for(let i = 0; i < identicalTitlesCount; i++) {
                userEvent.type(screen.getByTestId('add-item-field'), "buy milk");
                userEvent.click(screen.getByTestId('add-item-button'));
            }
            expect(screen.getByText(ERROR_TEXT.DUPLICATE_TITLE)).toBeInTheDocument();
        });

        test("when press enter", () => {
            renderWithRedux(<TodoAddContainer/>, initialState);

            for(let i = 0; i < identicalTitlesCount; i++) {
                userEvent.type(screen.getByTestId('add-item-field'), "buy milk{enter}");
            }
            expect(screen.getByText(ERROR_TEXT.DUPLICATE_TITLE)).toBeInTheDocument();
        });
    });

    test("when none", () => {
        renderWithRedux(<TodoAddContainer/>, initialState);

        userEvent.type(screen.getByTestId('add-item-field'), "buy milk{enter}");
        userEvent.type(screen.getByTestId('add-item-field'), "buy present");
        userEvent.click(screen.getByTestId('add-item-button'));

        expect(screen.queryByText(ERROR_TEXT.DUPLICATE_TITLE)).toBeNull();
        expect(screen.queryByText(ERROR_TEXT.EMPTY_FILED)).toBeNull();
    })
});