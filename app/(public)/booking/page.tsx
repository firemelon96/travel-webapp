'use client';

import {
  BookingPreview,
  BookingPreviewSkeleton,
} from '@/components/booking-preview';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTour } from '@/features/admin/tours/api/use-get-tour';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { ContactForm, FormValues } from './components/contact-form';
import { useTransition } from 'react';
import { bookTour } from '@/actions/booking/booking-action';
import { convertStringDateToDate } from '@/lib/utils';
import { toast } from 'sonner';

const BookingPage = () => {
  const searchParams = useSearchParams();

  const [isPending, startTransition] = useTransition();

  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const participants = searchParams.get('participants') || '';
  const tourId = searchParams.get('tourId') || '';
  const travellerType = searchParams.get('travellerType') || '';
  const totalPrice = searchParams.get('totalPrice') || '';

  const { data, isLoading } = useGetTour(tourId!);

  const onSubmit = (values: FormValues) => {
    startTransition(() => {
      bookTour({
        ...values,
        startDate: convertStringDateToDate(from),
        endDate: convertStringDateToDate(to),
        participants: +participants,
        totalPrice: +totalPrice,
        tourId,
      })
        .then((data) => {
          const payment = data?.payment;

          if (!payment?.paymentLink) return;

          toast.success('Tour booked successfully!');

          window.location.href = payment.paymentLink;
        })
        .catch((error) => toast.error(error.message));
    });
  };

  return (
    <main className='container mx-auto'>
      <span>
        Stepper component that start with 2nd step if booking exist or selected
      </span>

      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <Card className='flex-1 shadow-none'>
            <CardHeader>
              <span className='border-l-4 border-l-rose-500 pl-4'>
                Tour details
              </span>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <BookingPreviewSkeleton />
              ) : (
                <BookingPreview
                  url={data?.images[0] || ''}
                  title={data?.title || ''}
                  participants={participants}
                  type={travellerType}
                />
              )}
            </CardContent>
            <CardHeader>
              <span className='border-l-4 border-l-rose-500 pl-4'>
                Contact details
              </span>
            </CardHeader>
            <CardContent>
              <ContactForm onHandleSubmit={onSubmit} disabled={isPending} />
            </CardContent>
          </Card>
          <div className='w-1/3 space-y-4'>
            <Card>
              <CardHeader>
                {isLoading ? (
                  <Skeleton className='w-full h-5' />
                ) : (
                  <h1 className='font-semibold'>{data?.title}</h1>
                )}
                <span className='text-slate-500'>
                  {travellerType.toLowerCase()}
                </span>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Separator />
                <div className='flex justify-between text-sm'>
                  <p className='text-slate-500'>Date</p>
                  <span>
                    {format(from, 'LLL dd, yyyy')} -{' '}
                    {format(to, 'LLL dd, yyyy')}
                  </span>
                </div>
                <div className='flex justify-between text-sm'>
                  <p className='text-slate-500'>Quantity</p>
                  <span>Person x {participants}</span>
                </div>
                <Separator />
              </CardContent>
              <CardFooter className='flex justify-between items-center'>
                <p className='text-sm text-slate-500'>Total</p>
                <span className='text-xl font-semibold'>{totalPrice}</span>
              </CardFooter>
            </Card>
            <Card className='space-y-4'>
              <div className='p-6'>
                <div className='flex justify-between'>
                  <p className='text-slate-500'>Subtotal</p>
                  <span>{totalPrice}</span>
                </div>
                <div className='flex justify-between text-xl'>
                  <p>Total payment</p>
                  <span className='text-rose-500 font-bold tracking-wide'>
                    {totalPrice}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
