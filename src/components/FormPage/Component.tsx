'use client';

import { useCallback } from 'react';
import { Button } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { TaskForm } from '@/components/TaskForm';
import { apiClient } from '@/lib/api';
import { ICreateTaskDataType, ITask } from '@/types/task';

interface IFormPageProps {
  task?: ITask;
  mode: 'create' | 'edit';
}

const Component: React.FC<IFormPageProps> = ({ task, mode }) => {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (data: ICreateTaskDataType) => {
      try {
        if (mode === 'create') {
          await apiClient.createTask(data);
        } else {
          if (!task) {
            throw new Error('Task not found');
          }

          await apiClient.updateTask(task.id, data);
        }
        router.push('/');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error creating task:', error);
        throw error;
      }
    },
    [mode, router, task],
  );

  const handleCancel = useCallback(() => {
    router.push('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-600">
      <Header />
      <div className="container h-full">
        <Button onClick={handleCancel} className="mt-20 mb-10">
          <ArrowLeftIcon className="size-4 text-white" />
        </Button>
        <TaskForm task={task} onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
};

export default Component;
