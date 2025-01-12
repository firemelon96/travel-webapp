import { PricingType } from '@prisma/client';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Minimum 6 character is required' }),
});

export const TourPricing = z.object({
  id: z.string().optional(),
  pricingType: z.enum([PricingType.JOINER, PricingType.PRIVATE]),
  minGroupSize: z.number(),
  maxGroupSize: z.number(),
  price: z.number(),
});

const Inclusion = z.object({
  id: z.string().optional(),
  name: z.string(),
});

const Exclusion = z.object({
  id: z.string().optional(),
  name: z.string(),
});

export const TourSchema = z.object({
  title: z.string().min(1, { message: 'Title is required!' }),
  isFeatured: z.boolean(),
  type: z.enum(['DAY', 'PACKAGE']),
  address: z.string().min(1, { message: 'Address is required' }),
  inclusions: z.array(Inclusion),
  exclusions: z.array(Exclusion),
  prices: z.array(TourPricing),
  description: z
    .string()
    .min(50, { message: 'Minimum of 50 character is required' })
    .max(200, { message: 'Maximum of 200 characters reached!' }),
  published: z.boolean(),
  minPax: z
    .number({ invalid_type_error: 'Min pax must be a number' })
    .positive()
    .nullable(),
  maxPax: z
    .number({ invalid_type_error: 'Max pax must be a number' })
    .positive()
    .nullish(),
  images: z.string().array().min(1, { message: 'Upload at least 1 image' }),
});

export const FilterSchema = z.object({
  serviceType: z.string(),
  address: z.string(),
  dateRange: z.object({
    from: z.date(),
    to: z.date(),
  }),
});

export const contactFormSchema = z.object({
  contactName: z.string().min(1, { message: 'Name is required' }),
  contactEmail: z.string().email(),
  contactNumber: z.string().min(1, { message: 'Contact is required' }),
});

export const BookingSchema = z.object({
  participants: z.number(),
  startDate: z.date(),
  endDate: z.date().optional(),
  totalPrice: z.number(),
  tourId: z.string(),
  contactName: z.string().min(1, { message: 'Name is required' }),
  contactEmail: z.string().email(),
  contactNumber: z.string().min(1, { message: 'Contact is required' }),
});

// participants,
// startDate,
// endDate,
// totalPrice,
// tourId,
// contactName,
// contactEmail,
// contactNumber,
