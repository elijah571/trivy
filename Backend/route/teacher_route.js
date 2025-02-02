import express from 'express';
import { createTeacher, loginTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } from "../controller/teacher_controller.js"
import { authorized, isTeacher } from '../middleware/authenticate_user.js';

const teacher_router = express.Router();

// Route to create a new teacher
teacher_router.post('/create', createTeacher);

// Route to login teacher (this will generate and send the token)
teacher_router.post('/login', loginTeacher);

// Route to get all teachers (protected route, authorized users only)
teacher_router.get('/', authorized, isTeacher, getAllTeachers);

// Route to get a specific teacher by ID (protected route)
teacher_router.get('/:id', authorized, isTeacher, getTeacherById);

// Route to update teacher information (protected route)
teacher_router.put('/:id', authorized, isTeacher, updateTeacher);

// Route to delete a teacher (protected route)
teacher_router.delete('/:id', authorized, isTeacher, deleteTeacher);

export default teacher_router;
