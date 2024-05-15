import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {generateUniqueId} from '@/lib/utils';

export interface Todo {
  originalTodos: Task[];
  activeTodos: Task[];
  inactiveTodos: Task[];
  state: 'fetching' | 'syncing' | 'uploading' | 'idle';
  filterStatusKeywords: TaskStatusTypes[];
  filterPriorityKeywords: TaskPriorityTypes[];
  filterTypeKeywords: TaskTypeTypes[];
  searchKeywords: string;
}

const dummy: Task = {
  id: '1',
  description: 'Our main goals',
  priority: 'high',
  status: 'ongoing',
  subjects: 'Software Analysis and Design',
  subtasks: [],
  subtasks_progress: 0,
  title: 'Build a Todo App',
  type: 'task',
  dueDate: undefined,
};

const initialState: Todo = {
  originalTodos: [dummy],
  activeTodos: [dummy],
  inactiveTodos: [],
  state: 'idle',
  filterStatusKeywords: [],
  filterPriorityKeywords: [],
  filterTypeKeywords: [],
  searchKeywords: '',
};

export const todoSlice = createSlice({
  name: 'originalTodos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Task>) {
      state.originalTodos.unshift(action.payload);
      state.activeTodos.unshift(action.payload);
    },
    updateTodo(state, action: PayloadAction<UpdateTodoPayload>) {
      // select an entry
      state.originalTodos = state.originalTodos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {...todo, [action.payload.colName]: action.payload.value};
        } else return todo;
      });

      state.activeTodos = state.originalTodos;
    },
    deleteTodo(state, action: PayloadAction<string>) {
      state.originalTodos = state.originalTodos.filter(
        (todo) => todo.id !== action.payload
      );
      state.activeTodos = state.originalTodos;
    },
    addSubtask(state, action: PayloadAction<{taskId: string}>) {
      const tempId = generateUniqueId();
      const currentTodo = state.originalTodos.filter(
        (todo) => todo.id === action.payload.taskId
      )[0];

      currentTodo.subtasks.push({
        id: tempId,
        title: 'Lorem ipsum dolor sit amet',
        status: 'todo',
      });

      state.activeTodos = state.originalTodos;
    },
    deleteSubtask(
      state,
      action: PayloadAction<{taskId: string; subtaskId: string}>
    ) {
      const currentTodo = state.originalTodos.filter(
        (todo) => todo.id === action.payload.taskId
      )[0];
      const newSubtaskState = currentTodo.subtasks.filter(
        (subtask) => subtask.id !== action.payload.subtaskId
      );

      currentTodo.subtasks = newSubtaskState;

      state.originalTodos = state.originalTodos.filter((todo) => {
        if (todo.id === action.payload.taskId) return currentTodo;
        else return todo;
      });

      state.activeTodos = state.originalTodos;
    },
    updateSubtask(state, action: PayloadAction<UpdateSubtaskPayload>) {
      const {taskId, subtaskId, colName, value} = action.payload;
      state.originalTodos = state.originalTodos.map((todo) => {
        if (todo.id === taskId) {
          const updatedSubtasks = todo.subtasks.map((subtask) => {
            if (subtask.id === subtaskId) return {...subtask, [colName]: value};
            else return subtask;
          });

          return {...todo, subtasks: updatedSubtasks};
        } else return todo;
      });

      state.activeTodos = state.originalTodos;
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

      state.activeTodos = state.originalTodos.filter(
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
  deleteTodo,
  addSubtask,
  deleteSubtask,
  updateSubtask,
  filterTodos,
  setKeywordsForStatusFilter,
  setKeywordsForPriorityFilter,
  setKeywordsForTypeFilter,
  setSearchKeyword,
  clearFilterKeywords,
} = todoSlice.actions;

// -------------------- SELECTOR

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodos = (state: RootState) => state.todos.originalTodos;
export const selectState = (state: RootState) => state.todos.state;
export const selectTodoDisplay = (state: RootState) => state.todos.activeTodos;
export const selectFilterStatus = (state: RootState) =>
  state.todos.filterStatusKeywords;
export const selectFilterPriority = (state: RootState) =>
  state.todos.filterPriorityKeywords;
export const selectFilterType = (state: RootState) =>
  state.todos.filterTypeKeywords;
export const selectSearchKeywords = (state: RootState) =>
  state.todos.searchKeywords;

// -------------------- PRIMITIVES TYPES
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

type UpdateSubtaskPayload = {
  taskId: string;
  subtaskId: string;
  colName: string;
  value: string;
};

export type TaskTypeTypes = 'task' | 'quiz';
export type TaskStatusTypes = 'todo' | 'ongoing' | 'pending' | 'done';
export type TaskPriorityTypes = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  type: TaskTypeTypes;
  status: TaskStatusTypes;
  priority: TaskPriorityTypes;
  description: string;
  subjects: string;
  dueDate?: string;
  subtasks: Subtask[];
  subtasks_progress: number;
}

export interface Subtask {
  id: string;
  title: string;
  status: 'todo' | 'done';
}
