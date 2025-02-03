import './StudentDashBoard.css';
import { FaTrash } from 'react-icons/fa'; // Make sure to import FaTrash
import { useGetAllStudentsQuery, useDeleteStudentMutation } from "../../redux/api/studentSlice";

export const StudentDashBoard = () => {
    const { data: students, error, isLoading } = useGetAllStudentsQuery();
    const [deleteStudent, { isLoading: isDeleting, error: deleteError }] = useDeleteStudentMutation();

    const handleDelete = async (studentId) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            try {
                await deleteStudent(studentId).unwrap();
                alert("Student deleted successfully");
            } catch (err) {
                alert("Failed to delete student: " + err.message);
            }
        }
    };

    if (isLoading) return <div>Loading students...</div>;
    if (error) return <div>Error fetching students</div>;

    return (
        <div className="student-dashboard-container">
            <h2>All Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>Database ID</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students?.map((student) => (
                        <tr key={student._id}>
                            <td>{student._id}</td>
                            <td>{student.name}</td>
                            <td>{new Date(student.dob).toLocaleDateString()}</td>
                            <td>{student.email}</td>
                            <td>
                                <button 
                                    onClick={() => handleDelete(student._id)} 
                                    disabled={isDeleting}
                                    className="delete-btn"
                                >
                                    {isDeleting ? "Deleting..." : <FaTrash />}
                                </button>
                                {deleteError && <p className="error-message">{deleteError.message}</p>} {/* Display specific error message */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
