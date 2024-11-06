import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addTour } from '../actions/tour';
import { z } from 'zod';
import { TourSchema } from '@/schemas';
import { toast } from 'sonner';

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
