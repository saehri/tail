'use client';

import {useEffect} from 'react';
import TaskTableHeader from './task-table-header';
import TaskTableRow from './task-table-row';

import {
  filterTodos,
  selectFilterPriority,
  selectFilterStatus,
  selectFilterType,
  selectTodoDisplay,
} from '@/redux/todos/todoSlice';
import {useAppDispatch, useAppSelector} from '@/redux/utils';

export default function TaskTable() {
  return (
    <>
      <TaskTableHeader />

      <TaskRows />
    </>
  );
}

function TaskRows() {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(selectTodoDisplay);

  const filterStatus = useAppSelector(selectFilterStatus);
  const filterPriority = useAppSelector(selectFilterPriority);
  const filterType = useAppSelector(selectFilterType);

  useEffect(() => {
    dispatch(
      filterTodos({
        status: filterStatus,
        priority: filterPriority,
        type: filterType,
      })
    );
  }, [filterPriority.length, filterType.length, filterStatus.length]);

  if (!todos.length)
    return (
      <div className='p-2 flex justify-center items-center border border-border border-t-0 tracking-tight bg-background hover:bg-secondary/70 last:rounded-br-md last:rounded-bl-md cursor-default text-sm'>
        There is nothing todo.
      </div>
    );

  return (
    <div>
      {todos.map((task) => (
        <TaskTableRow {...task} key={task.id as string} />
      ))}
    </div>
  );
}
