import { ReactNode } from 'react';
import { UserSideBar } from './components/user-side-bar';

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='container mx-auto gap-2 flex'>
      <UserSideBar />
      <div className='w-full h-96'>{children}</div>
    </main>
  );
};

export default UserLayout;
