import jwt from 'jsonwebtoken';

export const generateToken = async (res, id) => {
  try {
    // Generate the JWT token
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    //set cookies
    res.cookie('token', token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 24 * 60 * 60 * 1000,  
    });

    
    res.status(200).json({ message: 'Login successful, token set in cookie' });
  } catch (error) {
    res.status(500).json({ message: 'Error generating token', error: error.message });
  }
};
