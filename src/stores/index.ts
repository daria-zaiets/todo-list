import {combineReducers, configureStore} from '@reduxjs/toolkit'
import todoReducer from './reducers/TodoSlice';
import {ITodoSate} from "../types";

const rootReducer = combineReducers({
    todoReducer,
})

export const createReduxStore = (preloadedState: Record<string, ITodoSate> = {}) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    })
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createReduxStore>;
export type AppDispatch = AppStore["dispatch"];