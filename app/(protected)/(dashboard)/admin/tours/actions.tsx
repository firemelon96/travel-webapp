'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteTour } from '@/features/admin/tours/api/use-delete-tour';
import { useEditTour } from '@/features/admin/tours/hooks/use-edit-tour';
import { useConfirm } from '@/hooks/use-confirm';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    "You're about to delete this tour."
  );

  const { onOpen } = useEditTour();
  const { mutate } = useDeleteTour(id);

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
            <Copy className='size-3' /> Copy ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onOpen(id)}>
            <Edit className='size-3' /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className='text-rose-500'>
            <Trash className='size-3' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
