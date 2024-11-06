import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Image from 'next/image';
import { utDeleteImages } from '../actions/tour';
import { useTransition } from 'react';
import { toast } from 'sonner';

type Props = {
  imageUrls: string[];
};

export const PreviewImage = ({ imageUrls }: Props) => {
  const [isPending, startTransition] = useTransition();
  console.log(imageUrls);
  const imageKeys = imageUrls.map((url) =>
    url.replace('https://utfs.io/f/', '')
  );

  const onDeleteImages = () => {
    startTransition(() => {
      utDeleteImages(imageKeys)
        .then((data) => {
          toast.success(data?.success);
        })
        .catch((error) => toast.error(error));
    });
  };
  // console.log(imageKeys);
  return (
    <div className='flex flex-col gap-2 group relative'>
      <div className='flex items-center justify-center w-full '>
        <Image
          src={imageUrls[0]}
          height={200}
          width={300}
          alt='image'
          className='rounded-md'
        />
        {/* TODO: Create a delete button and call delete utapi */}
      </div>
      <div className='flex bg-slate-200 gap-1.5 items-center justify-center'>
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

      <Button
        size='icon'
        className='rounded-full absolute top-10 left-auto'
        onClick={onDeleteImages}
        variant='destructive'
        disabled={isPending}
      >
        <X className='size-3' />
      </Button>
    </div>
  );
};
