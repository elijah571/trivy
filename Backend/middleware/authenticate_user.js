import jwt from 'jsonwebtoken';
import { Teacher } from '../model/teacher.js';

export const authorized = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};


// Check if the user is a teacher
export const isTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findById(req.user.id);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if the role is 'teacher'
    if (teacher.role !== 'teacher') {
      return res.status(403).json({ message: 'Access denied, not a teacher' });
    }

   
    req.teacher = teacher;

    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
