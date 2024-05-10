import {useAppDispatch} from '@/redux/utils';
import {ChangeEvent, FormEvent, useState} from 'react';

import {updateTodo} from '@/redux/todos/todoSlice';

interface useUpdateTaskForm {
  initialFormValue?: string;
  taskId: string;
  colName: string;
}

export default function useUpdateTaskForm(props: useUpdateTaskForm) {
  const dispatch = useAppDispatch();

  const [isEditing, setEditing] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<string>(
    props.initialFormValue ?? ''
  );

  function endEditing() {
    setEditing(false);
  }

  function startEditing() {
    setEditing(true);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      updateTodo({id: props.taskId, value: formValue, colName: props.colName})
    );
    setEditing(false);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setFormValue(e.target.value);
  }

  function handleSelectInputChange(value: string) {
    dispatch(updateTodo({id: props.taskId, value, colName: props.colName}));
  }

  function handleDatePickerChange(value: string | undefined) {
    dispatch(updateTodo({id: props.taskId, value, colName: props.colName}));
  }

  return {
    isEditing,
    endEditing,
    startEditing,
    formValue,
    setFormValue,
    handleSubmit,
    handleInputChange,
    handleSelectInputChange,
    handleDatePickerChange,
  };
}
