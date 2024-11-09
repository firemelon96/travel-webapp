'use server';

import { auth } from '@/auth';
import { getUserById } from '@/lib/auth-helper';
import { db } from '@/lib/db';

export const getTours = async () => {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const existingUser = await getUserById(session.user.id);

  if (!existingUser) throw new Error('Unauthorized!');

  const tours = await db.tour.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      title: true,
      isFeatured: true,
      images: true,
      prices: true,
      type: true,
      address: true,
      minPax: true,
      maxPax: true,
      published: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return tours;
};
