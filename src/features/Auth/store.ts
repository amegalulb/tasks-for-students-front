import { createSlice } from '@reduxjs/toolkit';

import { UserData } from '@/entities/user';
import { fetchLogout, login, refresh } from '@/features/Auth/actions';
import ls from '@/shared/lib/localStorage';

interface State {
  token: string | null,
  user: UserData | null,
}

const initialState: State = {
  token: ls.get('accessToken') || null,
  user: ls.get('user') || null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.userData;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.token = action.payload.accessToken;
    });
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.token = null;
      state.user = null;
    });
  },
});

export const { actions: authActions } = authSlice;
