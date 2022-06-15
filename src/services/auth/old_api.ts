// import { createApi } from '@reduxjs/toolkit/query/react';
// import { fetchQuery } from '../../app/store/fetchQuery';

// import * as postLogin from './postLogin';

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchQuery({ baseUrl: '/auth' }),
//   endpoints: (builder) => ({
// login: builder.mutation<postLogin.Response, postLogin.Request>({
//   query: (body) => ({ url: '/login', method: 'POST', body }),
// }),
// }),
// });

// export const {
//   useLoginMutation,
// } = authApi;
//
// export const {
//   endpoints: { login },
// } = authApi;

export {};
