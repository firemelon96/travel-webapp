import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

export const Social = () => {
  const onClick = async (provider: 'google' | 'facebook') => {
    await signIn(provider);
  };

  return (
    <div className='flex items-center w-full gap-x-2'>
      <Button
        className='w-full'
        size='lg'
        variant='outline'
        onClick={() => signIn('google')}
      >
        <FcGoogle className='size-5' />
      </Button>
      <Button
        className='w-full'
        size='lg'
        variant='outline'
        onClick={() => onClick('facebook')}
      >
        <FaFacebook className='size-5' />
      </Button>
    </div>
  );
};
