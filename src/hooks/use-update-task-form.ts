import {useAppDispatch} from '@/redux/utils';
import {ChangeEvent, FormEvent, useState} from 'react';

import {updateTodo} from '@/redux/todos/todo-slice';

interface useUpdateTaskForm {
  initialFormValue?: string;
  taskId: string;
  colName: string;
}

export default function useUpdateTaskForm(props: useUpdateTaskForm) {
  const dispatch = useAppDispatch();

  const [isEditing, setEditing] = useState<boolean>(false);
  const [formValue, setFormValue] = useState<string | undefined>(
    props.initialFormValue
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

  // @handleFormValueChange
  function handleFormValueChange(
    value: string | undefined,
    isSubmit: boolean = false
  ) {
    if (isSubmit) {
      dispatch(updateTodo({id: props.taskId, value, colName: props.colName}));
      return;
    }

    setFormValue(value);
  }

  return {
    isEditing,
    endEditing,
    startEditing,
    formValue,
    setFormValue,
    handleSubmit,
    handleFormValueChange,
  };
}
