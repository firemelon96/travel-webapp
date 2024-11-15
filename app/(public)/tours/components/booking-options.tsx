'use client';
import qs from 'query-string';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Booking, PricingType, TourPricing } from '@prisma/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { addDays, format } from 'date-fns';
import { CalendarIcon, Minus, Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const BookingSchema = z.object({
  dateRange: z
    .object({
      from: z.date(),
      to: z.date().optional(),
    })
    .optional(),
  participants: z.number().positive(),
  totalPrice: z.number(),
  travellerType: z.enum([PricingType.JOINER, PricingType.PRIVATE]),
});

const types = [
  { value: 'JOINER', label: 'Joiner' },
  { value: 'PRIVATE', label: 'Private' },
];

type Props = {
  tourId: string;
  prices: TourPricing[];
};

export const BookingOptions = ({ tourId, prices }: Props) => {
  const [price, setPrice] = useState(0);
  const [openDate, setOpenDate] = useState(false);
  const router = useRouter();

  const maxGroupSize = Math.max(
    ...prices
      .filter((price) => price.maxGroupSize !== 1) // Exclude prices where maxGroupSize is 1
      .map((price) => price.maxGroupSize) // Extract the maxGroupSize values
  );

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      dateRange: {
        from: undefined,
        to: undefined,
      },
      participants: 2,
      totalPrice: 0,
      travellerType: 'JOINER',
    },
  });

  const participants = form.watch('participants');
  const travellerType = form.watch('travellerType');
  const selectedDateRange = form.watch('dateRange.from');

  useEffect(() => {
    let selectedPrice = 0;

    // Check for either JOINER or PRIVATE pricing
    const priceForType = prices.find(
      (price) => price.pricingType === travellerType
    );

    if (priceForType) {
      // If participants match minGroupSize and maxGroupSize (e.g., JOINER with group size of 1)
      if (priceForType.minGroupSize === 1 && priceForType.maxGroupSize === 1) {
        selectedPrice = priceForType.price;
        setPrice(selectedPrice);
      } else {
        // Handle cases where group size is larger than defined range
        selectedPrice =
          prices.find(
            (price) =>
              price.pricingType === travellerType &&
              participants >= price.minGroupSize &&
              participants <= price.maxGroupSize
          )?.price || 0;

        setPrice(selectedPrice);
      }
    }

    form.setValue('totalPrice', selectedPrice * participants);
  }, [participants, travellerType, prices, form.setValue]);

  console.log(price);

  const onSubmit = (values: z.infer<typeof BookingSchema>) => {
    const { participants, totalPrice, travellerType, dateRange } = values;
    const from = dateRange?.from;
    const to = dateRange?.to;
    const url = qs.stringifyUrl(
      {
        url: '/booking',
        query: {
          tourId,
          from: from ? format(from, 'yyyy-MM-dd') : undefined,
          to: to ? format(to, 'yyyy-MM-dd') : undefined,
          participants,
          totalPrice,
          travellerType,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <div id='options' className='space-y-2'>
      <h2 className='text-xl border-l-4 border-rose-500 pl-2'>Options</h2>
      <Card className='shadow-none '>
        <CardHeader>Select Options</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='dateRange'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Travel Date</FormLabel>
                    <Popover open={openDate} onOpenChange={setOpenDate}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value?.from ? (
                              field.value.to ? (
                                <>
                                  {format(field.value.from, 'LLL dd, y')} -{' '}
                                  {format(field.value.to, 'LLL dd, y')}
                                </>
                              ) : (
                                format(field.value.from, 'LLL dd, y')
                              )
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          initialFocus
                          mode='range'
                          defaultMonth={field.value?.from}
                          selected={field.value as DateRange | undefined}
                          onSelect={(range) => {
                            if (range?.from) {
                              const endDate =
                                range.to || addDays(range.from, 3);
                              field.onChange({ from: range.from, to: endDate });
                            } else {
                              field.onChange(range); // Handle cases where range is cleared
                            }
                          }}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Select date that is available
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='travellerType'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Select type</FormLabel>
                    <FormControl>
                      <div className='flex flex-wrap gap-2'>
                        {types.map((type) => (
                          <Button
                            key={type.value}
                            type='button'
                            variant={
                              field.value === type.value ? 'default' : 'outline'
                            }
                            className={cn(
                              '',
                              field.value === type.value &&
                                'bg-primary text-primary-foreground'
                            )}
                            onClick={() => field.onChange(type.value)}
                          >
                            {type.label}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <div className='flex items-center p-4 border rounded-lg'>
                  <span>Participants</span>
                  <div className='ml-auto flex items-center gap-2'>
                    <span className=''>
                      {price === 0 ? 'Get qoute for this group size' : price}
                    </span>
                    <FormField
                      control={form.control}
                      name='participants'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className='flex items-center space-x-2'>
                              <Button
                                type='button'
                                variant='outline'
                                size='icon'
                                onClick={() =>
                                  field.onChange(Math.max(1, field.value - 1))
                                }
                                disabled={field.value <= 1}
                              >
                                <Minus className='h-4 w-4' />
                                <span className='sr-only'>
                                  Decrease participants
                                </span>
                              </Button>
                              <Input
                                {...field}
                                type='text'
                                readOnly
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value, 10))
                                }
                                className='w-11 text-center border-none shadow-none'
                                min={1}
                                max={2}
                              />
                              <Button
                                type='button'
                                variant='outline'
                                size='icon'
                                onClick={() =>
                                  field.onChange(Math.min(12, field.value + 1))
                                }
                                disabled={field.value >= maxGroupSize}
                              >
                                <Plus className='h-4 w-4' />
                                <span className='sr-only'>
                                  Increase participants
                                </span>
                              </Button>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </FormItem>

              <FormField
                control={form.control}
                name='totalPrice'
                render={({ field }) => (
                  <FormItem className=''>
                    <FormLabel>Total Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        readOnly
                        {...field}
                        className='text-xl font-semibold border-none shadow-none'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className='flex gap-2 justify-end'>
                <Button variant='secondary' type='button'>
                  Save
                </Button>
                <Button>Book now</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
