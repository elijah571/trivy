import bcryptjs from 'bcryptjs'; 
import { Teacher } from "../model/teacher.js"
import { generateToken } from '../utils/generateToken.js';

// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const { username, password, name, email, role } = req.body;

    // Check if the teacher already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher  already exists' });
    }

   
    const hashPassword = await bcryptjs.hash(password, 10);  

    // Create and save new teacher
    const teacher = new Teacher({
      username,
      password: hashPassword,  
      name,
      email,
      role,
    });

    await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login
export const loginTeacher = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const teacher = await Teacher.findOne({ email });
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      // Compare the entered password with the hashed password
      const isMatch = await bcryptjs.compare(password, teacher.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate token and set it in a cookie before sending response
      await generateToken(res, teacher._id);  
  
      // Send response
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  };
  
// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update teacher information
export const updateTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const { username, password, name, email, role } = req.body;

    // Update teacher details
    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { username, password, name, email, role },
      { new: true }
    );

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher updated successfully', teacher });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete teacher
export const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    // Delete teacher
    const teacher = await Teacher.findByIdAndDelete(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
