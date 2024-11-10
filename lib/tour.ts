import { db } from './db';

export const getTourById = async (id: string) => {
  const tour = await db.tour.findUnique({
    where: { id },
  });

  return tour;
};

export const getTours = async () => {
  const tours = await db.tour.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      prices: true,
    },
  });

  return tours;
};
