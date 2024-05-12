'use client';

import {ClipboardIcon, FileIcon} from '@radix-ui/react-icons';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import useUpdateTaskForm from '@/hooks/use-update-task-form';
import {Label} from '../ui/label';

type SelectItem = {label: string; value: string; icon?: React.ReactNode};

interface TaskUpdaterSelect {
  colName: string;
  taskId: string;
  initialFormValue: string;
  selectItems: SelectItem[];
  label: string;
  description?: string;
}

export default function TaskUpdaterSelect(props: TaskUpdaterSelect) {
  const form = useUpdateTaskForm({...props});

  return (
    <form onSubmit={form.handleSubmit} className='flex flex-col gap-3'>
      <Label>{props.label}</Label>

      <div className='flex flex-col gap-2'>
        <Select
          onValueChange={(value) => form.handleFormValueChange(value, true)}
          defaultValue={form.formValue}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select task type' />
          </SelectTrigger>
          <SelectContent>
            {props.selectItems.map((item) => (
              <SelectItem value={item.value} key={item.value}>
                <span className='flex gap-2 items-center'>
                  {item.icon} {item.label}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className='text-[0.8rem] text-muted-foreground text-normal empty:hidden leading-4'>
          {props.description}
        </span>
      </div>
    </form>
  );
}
