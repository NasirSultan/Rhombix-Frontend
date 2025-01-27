import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard'; // Import the Dashboard component
import Profile from './components/Profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard />} // Route for the dashboard
        />
      </Routes>
    </Router>
  );
}

export default App;
