'use client';

import {cn} from '@/lib/utils';
import useUpdateTaskForm from '@/hooks/use-update-task-form';
import {format} from 'date-fns';

import {Label} from '../ui/label';
import {Calendar} from '../ui/calendar';
import {Button} from '../ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import {CalendarIcon, ClockIcon} from '@radix-ui/react-icons';
import TimeSelector from '../new-task-dialog/time-selector';

interface TaskUpdaterDueDate {
  initialFormValue: string | undefined;
  taskId: string;
}

export default function TaskUpdaterDueDate(props: TaskUpdaterDueDate) {
  const form = useUpdateTaskForm({...props, colName: 'dueDate'});

  return (
    <div className='grid grid-cols-[63%,_1fr] gap-2 items-end'>
      <form className='flex flex-col gap-3'>
        <Label>Due date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              className={cn(
                'text-left font-normal m-0',
                !props.initialFormValue && 'text-muted-foreground'
              )}
            >
              {props.initialFormValue ? (
                format(props.initialFormValue, 'PPP')
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              selected={
                props.initialFormValue
                  ? new Date(props.initialFormValue)
                  : undefined
              }
              onSelect={(date) =>
                form.handleFormValueChange(date?.toISOString(), true)
              }
              disabled={(date: any) =>
                date < new Date().setDate(new Date().getDate() - 1)
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </form>

      {props.initialFormValue === undefined ? (
        <Button
          type='button'
          variant='outline'
          className='w-full flex gap-4 justify-between items-center font-normal'
          disabled
        >
          00 : 00
          <ClockIcon className='text-muted-foreground' />
        </Button>
      ) : (
        <TimeSelector
          setDateValue={(date) =>
            form.handleFormValueChange(date?.toISOString(), true)
          }
          currentDate={new Date(props.initialFormValue)}
        />
      )}
    </div>
  );
}
