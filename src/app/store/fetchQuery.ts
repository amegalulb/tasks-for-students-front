import { FetchArgs, FetchBaseQueryArgs, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { BaseQueryFn, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

const getBaseQuery = (args?: FetchBaseQueryArgs) => fetchBaseQuery({
  ...args,
  baseUrl: `${process.env.REACT_APP_API_HOST || '/'}${args?.baseUrl || ''}`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const fetchQuery = (fetchBaseQueryArgs?: FetchBaseQueryArgs): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
  > => async (args, api, extraOptions) => {
  const baseQuery = getBaseQuery(fetchBaseQueryArgs);
  const result = await baseQuery(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   const refreshResult = await baseQuery('/refreshToken', api, extraOptions);
  //
  //   if (refreshResult.data) {
  //     api.dispatch(tokenReceived(refreshResult.data));
  //
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(loggedOut());
  //   }
  // }
  return result;
};
