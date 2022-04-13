import TodoItem from "../TodoItem/TodoItem";
import scss from  './TodoList.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useCallback} from "react";
import {changeStatus} from "../../stores/reducers/TodoSlice";

const TodoList = () => {
    const dispatch = useAppDispatch();
    const pendingTodos = useAppSelector(state => [...state.todoReducer.pendingTodos]);
    const doneTodos = useAppSelector(state => [...state.todoReducer.doneTodos]);

    const changeStatusTodo = useCallback((todoId: string) => () =>  {
        dispatch(changeStatus(todoId));
    }, [dispatch])

  return (
      <div className={scss.todoList}>
          <div className={scss.todoList}>
              { pendingTodos
                      .sort((a,b) => b.creationsDate - a.creationsDate)
                      .map(todo => <TodoItem key={todo.id} todo={todo} changeStatus={changeStatusTodo(todo.id)}/>)
              }
          </div>
          <div className={scss.todoList}>
              { doneTodos
                      .sort((a,b) => b.creationsDate - a.creationsDate)
                      .map(todo => <TodoItem key={todo.id} todo={todo} changeStatus={changeStatusTodo(todo.id)}/>)
              }
          </div>
      </div>
  );
}

export default TodoList;