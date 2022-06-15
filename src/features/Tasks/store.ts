import { createSlice } from '@reduxjs/toolkit';
import { Task } from '@/entities/task';
import { StoreStatus } from '@/shared/types/storeStatus';
import { fetchTasks } from '@/features/Tasks/actions';
import { Subject } from '@/entities/subject';
import { Group } from '@/entities/group';
import { User } from '@/entities/user';

export interface State {
  status: StoreStatus;
  list: Task[];
  subjects: Subject[];
  groups: Group[];
  students: User[];
  total?: number;
}

const initialState: State = {
  status: 'Initial',
  list: [],
  subjects: [],
  groups: [],
  students: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = 'Success';
      state.list = action.payload.list;
      state.total = action.payload.total;

      if ('subjects' in action.payload) state.subjects = action.payload.subjects;
      if ('groups' in action.payload) state.groups = action.payload.groups;
      if ('students' in action.payload) state.students = action.payload.students;
    });
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.status = 'Error';
    });
  },
});

export const { actions: authActions } = tasksSlice;
