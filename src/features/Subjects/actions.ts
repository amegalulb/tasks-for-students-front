import { createAsyncThunk } from '@reduxjs/toolkit';
import * as getSubjects from '@/services/subjects/getSubjects';
import * as postSubject from '@/services/subjects/postSubject';
import { AxiosError } from 'axios';

export const fetchSubjects = createAsyncThunk('fetchSubjects', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getSubjects.call();

    return data;
  } catch (e) {
    const error = e as AxiosError<getSubjects.Error>;
    return rejectWithValue(error.response?.data);
  }
});

export const fetchPostSubjects = createAsyncThunk('fetchPostSubjects', async (params: postSubject.Params, { rejectWithValue }) => {
  try {
    const { data } = await postSubject.call({ params });

    return data;
  } catch (e) {
    const error = e as AxiosError<postSubject.Error>;
    return rejectWithValue(error.response?.data);
  }
});
