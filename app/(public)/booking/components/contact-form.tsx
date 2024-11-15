'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { contactFormSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type FormValues = z.infer<typeof contactFormSchema>;

type Props = {
  onHandleSubmit: (values: FormValues) => void;
  disabled: boolean;
};

export const ContactForm = ({ disabled, onHandleSubmit }: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactName: '',
      contactEmail: '',
      contactNumber: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    onHandleSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='flex items-center gap-2'>
          <FormField
            control={form.control}
            name='contactName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    {...field}
                    placeholder='John Doe'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contactEmail'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    disabled={disabled}
                    placeholder='johnDoe@example.com'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='contactNumber'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mobile number</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={disabled}
                    placeholder='09xx-xxx-xxxx'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <span className='text-sm text-slate-500'>
            By continuing, you acknowledge and agree to Terms of use and Privacy
            policy
          </span>
        </div>

        <Separator />

        <div>
          <Badge variant='destructive'>
            Once your info is submitted, it cannot be changed. Please
            double-check before proceeding.
          </Badge>
        </div>

        <div className='flex justify-between'>
          <p className='text-sm max-w-sm'>
            Your booking will be submitted once you go to payment. You can
            choose your payment method in the next step.
          </p>
          <Button disabled={disabled}>Proceed to payment</Button>
        </div>
      </form>
    </Form>
  );
};
