import {ITodoSate} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";

const initialState: ITodoSate = {
    pendingTodos: [],
    doneTodos: []
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state: ITodoSate, {payload}: PayloadAction<string>) => {
            state.pendingTodos.unshift(payload);
        }
    },
});

export const {addTodo} = todoSlice.actions;
export const pendingTodos = (state: RootState) => state.todoReducer.pendingTodos;
export const doneTodos = (state: RootState) => state.todoReducer.doneTodos;
export default todoSlice.reducer