import { Header } from '@/components/Header';
import { TaskList } from '@/components/TaskList';

const HomePage: React.FC = () => {
  return (
    <div className="bg-foreground min-h-screen">
      <Header />
      <TaskList />
    </div>
  );
};

export default HomePage;
