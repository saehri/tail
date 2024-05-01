'use client';

import TaskColsIcons from './task-cols-icons';

interface TaskColsDueDate {
  dueDate: string | undefined;
}

export default function TaskColsDueDate(props: TaskColsDueDate) {
  const date = props.dueDate
    ? new Date(props.dueDate).toLocaleDateString('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <div className='flex gap-2 items-center'>
      <span className='text-muted-foreground'>
        <TaskColsIcons variant={'dueDate'} />
      </span>

      <span>{date}</span>
    </div>
  );
}
