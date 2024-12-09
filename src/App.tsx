import TodoForm from './components/TDoForm';
import TodoCard from './components/ToDoCard';
import { useTodoStore } from './stores/ToDoStore';
import { Toaster } from 'react-hot-toast';

function App() {
  const todos = useTodoStore((state) => state.todos);

  return (
    <div className=" flex flex-col items-center justify-center">
      <Toaster />
      <TodoForm />
      <div className="mt-4 grid gap-4">
        {todos.map((todo) => (
          <TodoCard key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
}

export default App;
