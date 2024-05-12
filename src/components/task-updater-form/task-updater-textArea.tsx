'use client';

import {useRef, useState} from 'react';
import useUpdateTaskForm from '@/hooks/use-update-task-form';

import {Label} from '../ui/label';
import {Textarea} from '../ui/textarea';
import {Pencil1Icon} from '@radix-ui/react-icons';

interface TaskUpdaterTextArea {
  label: string;
  initialFormValue: string;
  colName: string;
  taskId: string;
}

export default function TaskUpdaterTextArea(props: TaskUpdaterTextArea) {
  const form = useUpdateTaskForm({...props});

  const [formHeight, setFormHeight] = useState<number>(0);
  const placeholderRef = useRef<HTMLButtonElement | null>(null);

  function startEditing() {
    setFormHeight(placeholderRef.current?.getBoundingClientRect().height ?? 0);
    form.startEditing();
  }

  if (!form.isEditing) {
    return (
      <button
        className='flex flex-col gap-3 text-left w-full'
        onClick={startEditing}
        ref={placeholderRef}
      >
        <span className='inline-block text-sm font-semibold text-foreground'>
          {props.label}
        </span>

        {props.initialFormValue.length ? (
          <pre className='font-[inherit] text-sm text-foreground p-2 rounded-md border border-border border-dashed w-full'>
            {props.initialFormValue}
          </pre>
        ) : (
          <span className='p-4 rounded-md text-[0.8rem] text-muted-foreground border border-border border-dashed w-full grid place-items-center'>
            <Pencil1Icon />
            Write something.
          </span>
        )}
      </button>
    );
  }

  return (
    <form onSubmit={form.handleSubmit} className='flex flex-col gap-3'>
      <Label>{props.label}</Label>
      <Textarea
        defaultValue={props.initialFormValue}
        onChange={(ev) =>
          form.handleFormValueChange(ev.target.value.trimStart(), true)
        }
        onBlur={form.endEditing}
        autoFocus
        className='font-normal'
        style={{minHeight: formHeight}}
      />
    </form>
  );
}
