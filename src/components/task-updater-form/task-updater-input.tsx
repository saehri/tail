'use client';

import useUpdateTaskForm from '@/hooks/use-update-task-form';

import {Label} from '../ui/label';
import {Input} from '../ui/input';
import FormPlaceholder from './form-placeholder';

interface TaskUpdaterInput {
  label: string;
  taskId: string;
  colName: string;
  initialFormValue: string;
}

export default function TaskUpdaterInput(props: TaskUpdaterInput) {
  const form = useUpdateTaskForm({...props});

  if (form.isEditing) {
    return (
      <form onSubmit={form.handleSubmit} className='flex flex-col gap-3'>
        <Label>{props.label}</Label>
        <Input
          value={form.formValue}
          onChange={(ev) => form.handleFormValueChange(ev.target.value, false)}
          autoFocus
          autoComplete='off'
          onBlur={form.endEditing}
          className='h-9'
        />
      </form>
    );
  }

  return (
    <FormPlaceholder
      label={props.label}
      initialFormValue={props.initialFormValue}
      startEditing={form.startEditing}
    />
  );
}
