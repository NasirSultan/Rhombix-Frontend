import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link here
import DOMPurify from 'dompurify'; // Import DOMPurify for sanitization

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '', // Add password confirmation field
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null); // For handling server errors
  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required and should be a string with a minimum length of 3 characters.';
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required and should be at least 6 characters long.';
    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match.';
    }
    return newErrors;
  };

  // Sanitizing inputs to prevent XSS
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Sanitizing form data before submitting
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        password: sanitizeInput(formData.password),
        password_confirmation: sanitizeInput(formData.password_confirmation),
      };

      const formDataToSend = new FormData();
      formDataToSend.append('name', sanitizedData.name);
      formDataToSend.append('email', sanitizedData.email);
      formDataToSend.append('password', sanitizedData.password);
      formDataToSend.append('password_confirmation', sanitizedData.password_confirmation);

      try {
        // Sending data to the server using Fetch API
        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            // No need for Content-Type header as we are using FormData
          },
          body: formDataToSend,
        });

        const result = await response.json();

        if (response.ok) {
          // On success, show success alert and navigate
          alert('Registration successful!');
          navigate('/Profile');
        } else {
          // On server validation error, display errors
          setServerError(result.errors || {});
          alert(result.message || 'Registration failed');
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen pb-5 mb-5">
      <div className="flex justify-center items-center w-[35%] sm:w-[30%] p-5 m-5 bg-gray-100">
        <div className="card p-5 shadow-lg rounded-lg bg-white w-full">
          <h1 className="text-center text-2xl font-semibold mb-4 text-indigo-600">Register</h1>

          {/* Form Start */}
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={formData.name}
                onChange={handleChange}
                pattern="^[a-zA-Z\s]+$"
                title="Name should only contain letters and spaces."
                required
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={formData.email}
                onChange={handleChange}
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                title="Please enter a valid email address."
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                title="Password must be at least 6 characters long."
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {/* Password Confirmation Field */}
            <div className="mb-3">
              <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
              {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full py-2 rounded-md mt-4 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </form>

          {/* Display Server-side Validation Errors */}
          {serverError && (
            <div className="alert alert-danger mt-3">
              <ul>
                {Object.keys(serverError).map((field) => (
                  <li key={field}>{serverError[field][0]}</li>
                ))}
              </ul>
            </div>
          )}

          <p className="mt-3 text-center text-sm">
            If you already have an account,{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-700">
              click here
            </Link>{' '}
            to log in.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
