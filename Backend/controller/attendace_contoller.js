
import { Attendance } from '../model/attendace.js';
import { Teacher } from '../model/teacher.js';

// Mark attendance for a teacher
export const markAttendance = async (req, res) => {
  try {
    const { teacherId, status, remarks } = req.body;

    // Check if teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Create a new attendance record
    const attendance = new Attendance({
      teacher: teacherId,
      status,
      remarks,
    });

    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully', attendance });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get attendance records for a specific teacher
export const getTeacherAttendance = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;

    // Fetch attendance records for the teacher
    const attendanceRecords = await Attendance.find({ teacher: teacherId }).populate('teacher');

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: 'No attendance records found for this teacher' });
    }

    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
