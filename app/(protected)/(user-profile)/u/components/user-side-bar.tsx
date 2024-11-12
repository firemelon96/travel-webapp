import { auth } from '@/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';

export const UserSideBar = async () => {
  const session = await auth();

  return (
    <Card className='w-80 h-screen border-none'>
      <CardHeader>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-xl font-bold'>{session?.user.name}</h1>
          <Avatar className='size-20'>
            <AvatarImage src={session?.user?.image} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p>Edit profile</p>
        </div>
      </CardHeader>
      <div className='mx-2 space-y-2'>
        <Button className='w-full' variant='secondary'>
          Bookings
        </Button>
        <Button className='w-full' variant='secondary'>
          Wishlist
        </Button>
      </div>
    </Card>
  );
};
