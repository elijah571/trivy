import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  grade: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  attendance: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
}, { timestamps: true });

export const Student = mongoose.model('Student', studentSchema);
