'use server';

import { db } from '@/lib/db';

export const getUserById = async (id: string | undefined) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
