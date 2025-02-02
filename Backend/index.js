import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDb } from './config/dataBase.js';
import cookieParser from 'cookie-parser';
import teacher_router from './route/teacher_route.js';
import studentRouter from './route/student_route.js';
import attendanceRouter from './route/atendance_route.js';

dotenv.config();

// Initialize the app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration to accept cookies
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true, 
}));

// Connect to the database
connectDb();

// Routes
app.use('/api/teachers', teacher_router);
app.use('/api/students', studentRouter);
app.use('/api/attendance', attendanceRouter);

// Export the app to work with Vercel serverless functions
export default app;
