import { createAsyncThunk } from '@reduxjs/toolkit';
import * as getGroups from '@/services/groups/getGroups';
import * as postGroups from '@/services/groups/postGroups';
import { AxiosError } from 'axios';

export const fetchGroups = createAsyncThunk('fetchGroups', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getGroups.call();

    return data;
  } catch (e) {
    const error = e as AxiosError<getGroups.Error>;
    return rejectWithValue(error.response?.data);
  }
});

export const fetchPostGroups = createAsyncThunk('fetchPostGroups', async (params: postGroups.Params, { rejectWithValue }) => {
  try {
    const { data } = await postGroups.call({ params });

    return data;
  } catch (e) {
    const error = e as AxiosError<postGroups.Error>;
    return rejectWithValue(error.response?.data);
  }
});
