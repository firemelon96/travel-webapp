import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { likedTour } from '../actions/user-actions';

export const useGetLikedTour = (tourId: string) => {
  const query = useQuery({
    queryKey: ['tour', tourId],
    queryFn: async () => {
      const likedTourBoolean = await likedTour(tourId);
      if (!likedTourBoolean) return false;

      return true;
    },
  });

  return query;
};
