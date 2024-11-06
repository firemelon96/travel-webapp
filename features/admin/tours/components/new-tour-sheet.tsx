import { z } from 'zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useNewTour } from '../hooks/use-new-tour';
import { TourForm } from './tour-form';
import { TourPricing, TourSchema } from '@/schemas';
import { PricingType, TourType } from '@prisma/client';
import { useCreateTour } from '../api/use-create-tour';

const defaultValues = {
  title: 'This is from react query',
  description: 'HElllo from react query howdy and i love to creeate webapps',
  address: 'Puerto',
  prices: [
    {
      pricingType: PricingType.JOINER,
      minGroupSize: 1,
      maxGroupSize: 1,
      price: 0,
    },
  ],
  isFeatured: true,
  images: [],
  // privatePrice: [],
  type: TourType.DAY,
  minPax: 2,
  maxPax: 12,
  published: true,
};

export const NewTourSheet = () => {
  const { isOpen, onClose } = useNewTour();
  const { mutate, isPending } = useCreateTour();

  const onSubmit = (values: z.infer<typeof TourSchema>) => {
    mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Tour</SheetTitle>
          <SheetDescription>Create a new tour</SheetDescription>
        </SheetHeader>
        <TourForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
