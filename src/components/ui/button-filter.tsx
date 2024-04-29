'use client';

import {Dispatch, SetStateAction} from 'react';
import {twMerge} from 'tailwind-merge';

import {Button} from '@/components/ui/button';
import {PlusCircledIcon} from '@radix-ui/react-icons';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {Badge} from './badge';
import {Checkbox} from './checkbox';

type filterItemTypes = {
  value: string;
  selected: boolean;
  icon: React.ReactNode;
};

interface ButtonFilterProps {
  selectedCategory: filterItemTypes[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleSelected: (category: string) => void;
  label: string;
}

export default function ButtonFilter(props: ButtonFilterProps) {
  return (
    <Popover open={props.open} onOpenChange={props.setOpen}>
      <PopoverTrigger asChild>
        <Button
          role='combobox'
          aria-expanded={props.open}
          variant='ghost'
          className='flex gap-2 outline-1 outline-dashed outline-border'
          size='sm'
        >
          <PlusCircledIcon /> {props.label}
          <SelectedStatusViewer selectedCategory={props.selectedCategory} />
        </Button>
      </PopoverTrigger>

      <PopoverContent align='start' className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Status' className='h-9' />
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup>
            {props.selectedCategory.map((status) => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={() => props.toggleSelected(status.value)}
                className='capitalize flex gap-2 items-center'
              >
                <Checkbox checked={status.selected} />

                <div className='flex gap-2 items-center'>
                  <span>{status.icon}</span>
                  <span>{status.value}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

type SelectedStatusViewerProps = {
  selectedCategory: {value: string; selected: boolean}[];
};

function SelectedStatusViewer(props: SelectedStatusViewerProps) {
  return (
    <span className='flex gap-1'>
      {props.selectedCategory.map((status) => (
        <Badge
          key={status.value}
          variant='secondary'
          className={twMerge(
            'capitalize',
            status.selected ? 'visible' : 'hidden'
          )}
        >
          {status.value}
        </Badge>
      ))}
    </span>
  );
}
