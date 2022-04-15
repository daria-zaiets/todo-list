import TodoItem from "../TodoItem/TodoItem";
import scss from  './TodoList.module.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useCallback} from "react";
import {changeStatus, deleteTodo, todos} from "../../stores/reducers/TodoSlice";
import TodoFilterGroup from "../TodoFilter/TodoFilterGroup";

const TodoList = () => {
    const dispatch = useAppDispatch();
    const todoList = useAppSelector(todos);

    const changeStatusTodo = useCallback((todoId: string) => () =>  {
        dispatch(changeStatus(todoId));
    }, [dispatch])

    const removeTodo = useCallback((todoId: string) => () =>  {
        dispatch(deleteTodo(todoId));
    }, [dispatch])
  return (
      <div>
          <TodoFilterGroup />
          {!!todoList.length
              ? (
              <div className={scss.todoList}>
                  {todoList
                      .sort((a, b) => b.creationsDate - a.creationsDate)
                      .map(todo => (
                          <TodoItem
                              key={todo.id}
                              todo={todo}
                              changeStatus={changeStatusTodo(todo.id)}
                              deleteTodo={removeTodo(todo.id)}
                          />))
                  }
              </div>)
              :
              <h2 className={scss.noTodoContainer}>There is no todos</h2>}
      </div>
  );
}

export default TodoList;