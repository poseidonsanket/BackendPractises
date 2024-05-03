import { useState } from "react";

const CreateTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const setTodos = async () => {
    console.log(title);
    console.log(description);
    const data = await fetch("http://localhost:3000/todo", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });

    const json = await data.json();
    console.log(json);
    alert("Todo Added");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button onClick={setTodos}>Add a Todo</button>
    </div>
  );
};

export default CreateTodo;
