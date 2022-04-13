import './App.scss';
import TodoAddContainer from "../TodoAddContainer/TodoAddContainer";
import TodoList from "../TodoList/TodoList";
import {useEffect} from "react";
import {useAppDispatch} from "../../hooks/redux";
import {setTodoList} from "../../stores/reducers/TodoSlice";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setTodoList());
    }, [dispatch]);

  return (
    <div className="app">
      <header className="app-header">
        <h1> TODO LIST</h1>
      </header>
      <main className="app-body">
          <TodoAddContainer />
          <TodoList />
      </main>
    </div>
  );
}

export default App;
