'use client';

import {TaskTypeTypes} from '@/redux/todos/todoSlice';
import TaskColsIcons from './task-cols-icons';

interface TaskColsTaskType {
  type: TaskTypeTypes;
}

export default function TaskColsTaskType(props: TaskColsTaskType) {
  return (
    <div className='flex gap-2 items-center capitalize'>
      <span className='text-muted-foreground'>
        <TaskColsIcons variant={props.type} />
      </span>

      <span>{props.type}</span>
    </div>
  );
}
