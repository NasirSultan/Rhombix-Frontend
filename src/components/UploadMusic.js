import React, { useState, useEffect } from "react";
import axios from "axios";

const UploadMusic = () => {
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [message, setMessage] = useState("");
  const [songs, setSongs] = useState([]);

  // Fetch the user's songs on initial load
  useEffect(() => {
    fetchSongs();
  }, []);

  // Fetch the user's songs
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

  // Handle song upload
  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category_id", categoryId); // Send the selected category ID
    formData.append("file", songFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/songs",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      fetchSongs(); // Refresh the song list after upload
    } catch (error) {
      setMessage("Failed to upload song.");
    }
  };

  // Handle song deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/songs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage("Song deleted successfully");
      fetchSongs(); // Refresh the song list after deletion
    } catch (error) {
      setMessage("Failed to delete song.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Upload Music</h2>
      {message && <p className="text-center text-danger">{message}</p>}

      <div className="card p-4 shadow-sm">
        <form onSubmit={handleUpload}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Song Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)} // Handle category selection
            >
              <option value="">Select Category</option>
              <option value="1">Indian</option>
              <option value="2">Punjabi</option>
            </select>
          </div>
          <div className="mb-3">
            <input
              type="file"
              accept="audio/*"
              className="form-control"
              onChange={(e) => setSongFile(e.target.files[0])}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Upload
          </button>
        </form>
      </div>

      <h3 className="mt-5">Your Songs</h3>
      <ul className="list-group">
        {songs.length === 0 ? (
          <p>No songs uploaded yet.</p>
        ) : (
          songs.map((song) => (
            <li key={song.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{song.title}</span>
              <div>
                <audio controls className="me-2">
                  <source
                    src={`http://127.0.0.1:8000/storage/${song.file_path}`}
                    type="audio/mp3"
                  />
                  Your browser does not support the audio element.
                </audio>
                <button
                  onClick={() => handleDelete(song.id)}
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UploadMusic;
