'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { BookingSchema } from '@/schemas';
import { z } from 'zod';

export const bookTour = async (values: z.infer<typeof BookingSchema>) => {
  const session = await auth();

  if (!session?.user) throw new Error('Unauthorized');

  const validateFields = BookingSchema.safeParse(values);

  if (!validateFields.success) throw new Error('Invalid fields');

  const validFields = validateFields.data;

  const bookingExist = await db.booking.findFirst({
    where: {
      tourId: validFields.tourId,
      userId: session.user.id,
    },
  });

  if (bookingExist) throw new Error('Tour already booked');

  try {
    const booking = await db.booking.create({
      data: {
        userId: session.user.id,
        ...validFields,
      },
    });

    return booking;
  } catch (error) {
    console.log(error);
  }
};
