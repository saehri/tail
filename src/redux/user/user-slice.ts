import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

export interface UserStore {
  currentUser: User | undefined;
}

const dummyUser: User = {
  id: '1234',
  name: 'Saepul Bahri',
  username: 'saepulbahree',
  avatar_image: 'https://github.com/shadcn.png',
  avatar_placeholder: 'CN',
  email: 'shadcn@gmail.com',
  class_subjects: [
    'Machine Learning',
    'Artificial Intelligence',
    'Software Analysis and Design',
    'Object Oriented Programming',
  ],
  current_semester: 4,
};

const initialState: UserStore = {
  currentUser: dummyUser,
};

// ----------------------- SLICE
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;

// ----------------------- SELECTOR
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectClassSubjects = (state: RootState) =>
  state.user.currentUser?.class_subjects;

// ----------------------- TYPES
export type User = {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar_image: string;
  avatar_placeholder: string;
  class_subjects: string[];
  current_semester: number;
};
