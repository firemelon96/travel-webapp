'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { TourSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const updateTour = async (
  id: string,
  values: z.infer<typeof TourSchema>
) => {
  const session = await auth();

  if (!session?.user) {
    return { error: 'Unauthorized' };
  }

  const validatedFields = TourSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const existingTour = await db.tour.findUnique({
    where: {
      id,
    },
  });

  if (!existingTour) {
    return { error: 'Tour not found' };
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

  //TODO FIx the update

  try {
    const updateTour = await db.tour.update({
      where: { id, userId: session.user.id },
      data: {
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
          upsert: prices.map((tier) => ({
            where: { id: tier.id || '' },
            update: {
              minGroupSize: tier.minGroupSize,
              maxGroupSize: tier.maxGroupSize,
              price: tier.price,
            },
            create: {
              pricingType: tier.pricingType,
              minGroupSize: tier.minGroupSize,
              maxGroupSize: tier.maxGroupSize,
              price: tier.price,
            },
          })),
        },
      },
    });

    revalidatePath('/admin/tours');
    return { success: 'Tour updated', updateTour };
  } catch (error) {
    console.log(error);
  }
};
