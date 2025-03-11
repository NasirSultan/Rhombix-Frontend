import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // Fetch the token, name, and email from local storage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to login if no token is found
    }
  }, [navigate]);

  // Retrieve user info from local storage
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    navigate("/"); // Redirect to login page
  };

  return (
    <header className="bg-dark text-light py-2"> {/* Reduced vertical padding to py-2 */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          {/* Left Side: Title with Custom Styles */}
          <h1 className="mb-0 title-hover fs-4 text-light">AudioBloom 🎶</h1>

          {/* Right Side: User Info and Logout Button */}
          <div className="d-flex align-items-center">
            <div className="me-3 text-end">
              {/* User Info in One Row with Padding and Margin between Name and Email */}
              <p className="mb-1 d-flex fs-6">
                <span className="me-3">{userName || "Guest"}</span> {/* Added margin-right */}
                <span>{userEmail}</span>
              </p>
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Dashboard;
