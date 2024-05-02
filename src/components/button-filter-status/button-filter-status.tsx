'use client';

import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/utils';
import {
  TaskStatusTypes,
  selectFilterStatus,
  setKeywordsForStatusFilter,
} from '@/redux/todos/todoSlice';

import ButtonFilter from '../ui/button-filter';
import {
  CheckCircledIcon,
  CircleIcon,
  RadiobuttonIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

type StatusItemTypes = {
  value: TaskStatusTypes;
  icon: React.ReactNode;
};

const filterCategory: StatusItemTypes[] = [
  {value: 'todo', icon: <CircleIcon />},
  {value: 'ongoing', icon: <StopwatchIcon />},
  {value: 'pending', icon: <RadiobuttonIcon />},
  {value: 'done', icon: <CheckCircledIcon />},
];

export default function ButtonFilterStatus() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilterStatus);

  const [open, setOpen] = useState(false);

  function toggleSelected(value: string) {
    dispatch(setKeywordsForStatusFilter(value as TaskStatusTypes));
  }

  return (
    <>
      <ButtonFilter
        open={open}
        setOpen={setOpen}
        categories={filterCategory}
        toggleSelected={toggleSelected}
        label='Status'
        selected={filters}
      />
    </>
  );
}
