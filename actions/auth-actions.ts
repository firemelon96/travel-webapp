'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { LoginSchema, RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';
import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/auth';
import {
  generateVerificationToken,
  getUserByEmail,
  getVerificationTokenByToken,
} from '@/lib/auth-helper';
import { sendVerificationEmail } from '@/lib/mail';
import { revalidatePath } from 'next/cache';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid Fields',
    };
  }

  const { name, email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: 'Email already taken' };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'User created' };
};

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: 'Email verified!' };
};

export const signInAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: 'Invalid Fields',
    };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'User does not exist' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    revalidatePath('/u');

    return { success: 'Verification email sent!' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
    });

    return { success: 'Login Success' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        case 'CallbackRouteError':
          return { error: `${error.cause?.err}` };
        default:
          return { error: 'Something went wrong' };
      }
    }

    throw error;
  }
};

export const signOutAction = async () => {
  await signOut({ redirectTo: '/sign-in' });
};
