import { createAsyncThunk } from '@reduxjs/toolkit';
import * as getProfile from '@/services/users/getProfile';
import { AxiosError } from 'axios';

export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (_, { rejectWithValue }) => {
  try {
    const { data } = await getProfile.call();

    return data;
  } catch (e) {
    const error = e as AxiosError<getProfile.Error>;
    return rejectWithValue(error.response?.data.error);
  }
});
