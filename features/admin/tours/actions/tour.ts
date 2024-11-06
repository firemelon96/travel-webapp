'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { TourSchema } from '@/schemas';
import { getUserById } from '@/actions/user-actions';
import { revalidatePath } from 'next/cache';
import { UTApi } from 'uploadthing/server';
import { error } from 'console';

const utapi = new UTApi();

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
          where: {
            // Find the pricing tier by tourId and possibly by pricing id
            tourId: existingTour.id, // Adjust as needed for uniqueness
          },
          create: {
            pricingType: tier.pricingType,
            minGroupSize: tier.minGroupSize,
            maxGroupSize: tier.maxGroupSize,
            price: tier.price,
          },
          update: {
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
};

//Implement in the future
export const utDeleteImages = async (fileKeys: string[]) => {
  if (!Array.isArray(fileKeys)) {
    return;
  }

  try {
    const res = await utapi.deleteFiles(fileKeys);
    if (res.success) return { success: 'hooray' };
  } catch (error) {
    console.log(error);
  }
};

export const deleteTour = async (id: string) => {
  const session = await auth();

  if (!id) {
    return { error: 'Missing id.' };
  }

  if (!session?.user) {
    return { error: 'Unauthorized!' };
  }

  const deleteTour = await db.tour.delete({
    where: { id },
  });

  revalidatePath('/admin/tours');

  return { success: 'Deleted tour successfully', deleteTour };
};

export const deleteMany = async (ids: string[]) => {
  const session = await auth();

  if (!session?.user) {
    return { error: 'Unauthorized' };
  }

  const deleteTours = await db.tour.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  revalidatePath('/admin/tours');

  return { success: `Deleted ${deleteTours.count} items` };
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

export const getTourById = async (id: string) => {
  const session = await auth();

  if (!session?.user) throw new Error('Unauthorized');

  const existingUser = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

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
