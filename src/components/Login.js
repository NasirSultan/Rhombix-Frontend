// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom'; // useNavigate is preferred over useHistory in react-router v6+
import DOMPurify from 'dompurify'; // For sanitization

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate(); // For navigation after successful login

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  // Sanitize inputs to prevent XSS attacks
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
      const sanitizedData = {
        email: sanitizeInput(formData.email),
        password: sanitizeInput(formData.password),
      };

      try {
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sanitizedData),
        });

        const result = await response.json();

        console.log(result); // Debugging: log the response to check if the token is in the result

        if (response.ok) {
          const token = result.token;
          if (token) {
            localStorage.setItem('access_token', token); // Store the token in localStorage
            alert('Login successful!');
            navigate('/Profile'); // Redirect to the dashboard or home page
          } else {
            alert('No token received.');
          }
        } else {
          setServerError(result.errors || { message: 'Login failed' });
          alert(result.message || 'Login failed');
        }
      } catch (error) {
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-5 m-5 h-screen bg-gray-100">
      <div className="card p-5 shadow-lg rounded-lg bg-white w-[70%] max-w-md">
        <h1 className="text-center text-3xl font-semibold mb-5 text-indigo-600">Login</h1>

        {/* Form Start */}
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full py-2 rounded-md mt-4 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
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

        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-700">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
