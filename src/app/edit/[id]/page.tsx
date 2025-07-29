import { notFound } from 'next/navigation';
import { FormPage } from '@/components/FormPage';
import { apiClient } from '@/lib/api';

interface IEditTaskPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const generateMetadata = async ({ params }: IEditTaskPageProps) => {
  const { id } = await params;
  const task = await apiClient.getTask(id);

  return {
    title: `Edit Task - ${task.title}`,
  };
};

const EditTaskPage: React.FC<IEditTaskPageProps> = async ({ params }) => {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  try {
    const task = await apiClient.getTask(id);

    return <FormPage task={task} mode="edit" />;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching task:', error);

    return notFound();
  }
};

export default EditTaskPage;
