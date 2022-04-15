export interface ITodo {
    id: string;
    title: string;
    isDone: boolean;
    creationsDate: number;
}

export interface ITodoSate {
    todosMap: Record<ITodo['id'], ITodo>;
    // todoList: ITodo[];
    filter: FILTER;
    pendingTodos: ITodo['id'][];
    doneTodos: ITodo['id'][];
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