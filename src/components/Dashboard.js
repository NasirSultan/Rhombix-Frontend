import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to MelodyStream 🎵</h2>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/"); }}>Logout</button>
    </div>
  );
};

export default Dashboard;
