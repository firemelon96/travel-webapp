import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMany } from '../actions/bulk-delete-tours';
import { toast } from 'sonner';

export const useBulkDeleteTours = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async (ids: string[]) => {
      const tours = await deleteMany(ids);

      if (!tours) {
        throw new Error('Failed to delete bulk');
      }

      return tours;
    },
    onSuccess: () => {
      toast.success('Deleted items successfully');
      queryClient.invalidateQueries({ queryKey: ['tours'] });
      queryClient.invalidateQueries({ queryKey: ['tour'] });
    },
    onError: () => {
      toast.error('Failed to delete tours');
    },
  });

  return mutate;
};
