'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// const images = [
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 1' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 2' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 3' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 4' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 5' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 4' },
//   { src: '/placeholder.svg?height=400&width=600', alt: 'Image 5' },
// ];

type Props = {
  images?: string[];
};

export const ImageDialog = ({ images }: Props) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='absolute bottom-2 right-2' variant='outline'>
          Gallery
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-transparent border-none shadow-none'>
        <DialogHeader>
          <DialogTitle>Images</DialogTitle>
        </DialogHeader>
        <div className='w-full'>
          <Carousel
            setApi={setApi}
            opts={{
              align: 'start',
            }}
          >
            <CarouselContent className='h-[500px]'>
              {images?.map((image, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <Image
                      src={image}
                      alt={image}
                      width={500}
                      height={300}
                      className='w-full h-auto object-cover object-center'
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className='py-4 flex justify-center gap-2 overflow-x-auto'>
            {images?.map((image, index) => (
              <button
                key={index}
                className={cn(
                  'relative w-16 h-16 overflow-hidden rounded-md transition-all',
                  current === index ? 'ring-2 ring-primary' : 'opacity-70'
                )}
                onClick={() => api?.scrollTo(index)}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className='object-cover'
                />
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
