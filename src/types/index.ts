export interface ITodo {
    id: string;
    title: string;
    isDone: boolean;
    creationsDate: number;
}

export interface ITodoSate {
    todosMap: Record<ITodo['id'], ITodo>;
    pendingTodos: ITodo[];
    doneTodos: ITodo[];
}