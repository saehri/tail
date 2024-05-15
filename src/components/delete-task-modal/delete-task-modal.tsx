'use client';

import {useAppDispatch} from '@/redux/utils';

import {TrashIcon} from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {Button} from '../ui/button';
import {deleteTodo} from '@/redux/todos/todo-slice';

interface DeleteTaskModal {
  taskId: string;
}

export default function DeleteTaskModal(props: DeleteTaskModal) {
  const dispatch = useAppDispatch();

  function confirmDeletion() {
    dispatch(deleteTodo(props.taskId));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' className='gap-2'>
          <TrashIcon /> Delete
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-96'>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this task?</DialogTitle>
          <DialogDescription>
            Please notice that this action cannot be undone. Click outside of
            this box to cancel deletion process.
          </DialogDescription>
        </DialogHeader>

        <Button
          onClick={confirmDeletion}
          variant='destructive'
          className='gap-2 w-full'
        >
          <TrashIcon /> Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
