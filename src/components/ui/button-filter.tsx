'use client';

import {Dispatch, SetStateAction} from 'react';

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
  icon: React.ReactNode;
};

interface ButtonFilterProps {
  label: string;
  categories: filterItemTypes[];
  selected: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleSelected: (category: string) => void;
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
          <SelectedStatusViewer selectedCategories={props.selected} />
        </Button>
      </PopoverTrigger>

      <PopoverContent align='start' className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Status' className='h-9' />
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup>
            {props.categories.map((status) => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={() => props.toggleSelected(status.value)}
                className='capitalize flex gap-2 items-center'
              >
                <Checkbox checked={props.selected.includes(status.value)} />

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

interface SelectedStatusViewer {
  selectedCategories: string[];
}

function SelectedStatusViewer(props: SelectedStatusViewer) {
  const selectedCount = props.selectedCategories.length;

  if (selectedCount > 2)
    return <Badge variant='secondary'>{selectedCount} selected</Badge>;

  return (
    <span className='flex gap-1'>
      {props.selectedCategories.map((value) => (
        <Badge key={value} variant='secondary' className='capitalize'>
          {value}
        </Badge>
      ))}
    </span>
  );
}
