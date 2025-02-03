import { useEffect, useState } from 'react';
import { useGetTeacherAttendanceQuery } from '../../redux/api/attendanceSlice';

const TeacherAttendance = ({ teacherId }) => {
  const { data: attendanceRecords, error, isLoading } = useGetTeacherAttendanceQuery(teacherId);
  const [filteredAttendance, setFilteredAttendance] = useState([]);

  useEffect(() => {
    if (attendanceRecords) {
      setFilteredAttendance(attendanceRecords);
    }
  }, [attendanceRecords]);

  return (
    <div className="attendance-table">
      <h2>Teacher Attendance Records</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error-message">{error.message}</p>}
      {attendanceRecords && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendance.map((record) => (
              // Group all the students under the same date
              record.students.map((studentRecord, index) => (
                <tr key={`${record._id}-${index}`}>
                  <td>{index === 0 ? new Date(record.date).toLocaleDateString() : ''}</td>
                  <td>{studentRecord.student.name}</td>
                  <td>{studentRecord.status}</td>
                  <td>{studentRecord.remarks}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherAttendance;
