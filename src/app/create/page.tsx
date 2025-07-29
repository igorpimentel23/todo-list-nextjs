import { Metadata } from 'next';
import { FormPage } from '@/components/FormPage';

export const metadata: Metadata = {
  title: 'Create Task',
  description: 'Create a new task',
};

const CreateTaskPage: React.FC = () => {
  return <FormPage mode="create" />;
};

export default CreateTaskPage;
