'use client';

import {Task} from '@/redux/todos/todo-slice';

import TaskColsTitle from './table-row-primitives/task-cols-title';
import TaskColsTaskType from './table-row-primitives/task-cols-task-type';
import TaskColsStatus from './table-row-primitives/task-cols-status';
import TaskColsDueDate from './table-row-primitives/task-cols-duedate';
import TaskColsPriority from './table-row-primitives/task-cols-priority';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

import TaskUpdaterInput from '../task-updater-form/task-updater-input';
import TaskUpdaterSelect from '../task-updater-form/task-updater-select';

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
import TaskUpdaterDueDate from '../task-updater-form/task-updater-dueDate';
import TaskUpdaterTextArea from '../task-updater-form/task-updater-textArea';
import DeleteTaskModal from '../delete-task-modal/delete-task-modal';

const taskTypeSelectItems = [
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
];

const taskPrioritySelectItems = [
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
];

const taskSubjectSelectItems = [{value: '-', label: '-'}];

const taskStatusSelectItems = [
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
];

export default function TaskTableRow(props: Task) {
  return (
    <Dialog>
      <DialogTrigger className='w-full p-2 items-center grid grid-cols-[45%,_10%,_10%,_25%,_10%] border border-border border-t-0 tracking-tight bg-background hover:bg-secondary/70 last:rounded-br-md last:rounded-bl-md cursor-default text-sm'>
        <TaskColsTitle title={props.title} subjects={props.subjects} />
        <TaskColsTaskType type={props.type} />
        <TaskColsStatus status={props.status} />
        <TaskColsDueDate dueDate={props.dueDate} />
        <TaskColsPriority priority={props.priority} />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail</DialogTitle>
          <DialogDescription>
            The changes you made will be saved automatically.
          </DialogDescription>
        </DialogHeader>

        <section className='flex flex-col gap-3'>
          <div className='grid grid-cols-[77%,_23%] gap-2 items-end'>
            <TaskUpdaterInput
              colName='title'
              initialFormValue={props.title}
              label='What to do?'
              taskId={props.id as string}
            />
            <TaskUpdaterSelect
              label='Task type'
              colName='type'
              initialFormValue={props.type}
              taskId={props.id as string}
              selectItems={taskTypeSelectItems}
            />
          </div>

          <div className='grid grid-cols-[_.4fr,_1fr] gap-2'>
            <TaskUpdaterSelect
              label='Task priority'
              colName='priority'
              initialFormValue={props.priority}
              taskId={props.id as string}
              selectItems={taskPrioritySelectItems}
            />

            <TaskUpdaterDueDate
              initialFormValue={props.dueDate}
              taskId={props.id as string}
            />
          </div>

          <div>
            <TaskUpdaterTextArea
              label='Describe your task'
              taskId={props.id as string}
              initialFormValue={props.description}
              colName='description'
            />
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <TaskUpdaterSelect
              label='Subjects'
              colName='subjects'
              initialFormValue={props.subjects}
              taskId={props.id as string}
              selectItems={taskSubjectSelectItems}
              description='If study subjects field is empty it means you need to add it to your profile.'
            />
            <TaskUpdaterSelect
              label='Status'
              colName='status'
              initialFormValue={props.status}
              taskId={props.id as string}
              selectItems={taskStatusSelectItems}
            />
          </div>

          <DeleteTaskModal taskId={props.id as string} />
        </section>
      </DialogContent>
    </Dialog>
  );
}
