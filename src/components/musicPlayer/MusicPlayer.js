import React, { useState, useEffect, useRef } from "react";
import "./MusicPlayer.css";

const SOUNDCLOUD_TRACK_URL =
  "https://soundcloud.com/latenighttales/khruangbin-people-everywhere-still-alive";

export default function MusicPlayer({ theme }) {
  const [isPlaying, setIsPlaying] = useState(true); // Assume playing since auto_play=true
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    // Check if user previously paused - if so, don't autoplay
    const userPaused = localStorage.getItem("musicPlayerPaused") === "true";
    if (userPaused) {
      setIsPlaying(false);
    }

    // Wait for SC.Widget to be available
    const initWidget = () => {
      if (window.SC && iframeRef.current) {
        widgetRef.current = window.SC.Widget(iframeRef.current);

        widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
          setIsLoaded(true);

          // If user previously paused, pause the widget
          if (userPaused) {
            widgetRef.current.pause();
          }
          // Otherwise, auto_play=true in the URL handles autoplay
        });

        widgetRef.current.bind(window.SC.Widget.Events.PLAY, () => {
          setIsPlaying(true);
        });

        widgetRef.current.bind(window.SC.Widget.Events.PAUSE, () => {
          setIsPlaying(false);
        });

        widgetRef.current.bind(window.SC.Widget.Events.FINISH, () => {
          // Loop the track
          widgetRef.current.seekTo(0);
          widgetRef.current.play();
        });
      }
    };

    // Small delay to ensure SC.Widget is loaded
    const timeout = setTimeout(initWidget, 500);

    return () => clearTimeout(timeout);
  }, []);

  const togglePlay = () => {
    if (!widgetRef.current || !isLoaded) return;

    if (isPlaying) {
      widgetRef.current.pause();
      localStorage.setItem("musicPlayerPaused", "true");
    } else {
      widgetRef.current.play();
      localStorage.removeItem("musicPlayerPaused");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      togglePlay();
    }
  };

  const embedUrl = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    SOUNDCLOUD_TRACK_URL
  )}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false`;

  return (
    <div className="music-player" style={{ color: theme.text }}>
      <iframe
        ref={iframeRef}
        className="music-player-iframe"
        title="SoundCloud Player"
        src={embedUrl}
        allow="autoplay"
        scrolling="no"
        frameBorder="no"
      />

      <button
        className={`music-player-button ${isPlaying ? "playing" : ""} ${
          !isLoaded ? "loading" : ""
        }`}
        onClick={togglePlay}
        onKeyDown={handleKeyDown}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        title={isPlaying ? "Pause" : "Play"}
        style={{
          color: theme.text,
          borderColor: theme.text,
        }}
      >
        <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-music"}`}></i>
      </button>

      <div className="music-player-tooltip">
        {isPlaying ? "Now Playing: Khruangbin" : "Click to play music"}
      </div>
    </div>
  );
}
