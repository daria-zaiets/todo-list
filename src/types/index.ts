export interface ITodo {
    id: string;
    title: string;
    isDone: boolean;
}

export interface ITodoSate {
    pendingTodos: ITodo['id'][];
    doneTodos: ITodo['id'][];
}