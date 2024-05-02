'use client';

import {useState} from 'react';
import {
  TaskPriorityTypes,
  TaskStatusTypes,
  clearFilterKeywords,
  priorityFilterToggled,
  selectFilterPriority,
} from '@/redux/todos/todoSlice';
import {useAppDispatch, useAppSelector} from '@/redux/utils';

import ButtonFilter from '../ui/button-filter';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from '@radix-ui/react-icons';

type PriorityItemTypes = {
  value: TaskPriorityTypes;
  selected: boolean;
  icon: React.ReactNode;
};

const filterCategory: PriorityItemTypes[] = [
  {
    value: 'low',
    selected: false,
    icon: <ArrowDownIcon />,
  },
  {
    value: 'medium',
    selected: false,
    icon: <ArrowRightIcon />,
  },
  {
    value: 'high',
    selected: false,
    icon: <ArrowUpIcon />,
  },
];

export default function ButtonFilterPriority() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilterPriority);

  function toggleSelected(value: string) {
    dispatch(priorityFilterToggled(value as TaskPriorityTypes));
  }

  function clearSelections() {
    dispatch(clearFilterKeywords(null));
  }
  return (
    <ButtonFilter
      open={open}
      setOpen={setOpen}
      categories={filterCategory}
      selected={filters}
      toggleSelected={toggleSelected}
      label='Priority'
      clearSelections={clearSelections}
    />
  );
}
