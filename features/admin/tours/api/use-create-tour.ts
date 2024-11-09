import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { z } from 'zod';
import { TourSchema } from '@/schemas';
import { toast } from 'sonner';
import { addTour } from '../actions/add-tours';

type TourType = z.infer<typeof TourSchema>;

export const useCreateTour = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (values: TourType) => {
      const tour = await addTour(values);

      if (!tour) {
        throw new Error('Failed to create tour');
      }

      return tour;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ['tour'] });
      queryClient.invalidateQueries({ queryKey: ['tours'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
};
