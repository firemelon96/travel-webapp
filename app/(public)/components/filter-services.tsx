'use client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { FilterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { DateRange } from 'react-day-picker';

export const FilterServices = () => {
  const form = useForm<z.infer<typeof FilterSchema>>({
    resolver: zodResolver(FilterSchema),
    defaultValues: {
      serviceType: 'Tour',
      address: 'Puerto Princesa',
      dateRange: {
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
      },
    },
  });

  return (
    <Card className='container mx-auto w-full -mt-16 p-4 shadow-none border-none'>
      <Form {...form}>
        <form action='' className='flex gap-2 items-center'>
          <FormField
            control={form.control}
            name='serviceType'
            render={({ field }) => (
              <FormItem className=''>
                <FormLabel>Service name</FormLabel>
                <FormControl>
                  <Input type='text' {...field} placeholder='Service name' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Address' />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='dateRange'
            render={({ field }) => (
              <FormItem className='w-full flex flex-col gap-2'>
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value.from ? (
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
                      mode='range'
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Card>
  );
};
