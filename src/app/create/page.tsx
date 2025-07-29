import { FormPage } from '@/components/FormPage';

export const metadata = {
  title: 'Create Task',
};

const CreateTaskPage: React.FC = () => {
  return <FormPage mode="create" />;
};

export default CreateTaskPage;
