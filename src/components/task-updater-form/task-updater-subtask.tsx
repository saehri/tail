'use client';

import {Dispatch, KeyboardEvent, SetStateAction, useState} from 'react';
import {
  Subtask,
  addSubtask,
  deleteSubtask,
  updateSubtask,
} from '@/redux/todos/todo-slice';
import {useAppDispatch} from '@/redux/utils';
import {cn} from '@/lib/utils';

import {
  CheckCircledIcon,
  CircleIcon,
  Cross1Icon,
  PlusIcon,
} from '@radix-ui/react-icons';

interface TaskUpdaterSubtask {
  taskId: string;
  subtasks: Subtask[];
  subtaskProgress: number;
}

export default function TaskUpdaterSubtask(props: TaskUpdaterSubtask) {
  const dispatch = useAppDispatch();

  function handleDeleteSubtask(subtaskId: string) {
    dispatch(deleteSubtask({taskId: props.taskId, subtaskId}));
  }

  function handleUpdateSubtask(
    subtaskId: string,
    colName: string,
    value: string
  ) {
    dispatch(updateSubtask({taskId: props.taskId, subtaskId, colName, value}));
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <p className='text-foreground text-sm'>Subtasks</p>

          <ProgressBadge
            subtaskProgress={props.subtaskProgress}
            subtasks={props.subtasks}
          />
        </div>

        <button
          title='Add subtask'
          onClick={() => dispatch(addSubtask({taskId: props.taskId}))}
          className='block w-4 h-4 rounded-sm bg-background hover:bg-secondary/70 text-foreground'
        >
          <PlusIcon />
        </button>
      </div>

      <Subtasks
        subtasks={props.subtasks}
        handleDeleteSubtask={handleDeleteSubtask}
        handleUpdateSubtask={handleUpdateSubtask}
      />
    </div>
  );
}

interface Subtasks {
  subtasks: Subtask[];
  handleDeleteSubtask: (subtaskId: string) => void;
  handleUpdateSubtask: (
    subtaskId: string,
    colName: string,
    value: string
  ) => void;
}

function Subtasks(props: Subtasks) {
  if (props.subtasks.length == 0)
    return (
      <span className='p-2 rounded-md text-muted-foreground text-center text-[0.8rem] w-full block'>
        There are no subtask
      </span>
    );

  return (
    <ul className='empty:hidden flex flex-col gap-1'>
      {props.subtasks.map((subtask) => (
        <SubtaskItem
          key={subtask.id}
          id={subtask.id}
          status={subtask.status}
          title={subtask.title}
          handleDeleteSubtask={props.handleDeleteSubtask}
          handleUpdateSubtask={props.handleUpdateSubtask}
        />
      ))}
    </ul>
  );
}

interface SubtaskItem extends Subtask {
  handleDeleteSubtask: (subtaskId: string) => void;
  handleUpdateSubtask: (
    subtaskId: string,
    colName: string,
    value: string
  ) => void;
}

function SubtaskItem(props: SubtaskItem) {
  const [editing, setEditing] = useState<boolean>(false);

  return (
    <li className='grid grid-cols-[16px,_1fr] items-center h-9 p-2 rounded-md text-sm gap-2 bg-secondary/90 hover:bg-secondary/50 text-foreground relative group'>
      <button aria-label='Toggle subtask status'>
        {props.status === 'todo' ? (
          <CircleIcon className='text-primary' />
        ) : (
          <CheckCircledIcon />
        )}
      </button>
      <button
        aria-label='Delete subtask'
        className='absolute top-1/2 -translate-y-1/2 right-2 text-foreground opacity-0 group-hover:opacity-100 transition-opacity'
        onClick={() => props.handleDeleteSubtask(props.id)}
      >
        <Cross1Icon />
      </button>

      {editing ? (
        <InputFormUpdater
          setEditing={setEditing}
          id={props.id}
          status={props.status}
          title={props.title}
          handleUpdateSubtask={props.handleUpdateSubtask}
        />
      ) : (
        <button
          onClick={() => setEditing(true)}
          className='inline-block text-left'
        >
          {props.title}
        </button>
      )}
    </li>
  );
}

interface InputFormUpdater extends Subtask {
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleUpdateSubtask: (
    subtaskId: string,
    colName: string,
    value: string
  ) => void;
}

function InputFormUpdater(props: InputFormUpdater) {
  const [inputValue, setInputValue] = useState(props.title);

  function handleKeydown(ev: KeyboardEvent<HTMLInputElement>) {
    if (ev.key === 'Enter') {
      props.handleUpdateSubtask(props.id, 'title', inputValue);
      props.setEditing(false);
    }
  }

  return (
    <input
      value={inputValue}
      onBlur={() => props.setEditing(false)}
      onKeyDown={handleKeydown}
      onChange={(e) => setInputValue(e.target.value)}
      autoFocus
      className='w-[calc(100%-24px)] h-full block bg-none border-none focus:outline-1 outline-none outline-primary bg-transparent'
    />
  );
}

interface ProgressBadge {
  subtasks: Subtask[];
  subtaskProgress: number;
}

function ProgressBadge(props: ProgressBadge) {
  if (props.subtasks.length === 0) return null;

  const doneSubtasks = props.subtaskProgress;
  const totalOfSubtasks = props.subtasks.length;
  const isAllDone = doneSubtasks === totalOfSubtasks;

  return (
    <span
      className={cn(
        'text-muted-foreground text-xs px-2 rounded-full bg-secondary/90 hover:bg-secondary/70',
        isAllDone && 'bg-green-400 hover:bg-green-300 text-white'
      )}
    >
      {doneSubtasks}/{totalOfSubtasks}
    </span>
  );
}
