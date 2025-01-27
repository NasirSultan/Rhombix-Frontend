import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For redirection
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import Dashboard from "./Dashboard"; 

const Profile = () => {
  const [user, setUser] = useState(null); // Store user data
  const [alertMessage, setAlertMessage] = useState(""); // Store alert message
  const [alertType, setAlertType] = useState(""); // Store alert type
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem("access_token");
    if (!token) {
      // Redirect to the login page if no token is found
      navigate("/");
    } else {
      // Simulate fetching user data (you can replace this with an actual API call)
      fetchUserData(token);
    }
  }, [navigate]);

  const fetchUserData = async (token) => {
    try {
      // Simulate an API call to fetch user data
      const response = await fetch("http://localhost:8000/api/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); // Update the user state with fetched data
      } else {
        // Handle token expiration or invalid token
        setAlertMessage("Your session has expired. Please log in again.");
        setAlertType("danger");
        localStorage.removeItem("token"); // Remove the invalid token
        navigate("/login"); // Redirect to login
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setAlertMessage("An error occurred while fetching profile data.");
      setAlertType("danger");
    }
  };

  useEffect(() => {
    // Auto-remove the alert after 5 seconds
    const timer = setTimeout(() => {
      setAlertMessage(""); // Clear the message after 5 seconds
    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [alertMessage]);

  return (
    <>
      <Dashboard />
      <Container fluid className="mt-5 pt-4">
        <Row>
          <Col md={3}>
            {/* Placeholder for sidebar */}
          </Col>
          <Col md={9}>
            <Card className="shadow-lg p-4" style={{ marginRight: '40px', marginTop: '20px', marginBottom: '30px' }}>
              <h2 className="card-title text-center mb-4">Profile</h2>

              {/* Conditionally render the alert message */}
              {alertMessage && (
                <Alert variant={alertType} dismissible>
                  {alertMessage}
                </Alert>
              )}

              {/* Profile content */}
              {user ? (
                <Row className="align-items-center">
                  <Col md={6} className="text-center">
                    <h5>{user.name}</h5>
                    <p>{user.email}</p>
                  </Col>
                  <Col md={6} className="text-center">
                    <img
                      src={user.profile_picture || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="rounded-circle"
                      style={{
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>
                </Row>
              ) : (
                <p className="text-center">Loading profile...</p>
              )}
            </Card>

            {/* Internship Tasks */}
            <Card className="shadow-lg p-4 mt-4" style={{ marginRight: '40px', marginBottom: '30px' }}>
              <h3 className="card-title text-center mb-4">Internship Tasks</h3>
              <ul className="list-group">
                <li className="list-group-item">Developed a user authentication system with secure login and registration features.</li>
                <li className="list-group-item">Integrated API endpoints to fetch and display dynamic data.</li>
                <li className="list-group-item">Worked on creating responsive and interactive UI components using React and Bootstrap.</li>
                <li className="list-group-item">Collaborated with the backend team to debug and enhance system performance.</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
