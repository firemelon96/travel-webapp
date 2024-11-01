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
import { TourSchema } from '@/schemas';
import { useTransition } from 'react';
import { addTour } from '../actions/tour';
import { toast } from 'sonner';
import { TourType } from '@prisma/client';

const defaultValues = {
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

export const NewTourSheet = () => {
  const { isOpen, onClose } = useNewTour();
  const [isLoading, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof TourSchema>) => {
    // console.log(values);
    startTransition(() => {
      addTour(values)
        .then((data) => {
          if (data.success) {
            toast.success(data.success);
            onClose();
          }
          if (data.error) toast.error(data.error);
        })
        .catch((error) => toast.error(error));
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
          disabled={isLoading}
        />
      </SheetContent>
    </Sheet>
  );
};
