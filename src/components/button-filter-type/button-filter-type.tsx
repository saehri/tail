'use client';

import {useState} from 'react';
import ButtonFilter from '../ui/button-filter';
import {ClipboardIcon, FileIcon} from '@radix-ui/react-icons';

type typeTypes = 'task' | 'quiz';
type typeItemTypes = {
  value: typeTypes;
  selected: boolean;
  icon: React.ReactNode;
};

export default function ButtonFilterType() {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<typeItemTypes[]>([
    {
      value: 'task',
      selected: false,
      icon: <ClipboardIcon />,
    },
    {
      value: 'quiz',
      selected: false,
      icon: <FileIcon />,
    },
  ]);

  function toggleSelected(type: string) {
    const newState = selectedType.slice(0).map((tp) => {
      if (tp.value === type) return {...tp, selected: !tp.selected};
      else return tp;
    });

    setSelectedType(newState);
  }

  return (
    <ButtonFilter
      open={open}
      setOpen={setOpen}
      selectedCategory={selectedType}
      toggleSelected={toggleSelected}
      label='Type'
    />
  );
}
