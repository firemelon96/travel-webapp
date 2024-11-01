'use client';
import { Button } from '@/components/ui/button';
import { useNewTour } from '@/features/admin/tours/hooks/use-new-tour';
import { Plus } from 'lucide-react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const AddButton = ({ children }: Props) => {
  const { onOpen } = useNewTour();
  return (
    <Button size='sm' onClick={onOpen}>
      <Plus className='mr-2 size-4' /> {children}
    </Button>
  );
};
