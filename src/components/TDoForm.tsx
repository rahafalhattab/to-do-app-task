import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { todoSchema } from '../utils/validation';
import { useTodoStore } from '../stores/ToDoStore';
import toast from 'react-hot-toast';

type TodoFormInputs = { title: string };

const TodoForm = () => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormInputs>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = (data: TodoFormInputs) => {
    addTodo(data.title);
    toast.success('Task added!');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <input
        {...register('title')}
        type="text"
        placeholder="Name for the To Do"
        className="p-2 border border-gray-33 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit
      </button>
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
    </form>
  );
};

export default TodoForm;
