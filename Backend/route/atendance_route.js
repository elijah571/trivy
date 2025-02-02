// routes/attendance_router.js
import express from 'express';
import { markAttendance, getTeacherAttendance } from '../controller/attendace_contoller.js';
import { authorized, isTeacher } from '../middleware/authenticate_user.js';

const attendanceRouter = express.Router();

// Route to mark attendance (protected, authorized users only)
attendanceRouter.post('/mark', authorized, isTeacher, markAttendance);

// Route to get attendance records for a specific teacher
attendanceRouter.get('/:teacherId', authorized, isTeacher, getTeacherAttendance);

export default attendanceRouter;
