'use client';

import {TaskPriorityTypes} from '@/redux/todos/todo-slice';
import TaskColsIcons from './task-cols-icons';

interface TaskColsPriority {
  priority: TaskPriorityTypes;
}

export default function TaskColsPriority(props: TaskColsPriority) {
  return (
    <div className='flex gap-2 items-center capitalize'>
      <span className='text-muted-foreground'>
        <TaskColsIcons variant={props.priority} />
      </span>

      <span>{props.priority}</span>
    </div>
  );
}
