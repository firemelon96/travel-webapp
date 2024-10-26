import { auth } from '@/auth';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Profile } from './profile';

export const Navbar = async () => {
  const session = await auth();
  return (
    <header className='border-b flex items-center justify-between'>
      <SidebarTrigger />
      <nav className='h-12 flex'>
        <ul className='flex items-center gap-2 pr-2'>
          <li>Notification</li>
          <li>Others</li>
          <li>
            <Profile
              src={session?.user?.image || ''}
              name={session?.user?.name || 'TT'}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};
