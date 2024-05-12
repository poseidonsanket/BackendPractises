import { useState } from "react";

interface TodoProps {
  title: string;
  description: string;
  completed: boolean;
  _id: string;
}
const Todos: React.FC<{ todo: TodoProps }> = ({ todo }) => {
  const { title, description, completed, _id } = todo;
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [isUpdate, setIsUpdate] = useState(false);
  console.log(todo._id);
  const completeTodo = async () => {
    const data = await fetch("http://localhost:3000/completed", {
      method: "PUT",
      body: JSON.stringify({
        id: _id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await data.json();
    console.log(json);
  };

  const setTodos = () => {
    setIsUpdate(!isUpdate);
  };

  const updateTodos = async () => {
    const res = await fetch("http://localhost:3000/update", {
      method: "PUT",
      body: JSON.stringify({
        id: _id,
        newTitle: newTitle,
        newDescription: newDescription,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await res.json();
    console.log(json);
    setIsUpdate(!isUpdate);
  };

  const deleteTodos = async () => {
    const data = await fetch("http://localhost:3000/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id: _id,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await data.json();
    console.log(json);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {isUpdate && (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={updateTodos}>Update Finally</button>
        </>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h2>{title}</h2>
        <h3>{description}</h3>
        <button onClick={completeTodo}>
          {completed ? "Completed" : "Mark as Completed"}
        </button>
        <button onClick={setTodos}>Open Update</button>
        <button onClick={deleteTodos}>Delete</button>
      </div>
    </div>
  );
};

export default Todos;
