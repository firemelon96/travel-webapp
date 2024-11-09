'use server';

import { getUserById } from '@/actions/user-actions';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { TourSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const addTour = async (values: z.infer<typeof TourSchema>) => {
  const session = await auth();

  if (!session?.user) {
    return { message: 'Unauthorized' };
  }

  const existingUser = await getUserById(session.user.id);

  if (!existingUser) {
    return { message: 'Unauthorized' };
  }

  const validatedFields = TourSchema.safeParse(values);

  if (!validatedFields.success) {
    return { message: 'Invalid fields' };
  }

  const {
    address,
    description,
    images,
    isFeatured,
    minPax,
    prices,
    published,
    title,
    type,
    maxPax,
  } = validatedFields.data;

  try {
    const tour = await db.tour.create({
      data: {
        userId: existingUser.id,
        address,
        description,
        images,
        isFeatured,
        minPax,
        published,
        title,
        type,
        maxPax,
        prices: {
          create: prices.map((tier) => ({
            pricingType: tier.pricingType,
            minGroupSize: tier.minGroupSize,
            maxGroupSize: tier.maxGroupSize,
            price: tier.price,
          })),
        },
      },
      include: {
        prices: true,
      },
    });

    revalidatePath('/admin/tours');
    return { message: 'Created tour successfully!', tour };
  } catch (error) {
    console.log(error);
  }
};
