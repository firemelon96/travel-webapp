'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const deleteTour = async (id: string) => {
  const session = await auth();

  if (!id) {
    return { error: 'Missing id.' };
  }

  if (!session?.user) {
    return { error: 'Unauthorized!' };
  }

  try {
    const deleteTour = await db.tour.delete({
      where: { id },
    });

    revalidatePath('/admin/tours');

    return { success: 'Deleted tour successfully', deleteTour };
  } catch (error) {
    console.log(error);
  }
};
