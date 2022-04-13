export interface ITodo {
    id: string;
    title: string;
    isDone: boolean;
}

export interface ITodoSate {
    todosMap: Record<ITodo['id'], ITodo>;
    todoList: ITodo[];
    pendingTodos: ITodo['id'][];
    doneTodos: ITodo['id'][];
}