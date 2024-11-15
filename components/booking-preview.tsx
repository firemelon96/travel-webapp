import Image from 'next/image';
import { Skeleton } from './ui/skeleton';

type Props = {
  url: string;
  title: string;
  participants: string;
  type: string;
};

export const BookingPreview = ({ url, title, participants, type }: Props) => {
  return (
    <div className='flex gap-2 p-4 border rounded-md'>
      <Image
        src={url}
        width={120}
        height={120}
        alt={title}
        className='object-cover'
      />
      <div className='space-y-2'>
        <p>{title}</p>
        <span className='text-slate-500'>{type.toLowerCase()}</span>
      </div>
    </div>
  );
};

export const BookingPreviewSkeleton = () => {
  return (
    <div className='flex gap-2 p-4 border rounded-md'>
      <Skeleton className='w-32 h-20' />
      <div className='space-y-2'>
        <Skeleton className='w-40 h-5' />
        <Skeleton className='w-24 h-5' />
      </div>
    </div>
  );
};
