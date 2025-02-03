import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";
import { MarkAttendance } from "./pages/MarkAttendance/MarkAttendance";
import { StudentDashBoard } from "./pages/students/StudentDashBoard";
import CreateStudent from "./pages/students/CreateStudent";
import { AllAttendance } from "./pages/MarkAttendance/AllAttendance";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/attendance" element={<AllAttendance/>}/>
        <Route path="/all-students" element={<StudentDashBoard />} />
        <Route path="/create-student" element={<CreateStudent/>}/>
        
      </Routes>
    </>
  );
};

export default App;
