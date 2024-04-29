'use client';

import {useState} from 'react';
import ButtonFilter from '../ui/button-filter';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from '@radix-ui/react-icons';

type priorityTypes = 'low' | 'medium' | 'high';
type priorityItemTypes = {
  value: priorityTypes;
  selected: boolean;
  icon: React.ReactNode;
};

export default function ButtonFilterPriority() {
  const [open, setOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<priorityItemTypes[]>(
    [
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
    ]
  );

  function toggleSelected(priority: string) {
    const newState = selectedPriority.slice(0).map((prt) => {
      if (prt.value === priority) return {...prt, selected: !prt.selected};
      else return prt;
    });

    setSelectedPriority(newState);
  }

  return (
    <ButtonFilter
      open={open}
      setOpen={setOpen}
      selectedCategory={selectedPriority}
      toggleSelected={toggleSelected}
      label='Priority'
    />
  );
}
