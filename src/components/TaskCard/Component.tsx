'use client';

import { useState, useCallback } from 'react';
import { Button } from '@headlessui/react';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { ITask } from '@/types/task';

interface ITaskCardProps {
  task: ITask;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => Promise<void>;
}

const Component: React.FC<ITaskCardProps> = ({
  task,
  onToggleComplete,
  onDelete,
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete this task?')) {
        setIsDeleting(true);
        try {
          await onDelete(task.id);
        } finally {
          setIsDeleting(false);
        }
      }
    },
    [onDelete, task.id],
  );

  const handleToggleComplete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleComplete(task.id, !task.completed);
    },
    [onToggleComplete, task.id, task.completed],
  );

  const handleCardClick = useCallback(() => {
    router.push(`/edit/${task.id}`);
  }, [router, task.id]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCardClick();
        }
      }}
      className="bg-foreground-light relative flex w-full cursor-pointer gap-4 rounded-lg border border-white/5 p-4 transition-all duration-200 hover:shadow-lg hover:shadow-gray-900/50"
    >
      <Button
        onClick={handleToggleComplete}
        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 hover:scale-130 ${
          task.completed ? 'border-secondary bg-secondary' : 'border-primary'
        } `}
      >
        {task.completed && <CheckIcon className="size-3" />}
      </Button>

      <div className="min-w-0 flex-1 text-left">
        <h3
          className={`text-sm leading-tight font-medium break-words ${task.completed ? 'text-gray-300 line-through' : 'text-gray-100'} `}
        >
          {task.title}
        </h3>
      </div>

      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        className="flex-shrink-0 rounded p-2 text-gray-400 transition-all duration-200 hover:bg-red-500/20 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isDeleting ? (
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <TrashIcon className="size-4 text-gray-300" />
        )}
      </Button>
    </div>
  );
};

export default Component;
