import { useQuery } from '@tanstack/react-query';
import { getTourById } from '../actions/tour';

export const useGetTour = (id: string) => {
  const tour = useQuery({
    enabled: !!id,
    queryKey: ['tour', id],
    queryFn: async () => {
      const data = await getTourById(id);
      if (!tour) {
        throw new Error('Failed to fetch tour');
      }

      return data;
    },
  });

  return tour;
};
