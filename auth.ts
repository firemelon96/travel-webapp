import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { db } from './lib/db';
import { UserRole } from '@prisma/client';
import { LoginSchema } from './schemas';
import bcrypt from 'bcryptjs';
import { getUserById } from './actions/user-actions';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  providers: [
    Github,
    Google,
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      user.role = existingUser.role;

      return true;
    },
    async jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role as UserRole;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
