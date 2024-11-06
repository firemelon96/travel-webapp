import { useQuery } from '@tanstack/react-query';
import { getTours } from '../actions/tour';

export const useGetTours = () => {
  const query = useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const tours = await getTours();

      if (!tours) {
        throw new Error('Failed to fetch tours');
      }

      return tours;
    },
  });

  return query;
};