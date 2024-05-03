const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors")
const { createTodo } = require("./types");
const { updateTodo } = require("./types");
const Todo = require("./db");

app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  const Todos = await Todo.find({});
  res.json({
    Todo: Todos,
  });
});

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsePayload = createTodo.safeParse(createPayload);
  if (!parsePayload.success) {
    return res.status(403).json({
      msg: "Give Valid input",
    });
  }

  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "Todo created",
  });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsePayload = updateTodo.safeParse(updatePayload);
  if (!parsePayload.success) {
    return res.status(403).json({
      msg: "Give Valid input",
    });
  }
  await Todo.updateOne(
    { _id: updatePayload.id },
    {
      completed: true,
    }
  );

  res.json({
    msg: "Todo marked as completed",
  });
});

app.listen(port);
