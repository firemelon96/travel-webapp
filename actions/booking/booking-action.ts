'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { createXenditPayment, Payload } from '@/lib/xendit';
import { BookingSchema } from '@/schemas';
import { redirect } from 'next/navigation';
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
      include: {
        tour: true,
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    // Step 3: Create payment
    const paymentPayload: Payload = {
      external_id: `booking_${booking.id}`,
      amount: booking.totalPrice,
      currency: 'PHP',
      items: [
        {
          name: `${booking.tour.title} x${booking.participants} Pax`,
          category: booking.tour.type,
          price: booking.totalPrice / booking.participants,
          quantity: booking.participants,
        },
      ],
      success_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
      failure_redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-error`,
      customer: {
        given_names: booking.contactName,
        email: booking.contactEmail || booking.user.email,
        mobile_number: booking.contactNumber || '',
      },
      customer_notification_preference: {
        invoice_paid: ['email'],
      },
      metadata: {
        bookingId: booking.id,
      },
    };

    const paymentResponse = await createXenditPayment(paymentPayload);

    console.log(paymentResponse);

    // Save payment to the database
    const payment = await db.payment.create({
      data: {
        amount: paymentResponse.amount,
        status: paymentResponse.status,
        currency: paymentResponse.currency,
        externalId: paymentResponse.external_id,
        description: `${booking.tour.title} booking`,
        paymentType: 'PENDING',
        paymentLink:
          paymentResponse.invoice_url || paymentResponse.checkout_url, // Save payment link
        userId: session.user.id,
        booking: { connect: { id: booking.id } }, // Link booking
      },
    });

    // redirect(payment?.paymentLink);
    return { booking, payment };
  } catch (error) {
    console.log(error);
  }
};
