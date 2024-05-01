import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface Todo {
  todos: Task[];
  state: 'fetching' | 'syncing' | 'uploading' | 'idle';
}

const initialState: Todo = {
  todos: [],
  state: 'idle',
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<Task>) {
      state.todos.push({...action.payload});
    },
  },
});

export default todoSlice.reducer;

export const {todoAdded} = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectState = (state: RootState) => state.todos.state;

// PRIMITIVES TYPES
export type TaskTypeTypes = 'task' | 'quiz';
export type TaskStatusTypes = 'todo' | 'ongoing' | 'pending' | 'done';
export type TaskPriorityTypes = 'low' | 'medium' | 'high';

export interface Task {
  id?: string;
  title: string;
  type: TaskTypeTypes;
  status: TaskStatusTypes;
  dueDate: string;
  priority: TaskPriorityTypes;
  progress: string;
  subjects: string;
}
