import { useGetAllAttendanceQuery, useDeleteAttendanceMutation } from "../../redux/api/attendanceSlice";
import "./AllAttendance.css";

export const AllAttendance = () => {
  const { data: attendanceRecords, error, isLoading } = useGetAllAttendanceQuery();
  const [deleteAttendance] = useDeleteAttendanceMutation();

  if (isLoading) return <p className="loading">Loading attendance records...</p>;
  if (error) return <p className="error">Error: {error.message}</p>;

  const handleDelete = async (id) => {
    try {
      await deleteAttendance(id);
      alert("Attendance record deleted successfully.");
    } catch (error) {
      alert("Error deleting attendance.", error);
    }
  };

  return (
    <div className="attendance-container">
      <h2>All Attendance Records</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Teacher</th>
            <th>Student</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {attendanceRecords?.map((record) =>
            record.students.map((studentRecord, index) => (
              <tr key={`${record._id}-${index}`}>
                <td>{index === 0 ? new Date(record.date).toLocaleDateString() : ""}</td>
                <td>{record.teacher?.name || "No Teacher"}</td>
                <td>{studentRecord.student?.name || "No Student"}</td>
                <td>{studentRecord.status || "No Status"}</td>
                <td>{studentRecord.remarks || "No Remarks"}</td>
                <td>
                  <button
                    onClick={() => handleDelete(record._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
