import { StoreStatus } from '@/shared/types/storeStatus';
import { Task } from '@/entities/task';
import { createSlice } from '@reduxjs/toolkit';
import { fetchEditStatus, fetchTask, fetchUploadResponse } from './actions';

interface State {
  status: StoreStatus;
  item?: Task;
}

const initialState: State = {
  status: 'Initial',
};

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTask.fulfilled, (state, action) => {
      state.status = 'Success';
      state.item = action.payload;
    });
    builder.addCase(fetchTask.pending, (state) => {
      state.status = 'Loading';
    });
    builder.addCase(fetchTask.rejected, (state) => {
      state.status = 'Error';
    });
    builder.addCase(fetchEditStatus.fulfilled, (state, action) => {
      state.item = action.payload;
    });
    builder.addCase(fetchUploadResponse.fulfilled, (state, action) => {
      if (state.item) {
        state.item.response = action.payload;
      }
    });
  },
});

export const { actions: authActions } = taskSlice;
