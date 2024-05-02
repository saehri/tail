import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface Todo {
  todos: Task[];
  processed: Task[];
  state: 'fetching' | 'syncing' | 'uploading' | 'idle';
  filterStatus: TaskStatusTypes[];
  filterPriority: TaskPriorityTypes[];
  filterType: TaskTypeTypes[];
}

const dummyData: Task[] = [
  {
    id: '01',
    title: 'Number 1',
    description: 'lore, ipsum',
    priority: 'low',
    status: 'todo',
    subjects: 'Machine Learning',
    dueDate: undefined,
    type: 'task',
  },
  {
    id: '02',
    title: 'Number 2',
    description: 'lore, ipsum',
    priority: 'medium',
    status: 'pending',
    subjects: 'Software Analysis and Design',
    dueDate: undefined,
    type: 'quiz',
  },
  {
    id: '03',
    title: 'Number 3',
    description: 'lore, ipsum',
    priority: 'high',
    status: 'ongoing',
    subjects: 'Artificial Intelligence',
    dueDate: undefined,
    type: 'task',
  },
  {
    id: '04',
    title: 'Number 4',
    description: 'lore, ipsum',
    priority: 'high',
    status: 'done',
    subjects: 'Artificial Intelligence',
    dueDate: undefined,
    type: 'quiz',
  },
];

const initialState: Todo = {
  todos: [...dummyData],
  processed: [...dummyData],
  state: 'idle',
  filterStatus: [],
  filterPriority: [],
  filterType: [],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todoAdded(state, action: PayloadAction<Task>) {
      state.todos.unshift(action.payload);
      state.processed.unshift(action.payload);
    },
    statusFilterToggled(state, action: PayloadAction<TaskStatusTypes>) {
      if (state.filterStatus.includes(action.payload)) {
        state.filterStatus = state.filterStatus.filter(
          (status) => status !== action.payload
        );
      } else state.filterStatus.push(action.payload);
    },
    priorityFilterToggled(state, action: PayloadAction<TaskPriorityTypes>) {
      if (state.filterPriority.includes(action.payload)) {
        state.filterPriority = state.filterPriority.filter(
          (priority) => priority !== action.payload
        );
      } else state.filterPriority.push(action.payload);
    },
    typeFilterToggled(state, action: PayloadAction<TaskTypeTypes>) {
      if (state.filterType.includes(action.payload)) {
        state.filterType = state.filterType.filter(
          (type) => type !== action.payload
        );
      } else state.filterType.push(action.payload);
    },
    filterTodos(
      state,
      action: PayloadAction<{
        status: TaskStatusTypes[];
        priority: TaskPriorityTypes[];
        type: TaskTypeTypes[];
      }>
    ) {
      const filterCategory = action.payload;
      const status: TaskStatusTypes[] = filterCategory.status.length
        ? filterCategory.status
        : ['todo', 'ongoing', 'pending', 'done'];
      const priority: TaskPriorityTypes[] = filterCategory.priority.length
        ? filterCategory.priority
        : ['low', 'medium', 'high'];
      const type: TaskTypeTypes[] = filterCategory.type.length
        ? filterCategory.type
        : ['quiz', 'task'];

      state.processed = state.todos.filter(
        (todo) =>
          status.includes(todo.status) &&
          priority.includes(todo.priority) &&
          type.includes(todo.type)
      );
    },
    clearFilterKeywords(state, _) {
      state.filterStatus = [];
      state.filterPriority = [];
      state.filterType = [];
    },
  },
});

export default todoSlice.reducer;

export const {
  todoAdded,
  filterTodos,
  statusFilterToggled,
  priorityFilterToggled,
  typeFilterToggled,
  clearFilterKeywords,
} = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectState = (state: RootState) => state.todos.state;
export const selectTodoDisplay = (state: RootState) => state.todos.processed;
export const selectFilterStatus = (state: RootState) =>
  state.todos.filterStatus;
export const selectFilterPriority = (state: RootState) =>
  state.todos.filterPriority;
export const selectFilterType = (state: RootState) => state.todos.filterType;

// PRIMITIVES TYPES
export type TaskTypeTypes = 'task' | 'quiz';
export type TaskStatusTypes = 'todo' | 'ongoing' | 'pending' | 'done';
export type TaskPriorityTypes = 'low' | 'medium' | 'high';

export interface Task {
  id?: string;
  progress?: string;
  title: string;
  type: TaskTypeTypes;
  status: TaskStatusTypes;
  priority: TaskPriorityTypes;
  description: string;
  subjects: string;
  dueDate?: string;
}
