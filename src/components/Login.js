import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate hook

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null); // To display form validation errors
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return "Both email and password are required.";
    }
    // Optionally add more validation rules like checking the email format
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    try {
      console.log("Form Data: ", formData); // Log form data for debugging
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Corrected the issue here
      });

      console.log("Response Status: ", response.status); // Log response status

      if (!response.ok) {
        const result = await response.json();
        console.log("Error Response: ", result); // Log error response
        setError(result.errors || "Incorrect email or password.");
      } else {
        const result = await response.json();
        console.log("Successful Response: ", result); // Log successful response
        setError(null);
        onLogin(result.token);

        // Store user data in localStorage
        const userData = {
          name: result.user.name,
          email: result.user.email,
          profile_picture: result.user.profile_picture, // Include profile picture if available
        };

        localStorage.setItem("user", JSON.stringify(userData)); // Store user data
        localStorage.setItem("token", result.token); // Store token

        console.log("Stored User in LocalStorage: ", JSON.stringify(userData)); // Debug log

        alert("Login successful!");
        navigate("/profile"); // Redirect to profile page
      }
    } catch (err) {
      console.error("Request Error: ", err); // Log any errors during the fetch request
      if (err.name === "SyntaxError") {
        setError("Invalid response format (JSON error).");
      } else if (err.message.includes("NetworkError")) {
        setError("Network error. Please try again later.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container mt-5" >
      <div className="row justify-content-center" >
        <div className="col-12 col-md-10 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Login
                </button>
              </form>

              {formError && (
                <div className="alert alert-danger mt-3" role="alert">
                  {formError}
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {typeof error === "object" ? JSON.stringify(error) : error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
