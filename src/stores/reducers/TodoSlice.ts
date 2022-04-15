import {FILTER, IRemoveTodo, ITodoSate} from "../../types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index";
import TodoService from '../../services';

const initialState: ITodoSate = {
    todosMap: {},
    filter: FILTER.ALL,
    pendingTodos: [],
    doneTodos: []
};

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodoList: (state: ITodoSate) => {
            state.todosMap = TodoService.getTodoList();
            const todosMap = state.todosMap;
            for (const todosMapKey in todosMap) {
                const isDoneTodo = todosMap[todosMapKey].isDone;
                isDoneTodo
                    ? state.doneTodos.push(todosMapKey)
                    : state.pendingTodos.push(todosMapKey);
            }
        },
        addTodo: (state: ITodoSate, {payload}: PayloadAction<string>) => {
            const todo = TodoService.addTodo(payload);
            state.todosMap[todo.id] = todo;
            state.pendingTodos.push(todo.id);
        },
        changeStatus: (state: ITodoSate, {type, payload}: PayloadAction<string>) => {
            const newStatus = TodoService.changeStatus(payload);
            state.todosMap[payload].isDone = newStatus;

            const removeParams: IRemoveTodo = {
                todoId: payload,
                isNewStatusDone: newStatus
            };
            todoSlice.caseReducers.removeTodo(state,{type, payload: removeParams});
        },
        deleteTodo: (state: ITodoSate, {payload}: PayloadAction<string>) => {
            TodoService.deleteTodo(payload);
            delete state.todosMap[payload];
        },
        filterListByStatus: (state: ITodoSate, {payload}: PayloadAction<FILTER>) => {
            state.filter = state.filter === payload ? FILTER.ALL : payload;
        },
        removeTodo: (state: ITodoSate, {payload}: PayloadAction<IRemoveTodo>) => {
            if(payload.isNewStatusDone) {
                state.pendingTodos = state.pendingTodos.filter(todoId => todoId !== payload.todoId);
                state.doneTodos.push(payload.todoId);
            } else {
                state.doneTodos = state.doneTodos.filter(todoId => todoId !== payload.todoId);
                state.pendingTodos.push(payload.todoId);
            }
        }
    },
});

export const {setTodoList, addTodo, changeStatus, deleteTodo, filterListByStatus} = todoSlice.actions;

export const todos = ({todoReducer}: RootState) => {
    const allTodos = [...Object.values(todoReducer.todosMap)];
    if (todoReducer.filter === FILTER.PENDING) {
        return allTodos.filter(todo => todoReducer.pendingTodos.includes(todo.id));
    } else if (todoReducer.filter === FILTER.DONE) {
        return allTodos.filter(todo => todoReducer.doneTodos.includes(todo.id));
    } else {
        return allTodos;
    }
};

export const  isTodoInList = ({todoReducer}: RootState) => (todoTitle: string) => {
    return !!Object.values(todoReducer.todosMap).find(todo => todo.title === todoTitle);
};

export default todoSlice.reducer