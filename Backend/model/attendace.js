// models/attendance.js
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present', 'Absent', 'Late'], required: true },
  remarks: { type: String, default: '' },  
}, { timestamps: true });

export const Attendance = mongoose.model('Attendance', attendanceSchema);
