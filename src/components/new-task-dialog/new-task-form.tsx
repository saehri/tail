'use client';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {format} from 'date-fns';
import {cn} from '@/lib/utils';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {Input} from '../ui/input';
import {Textarea} from '../ui/textarea';
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CalendarIcon,
  CheckCircledIcon,
  CircleIcon,
  ClipboardIcon,
  ClockIcon,
  DiscIcon,
  FileIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';
import {Button} from '../ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '../ui/popover';
import {Calendar} from '../ui/calendar';
import TimeSelector from './time-selector';

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, {message: 'Title must be at least 2 characters.'})
    .max(250, {message: 'Title is too long'}),
  type: z.string().trim().min(1, {message: 'This field cannot be empty'}),
  description: z.string().trim().max(250, {
    message: 'Description is too long, max characters is 250 characters.',
  }),
  status: z.string().trim().min(1, {message: 'This field cannot be empty'}),
  subjects: z.string(),
  priority: z.string().trim().min(1, {message: 'This field cannot be empty'}),
  dueDate: z.date(),
});

/* 
TODO
1. The form should be able to handle following inputs:
[-] Task title
[-] Task description
[-] Task type (dropdown | select)
[] Due date (date picker)
[] Task priority (dropdown | select)
[-] Subjects (dropdown | select)
[-] Task status (dropdown | select)
*/

/* 
TITLE & TASK TYPE
TASK DESCRIPTION
SUBJECTS & STATUS
PRIORITY & DUE DATE
SUBMIT
*/

export default function NewTaskForm() {
  // The code bellow define the initial state and structures of the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      type: 'task',
      description: '',
      status: 'todo',
      subjects: '-',
      priority: 'low',
    },
  });

  /* @return void and take values (form structures). Used to handle submit event of the form */
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  function setDateValue(date: Date) {
    form.setValue('dueDate', date);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-3'
      >
        <div className='grid grid-cols-[_1fr,_23%] gap-2'>
          <FormField
            control={form.control}
            name='title'
            render={({field}) => (
              <FormItem>
                <FormLabel>What to do?</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Build a Todo App'
                    {...field}
                    className='h-9'
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='type'
            render={({field}) => (
              <FormItem>
                <FormLabel>Task type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select task type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='task'>
                      <span className='flex gap-2 items-center'>
                        <ClipboardIcon className='text-muted-foreground' /> Task
                      </span>
                    </SelectItem>
                    <SelectItem value='quiz'>
                      <span className='flex gap-2 items-center'>
                        <FileIcon className='text-muted-foreground' /> Quiz
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='grid grid-cols-[_.4fr,_1fr] gap-2'>
          <FormField
            control={form.control}
            name='priority'
            render={({field}) => (
              <FormItem>
                <FormLabel>Task priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select task priority' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='low'>
                      <span className='flex gap-2 items-center'>
                        <ArrowDownIcon className='text-muted-foreground' /> Low
                      </span>
                    </SelectItem>
                    <SelectItem value='medium'>
                      <span className='flex gap-2 items-center'>
                        <ArrowRightIcon className='text-muted-foreground' />{' '}
                        Medium
                      </span>
                    </SelectItem>
                    <SelectItem value='high'>
                      <span className='flex gap-2 items-center'>
                        <ArrowUpIcon className='text-muted-foreground' /> High
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-[63%,_1fr] gap-2 items-end'>
            <FormField
              control={form.control}
              name='dueDate'
              render={({field}) => (
                <FormItem className='flex flex-col justify-end'>
                  <FormLabel>Due date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          className={cn(
                            'text-left font-normal m-0',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>

                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date: any) =>
                          date < new Date().setDate(new Date().getDate() - 1)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            {form.getValues('dueDate') ? (
              <TimeSelector
                setDateValue={setDateValue}
                currentDate={form.getValues('dueDate')}
              />
            ) : (
              <Button
                type='button'
                variant='outline'
                className='w-full flex gap-4 justify-between items-center font-normal'
                disabled
              >
                00 : 00
                <ClockIcon className='text-muted-foreground' />
              </Button>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name='description'
          render={({field}) => (
            <FormItem>
              <FormLabel>Describe you task</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>

              <FormDescription>
                Describe your task or simply leave it blank.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-2 gap-2'>
          <FormField
            control={form.control}
            name='subjects'
            render={({field}) => (
              <FormItem>
                <FormLabel>Subjects</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select study subjects' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='-'>-</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  If study subjects field is empty it means you need to add it
                  to your profile.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='status'
            render={({field}) => (
              <FormItem>
                <FormLabel>Task status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select task status' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='todo'>
                      <span className='flex gap-2 items-center'>
                        <CircleIcon className='text-muted-foreground' /> Todo
                      </span>
                    </SelectItem>
                    <SelectItem value='ongoing'>
                      <span className='flex gap-2 items-center'>
                        <StopwatchIcon className='text-muted-foreground' />{' '}
                        Ongoing
                      </span>
                    </SelectItem>
                    <SelectItem value='pending'>
                      <span className='flex gap-2 items-center'>
                        <DiscIcon className='text-muted-foreground' /> Pending
                      </span>
                    </SelectItem>
                    <SelectItem value='done'>
                      <span className='flex gap-2 items-center'>
                        <CheckCircledIcon className='text-muted-foreground' />{' '}
                        Done
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={!form.getValues('title').length} type='submit'>
          Add new task
        </Button>
      </form>
    </Form>
  );
}
