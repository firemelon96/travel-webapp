'use client';

import { useMountedState } from 'react-use';

import { NewTourSheet } from '@/features/admin/tours/components/new-tour-sheet';
import { EditTourSheet } from '@/features/admin/tours/components/edit-tour-sheet';

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewTourSheet />
      <EditTourSheet />
    </>
  );
};
