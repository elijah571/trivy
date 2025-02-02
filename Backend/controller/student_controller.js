import { Student } from '../model/student.js' 
import { Attendance } from '../model/attendace.js'

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const { studentID, name, grade, dob, email } = req.body;

    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Create a new student and save it
    const student = new Student({
      studentID,
      name,
      grade,
      dob,
      email,
    });

    await student.save();
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('attendance');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId).populate('attendance');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update student information
export const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { studentID, name, grade, dob, email } = req.body;

    // Update student details
    const student = await Student.findByIdAndUpdate(
      studentId,
      { studentID, name, grade, dob, email },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Delete student
    const student = await Student.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
