'use client';

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './actions/authSlice';
import groupReducer from './actions/groupSlice';
import friendReducer from './actions/friendSlice';

export const store = configureStore({
  reducer: {
    auth : authReducer,
    group:groupReducer,
    friend:friendReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
