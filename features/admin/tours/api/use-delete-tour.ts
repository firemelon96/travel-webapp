import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTour } from '../actions/tour';
import { toast } from 'sonner';

export const useDeleteTour = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error('Id is missing');

      const tour = await deleteTour(id);

      if (!tour) {
        throw new Error('Failed to delete');
      }

      return tour;
    },
    onSuccess: () => {
      toast.success('Tour deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
    onError: () => {
      toast.error('Failed to delete account');
    },
  });

  return mutation;
};
