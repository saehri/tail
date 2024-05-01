'use client';

import TaskTableHeader from './task-table-header';
import TaskTableRow from './task-table-row';

import {selectTodos} from '@/redux/todos/todoSlice';
import {useAppSelector} from '@/redux/utils';

export default function TaskTable() {
  return (
    <>
      <TaskTableHeader />

      <TaskRows />
    </>
  );
}

function TaskRows() {
  const todos = useAppSelector(selectTodos);

  if (!todos.length)
    return (
      <div className='p-2 flex justify-center items-center border border-border border-t-0 tracking-tight bg-background hover:bg-secondary/70 last:rounded-br-md last:rounded-bl-md cursor-default text-sm'>
        There is nothing todo.
      </div>
    );

  return (
    <>
      {todos.map((task) => (
        <TaskTableRow {...task} key={task.id as string} />
      ))}
    </>
  );
}
