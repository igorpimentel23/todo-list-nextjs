'use client';

import { useCallback } from 'react';
import {
  Button,
  Field,
  Input,
  Label,
  Radio,
  RadioGroup,
} from '@headlessui/react';
import { CheckIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';
import {
  ITask,
  ICreateTaskDataType,
  createTaskSchema,
  Colors,
  TaskColorType,
} from '@/types/task';
import { LoadingSpinner } from '../LoadingSpinner';

interface ITaskFormProps {
  task?: ITask;
  onSubmit: (data: ICreateTaskDataType) => Promise<void>;
  onCancel: () => void;
}

const colorOptions = [
  { value: Colors.RED, label: 'Red', className: 'bg-red-500' },
  { value: Colors.ORANGE, label: 'Orange', className: 'bg-orange-500' },
  { value: Colors.YELLOW, label: 'Yellow', className: 'bg-yellow-500' },
  { value: Colors.GREEN, label: 'Green', className: 'bg-green-500' },
  { value: Colors.BLUE, label: 'Blue', className: 'bg-blue-500' },
  { value: Colors.PURPLE, label: 'Purple', className: 'bg-purple-500' },
  { value: Colors.PINK, label: 'Pink', className: 'bg-pink-500' },
  { value: Colors.BROWN, label: 'Brown', className: 'bg-amber-950' },
  { value: Colors.GRAY, label: 'Gray', className: 'bg-gray-500' },
  { value: Colors.BLACK, label: 'Black', className: 'bg-black' },
  { value: Colors.WHITE, label: 'White', className: 'bg-white' },
] as const;

const Component: React.FC<ITaskFormProps> = ({ task, onSubmit }) => {
  const { register, handleSubmit, setValue, watch, control, formState } =
    useForm<ICreateTaskDataType>({
      resolver: zodResolver(createTaskSchema),
      defaultValues: {
        title: task?.title || '',
        color: task?.color || Colors.BLUE,
      },
    });

  const submit = useCallback(
    async (data: ICreateTaskDataType) => {
      try {
        await onSubmit(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error saving task:', error);
      }
    },
    [onSubmit],
  );

  const color = watch('color');
  const title = watch('title');

  return (
    <Form
      control={control}
      onSubmit={(e) => {
        e.event?.preventDefault();
        handleSubmit(submit)();
      }}
      className="space-y-6"
    >
      <Field>
        <Label
          htmlFor="title"
          className="text-primary mb-2 block text-sm font-bold"
        >
          Title
        </Label>
        <Input
          {...register('title')}
          className={`focus:border-primary focus:ring-primary bg-foreground-light w-full rounded-lg border px-3 py-2 placeholder-gray-400 shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none ${formState.errors.title ? 'border-red-500' : 'border-white/5'} `}
          placeholder="Ex. Brush your teeth"
          disabled={formState?.isSubmitting}
        />
        {formState.errors.title && (
          <p className="mt-1 text-sm text-red-400">
            {formState.errors.title.message}
          </p>
        )}
      </Field>

      <Field>
        <Label
          htmlFor="color"
          className="text-primary mb-2 block text-sm font-bold"
        >
          Color
        </Label>
        <RadioGroup
          className="flex flex-wrap gap-3"
          {...register('color')}
          onChange={(value) => setValue('color', value as TaskColorType)}
        >
          {colorOptions.map((option) => (
            <Radio
              key={option.value}
              value={option.value}
              className={`relative h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-gray-900 transition-all ${option.className} ${
                color === option.value
                  ? 'ring-blue-500'
                  : 'ring-white hover:scale-110'
              } `}
              disabled={formState?.isSubmitting}
              aria-label={`Select ${option.label} color`}
            />
          ))}
        </RadioGroup>
      </Field>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={formState?.isSubmitting || !title}
          className="bg-primary hover:bg-primary/80 focus:primary focus:primary flex-1 rounded-lg border border-transparent px-4 py-2 text-gray-100 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="flex items-center justify-center gap-2 text-sm font-bold">
            {formState?.isSubmitting && (
              <>
                Saving...
                <LoadingSpinner size="sm" color="text-white" />
              </>
            )}
            {!formState?.isSubmitting && task ? (
              <>
                Save
                <CheckIcon className="size-4" />
              </>
            ) : (
              <>
                Add Task <PlusCircleIcon className="size-4" />
              </>
            )}
          </div>
        </Button>
      </div>
    </Form>
  );
};

export default Component;
