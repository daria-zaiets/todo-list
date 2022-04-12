import './App.scss';
import TodoAddContainer from "../TodoAddContainer/TodoAddContainer";
import TodoList from "../TodoList/TodoList";

function App() {
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
