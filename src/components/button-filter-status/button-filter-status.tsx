'use client';

import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '@/redux/utils';
import {
  TaskStatusTypes,
  selectFilterStatus,
  clearFilterKeywords,
  statusFilterToggled,
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
    dispatch(statusFilterToggled(value as TaskStatusTypes));
  }

  function clearSelections() {
    dispatch(clearFilterKeywords(null));
  }

  return (
    <>
      <ButtonFilter
        open={open}
        setOpen={setOpen}
        categories={filterCategory}
        toggleSelected={toggleSelected}
        label='Status'
        clearSelections={clearSelections}
        selected={filters}
      />
    </>
  );
}
