// src/services/posts.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ page }) => `posts?limit=10&skip=${(page - 1) * 10}`,
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
