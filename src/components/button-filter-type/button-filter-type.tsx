'use client';

import {useState} from 'react';
import ButtonFilter from '../ui/button-filter';
import {ClipboardIcon, FileIcon} from '@radix-ui/react-icons';
import {useAppDispatch, useAppSelector} from '@/redux/utils';
import {
  TaskTypeTypes,
  selectFilterType,
  setKeywordsForTypeFilter,
} from '@/redux/todos/todoSlice';

const itemCategories = [
  {
    value: 'task',
    icon: <ClipboardIcon />,
  },
  {
    value: 'quiz',
    icon: <FileIcon />,
  },
];

export default function ButtonFilterType() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilterType);

  const [open, setOpen] = useState(false);

  function toggleSelected(value: string) {
    dispatch(setKeywordsForTypeFilter(value as TaskTypeTypes));
  }

  return (
    <ButtonFilter
      open={open}
      setOpen={setOpen}
      selected={filters}
      categories={itemCategories}
      toggleSelected={toggleSelected}
      label='Type'
    />
  );
}
