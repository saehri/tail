'use client';

import {FormEvent, useState} from 'react';

import {ClockIcon} from '@radix-ui/react-icons';
import {Button} from '../ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import {convertToTime, getFormattedTime} from '@/lib/convert-to-time';

type TimeSelectorTypes = {
  currentDate: Date;
  setDateValue: (date: Date) => void;
};

export default function TimeSelector(props: TimeSelectorTypes) {
  const [open, setOpen] = useState<boolean>(false);

  const ftime = getFormattedTime(props.currentDate);
  const [time, setTime] = useState(ftime.f_hours + ':' + ftime.f_minutes);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const convertedString = convertToTime(time);

    if (convertedString === 'invalid') return setOpen(false);
    const dueDate = props.currentDate;
    dueDate.setHours(convertedString.hours);
    dueDate.setMinutes(convertedString.minutes);
    props.setDateValue(dueDate);

    const nftime = getFormattedTime(dueDate);
    setTime(nftime.f_hours + ':' + nftime.f_minutes);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={!props.currentDate}>
        <Button
          type='button'
          variant='outline'
          className='w-full flex gap-4 justify-between items-center font-normal'
        >
          {ftime.f_hours + ':' + ftime.f_minutes}
          <ClockIcon className='text-muted-foreground' />
        </Button>
      </PopoverTrigger>

      <PopoverContent align='end' className='p-0 w-28'>
        <form
          onSubmit={handleSubmit}
          className='flex items-center border-b border-border p-2'
        >
          <ClockIcon className='text-muted-foreground shrink-0' />

          <input
            type='text'
            className='border-none outline-none px-2 text-sm bg-transparent w-full'
            placeholder='Set time'
            name='time'
            onChange={(ev) => setTime(ev.target.value)}
            aria-describedby='timeInputDescription'
            value={time}
          />
        </form>

        <div
          id='timeInputDescription'
          className='p-2 flex flex-col text-[0.8rem] text-muted-foreground'
        >
          Valid input are 23:59 or 2359
        </div>
      </PopoverContent>
    </Popover>
  );
}
