import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import * as postLogin from '@/services/auth/postLogin';
import * as postRefresh from '@/services/auth/postRefresh';
import * as postLogout from '@/services/auth/postLogout';
import ls from '@/shared/lib/localStorage';

export const login = createAsyncThunk('auth/login', async (params: postLogin.Params, { rejectWithValue }) => {
  try {
    const { data } = await postLogin.call({ params });

    ls.setItems({
      accessToken: data.token,
      user: data.userData,
    });

    return data;
  } catch (e) {
    const error = e as AxiosError<postLogin.Error>;
    return rejectWithValue(error.response?.data);
  }
});

export const refresh = createAsyncThunk('auth/refresh', async (_, { rejectWithValue }) => {
  try {
    const { data } = await postRefresh.call();

    ls.set('accessToken', data.accessToken);

    return data;
  } catch (e) {
    const error = e as AxiosError<postRefresh.Error>;

    return rejectWithValue(error.response?.data);
  }
});

export const fetchLogout = createAsyncThunk('auth/fetchLogout', async (_, { rejectWithValue, fulfillWithValue }) => {
  try {
    await postLogout.call();

    ls.remove('accessToken');
    ls.remove('user');

    return fulfillWithValue({});
  } catch (e) {
    const error = e as AxiosError<postRefresh.Error>;

    return rejectWithValue(error.response?.data);
  }
});
