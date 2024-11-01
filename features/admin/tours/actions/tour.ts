'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { TourSchema } from '@/schemas';
import { getUserById } from '@/actions/user-actions';
import { revalidatePath } from 'next/cache';

export const addTour = async (values: z.infer<typeof TourSchema>) => {
  const session = await auth();

  if (!session?.user) {
    return { error: 'Unauthorized' };
  }

  const validatedFields = TourSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields',
    };
  }

  const validData = validatedFields.data;

  const existingUser = await getUserById(session.user.id);

  if (!existingUser) {
    return { error: 'Unauthorized!' };
  }

  const tour = await db.tour.create({
    data: {
      ...validData,
      userId: existingUser.id,
    },
  });

  revalidatePath('/admin/tours');
  return { success: 'Tour created!', tour };
};

export const getTours = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const tours = await db.tour.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      title: true,
      isFeatured: true,
      images: true,
      price: true,
      type: true,
      address: true,
      minPax: true,
      maxPax: true,
      published: true,
    },
  });

  return tours;
};

export const getTourById = async (id: string) => {
  const session = await auth();

  if (!session?.user) throw new Error('Unauthorized');

  if (!id) return;

  const tour = await db.tour.findUnique({
    where: { id },
  });

  return tour;
};
