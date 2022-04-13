import TodoItem from "../TodoItem/TodoItem";
import './TodoList.scss';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useCallback} from "react";
import {changeStatus} from "../../stores/reducers/TodoSlice";

const TodoList = () => {
    const dispatch = useAppDispatch();
    const todoList = useAppSelector(state => state.todoReducer.todoList);

    const changeStatusTodo = useCallback((todoId: string) => () =>  {
        dispatch(changeStatus(todoId));
    }, [dispatch])

  return (
      <div className='todo-list'>
          { todoList.map(todo => <TodoItem key={todo.id} todo={todo} changeStatus={changeStatusTodo(todo.id)}/>) }
      </div>
  );
}

export default TodoList;