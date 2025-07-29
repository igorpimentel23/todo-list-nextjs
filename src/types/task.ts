import { z } from 'zod';

export enum Colors {
  RED = 'red',
  BLUE = 'blue',
  GREEN = 'green',
  YELLOW = 'yellow',
  PURPLE = 'purple',
  ORANGE = 'orange',
  PINK = 'pink',
  BROWN = 'brown',
  GRAY = 'gray',
  BLACK = 'black',
  WHITE = 'white',
}

// Zod schemas for validation
export const taskColorSchema = z.enum(Colors);

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must have at least 3 characters')
    .max(100, 'Title must have at most 100 characters')
    .trim(),
  color: taskColorSchema,
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must have at least 3 characters')
    .max(100, 'Title must have at most 100 characters')
    .trim()
    .optional(),
  color: taskColorSchema.optional(),
  completed: z.boolean().optional(),
});

// TypeScript types inferred from Zod schemas
export type TaskColorType = z.infer<typeof taskColorSchema>;
export type ICreateTaskDataType = z.infer<typeof createTaskSchema>;
export type IUpdateTaskDataType = z.infer<typeof updateTaskSchema>;

export interface ITask {
  id: string;
  title: string;
  color: TaskColorType;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}
