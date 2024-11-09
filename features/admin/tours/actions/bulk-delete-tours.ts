'use server';

import { auth } from '@/auth';
import { getUserById } from '@/lib/auth-helper';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const deleteMany = async (ids: string[]) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const existingUser = await getUserById(session.user.id);

  if (!existingUser) throw new Error('Unauthorized');

  try {
    const deleteTours = await db.tour.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    revalidatePath('/admin/tours');

    return { success: `Deleted ${deleteTours.count} items` };
  } catch (error) {
    console.log(error);
  }
};
