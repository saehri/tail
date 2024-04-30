'use client';

import {Dispatch, SetStateAction, useState} from 'react';

import {ClockIcon} from '@radix-ui/react-icons';
import {Button} from '../ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';

type TimeSelectorTypes = {
  currentDate: Date;
  setDateValue: (date: Date) => void;
};

const timeHours: {value: number; label: string}[] = [
  {value: 0, label: '00'},
  {value: 1, label: '01'},
  {value: 2, label: '02'},
  {value: 3, label: '03'},
  {value: 4, label: '04'},
  {value: 5, label: '05'},
  {value: 6, label: '06'},
  {value: 7, label: '07'},
  {value: 8, label: '08'},
  {value: 9, label: '09'},
  {value: 10, label: '10'},
  {value: 11, label: '11'},
  {value: 12, label: '12'},
  {value: 13, label: '13'},
  {value: 14, label: '14'},
  {value: 15, label: '15'},
  {value: 16, label: '16'},
  {value: 17, label: '17'},
  {value: 18, label: '18'},
  {value: 19, label: '19'},
  {value: 20, label: '20'},
  {value: 21, label: '21'},
  {value: 22, label: '22'},
  {value: 23, label: '23'},
];

const timeMinutes: {value: number; label: string}[] = [
  {value: 0, label: '00'},
  {value: 1, label: '01'},
  {value: 2, label: '02'},
  {value: 3, label: '03'},
  {value: 4, label: '04'},
  {value: 5, label: '05'},
  {value: 6, label: '06'},
  {value: 7, label: '07'},
  {value: 8, label: '08'},
  {value: 9, label: '09'},
  {value: 10, label: '10'},
  {value: 11, label: '11'},
  {value: 12, label: '12'},
  {value: 13, label: '13'},
  {value: 14, label: '14'},
  {value: 15, label: '15'},
  {value: 16, label: '16'},
  {value: 17, label: '17'},
  {value: 18, label: '18'},
  {value: 19, label: '19'},
  {value: 20, label: '20'},
  {value: 21, label: '21'},
  {value: 22, label: '22'},
  {value: 23, label: '23'},
  {value: 24, label: '24'},
  {value: 25, label: '25'},
  {value: 26, label: '26'},
  {value: 27, label: '27'},
  {value: 28, label: '28'},
  {value: 29, label: '29'},
  {value: 30, label: '30'},
  {value: 31, label: '31'},
  {value: 32, label: '32'},
  {value: 33, label: '33'},
  {value: 34, label: '34'},
  {value: 35, label: '35'},
  {value: 36, label: '36'},
  {value: 37, label: '37'},
  {value: 38, label: '38'},
  {value: 39, label: '39'},
  {value: 40, label: '40'},
  {value: 41, label: '41'},
  {value: 42, label: '42'},
  {value: 43, label: '43'},
  {value: 44, label: '44'},
  {value: 45, label: '45'},
  {value: 46, label: '46'},
  {value: 47, label: '47'},
  {value: 48, label: '48'},
  {value: 49, label: '49'},
  {value: 50, label: '50'},
  {value: 51, label: '51'},
  {value: 52, label: '52'},
  {value: 53, label: '53'},
  {value: 54, label: '54'},
  {value: 55, label: '55'},
  {value: 56, label: '56'},
  {value: 57, label: '57'},
  {value: 58, label: '58'},
  {value: 59, label: '59'},
];

export default function TimeSelector(props: TimeSelectorTypes) {
  const [open, setOpen] = useState<boolean>(false);

  const [selectedHours, setSelectedHours] = useState<number>(
    props.currentDate.getHours()
  );
  const [selectedMinutes, setSelectedMinutes] = useState<number>(
    props.currentDate.getMinutes()
  );

  const [currentActive, setCurrentActive] = useState<0 | 1>(0);

  function handleSelectHours(time: number) {
    setSelectedHours(time);

    const date = props.currentDate;
    date.setHours(time);
    props.setDateValue(date);

    setCurrentActive(1);
  }

  function handleSelectMinutes(time: number) {
    setSelectedMinutes(time);

    const date = props.currentDate;
    date.setMinutes(time);
    props.setDateValue(date);

    setCurrentActive(0);
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
          <RenderTime time={selectedHours.toString()} /> :{' '}
          <RenderTime time={selectedMinutes.toString()} />
          <ClockIcon className='text-muted-foreground' />
        </Button>
      </PopoverTrigger>

      <PopoverContent align='end' className='p-1 px-2 w-max'>
        <div>
          <Button
            variant='ghost'
            className={currentActive === 0 ? 'text-primary' : 'text-foreground'}
            onClick={() => setCurrentActive(0)}
            size='icon'
          >
            <RenderTime time={selectedHours.toString()} />
          </Button>
          :
          <Button
            variant='ghost'
            className={currentActive === 1 ? 'text-primary' : 'text-foreground'}
            onClick={() => setCurrentActive(1)}
            size='icon'
          >
            <RenderTime time={selectedMinutes.toString()} />
          </Button>
        </div>

        <div>
          <h4 className='text-foreground text-sm'>Hours</h4>

          {currentActive === 0 ? (
            <TimeButtonSelector
              items={timeHours}
              selectedTime={selectedHours}
              setSelected={handleSelectHours}
            />
          ) : (
            <TimeButtonSelector
              items={timeMinutes}
              selectedTime={selectedMinutes}
              setSelected={handleSelectMinutes}
            />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

type TimeButtonSelectorProps = {
  items: {value: number; label: string}[];
  selectedTime: number;
  setSelected: (time: number) => void;
};

function TimeButtonSelector(props: TimeButtonSelectorProps) {
  return (
    <div className='grid grid-cols-10 gap-2'>
      {props.items.map((item) => (
        <Button
          key={item.value}
          variant={props.selectedTime === item.value ? 'default' : 'outline'}
          size='icon'
          onClick={() => props.setSelected(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  );
}

function RenderTime(props: {time: string}) {
  if (props.time.length === 1) return '0' + props.time;
  else return props.time;
}
