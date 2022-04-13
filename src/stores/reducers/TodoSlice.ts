import {ITodoSate} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import TodoService from '../../services'

const initialState: ITodoSate = {
    todosMap: {},
    todoList: [],
    pendingTodos: [],
    doneTodos: []
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state: ITodoSate, {payload}: PayloadAction<string>) => {
            const todo = TodoService.addTodo(payload);
            state.pendingTodos.unshift(todo.id);
            state.todoList.unshift(todo);
        },
        setTodoList: (state: ITodoSate) => {
            state.todosMap = TodoService.getTodoList();
            const todosMap = { ...state.todosMap}

            for (const todosMapId in todosMap) {
                if(todosMap[todosMapId]['isDone']) {
                    state.doneTodos.push(todosMapId);
                } else {
                    state.pendingTodos.push(todosMapId);
                }
            }

            const todoIdList = [...state.pendingTodos, ...state.doneTodos];
            state.todoList = todoIdList.map(todoId => state.todosMap[todoId]);
        },
        changeStatus: (state: ITodoSate, {payload}: PayloadAction<string>) => {
            const newStatus = TodoService.changeStatus(payload);
            state.todosMap[payload].isDone = newStatus;

            if(newStatus) {
                state.pendingTodos = state.pendingTodos.filter(todoId => todoId !== payload);
                state.doneTodos.push(payload);
            } else {
                state.doneTodos = state.doneTodos.filter(todoId => todoId !== payload);
                state.pendingTodos.unshift(payload);
            }

            const todoIdList = [...state.pendingTodos, ...state.doneTodos];
            state.todoList = todoIdList.map(todoId => state.todosMap[todoId]);
        }
    },
});

export const {addTodo, setTodoList, changeStatus} = todoSlice.actions;
export const todoList = ({todoReducer}: RootState) => todoReducer.todoList;
export default todoSlice.reducer