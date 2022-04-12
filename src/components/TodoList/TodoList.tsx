import TodoItem from "../TodoItem/TodoItem";
import './TodoList.scss';
import {useAppSelector} from "../../hooks/redux";

const TodoList = () => {
    const pendingTodos = useAppSelector(state => state.todoReducer.pendingTodos);
  return (
      <div className='todo-list'>
          { pendingTodos.map(todo => <TodoItem key={todo} title={todo}/>) }
      </div>
  );
}

export default TodoList;