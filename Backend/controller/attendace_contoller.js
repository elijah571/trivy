import { Attendance } from '../model/attendace.js';
import { Teacher } from '../model/teacher.js';
import { Student } from '../model/student.js';  // Make sure to import the Student model


// Updated to use the logged-in teacher's ID
export const markAttendance = async (req, res) => {
  try {
    const teacherId = req.user.id;  // Get teacher ID from the token (authenticated user)

    // Proceed to check if teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if all students exist
    const studentIds = req.body.studentStatuses.map(status => status.studentId);
    const students = await Student.find({ '_id': { $in: studentIds } });

    if (students.length !== req.body.studentStatuses.length) {
      return res.status(404).json({ message: 'Some students not found' });
    }

    // Create attendance records for each student
    const studentsAttendance = req.body.studentStatuses.map(status => ({
      student: status.studentId,
      status: status.status,
      remarks: status.remarks || '',
    }));

    // Create a new attendance record
    const attendance = new Attendance({
      teacher: teacherId,
      students: studentsAttendance,
      date: req.body.date || new Date(),
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

    // Fetch attendance records for the teacher, populate both teacher and students
    const attendanceRecords = await Attendance.find({ teacher: teacherId })
      .populate('teacher')
      .populate('students.student');  // Populate student info

    if (!attendanceRecords.length) {
      return res.status(404).json({ message: 'No attendance records found for this teacher' });
    }

    res.status(200).json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
