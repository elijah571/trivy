import './Login.css'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginTeacherMutation } from "../../redux/api/teacherSlice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [loginTeacher, { isLoading, error }] = useLoginTeacherMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginTeacher({ email, password }).unwrap();
      // Save the user info in Redux store and localStorage
      dispatch(setCredentials(response));  // response contains user info from the API
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {error && <div className="error">Login failed. Please try again.</div>}
    </div>
  );
};

export default Login;
