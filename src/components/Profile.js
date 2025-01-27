import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Updated import for react-router-dom v6

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook to use navigation

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    console.log("Stored User:", storedUser); // Log the user data
    console.log("Stored Token:", storedToken); // Log the token data

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser); // Parse user data
      setUser(parsedUser); // Set user state
      setLoading(false); // Stop loading
    } else {
      setError("No user data found. Please log in again.");
      setLoading(false); // Stop loading even if there's an error
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Clear user data and token from localStorage
    setUser(null); // Clear user state
    navigate("/"); // Redirect to the default/login page
  };

  return (
    <Container fluid className="mt-5 pt-4 px-0">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          {/* Profile Section */}
          <Card
            className="shadow-lg p-4 bg-light border-0 rounded-lg"
            style={{
              maxWidth: "70%", // Setting card width to 70%
              margin: "0 auto", // Center the card
              backgroundColor: "#f8f9fa", // Light background color
              borderRadius: "15px", // Rounded corners
            }}
          >
            <h2 className="card-title text-center text-primary mb-4">Profile</h2>
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Loading profile...</p>
              </div>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : user ? (
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="text-2xl font-bold text-black">{user.name}</h5>
                  <p className="text-muted">{user.email}</p>
                </div>
                <Button variant="danger" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            ) : (
              <p className="text-center text-danger">
                No user data found. Please log in again.
              </p>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
