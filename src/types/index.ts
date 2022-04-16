export interface ITodo {
    id: string;
    title: string;
    isDone: boolean;
    creationsDate: number;
}

export interface ITodoSate {
    todosMap: Record<ITodo['id'], ITodo>;
    pendingTodos: ITodo['id'][];
    doneTodos: ITodo['id'][];
    filter: FILTER;
}

export enum FILTER {
    ALL = 'ALL',
    PENDING = 'PENDING',
    DONE = 'DONE',
}

export interface IRemoveTodo {
    todoId: string;
    isNewStatusDone: boolean;
}