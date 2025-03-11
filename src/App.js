// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";  // Import Dashboard (Header)
import UploadMusic from "./components/UploadMusic";
import FetchSongsByCategory from "./components/FetchSongsByCategory";

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for Auth without Dashboard (Header) */}
        <Route path="/" element={<Auth />} />
        
        {/* Wrap other routes with Dashboard (Header) */}
        <Route path="/upload" element={
          <>
            <Dashboard />  {/* Display Dashboard (Header) */}
            <UploadMusic />
          </>
        } />
        
        <Route path="/play" element={
          <>
            <Dashboard />  {/* Display Dashboard (Header) */}
            <FetchSongsByCategory />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
