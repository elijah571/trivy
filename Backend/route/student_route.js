import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controller/student_controller.js';  
import { authorized, isTeacher } from '../middleware/authenticate_user.js';

const studentRouter = express.Router();

// Route to create a new student
studentRouter.post('/create',authorized, isTeacher, createStudent);

// Route to get all students
studentRouter.get('/',authorized, isTeacher, getAllStudents);

// Route to get a specific student by ID
studentRouter.get('/:id',authorized, isTeacher, getStudentById);

// Route to update student information
studentRouter.put('/:id', authorized, isTeacher, updateStudent);

// Route to delete a student
studentRouter.delete('/:id', authorized, isTeacher, deleteStudent);

export default studentRouter;
