import { auth } from '@/auth';

const Dashboard = async () => {
  const session = await auth();

  return <div className='p-4 w-full'>{session?.user?.name}</div>;
};

export default Dashboard;
