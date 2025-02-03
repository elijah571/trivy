import "./Login.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginTeacherMutation } from "../../redux/api/teacherSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginTeacher, { isLoading, error }] = useLoginTeacherMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error("Email and Password are required");
      return;
    }

    try {
      const response = await loginTeacher({ email, password });
      if (response.error) {
        console.error("Login failed:", response.error);
        return;
      }

      dispatch(setCredentials(response.data)); // Store user in Redux
      navigate("/mark-attendance"); // Redirect to dashboard

      // Clear form after successful login
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Error message handling */}
      {error && <p className="error-message">{error?.data?.message || "Something went wrong, please try again"}</p>}

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="loading-spinner"></span> // Optional spinner for loading state
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
