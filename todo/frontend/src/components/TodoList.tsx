import Todos from "./Todos";

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  _id: string;
}

const TodoList = ({ list }: { list: Todo[] }) => {
  return (
    <div>
      {list.map((t, index) => (
        <Todos key={index} todo={t} />
      ))}
    </div>
  );
};

export default TodoList;
