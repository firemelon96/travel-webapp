'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CardWrapper } from './card-wrapper';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { signInAction } from '@/actions/auth-actions';

export const LoginForm = () => {
  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      signInAction(values)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    });
  };

  return (
    <CardWrapper
      headerLabel='Welcome back'
      backButtonLabel='Dont have an account'
      backButtonHref='/register'
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type='email'
                      placeholder='example@email.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      disabled={isLoading}
                      placeholder='******'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
