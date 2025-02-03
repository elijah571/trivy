import { apiSlice } from "../api/apiSlice";
import { TEACHERS_URL } from "../constant";

export const teacherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/login`, // Login route for teacher
        method: "POST",
        body: data,
      }),
    }),
    registerTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/create`, // Create teacher route
        method: "POST",
        body: data,
      }),
    }),
    logoutTeacher: builder.mutation({
      query: () => ({
        url: `${TEACHERS_URL}/logout`, // Logout teacher route
        method: "POST",
      }),
    }),
    getTeachers: builder.query({
      query: () => ({
        url: TEACHERS_URL, // Get all teachers route (admin access)
      }),
      providesTags: ["Teacher"],
      keepUnusedDataFor: 5,
    }),
    deleteTeacher: builder.mutation({
      query: (teacherId) => ({
        url: `${TEACHERS_URL}/${teacherId}`, // Delete specific teacher
        method: "DELETE",
      }),
    }),
    getTeacherDetails: builder.query({
      query: (id) => ({
        url: `${TEACHERS_URL}/${id}`, // Get specific teacher details
      }),
      keepUnusedDataFor: 5,
    }),
    updateTeacher: builder.mutation({
      query: (data) => ({
        url: `${TEACHERS_URL}/${data.teacherId}`, // Update specific teacher info
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const {
  useLoginTeacherMutation,
  useLogoutTeacherMutation,
  useRegisterTeacherMutation,
  useGetTeachersQuery,
  useDeleteTeacherMutation,
  useGetTeacherDetailsQuery,
  useUpdateTeacherMutation,
} = teacherApiSlice;
