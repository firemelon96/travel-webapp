import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTour } from '../actions/update-tour';
import { z } from 'zod';
import { TourSchema } from '@/schemas';
import { toast } from 'sonner';

type Tour = z.infer<typeof TourSchema>;

export const useUpdateTour = (id: string) => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (values: Tour) => {
      const tour = await updateTour(id, values);

      if (!tour) {
        throw new Error('Failed to update');
      }

      return tour;
    },
    onSuccess: () => {
      toast.success('Tour updated!');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
    onError: () => {
      toast.error('Failed to update tour!');
    },
  });

  return mutate;
};
