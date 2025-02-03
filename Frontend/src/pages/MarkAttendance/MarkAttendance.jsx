import { useState } from 'react';
import { useGetAllStudentsQuery } from '../../redux/api/studentSlice'; 
import { useMarkAttendanceMutation } from '../../redux/api/attendanceSlice'; 
import "./MarkAttendance.css";

export const MarkAttendance = () => {
  const { data: students = [], isLoading, isError } = useGetAllStudentsQuery();  // Fetch all students
  const [attendanceStatus, setAttendanceStatus] = useState([]);
  const [marks, setMarks] = useState({});
  const [markAttendance] = useMarkAttendanceMutation();  
  const [date, setDate] = useState(new Date());

  // Handle status change for a student
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceStatus((prevStatus) => {
      const existingStatus = prevStatus.find((item) => item.studentId === studentId);
      if (existingStatus) {
        existingStatus.status = status;
      } else {
        prevStatus.push({ studentId, status });
      }
      return [...prevStatus];
    });
  };

  // Handle remark change
  const handleRemarkChange = (studentId, remark) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: remark,
    }));
  };

  // Handle form submission (marking attendance)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      studentStatuses: attendanceStatus.map((status) => ({
        ...status,
        remark: marks[status.studentId] || '',  // Include remark if available
      })),
      date,
    };

    try {
      // Send the attendance data to the backend
      await markAttendance(data);
      alert('Attendance marked successfully!');
    } catch (err) {
      console.error('Error marking attendance:', err);
    }
  };

  // Loading and error states
  if (isLoading) {
    return <p>Loading students...</p>;
  }

  if (isError) {
    return <p>Error fetching students.</p>;
  }

  return (
    <div>
      <h2>Mark Attendance for Students</h2>
      <form onSubmit={handleSubmit}>
        {students.map((student) => (
          <div key={student._id}>
            <label>{student.name}</label>
            <select
              onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
              defaultValue=""
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Late">Late</option>
            </select>

            <input
              type="text"
              placeholder="Add remark"
              value={marks[student._id] || ''}
              onChange={(e) => handleRemarkChange(student._id, e.target.value)}
            />
          </div>
        ))}
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
};
