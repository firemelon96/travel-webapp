import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export const UserProfile = () => {
  const { data: session } = useSession();
  return (
    <div className='ml-auto space-x-2'>
      {!session?.user && (
        <>
          <Button variant='secondary'>Login</Button>
          <Button variant='ghost'>Register</Button>
        </>
      )}
      {session?.user && (
        <>
          <Button variant='link' asChild>
            <Link href={`/u/${session?.user.id}`}>
              <User /> {session?.user && <p>{session.user.name}</p>}
            </Link>
          </Button>
          <Button variant='secondary' onClick={() => signOut()}>
            <LogOut />
          </Button>
        </>
      )}
    </div>
  );
};
