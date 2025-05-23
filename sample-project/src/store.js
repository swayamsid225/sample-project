import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './services/auth';
import { postsApi } from './services/posts';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, postsApi.middleware),
});
