const mongoose = require("mongoose");
const { boolean } = require("zod");

mongoose.connect(
  "mongodb+srv://sanketdadali:12345@cluster0.vk7ri7w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const TodoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo