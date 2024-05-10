import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface Todo {
  todos: Task[];
  processed: Task[];
  state: 'fetching' | 'syncing' | 'uploading' | 'idle';
  filterStatusKeywords: TaskStatusTypes[];
  filterPriorityKeywords: TaskPriorityTypes[];
  filterTypeKeywords: TaskTypeTypes[];
  searchKeywords: string;
}

const dummyData: Task[] = [
  {
    id: '01',
    title: 'Create a presentation about the types of learning',
    description: 'lore, ipsum',
    priority: 'low',
    status: 'todo',
    subjects: 'Machine Learning',
    dueDate: undefined,
    type: 'task',
  },
  {
    id: '02',
    title: 'Session 14 - Stakeholders and Consumer',
    description: 'lore, ipsum',
    priority: 'medium',
    status: 'pending',
    subjects: 'Software Analysis and Design',
    dueDate: undefined,
    type: 'quiz',
  },
  {
    id: '03',
    title: 'Build a small Chat Bot',
    description: 'lore, ipsum',
    priority: 'high',
    status: 'ongoing',
    subjects: 'Artificial Intelligence',
    dueDate: undefined,
    type: 'task',
  },
  {
    id: '04',
    title: 'Codes the UI for the expense tracker app',
    description: 'lore, ipsum',
    priority: 'high',
    status: 'done',
    subjects: 'Object Oriented Programming',
    dueDate: undefined,
    type: 'quiz',
  },
];

const initialState: Todo = {
  todos: [...dummyData],
  processed: [...dummyData],
  state: 'idle',
  filterStatusKeywords: [],
  filterPriorityKeywords: [],
  filterTypeKeywords: [],
  searchKeywords: '',
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Task>) {
      state.todos.unshift(action.payload);
      state.processed.unshift(action.payload);
    },
    updateTodo(state, action: PayloadAction<UpdateTodoPayload>) {
      // select an entry
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {...todo, [action.payload.colName]: action.payload.value};
        } else return todo;
      });

      state.processed = state.todos;
    },
    setKeywordsForStatusFilter(state, action: PayloadAction<TaskStatusTypes>) {
      if (state.filterStatusKeywords.includes(action.payload)) {
        state.filterStatusKeywords = state.filterStatusKeywords.filter(
          (status) => status !== action.payload
        );
      } else state.filterStatusKeywords.push(action.payload);
    },
    setKeywordsForPriorityFilter(
      state,
      action: PayloadAction<TaskPriorityTypes>
    ) {
      if (state.filterPriorityKeywords.includes(action.payload)) {
        state.filterPriorityKeywords = state.filterPriorityKeywords.filter(
          (priority) => priority !== action.payload
        );
      } else state.filterPriorityKeywords.push(action.payload);
    },
    setKeywordsForTypeFilter(state, action: PayloadAction<TaskTypeTypes>) {
      if (state.filterTypeKeywords.includes(action.payload)) {
        state.filterTypeKeywords = state.filterTypeKeywords.filter(
          (type) => type !== action.payload
        );
      } else state.filterTypeKeywords.push(action.payload);
    },
    setSearchKeyword(state, action: PayloadAction<string>) {
      state.searchKeywords = action.payload;
    },
    filterTodos(state, action: PayloadAction<FilterTodoPayloadTypes>) {
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
          type.includes(todo.type) &&
          todo.title
            .toLowerCase()
            .includes(action.payload.searchKeywords.toLowerCase())
      );
    },
    clearFilterKeywords(state, _) {
      state.filterStatusKeywords = [];
      state.filterPriorityKeywords = [];
      state.filterTypeKeywords = [];
      state.searchKeywords = '';
    },
  },
});

export default todoSlice.reducer;

export const {
  addTodo,
  updateTodo,
  filterTodos,
  setKeywordsForStatusFilter,
  setKeywordsForPriorityFilter,
  setKeywordsForTypeFilter,
  setSearchKeyword,
  clearFilterKeywords,
} = todoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodos = (state: RootState) => state.todos.todos;
export const selectState = (state: RootState) => state.todos.state;
export const selectTodoDisplay = (state: RootState) => state.todos.processed;
export const selectFilterStatus = (state: RootState) =>
  state.todos.filterStatusKeywords;
export const selectFilterPriority = (state: RootState) =>
  state.todos.filterPriorityKeywords;
export const selectFilterType = (state: RootState) =>
  state.todos.filterTypeKeywords;
export const selectSearchKeywords = (state: RootState) =>
  state.todos.searchKeywords;

// PRIMITIVES TYPES
type FilterTodoPayloadTypes = {
  status: TaskStatusTypes[];
  priority: TaskPriorityTypes[];
  type: TaskTypeTypes[];
  searchKeywords: string;
};

type UpdateTodoPayload = {
  id: string;
  value: string | undefined;
  colName: string;
};

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
