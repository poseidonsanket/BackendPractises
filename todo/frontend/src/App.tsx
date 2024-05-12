import { useEffect, useState } from "react";
import CreateTodo from "./components/CreateTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("http://localhost:3000/todos");
        const json = await data.json();
        setTodos(json.Todo);
        console.log(json.Todo);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  });

  return (
    <div>
      <CreateTodo />
      <TodoList list={todos} />
    </div>
  );
};

export default App;
