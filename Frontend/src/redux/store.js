import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { apiSlice } from './api/apiSlice';
import { teacherApiSlice } from './api/teacherSlice';
import { studentApiSlice } from './api/studentSlice';
import { attendanceApiSlice } from './api/attendanceSlice';

// Configure the store with the reducers and api slices
export const store = configureStore({
  reducer: {
    auth: authReducer, // Reducer to manage auth state
    [apiSlice.reducerPath]: apiSlice.reducer, // API reducer (generic slice for all API calls)
    [teacherApiSlice.reducerPath]: teacherApiSlice.reducer, // Teacher API reducer
    [studentApiSlice.reducerPath]: studentApiSlice.reducer, // Student API reducer
    [attendanceApiSlice.reducerPath]: attendanceApiSlice.reducer, // Attendance API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware, // Add middleware for API slice
      teacherApiSlice.middleware, // Add middleware for Teacher API slice
      studentApiSlice.middleware, // Add middleware for Student API slice
      attendanceApiSlice.middleware // Add middleware for Attendance API slice
    ),
});

