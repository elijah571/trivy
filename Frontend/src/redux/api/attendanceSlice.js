import { apiSlice } from "./apiSlice";
import { ATTENDANCE_URL } from "../constant";

export const attendanceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    markAttendance: builder.mutation({
      query: (data) => ({
        url: `${ATTENDANCE_URL}/mark`, // Mark attendance route
        method: "POST",
        body: data, // Data should include an array of student statuses
      }),
    }),
    getTeacherAttendance: builder.query({
      query: (teacherId) => ({
        url: `${ATTENDANCE_URL}/${teacherId}`, // Get attendance for a specific teacher
      }),
      providesTags: ["Attendance"],
      keepUnusedDataFor: 5,
    }),
  }),  
});

export const {
  useMarkAttendanceMutation,
  useGetTeacherAttendanceQuery,
} = attendanceApiSlice;
