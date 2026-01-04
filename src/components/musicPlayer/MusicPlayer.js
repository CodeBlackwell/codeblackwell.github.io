import React from "react";
import "./MusicPlayer.css";

export const AUDIO_FILE = "/audio/Khruangbin - People Everywhere (Still Alive).mp3";

export default function MusicPlayer({ theme, isPlaying, needsInteraction, onToggle }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="music-player" style={{ color: theme.text }}>
      <button
        className={`music-player-button ${isPlaying ? "playing" : ""} ${
          needsInteraction && !isPlaying ? "needs-click" : ""
        }`}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause" : "Click to enable audio"}
        style={{
          color: theme.text,
          borderColor: theme.text,
        }}
      >
        <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-music"}`}></i>
      </button>

      {needsInteraction && !isPlaying && (
        <div
          className="music-player-prompt"
          style={{ color: theme.text, backgroundColor: theme.body }}
        >
          Click to enable audio
        </div>
      )}

      <div className="music-player-tooltip">
        {isPlaying ? "Now Playing: Khruangbin" : "Click to play music"}
      </div>
    </div>
  );
}
