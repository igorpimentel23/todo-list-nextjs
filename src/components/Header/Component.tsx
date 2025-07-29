import RocketIcon from '@/assets/icons/rocket.svg';

const Component: React.FC = () => {
  return (
    <header className="flex items-center justify-center gap-2 bg-gray-700 py-20">
      <RocketIcon />
      <h1 className="text-4xl font-bold">
        <span className="text-primary">Todo</span>{' '}
        <span className="text-secondary">App</span>
      </h1>
    </header>
  );
};

export default Component;
