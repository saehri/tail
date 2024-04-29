'use client';

import {useState} from 'react';
import ButtonFilter from '../ui/button-filter';
import {
  CheckCircledIcon,
  CircleIcon,
  RadiobuttonIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

type statusTypes = 'todo' | 'ongoing' | 'pending' | 'done';
type statusItemTypes = {
  value: statusTypes;
  selected: boolean;
  icon: React.ReactNode;
};

export default function ButtonFilterStatus() {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<statusItemTypes[]>([
    {
      value: 'todo',
      selected: false,
      icon: <CircleIcon />,
    },
    {
      value: 'ongoing',
      selected: false,
      icon: <StopwatchIcon />,
    },
    {
      value: 'pending',
      selected: false,
      icon: <RadiobuttonIcon />,
    },
    {
      value: 'done',
      selected: false,
      icon: <CheckCircledIcon />,
    },
  ]);

  function toggleSelected(status: string) {
    const newState = selectedStatus.slice(0).map((sts) => {
      if (sts.value === status) return {...sts, selected: !sts.selected};
      else return sts;
    });

    setSelectedStatus(newState);
  }

  return (
    <ButtonFilter
      open={open}
      setOpen={setOpen}
      selectedCategory={selectedStatus}
      toggleSelected={toggleSelected}
      label='Status'
    />
  );
}
