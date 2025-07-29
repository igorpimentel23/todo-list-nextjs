import RocketIcon from '@/assets/icons/rocket.svg';

export const Header: React.FC = () => {
  return (
    <header className="bg-background flex items-center justify-center gap-2 py-20">
      <RocketIcon />
      <h1 className="text-4xl font-bold">
        <span className="text-primary">Todo</span>{' '}
        <span className="text-secondary">App</span>
      </h1>
    </header>
  );
};
