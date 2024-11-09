'use server';
import { auth } from '@/auth';
import { getUserById } from '@/lib/auth-helper';
import { db } from '@/lib/db';

export const getTour = async (id: string) => {
  const session = await auth();

  if (!session?.user) throw new Error('Unauthorized');

  const existingUser = await getUserById(session.user.id);

  if (!existingUser) throw new Error('Unauthorized');

  if (!id) throw new Error('Id is missing');

  const tour = await db.tour.findUnique({
    where: { id },
    select: {
      title: true,
      description: true,
      address: true,
      isFeatured: true,
      images: true,
      prices: true,
      type: true,
      maxPax: true,
      minPax: true,
      published: true,
    },
  });

  return tour;
};
