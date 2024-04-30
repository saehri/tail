'use client';

import {Button} from '@/components/ui/button';
import {PlusIcon} from '@radix-ui/react-icons';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import NewTaskForm from './new-task-form';

export default function NewTaskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' variant='outline' className='flex gap-1 items-center'>
          <PlusIcon />
          Add Task
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
        </DialogHeader>

        <NewTaskForm />
      </DialogContent>
    </Dialog>
  );
}
