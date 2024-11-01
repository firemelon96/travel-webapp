import { z } from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { TourForm } from './tour-form';
import { TourSchema } from '@/schemas';
import { useEffect, useState, useTransition } from 'react';
import { Tour, TourType } from '@prisma/client';
import { useEditTour } from '../hooks/use-edit-tour';
import { getTourById } from '../actions/tour';
import { Loader2 } from 'lucide-react';

type TourWithoutMeta = z.input<typeof TourSchema>;

export const EditTourSheet = () => {
  const { isOpen, onClose, id } = useEditTour();
  const [isLoading, startTransition] = useTransition();
  const [tourData, setTourData] = useState<TourWithoutMeta | null>(null);

  useEffect(() => {
    startTransition(() => {
      getTourById(id!).then((data) => {
        if (data) setTourData(data);
      });
    });
  }, [id]);

  console.log({ id, tourData });

  const defaultValues = tourData
    ? {
        title: tourData.title,
        description: tourData.description,
        address: tourData.address,
        price: tourData.price,
        isFeatured: tourData.isFeatured,
        images: tourData.images,
        // privatePrice: [],
        type: tourData.type,
        minPax: tourData.minPax,
        maxPax: tourData.maxPax,
        published: tourData.published,
      }
    : {
        title: '',
        description: '',
        address: '',
        price: 0,
        isFeatured: true,
        images: [],
        // privatePrice: [],
        type: TourType.DAY,
        minPax: 2,
        maxPax: 12,
        published: true,
      };

  const onSubmit = (values: z.infer<typeof TourSchema>) => {
    // console.log(values);
    console.log(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Tour</SheetTitle>
          <SheetDescription>Edit an existing tour</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className='absolutee inset-0 flex items-center justify-center'>
            <Loader2 className='size-4 text-muted-foreground animate-spin' />
          </div>
        ) : (
          <TourForm
            id={id}
            onSubmit={() => {}}
            defaultValues={defaultValues}
            disabled={isLoading}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
