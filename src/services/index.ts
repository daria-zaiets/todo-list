import {ITodo} from "../types";
import ShortUniqueId from 'short-unique-id';

const storeKey = 'todoDataStore';

class TodoService {
    public getTodoList(): Record<string, ITodo>  {
        const todos = localStorage.getItem(storeKey);
        if(!todos) return {};
        return  JSON.parse(todos);
    }

    public addTodo(todoTitle: string) {
        const todoId = new ShortUniqueId({ length: 16 });
        const todo: ITodo = {
            id: todoId().toString(),
            title: todoTitle,
            isDone: false,
            creationsDate: Number(new Date()),
        };

        const todos = localStorage.getItem(storeKey);
        let todosMap: Record<string, ITodo>;

        if(!todos) todosMap = {};
        else todosMap = JSON.parse(todos);

        todosMap[todo.id] = todo;
        localStorage.setItem(storeKey, JSON.stringify(todosMap));
        return todo;
    }

    public changeStatus(todoId: string) {
        const todos = localStorage.getItem(storeKey);

        if(!todos) return false;

        let todosMap = JSON.parse(todos);
        todosMap[todoId]['isDone'] = !todosMap[todoId]['isDone'];
        localStorage.setItem(storeKey, JSON.stringify(todosMap));
        return todosMap[todoId]['isDone'];
    }

    public deleteTodo(todoId: string) {
        const todos = localStorage.getItem(storeKey);
        let todosMap: Record<string, ITodo>;

        if(!todos) return false;
        todosMap = JSON.parse(todos);
        delete todosMap[todoId];
        localStorage.setItem(storeKey, JSON.stringify(todosMap));
    }
}

export default new TodoService();