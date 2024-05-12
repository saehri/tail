'use client';

import {TaskStatusTypes} from '@/redux/todos/todo-slice';
import TaskColsIcons from './task-cols-icons';

interface TaskColsStatus {
  status: TaskStatusTypes;
}

export default function TaskColsStatus(props: TaskColsStatus) {
  return (
    <div className='flex gap-2 items-center capitalize'>
      <span className='text-muted-foreground'>
        <TaskColsIcons variant={props.status} />
      </span>
      <span> {props.status}</span>
    </div>
  );
}
