import { Header } from '@/components/Header';
import { TaskList } from '@/components/TaskList';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-600">
      <Header />
      <TaskList />
    </div>
  );
};

export default HomePage;
