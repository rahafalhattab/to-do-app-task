import * as z from 'zod';

export const todoSchema = z.object({
  title: z.string().min(3, 'Task title must be at least 3 characters long').nonempty(),
});
