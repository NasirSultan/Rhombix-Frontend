import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigate hook
import sanitize from "sanitize-html"; // You may need to install sanitize-html

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(null); // To display form validation errors
  const [validationErrors, setValidationErrors] = useState({}); // Validation errors for inputs
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const navigate = useNavigate(); // Hook for navigation

  // Sanitize input to prevent XSS
  const sanitizeInput = (input) => sanitize(input);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: sanitizeInput(value), // Sanitize the value on change
    });
  };

  const validateForm = () => {
    const errors = {};

    // Validate required fields
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.password_confirmation) errors.password_confirmation = "Confirm password is required.";

    // Validate password confirmation
    if (formData.password !== formData.password_confirmation) {
      errors.password_confirmation = "Passwords do not match.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0; // If there are no errors, the form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null); // Reset form error
    setIsSubmitting(true);

    // Validate the form before submitting
    const isValid = validateForm();
    if (!isValid) {
      setIsSubmitting(false);
      return; // Do not proceed if the form is not valid
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.errors); // Backend errors
      } else {
        setError(null);
        onRegister(result.token);
        alert("Registration successful!");
        navigate("/login"); // Navigate to login page after successful registration
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false); // End the submitting state
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className={`form-control ${validationErrors.name ? "is-invalid" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {validationErrors.name && (
                    <div className="invalid-feedback">{validationErrors.name}</div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={`form-control ${validationErrors.email ? "is-invalid" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {validationErrors.email && (
                    <div className="invalid-feedback">{validationErrors.email}</div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className={`form-control ${validationErrors.password ? "is-invalid" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {validationErrors.password && (
                    <div className="invalid-feedback">{validationErrors.password}</div>
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    className={`form-control ${validationErrors.password_confirmation ? "is-invalid" : ""}`}
                    value={formData.password_confirmation}
                    onChange={handleChange}
                  />
                  {validationErrors.password_confirmation && (
                    <div className="invalid-feedback">{validationErrors.password_confirmation}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Register"}
                </button>
              </form>

              {formError && (
                <div className="alert alert-danger mt-3" role="alert">
                  {formError}
                </div>
              )}

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
