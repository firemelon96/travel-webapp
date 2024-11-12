'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const likedTour = async (tourId: string) => {
  const session = await auth();

  if (!session?.user) throw new Error('Must be logged in');

  const existingTour = await db.tour.findUnique({
    where: { id: tourId },
  });

  if (!existingTour) throw new Error('No tour selected');

  try {
    const like = await db.like.findFirst({
      where: {
        userId: session.user.id,
        tourId,
      },
    });

    return like;
  } catch (error) {
    console.error('failed to get liked tour:', error);
  }
};

export const likeTour = async (tourId: string) => {
  const session = await auth();

  if (!session?.user) throw new Error('Must be logged in');

  const existingTour = await db.tour.findUnique({
    where: { id: tourId },
  });

  if (!existingTour) throw new Error('No tour selected');

  try {
    const like = await db.like.create({
      data: {
        userId: session.user.id,
        tourId,
      },
    });

    revalidatePath(`/u/${session.user.id}/wishlist`);
    return like;
  } catch (error) {
    console.error('Error liking tour:', error);
  }
};

export const unlikeTour = async (tourId: string) => {
  const session = await auth();

  if (!session?.user) throw new Error('Must be logged in');

  const existingTour = await db.tour.findUnique({
    where: { id: tourId },
  });

  if (!existingTour) throw new Error('No tour selected');

  try {
    const unlike = await db.like.deleteMany({
      where: {
        userId: session.user.id,
        tourId,
      },
    });

    revalidatePath(`/u/${session.user.id}/wishlist`);
    return unlike;
  } catch (error) {
    console.error('Error liking tour:', error);
  }
};
