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
import { PricingType, TourType } from '@prisma/client';
import { useEditTour } from '../hooks/use-edit-tour';
import { Loader2 } from 'lucide-react';
import { useConfirm } from '@/hooks/use-confirm';
import { useGetTour } from '../api/use-get-tour';
import { useDeleteTour } from '../api/use-delete-tour';
import { useUpdateTour } from '../api/use-update-tour';

export const EditTourSheet = () => {
  const { isOpen, onClose, id } = useEditTour();

  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure',
    'You are about to delete this account.'
  );

  const { mutate, isPending: isLoadingDelete } = useDeleteTour(id);
  const { data: tourData, isLoading } = useGetTour(id);
  const { mutate: updateTour, isPending: isLoadingUpdate } = useUpdateTour(id);

  const isLoadingForm = isLoadingDelete || isLoadingUpdate;

  const defaultValues = tourData
    ? {
        title: tourData.title,
        description: tourData.description,
        address: tourData.address,
        prices: tourData.prices,
        isFeatured: tourData.isFeatured,
        images: tourData.images,
        type: tourData.type,
        minPax: tourData.minPax,
        maxPax: tourData.maxPax,
        published: tourData.published,
      }
    : {
        title: '',
        description: '',
        address: '',
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
        type: TourType.DAY,
        minPax: 2,
        maxPax: 12,
        published: true,
      };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const onSubmit = (values: z.infer<typeof TourSchema>) => {
    updateTour(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <>
      <ConfirmDialog />
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
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              disabled={isLoadingForm}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
