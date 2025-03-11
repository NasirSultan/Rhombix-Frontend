import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadMusic = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(1);
  const [songFile, setSongFile] = useState(null);
  const [message, setMessage] = useState("");
  const [songs, setSongs] = useState([]);
  const [currentPlaying, setCurrentPlaying] = useState(null);
  const audioRefs = useRef({});
  const fileInputRef = useRef(null); // Ref for file input
  const navigate = useNavigate();

  useEffect(() => {
    fetchSongs(); // Fetch songs on component mount
  }, []);

  // Fetch Songs
  const fetchSongs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/songs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSongs(response.data);
    } catch (error) {
      setMessage("Failed to fetch songs.");
    }
  };

  // Handle Upload
  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", categoryId);
    formData.append("file", songFile);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/songs", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message || "Song uploaded successfully.");
      setTitle("");
      setCategoryId(1);
      setSongFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // ✅ Clear file input after upload
      }
      fetchSongs(); // Refresh song list
    } catch (error) {
      setMessage("Failed to upload song.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/songs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Song deleted successfully.");
      fetchSongs(); // Refresh song list
    } catch (error) {
      setMessage("Failed to delete song.");
    }
  };

  // Handle Play (pause others)
  const handlePlay = (id) => {
    if (currentPlaying && currentPlaying !== id) {
      audioRefs.current[currentPlaying]?.pause();
    }
    setCurrentPlaying(id);
  };

  return (
    <div className="container mx-5 px-5">
      <div className="container my-5 p-4 bg-white shadow rounded-4">
      <div className="text-center mb-4">
        <h2 className="p-3 bg-light rounded-3 shadow-sm border">Upload Music</h2>
      </div>

      {message && <div className="alert alert-info text-center">{message}</div>}

      {/* Upload Form */}
      <div className="card p-3 shadow-sm rounded-3 mb-5 border-0">
        <form onSubmit={handleUpload} className="row g-3 align-items-center">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Song Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select rounded-pill"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              required
            >
              <option value={1}>Select categories</option>
              <option value={2}>Pakistani</option>
              <option value={3}>Indian</option>
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="file"
              accept="audio/*"
              className="form-control rounded-pill"
              onChange={(e) => setSongFile(e.target.files[0])}
              ref={fileInputRef} 
              required
            />
          </div>

          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-success rounded-pill">
              <i className="bi bi-upload me-1"></i> Upload
            </button>
          </div>
        </form>
      </div>

      {/* Songs List Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Your Songs</h3>
        <button onClick={() => navigate("/play")} className="btn btn-primary rounded-pill">
          <i className="bi bi-music-note-list me-2"></i> Playlist
        </button>
      </div>

      {/* Songs List */}
      {songs.length === 0 ? (
        <div className="alert alert-secondary text-center">No songs uploaded yet.</div>
      ) : (
        <div className="list-group">
          {songs.map((song) => (
            <div
              key={song.id}
              className="list-group-item d-flex justify-content-between align-items-center p-3 rounded-3 mb-2 shadow-sm"
              style={{ background: "#f9f9f9" }}
            >
              {/* Song Info */}
              <div className="d-flex flex-column">
                <span className="fw-semibold">{song.title}</span>
                <small className="text-muted">
                  {song.category_id === 1
                    ? "Pakistani"
                    : song.category_id === 2
                    ? "Indian"
                    : "Mixed"}
                </small>
              </div>

              {/* Audio Player */}
              <audio
                controls
                className="mx-3"
                style={{ width: "250px" }}
                ref={(el) => (audioRefs.current[song.id] = el)}
                onPlay={() => handlePlay(song.id)} // Pause others on play
              >
                <source
                  src={`http://127.0.0.1:8000/storage/${song.file_path}`}
                  type="audio/mp3"
                />
                Your browser does not support the audio element.
              </audio>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(song.id)}
                className="btn btn-outline-danger btn-sm rounded-pill"
              >
                <i className="bi bi-trash me-1"></i> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default UploadMusic;
