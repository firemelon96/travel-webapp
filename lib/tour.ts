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

export const getFeaturedTours = async () => {
  const featuredTours = await db.tour.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      prices: true,
      likes: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return featuredTours;
};
