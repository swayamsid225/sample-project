import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.PROD
  ? 'https://dummyjson.com'
  : '/api';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password, expiresInMins }) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          username,
          password,
          expiresInMins: expiresInMins || 60,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
