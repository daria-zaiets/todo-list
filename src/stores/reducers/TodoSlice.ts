import {ITodoSate} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import TodoService from '../../services'

const initialState: ITodoSate = {
    todosMap: {},
    pendingTodos: [],
    doneTodos: []
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state: ITodoSate, {payload}: PayloadAction<string>) => {
            const todo = TodoService.addTodo(payload);
            state.pendingTodos.push(todo);
        },
        setTodoList: (state: ITodoSate) => {
            state.todosMap = TodoService.getTodoList();
            const todosMap = state.todosMap;
            for (const todosMapKey in todosMap) {
                if(todosMap[todosMapKey].isDone) state.doneTodos.push(todosMap[todosMapKey]);
                else state.pendingTodos.push(todosMap[todosMapKey])
            }
        },
        changeStatus: (state: ITodoSate, {payload}: PayloadAction<string>) => {
            const newStatus = TodoService.changeStatus(payload);
            state.todosMap[payload].isDone = newStatus;
            if(newStatus) {
                state.pendingTodos = state.pendingTodos.filter(todo => todo.id !== payload);
                state.doneTodos.push(state.todosMap[payload]);
            } else {
                state.doneTodos = state.doneTodos.filter(todo => todo.id !== payload);
                state.pendingTodos.push(state.todosMap[payload]);
            }
        }
    },
});

export const {addTodo, setTodoList, changeStatus} = todoSlice.actions;
export const pendingTodos = ({todoReducer}: RootState) => todoReducer.pendingTodos;
export const doneTodos = ({todoReducer}: RootState) => todoReducer.doneTodos;
export default todoSlice.reducer