import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

const App = () => {
  const handleRegister = (token) => {
    console.log("Registered with token:", token);
    // Handle token or user state as needed
  };

  const handleLogin = (token) => {
    console.log("Logged in with token:", token);
    // Handle token or user state as needed
  };

  return (
    <Router>
      <div className="p-4">
        
        <Routes>
          <Route path="/" element={<Register onRegister={handleRegister} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
