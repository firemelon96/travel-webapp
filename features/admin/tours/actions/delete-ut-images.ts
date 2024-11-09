'use server';

import { UTApi } from 'uploadthing/server';

const utapi = new UTApi();

export const utDeleteImages = async (fileKeys: string[]) => {
  if (!Array.isArray(fileKeys)) {
    return;
  }

  try {
    const res = await utapi.deleteFiles(fileKeys);
    if (res.success) return { success: 'hooray' };
  } catch (error) {
    console.log(error);
  }
};
