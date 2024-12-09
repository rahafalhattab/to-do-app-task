import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware';

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, newTitle: string) => void;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>(
  persist<TodoStore>(
    (set) => ({
      todos: [],
      addTodo: (title) => {
        set((state) => ({
          todos: [...state.todos, { id: Date.now().toString(), title, isCompleted: false }],
        }));
      },
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      updateTodo: (id, newTitle) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
          ),
        }));
      },
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          ),
        }));
      },
    }),
    {
      name: 'todo-storage', // Name for the key in localStorage
    } as PersistOptions<TodoStore>
  )
);
