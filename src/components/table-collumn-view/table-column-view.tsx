'use client';

import {useState} from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {CheckIcon, MixerHorizontalIcon} from '@radix-ui/react-icons';
import {Button} from '../ui/button';

export default function TableColumnView() {
  const [visibleColumns, setVisibleColumns] = useState<
    {name: string; visible: boolean}[]
  >([
    {name: 'Status', visible: true},
    {name: 'Priority', visible: true},
  ]);

  function toggleColumns(colName: string) {
    const newColVisibilityState = visibleColumns.slice(0).map((col) => {
      if (col.name === colName) return {name: col.name, visible: !col.visible};
      else return col;
    });

    setVisibleColumns(newColVisibilityState);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='flex gap-2' size='sm'>
          <MixerHorizontalIcon /> View
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuLabel className='pr-6'>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {visibleColumns.map((column) => (
            <DropdownMenuItem
              key={column.name}
              onClick={() => toggleColumns(column.name)}
              className='flex gap-2'
            >
              <span className={!column.visible ? 'opacity-0' : 'opacity-100'}>
                {<CheckIcon />}
              </span>
              <span>{column.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
