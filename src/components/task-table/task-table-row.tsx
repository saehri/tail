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
import {Badge} from '../ui/badge';

type TaskTypeTypes = 'task' | 'quiz';
type TaskStatusTypes = 'todo' | 'ongoing' | 'pending' | 'done';
type TaskPriorityTypes = 'low' | 'medium' | 'high';
type TaskTypes = {
  id: string;
  title: string;
  type: TaskTypeTypes;
  status: TaskStatusTypes;
  dueDate: string;
  priority: TaskPriorityTypes;
  progress: string;
  subjects: string;
};

export default function TaskTableRow(props: TaskTypes) {
  return (
    <div className='p-2 items-center grid grid-cols-[51%,_10%,_10%,_13%,_10%,_6%] border border-border border-t-0 tracking-tight bg-background hover:bg-secondary/70 last:rounded-br-md last:rounded-bl-md cursor-default'>
      <div className='flex gap-2 w-[90%]'>
        <Badge variant='outline' className='capitalize whitespace-nowrap'>
          {props.subjects}
        </Badge>

        <span className='block whitespace-nowrap overflow-hidden text-ellipsis'>
          {props.title}
        </span>
      </div>

      <div className='flex gap-2 items-center capitalize'>
        <span className='text-muted-foreground'>
          <LabelIcon variant={props.type} />
        </span>
        <span>{props.type}</span>
      </div>

      <div className='flex gap-2 items-center capitalize'>
        <span className='text-muted-foreground'>
          <LabelIcon variant={props.status} />
        </span>
        <span> {props.status}</span>
      </div>

      <div className='flex gap-2 items-center'>
        <span className='text-muted-foreground'>
          <LabelIcon variant={props.dueDate} />
        </span>
        <span>{props.dueDate}</span>
      </div>

      <div className='flex gap-2 items-center capitalize'>
        <span className='text-muted-foreground'>
          <LabelIcon variant={props.priority} />
        </span>
        <span>{props.priority}</span>
      </div>

      <div className='flex gap-2 items-center capitalize'>
        <span>{props.progress}</span>
      </div>
    </div>
  );
}

function LabelIcon(props: {variant: string}) {
  const icons: Record<string, React.ReactNode> = {
    task: <ClipboardIcon />,
    quiz: <FileIcon />,
    low: <ArrowDownIcon />,
    medium: <ArrowRightIcon />,
    high: <ArrowUpIcon />,
    todo: <CircleIcon />,
    ongoing: <StopwatchIcon />,
    pending: <DiscIcon />,
    done: <CheckCircledIcon />,
  };

  return icons[props.variant];
}
