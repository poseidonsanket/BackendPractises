interface TodoProps {
  title: string;
  description: string;
  completed: boolean;
  _id: string;
}
const Todos: React.FC<{ todo: TodoProps }> = ({ todo }) => {
  const { title, description, completed, _id } = todo;
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
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <h2>{title}</h2>
      <h3>{description}</h3>
      <button onClick={completeTodo}>
        {completed == true ? "Completed" : "Mark as Completed"}
      </button>
    </div>
  );
};

export default Todos;
