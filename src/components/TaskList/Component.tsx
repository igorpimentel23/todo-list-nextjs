'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@headlessui/react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import ClipboardIcon from '@/assets/icons/Clipboard.svg';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { TaskCard } from '@/components/TaskCard';
import { apiClient } from '@/lib/api';
import { ITask } from '@/types/task';

const Component: React.FC = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const completedTasks = tasks.filter((task) => task.completed);
  const totalTasks = tasks.length;
  const completedCount = completedTasks.length;

  const loadTasks = useCallback(async (triggerLoading = true) => {
    try {
      setLoading(triggerLoading);
      setError(null);
      const fetchedTasks = await apiClient.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error loading tasks:', err);
      setError('Error loading tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleToggleComplete = useCallback(
    async (id: string, completed: boolean) => {
      try {
        const updatedTask = await apiClient.updateTask(id, { completed });
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? updatedTask : task)),
        );
        loadTasks(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error updating task:', err);
        setError('Error updating task. Please try again.');
      }
    },
    [loadTasks],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await apiClient.deleteTask(id);
        setTasks((prev) => prev.filter((task) => task.id !== id));
        loadTasks(false);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error deleting task:', err);
        setError('Error deleting task. Please try again.');
      }
    },
    [loadTasks],
  );

  const handleCreateTask = useCallback(() => {
    router.push('/create');
  }, [router]);

  useEffect(() => {
    if (error) {
      toast(error, {
        type: 'error',
      });
    }
  }, [error]);

  return (
    <div className="container mx-auto h-full">
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-400">Loading tasks...</p>
          </div>
        </div>
      ) : (
        <>
          <Button
            onClick={handleCreateTask}
            className="bg-primary focus:ring-primary hover:bg-primary/80 flex w-full -translate-y-[50%] items-center justify-center gap-2 rounded-lg px-4 py-4 text-sm font-bold text-gray-100 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:outline-none"
          >
            Create Task
            <PlusCircleIcon className="size-5" />
          </Button>

          <div className="my-6 flex justify-between gap-4 text-sm">
            <span className="text-primary font-bold">
              Tasks:{' '}
              <span className="rounded-full bg-gray-700 px-2 py-1 text-gray-200">
                {totalTasks}
              </span>
            </span>
            <span className="text-secondary-light font-bold">
              Completed:{' '}
              <span className="rounded-full bg-gray-700 px-2 py-1 text-gray-200">
                {completedCount} of {totalTasks}
              </span>
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 border-t border-t-gray-400 p-12 text-center">
              <ClipboardIcon className="mx-auto h-16 w-16 text-gray-300" />
              <h3 className="mb-2 font-bold text-gray-300">
                You don&apos;t have any tasks registered yet.
              </h3>
              <p className="font-normal text-gray-300">
                Create tasks and organize your to-do items.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Component;
