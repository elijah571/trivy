import { FaUser } from "react-icons/fa";
import "./Navbar.css"; 

export const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Trivy</h1>
      <div className="nav-buttons">
        <button className="login-btn">
          <FaUser />
          Login
        </button>
       
      </div>
    </nav>
  );
};
