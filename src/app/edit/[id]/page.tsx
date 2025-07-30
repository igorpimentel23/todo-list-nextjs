import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FormPage } from '@/components/FormPage';
import { apiClient } from '@/lib/api';
import { ITask } from '@/types/task';

interface IEditTaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: IEditTaskPageProps): Promise<Metadata> => {
  const { id } = await params;
  const task = await apiClient.getTask(id);

  return {
    title: `Edit Task - ${task.title}`,
    description: `Edit task ${task.title}`,
  };
};

export const generateStaticParams = async () => {
  const tasks = await apiClient.getTasks();

  return tasks.map((task) => ({
    id: task.id,
  }));
};

const EditTaskPage: React.FC<IEditTaskPageProps> = async ({ params }) => {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  let task: ITask;

  try {
    task = await apiClient.getTask(id);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching task:', error);

    return notFound();
  }

  if (!task) {
    return notFound();
  }

  return <FormPage task={task} mode="edit" />;
};

export default EditTaskPage;
