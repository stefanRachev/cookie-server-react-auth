import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./Register.css";

const url = "http://localhost:4000";

function Register({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!validateEmail(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const response = await fetch(url + "/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Важно за изпращане на кукитата
      });

      if (response.ok) {
        onLogin();
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword}</p>
          )}
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

Register.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Register;
