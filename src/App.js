import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { blueTheme, materialDarkTheme } from "./theme";
import { GlobalStyles } from "./global";
import ThemeToggle from "./components/themeToggle/ThemeToggle";
import MusicPlayer, { AUDIO_FILE } from "./components/musicPlayer/MusicPlayer";
import { useAudioAnalyser } from "./hooks/useAudioAnalyser";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return false; // Default to light mode
  });

  const currentTheme = isDarkMode ? materialDarkTheme : blueTheme;

  // Audio analyser hook
  const { isPlaying, needsInteraction, toggle } = useAudioAnalyser(AUDIO_FILE);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <>
        <GlobalStyles />

        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        {/* Music player controls - z-index: 9998 */}
        <MusicPlayer
          theme={currentTheme}
          isPlaying={isPlaying}
          needsInteraction={needsInteraction}
          onToggle={toggle}
        />

        {/* Main content */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Main theme={currentTheme} />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
