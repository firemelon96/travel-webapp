import { cn } from '@/lib/utils';

type Props = {
  label: string;
};

export const Header = ({ label }: Props) => {
  return (
    <div className='flex w-full flex-col gap-y-2 justify-center items-center'>
      <h1 className={cn('text-3xl font-semibold')}>🗺️ Travel Tour</h1>
      <p>{label}</p>
    </div>
  );
};
