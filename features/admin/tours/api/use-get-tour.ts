import { useQuery } from '@tanstack/react-query';
import { getTour } from '../actions/get-tour';

export const useGetTour = (id: string) => {
  const tour = useQuery({
    enabled: !!id,
    queryKey: ['tour', id],
    queryFn: async () => {
      const data = await getTour(id);
      if (!tour) {
        throw new Error('Failed to fetch tour');
      }

      return data;
    },
  });

  return tour;
};
