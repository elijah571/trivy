import { FaUser, FaCaretDown } from "react-icons/fa"; // Import FaCaretDown for the dropdown icon
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import "./Navbar.css";

export const Navbar = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for handling dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login page after logout
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className="navbar">
      <h1 className="logo"><Link to={'/'} className="link">Trivy</Link></h1>
      <div className="nav-buttons">
        {userInfo ? (
          <div className="user-info">
            <span className="username" onClick={toggleDropdown}>
              <FaUser /> {userInfo.username} <FaCaretDown /> {/* Add dropdown icon */}
            </span>

            {dropdownVisible && (
              <div className="dropdown-menu">
              
                <Link to="/mark-attendance" className="dropdown-item">
                  Mark Attendance
                </Link>
                <Link to="/attendance" className="dropdown-item">
                  Attendance
                </Link>
                <Link to="/all-students" className="dropdown-item">
                      All Students
                    </Link>

                {/* Conditionally render admin-specific options */}
                {userInfo.role === "admin" && (
                  <>
                     
                    <Link to="/create-student" className="dropdown-item">
                      Enroll Students
                    </Link>
                  </>
                )}

                <button onClick={handleLogout} className="dropdown-item">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            
            <Link to="/login">
              <button className="login-btn">
                <FaUser /> Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
