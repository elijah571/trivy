import { apiSlice } from "../api/apiSlice";
import { STUDENTS_URL } from "../constant";

export const studentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}`, // Create student route
        method: "POST",
        body: data,
      }),
    }),
    getAllStudents: builder.query({
      query: () => ({
        url: STUDENTS_URL,
      }),
      providesTags: ["Student"],
      keepUnusedDataFor: 5,
    }),
    getStudentById: builder.query({
      query: (id) => ({
        url: `${STUDENTS_URL}/${id}`, // Get specific student by ID
      }),
      keepUnusedDataFor: 5,
    }),
    updateStudent: builder.mutation({
      query: (data) => ({
        url: `${STUDENTS_URL}/${data.studentId}`, // Update student information
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),
    deleteStudent: builder.mutation({
      query: (studentId) => ({
        url: `${STUDENTS_URL}/${studentId}`, // Delete student route
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateStudentMutation,
  useGetAllStudentsQuery,
  useGetStudentByIdQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApiSlice;
