'use client';

import {Task} from '@/redux/todos/todoSlice';

import TaskColsTitle from './table-row-primitives/task-cols-title';
import TaskColsTaskType from './table-row-primitives/task-cols-task-type';
import TaskColsStatus from './table-row-primitives/task-cols-status';
import TaskColsDueDate from './table-row-primitives/task-cols-duedate';
import TaskColsPriority from './table-row-primitives/task-cols-priority';

export default function TaskTableRow(props: Task) {
  return (
    <div className='p-2 items-center grid grid-cols-[51%,_10%,_10%,_13%,_10%] border border-border border-t-0 tracking-tight bg-background hover:bg-secondary/70 last:rounded-br-md last:rounded-bl-md cursor-default text-sm'>
      <TaskColsTitle title={props.title} subjects={props.subjects} />
      <TaskColsTaskType type={props.type} />
      <TaskColsStatus status={props.status} />
      <TaskColsDueDate dueDate={props.dueDate} />
      <TaskColsPriority priority={props.priority} />
    </div>
  );
}
