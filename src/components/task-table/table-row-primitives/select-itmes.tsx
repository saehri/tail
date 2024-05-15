import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  ClipboardIcon,
  DiscIcon,
  FileIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const selectItems = {
  taskType: [
    {
      value: 'task',
      label: 'Task',
      icon: <ClipboardIcon className='text-muted-foreground' />,
    },
    {
      value: 'quiz',
      label: 'Quiz',
      icon: <FileIcon className='text-muted-foreground' />,
    },
  ],
  taskPriority: [
    {
      value: 'low',
      label: 'Low',
      icon: <ArrowDownIcon className='text-muted-foreground' />,
    },
    {
      value: 'medium',
      label: 'Medium',
      icon: <ArrowRightIcon className='text-muted-foreground' />,
    },
    {
      value: 'high',
      label: 'High',
      icon: <ArrowUpIcon className='text-muted-foreground' />,
    },
  ],
  taskStatus: [
    {
      value: 'todo',
      label: 'Todo',
      icon: <CircleIcon className='text-muted-foreground' />,
    },
    {
      value: 'ongoing',
      label: 'Ongoing',
      icon: <StopwatchIcon className='text-muted-foreground' />,
    },
    {
      value: 'pending',
      label: 'Pending',
      icon: <DiscIcon className='text-muted-foreground' />,
    },
    {
      value: 'done',
      label: 'Done',
      icon: <CheckCircledIcon className='text-muted-foreground' />,
    },
  ],
};
