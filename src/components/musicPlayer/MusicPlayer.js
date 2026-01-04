import React, { useState, useEffect, useRef } from "react";
import "./MusicPlayer.css";

const SOUNDCLOUD_TRACK_URL =
  "https://soundcloud.com/latenighttales/khruangbin-people-everywhere-still-alive";

export default function MusicPlayer({ theme }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [, setIsLoaded] = useState(false);
  const [needsInteraction, setNeedsInteraction] = useState(true);
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    const userPaused = localStorage.getItem("musicPlayerPaused") === "true";

    const initWidget = () => {
      if (window.SC && window.SC.Widget && iframeRef.current) {
        try {
          widgetRef.current = window.SC.Widget(iframeRef.current);

          widgetRef.current.bind(window.SC.Widget.Events.READY, () => {
            setIsLoaded(true);

            // Try to autoplay if user hasn't paused
            if (!userPaused) {
              widgetRef.current.play();
            }
          });

          widgetRef.current.bind(window.SC.Widget.Events.PLAY, () => {
            setIsPlaying(true);
            setNeedsInteraction(false);
          });

          widgetRef.current.bind(window.SC.Widget.Events.PAUSE, () => {
            setIsPlaying(false);
          });

          widgetRef.current.bind(window.SC.Widget.Events.FINISH, () => {
            widgetRef.current.seekTo(0);
            widgetRef.current.play();
          });

          widgetRef.current.bind(window.SC.Widget.Events.PLAY_PROGRESS, () => {
            // If we're getting progress events, audio is working
            setNeedsInteraction(false);
          });
        } catch (e) {
          console.warn("SoundCloud widget init error:", e);
        }
      }
    };

    // Wait for SC.Widget API to load
    const checkAndInit = () => {
      if (window.SC && window.SC.Widget) {
        initWidget();
      } else {
        setTimeout(checkAndInit, 200);
      }
    };

    const timeout = setTimeout(checkAndInit, 300);
    return () => clearTimeout(timeout);
  }, []);

  const togglePlay = () => {
    if (!widgetRef.current) return;

    setNeedsInteraction(false);

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
          needsInteraction && !isPlaying ? "needs-click" : ""
        }`}
        onClick={togglePlay}
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
