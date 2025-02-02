import express from 'express';
import { markAttendance, getTeacherAttendance } from '../controller/attendace_contoller.js';
import { authorized,  isTeacher, isTeacherOrAdmin } from '../middleware/authenticate_user.js';

const attendanceRouter = express.Router();

// Route to mark attendance (protected, authorized users only)
// The body should include an array of studentStatuses, each with studentId, status, and optional remarks.
attendanceRouter.post('/mark', authorized, isTeacher, markAttendance);

// Route to get attendance records for a specific teacher
// The teacherId is passed as a route parameter to fetch attendance records for that teacher
attendanceRouter.get('/:teacherId', authorized, isTeacherOrAdmin,  getTeacherAttendance);

export default attendanceRouter;
