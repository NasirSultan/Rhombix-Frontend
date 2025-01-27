import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; 
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Retrieve user info from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      } else {
        navigate('/LoginForm');
      }
    } else {
      navigate('/LoginForm');
    }
  }, [token, navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user data on logout
    navigate('/login');
  };

  const iconStyles = {
    fontSize: '16px',
    marginRight: '8px',
    transition: 'color 0.3s ease',
  };

  const linkStyles = {
    color: '#adb5bd',
    fontWeight: '500',
    textDecoration: 'none',
    padding: '10px 15px',
  };

  const hoverStyles = {
    color: '#007bff',
  };

  return (
    <div className="d-flex flex-wrap">
      {/* Sidebar */}
      <div
        className="d-none d-lg-flex flex-column justify-content-between"
        style={{
          width: '250px',
          height: '100vh',
          backgroundColor: '#343a40',
          color: '#fff',
          position: 'fixed',
          top: 0,
          left: 0,
          padding: '20px',
        }}
      >
        {/* User Info */}
        <div>
          <div className="mb-4 text-center">
            {/* <img
              src={user?.profile_picture || "https://via.placeholder.com/150"} // Use user.profile_picture directly
              alt="Profile"
              className="rounded-circle"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
              }}
            /> */}
            <p className="mt-3 mb-1" style={{ fontWeight: 'bold' }}>
              {user?.name || 'User'}
            </p>
            <p style={{ fontSize: '14px', color: '#adb5bd' }}>
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>

        {/* Sidebar Buttons */}
        <div className="text-center" style={{ marginTop: 'auto' }}>
          <Link
            to="/Profile"
            className="btn btn-light btn-sm mb-2"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            <i className="fas fa-user" style={iconStyles}></i> Profile
          </Link>
          <button
            onClick={logout}
            className="btn btn-light btn-sm mb-3"
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#fff',
              textAlign: 'center',
              fontWeight: '500',
            }}
          >
            <i className="fas fa-sign-out-alt" style={iconStyles}></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '250px', width: 'calc(100% - 250px)' }}>
        <div
          style={{
            backgroundColor: '#f8f9fa',
            textAlign: 'center',
            justifyContent: 'space-between',
            padding: '20px',
          }}
        >
          <h1>User Dashboard</h1>
          <p>Welcome, {user?.name || 'User'}!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
