import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './reducers/TodoSlice';

const rootStore = configureStore({
    reducer: {
        todoReducer
    },
})

export type RootState = ReturnType<typeof rootStore.getState>;
export type AppDispatch = typeof rootStore.dispatch;

export default rootStore;