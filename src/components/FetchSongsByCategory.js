import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const FetchSongsByCategory = () => {
  const [categoryId, setCategoryId] = useState("");
  const [songs, setSongs] = useState([]);
  const [message, setMessage] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const fetchSongs = async () => {
    try {
      const url =
        categoryId === ""
          ? "http://127.0.0.1:8000/api/songs"
          : `http://127.0.0.1:8000/api/songs/category/${categoryId}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSongs(response.data);
      setCurrentSongIndex(0); // Reset to the first song
    } catch (error) {
      setMessage("Failed to fetch songs.");
      setSongs([]);
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play(); // Play when clicked
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkip = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1); // Move to the next song
    } else {
      setCurrentSongIndex(0); // Loop to the first song if it's the last one
    }
  };

  const handleBack = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1); // Move to the previous song
    } else {
      setCurrentSongIndex(songs.length - 1); // Loop to the last song if it's the first one
    }
  };

  const handleTimeUpdate = () => {
    const current = audioRef.current;
    setCurrentTime(current.currentTime);
    setDuration(current.duration);

    // Update the progress bar based on current time
    if (progressRef.current) {
      progressRef.current.value = (current.currentTime / current.duration) * 100;
    }
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime; // Directly set currentTime without restarting
      setCurrentTime(seekTime); // Update currentTime state for UI sync
    }
  };

  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    setVolume(volumeValue);
    if (audioRef.current) {
      audioRef.current.volume = volumeValue; // Adjust volume
    }
  };

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(false); // Pause the previous song if it's playing
  };

  const handleSongEnd = () => {
    handleSkip(); // Auto skip to next song
  };

  useEffect(() => {
    fetchSongs();
  }, [categoryId]);

  useEffect(() => {
    if (currentSongIndex !== null && songs.length > 0 && audioRef.current) {
      // When the song changes, load it and start playing
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true); // Start playing the song when selected
    }
  }, [currentSongIndex]);

  return (
    <div>
      <h2>Fetch Songs</h2>

      {/* Category Selection */}
      <select value={categoryId} onChange={handleCategoryChange}>
        <option value="">All Songs</option>
        <option value="1">Indian</option>
        <option value="2">Punjabi</option>
      </select>

      {message && <p>{message}</p>}

      {/* Song List */}
      <h3>Songs</h3>
      {songs.length === 0 && <p>No songs available.</p>}
      <ul>
        {songs.map((song, index) => (
          <li key={song.id} onClick={() => handleSongSelect(index)}>
            <p>{song.title}</p>
          </li>
        ))}
      </ul>

      {/* Music Player */}
      {currentSongIndex !== null && songs.length > 0 && (
        <div>
          <h3>Now Playing: {songs[currentSongIndex].title}</h3>
          <audio
            ref={audioRef}
            src={`http://127.0.0.1:8000/storage/${songs[currentSongIndex].file_path}`}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            onEnded={handleSongEnd}
          >
            Your browser does not support the audio element.
          </audio>
          <div>
            <button onClick={handlePlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button onClick={handleBack}>Back</button>
            <button onClick={handleSkip}>Next</button>
          </div>

          <div>
            <p>
              {Math.floor(currentTime)} / {Math.floor(duration)} sec
            </p>
            <input
              ref={progressRef}
              type="range"
              min="0"
              max="100"
              value={(currentTime / duration) * 100}
              onChange={handleSeek}
            />
          </div>

          <div>
            <label>Volume</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchSongsByCategory;
