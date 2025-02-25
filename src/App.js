import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import UploadMusic from "./components/UploadMusic";
import FetchSongsByCategory from "./components/FetchSongsByCategory";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadMusic />} />
        <Route path="/play" element={<FetchSongsByCategory />} />
      </Routes>
    </Router>
  );
}

export default App;
