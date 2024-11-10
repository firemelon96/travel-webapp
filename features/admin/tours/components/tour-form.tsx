'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { TourPricing, TourSchema } from '@/schemas';
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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ImageUpload } from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { PreviewImage } from './preview-image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Trash, X } from 'lucide-react';

type Props = {
  defaultValues?: z.infer<typeof TourSchema>;
  onSubmit: (values: z.infer<typeof TourSchema>) => void;
  disabled?: boolean;
  id?: string;
  onDelete?: () => void;
};

export const TourForm = ({
  onDelete,
  id,
  disabled,
  defaultValues,
  onSubmit,
}: Props) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string[]>([]);

  const form = useForm<z.infer<typeof TourSchema>>({
    resolver: zodResolver(TourSchema),
    defaultValues: defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'prices',
  });

  const handleSubmit = (values: z.infer<typeof TourSchema>) => {
    onSubmit(values);
    // console.log(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-2 '>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Title of tour'
                    type='text'
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Description of tour'
                    {...field}
                    disabled={disabled}
                  />
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
                  <Input
                    placeholder='Address of tour'
                    {...field}
                    type='text'
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!id && uploadedImageUrl.length === 0 && (
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onChange={(urls) => {
                        setUploadedImageUrl(urls);
                        field.onChange(urls);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {uploadedImageUrl.length > 0 && !id && (
            <PreviewImage imageUrls={uploadedImageUrl} />
          )}
          {uploadedImageUrl.length <= 0 &&
            id &&
            defaultValues?.images &&
            defaultValues.images.length > 0 && (
              <PreviewImage imageUrls={defaultValues?.images} />
            )}

          {fields.map((price, index) => (
            <div
              key={price.id}
              className='flex justify-end items-center gap-1 relative'
            >
              <FormField
                control={form.control}
                name={`prices.${index}.id`}
                render={({ field }) => (
                  <FormItem hidden>
                    <FormLabel>Id</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`prices.${index}.pricingType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name={`prices.${index}.minGroupSize`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min group</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(value) =>
                          field.onChange(value.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`prices.${index}.maxGroupSize`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max group</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(value) =>
                          field.onChange(value.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name={`prices.${index}.price`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                        onChange={(value) =>
                          field.onChange(value.target.valueAsNumber)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                size='xs'
                type='button'
                variant='destructive'
                className='absolute rounded-full right-0'
                onClick={() => remove(index)}
              >
                <X />
              </Button>
            </div>
          ))}
          <div className='flex gap-2'>
            <Button
              type='button'
              variant='secondary'
              className='w-full'
              onClick={() =>
                append({
                  pricingType: 'JOINER',
                  minGroupSize: 1,
                  maxGroupSize: 1,
                  price: 0,
                })
              }
            >
              Add Joiner price
            </Button>
            <Button
              type='button'
              className='w-full'
              variant='secondary'
              onClick={() =>
                append({
                  pricingType: 'PRIVATE',
                  minGroupSize: 1,
                  maxGroupSize: 2,
                  price: 0,
                })
              }
            >
              Add private price
            </Button>
          </div>

          <div className='flex gap-2'>
            <FormField
              name='minPax'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min pax</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      value={field.value ?? undefined}
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='maxPax'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max pax</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? undefined}
                      type='number'
                      onChange={(value) =>
                        field.onChange(value.target.valueAsNumber)
                      }
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tour Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex space-x-1'
                    disabled={disabled}
                  >
                    <FormItem className='flex items-center gap-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='DAY' />
                      </FormControl>
                      <FormLabel>Day</FormLabel>
                    </FormItem>
                    <FormItem className='flex items-center gap-2 space-y-0'>
                      <FormControl>
                        <RadioGroupItem value='PACKAGE' />
                      </FormControl>
                      <FormLabel>Package</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='isFeatured'
            render={({ field }) => (
              <FormItem className='flex flex-row items-start gap-2 space-y-0 rounded-md border p-3'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={disabled}
                  />
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>Feature this tour</FormLabel>
                  <FormDescription>
                    This will make the tour visible in the featured list.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' className='w-full' disabled={disabled}>
          {id ? 'Update tour' : 'Add tour'}
        </Button>
        {!!id && (
          <Button
            type='button'
            className='w-full'
            variant='outline'
            onClick={handleDelete}
          >
            <Trash className='size-3' /> Delete tour
          </Button>
        )}
      </form>
    </Form>
  );
};
