'use client';
import { Card } from '@/components/ui/card';

import { Like, TourPricing } from '@prisma/client';
import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import { likeTour, unlikeTour } from '@/features/user/actions/user-actions';
import { toast } from 'sonner';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';

type Props = {
  image: string;
  prices: TourPricing[];
  title: string;
  address: string;
  id: string;
  likes: Like[];
};

export const ItemCard = ({
  image,
  prices,
  title,
  address,
  id,
  likes,
}: Props) => {
  const session = useSession();
  // const { data } = useGetLikedTour(id);
  const isLiked = likes.find(
    (like) => like.tourId === id && like.userId === session.data?.user.id
  );
  const [like, setLike] = useState(!!isLiked);
  const [isPending, startTransition] = useTransition();
  const link = address.split(' ').join('-');

  const handleLike = () => {
    if (!session.data?.user) {
      toast.error('You must be logged in first');
      return;
    }
    setLike((prev) => !prev);
    startTransition(() => {
      try {
        if (!like) {
          likeTour(id)
            .then(() => toast.success('Added to wishlist'))
            .catch((error) => toast.error(error));
        } else {
          unlikeTour(id)
            .then(() => toast.success('Removed from wishlist'))
            .catch((error) => toast.error(error));
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <Card className='group w-64 border-none shadow-none hover:shadow-md relative'>
      <button
        disabled={isPending}
        onClick={handleLike}
        className='group-hover:opacity-100 opacity-0 absolute right-4 top-4 '
      >
        {like ? (
          <HeartFilledIcon className='size-6 text-rose-500' />
        ) : (
          <Heart className='size-6 stroke-rose-500' />
        )}
      </button>
      <Link href={`/tours/${link}/${id}`}>
        <div className='space-y-2 p-4'>
          <div>
            <Image
              src={image}
              width={300}
              height={300}
              alt='image'
              className='object-cover rounded-md h-44 w-64'
            />
            {prices
              .filter((joiner) => joiner.pricingType === 'JOINER')
              .map((price) => (
                <p className='text-base font-semibold' key={price.id}>
                  {price.price} / pax
                </p>
              ))}
            <span className='font-light text-slate-500'>
              {title} dfad sfasd fasfdsf dfsdfadfd
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
};
