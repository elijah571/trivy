import { useState } from "react";
import { useCreateStudentMutation } from "../../redux/api/studentSlice";
import './CreateStudent.css';

const CreateStudent = () => {
  const [createStudent, { isLoading, error }] = useCreateStudentMutation();
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    dob: "",
    grade: "",  // Added grade field
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Unwrap to handle success or errors
      await createStudent(studentData).unwrap(); 
      alert("Student created successfully!");
      setStudentData({ name: "", email: "", dob: "", grade: "" }); // Clear form
    } catch (err) {
      alert("Failed to create student: " + err.message); // Show error message
    }
  };

  return (
    <div>
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={studentData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={studentData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="grade">Grade:</label>  {/* Added grade field */}
          <input
            type="text"
            id="grade"
            name="grade"
            value={studentData.grade}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Student"}
          </button>
        </div>
      </form>
      {error && <p className="error">Error creating student: {error.message}</p>}
    </div>
  );
};

export default CreateStudent;
