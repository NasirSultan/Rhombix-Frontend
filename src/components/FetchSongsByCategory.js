import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaMusic,
  FaList,
} from "react-icons/fa";

const FetchSongsByCategory = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [categoryId, setCategoryId] = useState("");  // Category ID state
  const [selectAll, setSelectAll] = useState(false);  // Select all toggle
  const [showDropdown, setShowDropdown] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // Fetch songs based on category or fetch all songs by default
  const fetchSongs = async () => {
    try {
      // Always fetch from http://127.0.0.1:8000/api/songs as default.
      const url = categoryId
        ? `http://127.0.0.1:8000/api/songs/category/${categoryId}`
        : "http://127.0.0.1:8000/api/songs"; // Default API for all songs

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setSongs(response.data);
      setSelectedSongs([]); // Reset selected songs when new data is fetched
      setSelectAll(false); // Reset selectAll checkbox when data is fetched
      setCurrentSongIndex(0);
    } catch (error) {
      console.error("Failed to fetch songs.");
      setSongs([]); // Reset songs in case of error
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [categoryId]); // Re-fetch when categoryId changes

  // Format time (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Song selection handlers
  const handleSongSelection = (song) => {
    setSelectedSongs((prevSongs) =>
      prevSongs.includes(song)
        ? prevSongs.filter((s) => s !== song)
        : [...prevSongs, song]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSongs([]); // Deselect all songs
    } else {
      setSelectedSongs(songs); // Select all songs
    }
    setSelectAll(!selectAll);
  };

  const handleStartPlaying = () => {
    if (selectedSongs.length > 0) {
      setCurrentSongIndex(0);
      setIsPlaying(true);
      setShowDropdown(false);
    }
  };

  const handleBackToSelection = () => {
    setIsPlaying(false);
    setShowDropdown(true);
  };

  // Navigation handlers
  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause audio manually
    } else {
      audioRef.current.play(); // Play audio manually
    }
    setIsPlaying((prev) => !prev); // Toggle isPlaying state
  };

  const handleSkip = () => {
    setCurrentSongIndex((prev) => (prev + 1) % selectedSongs.length);
    setIsPlaying(true);
  };

  const handleBack = () => {
    setCurrentSongIndex((prev) => (prev - 1 + selectedSongs.length) % selectedSongs.length);
    setIsPlaying(true);
  };

  // Audio handlers
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
  };

  const handleEnded = () => {
    handleSkip();
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, currentSongIndex]);

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary">
        <FaMusic /> AudioList
      </h2>

      {showDropdown ? (
        <>
          {/* Category Selector */}
          <div className="d-flex flex-column align-items-center">
            <div className="form-group d-flex align-items-center w-50">
              <label className="me-2 fw-bold">Select Category:</label>
              <select
                className="form-control w-50"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">All Songs</option>
                <option value="4">Pakitan </option>
                <option value="5">Indian</option>
              </select>
            </div>

            {/* Song Selector */}
            <div className="d-flex justify-content-between align-items-center w-75 mx-auto mt-3 ">
              <label className="fw-bold mx-2">Select Songs:</label>
              <div className="d-flex align-items-center mx-3">
              <span className="fw-bold mx-2">Select All</span>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="me-2"
                />
             
              </div>
            </div>

            {/* Song Table */}
            <div
              className="table-responsive w-75 mx-auto mt-2"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              <table className="table table-hover table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Select</th>
                    <th>Title</th>
                    <th>File Path</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song) => (
                    <tr key={song.id}>
                      
                      <td>{song.title}</td>
                      <td>{song.file_path}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedSongs.includes(song)}
                          onChange={() => handleSongSelection(song)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {selectedSongs.length > 0 && (
            <div className="text-center mt-3">
              <button className="btn btn-success" onClick={handleStartPlaying}>
                <FaPlay className="me-2" />
                Play Selected Songs
              </button>
            </div>
          )}
        </>
      ) : (
        // 🎵 Player Section
        <div className="d-flex justify-content-center mt-4">
          <div className="card w-50 shadow-lg border-0">
            <div className="card-body text-center">
              <h4 className="card-title text-success">
                Now Playing: {selectedSongs[currentSongIndex].title}
              </h4>

              <audio
                ref={audioRef}
                src={`http://127.0.0.1:8000/storage/${selectedSongs[currentSongIndex].file_path}`}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleEnded}
                autoPlay={isPlaying}
              />

              {/* Time & Progress */}
              <div className="my-3">
                <span>{formatTime(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={duration ? (currentTime / duration) * 100 : 0}
                  onChange={handleSeek}
                  className="mx-3 w-50"
                />
                <span>{formatTime(duration)}</span>
              </div>

              {/* Controls */}
              <div className="my-3">
                <button className="btn btn-secondary mx-2" onClick={handleBack}>
                  <FaStepBackward />
                </button>
                <button
                  className="btn btn-primary mx-2"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="btn btn-secondary mx-2" onClick={handleSkip}>
                  <FaStepForward />
                </button>
              </div>

              {/* Volume */}
              <div className="d-flex justify-content-center align-items-center mt-3">
                <FaVolumeUp className="me-2" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="form-range w-50"
                />
              </div>

              {/* Back to Selection */}
              <button
                className="btn btn-outline-dark mt-4"
                onClick={handleBackToSelection}
              >
                <FaList className="me-2" />
                Select Songs to Play Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchSongsByCategory;
