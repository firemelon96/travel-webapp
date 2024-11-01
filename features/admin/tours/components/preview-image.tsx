import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';

type Props = {
  imageUrls: string[];
};

export const PreviewImage = ({ imageUrls }: Props) => {
  console.log(imageUrls);
  return (
    <div className='flex flex-col gap-2 py-4'>
      <div className='flex items-center justify-center w-full '>
        <div className='relative'>
          <Image
            src={imageUrls[0]}
            height={200}
            width={300}
            alt='image'
            className='rounded-md'
          />
        </div>
        {/* TODO: Create a delete button and call delete utapi */}
      </div>
      <div className='flex bg-slate-200 gap-1.5 items-center justify-center relative'>
        {imageUrls.slice(1).map((url, i) => (
          <Image
            className='aspect-square '
            src={url}
            key={i}
            width={50}
            height={50}
            alt='url'
          />
        ))}
      </div>
    </div>
  );
};
