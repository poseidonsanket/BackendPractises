const z = require("zod");

const createTodo = z.object({
  title: z.string(),
  description: z.string(),
});

const updateTodoStatus = z.object({
  id: z.string(),
});

const updateTodo = z.object({
  id: z.string(),
  newTitle: z.string(),
  newDescription: z.string(),
});

const deleteTodo = z.object({
  id: z.string(),
});

module.exports = {
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo
};
