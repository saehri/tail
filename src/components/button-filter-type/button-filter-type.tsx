'use client';

import {useState} from 'react';
import ButtonFilter from '../ui/button-filter';
import {ClipboardIcon, FileIcon} from '@radix-ui/react-icons';
import {useAppDispatch, useAppSelector} from '@/redux/utils';
import {
  TaskTypeTypes,
  clearFilterKeywords,
  selectFilterType,
  typeFilterToggled,
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
    dispatch(typeFilterToggled(value as TaskTypeTypes));
  }

  function clearSelections() {
    dispatch(clearFilterKeywords(null));
  }

  return (
    <ButtonFilter
      open={open}
      setOpen={setOpen}
      selected={filters}
      categories={itemCategories}
      toggleSelected={toggleSelected}
      label='Type'
      clearSelections={clearSelections}
    />
  );
}
