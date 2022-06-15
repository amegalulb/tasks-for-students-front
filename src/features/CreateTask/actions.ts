import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as getGroups from '@/services/groups/getGroups';
import * as getStudents from '@/services/users/getStudents';
import * as postTask from '@/services/tasks/postTask';

export const fetchGroups = createAsyncThunk('createTask/fetchGroups', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getGroups.call();

    return data;
  } catch (e) {
    const error = e as AxiosError<getGroups.Error>;
    return rejectWithValue(error.response?.data);
  }
});

export const fetchStudents = createAsyncThunk('createTask/fetchStudents', async (params: getStudents.Params, { rejectWithValue }) => {
  try {
    const { data } = await getStudents.call({ params });

    return data;
  } catch (e) {
    const error = e as AxiosError<getStudents.Error>;
    return rejectWithValue(error.response?.data);
  }
});

export const fetchPostTask = createAsyncThunk('createTask/fetchPostTask', async (params: postTask.Params, { rejectWithValue }) => {
  try {
    const { data } = await postTask.call({ params });

    return data;
  } catch (e) {
    const error = e as AxiosError<getStudents.Error>;
    return rejectWithValue(error.response?.data);
  }
});
