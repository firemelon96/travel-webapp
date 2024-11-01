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

// model Tour {
//   id         String        @id @default(cuid())
//   title      String
//   isFeatured Boolean
//   type    TourType  @default(DAY)
//   address String
//   price   Int?
//   privatePrice  Int[]
//   description String
//   iteneraries Itenerary[]
//   published  Boolean    @default(false)
//   inclusions  String[]
//   exclusions  String[]
//   notes     String[]
//   reminders String[]
//   images  String[]
//   minPax  Int
//   maxPax  Int
//   author     User       @relation(fields: [authorId], references: [id])
//   authorId   String
//   categories Category[]
//   bookings Booking[]

//   createdAt  DateTime   @default(now())
//   updatedAt  DateTime   @updatedAt

// }

export const TourSchema = z.object({
  title: z.string().min(1, { message: 'Title is required!' }),
  isFeatured: z.boolean(),
  type: z.enum(['DAY', 'PACKAGE']),
  address: z.string().min(1, { message: 'Address is required' }),
  price: z.number().nullable(),
  // privatePrice: z.number().array(),
  description: z
    .string()
    .min(50, { message: 'Minimum of 50 character is required' })
    .max(200, { message: 'Maximum of 200 characters reached!' }),
  published: z.boolean(),
  minPax: z.number().nullable(),
  maxPax: z.number().nullable(),
  images: z.string().array().min(1, { message: 'Upload at least 1 image' }),
});
