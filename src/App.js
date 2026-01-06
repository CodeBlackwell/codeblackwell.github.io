import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { blueTheme, materialDarkTheme } from "./theme";
import { GlobalStyles } from "./global";
import ThemeToggle from "./components/themeToggle/ThemeToggle";
import MusicPlayer, { AUDIO_FILE } from "./components/musicPlayer/MusicPlayer";
import AudioVisualizer from "./components/audioVisualizer/AudioVisualizer";
import ModeSelector from "./components/modeSelector/ModeSelector";
import { useAudioAnalyser } from "./hooks/useAudioAnalyser";
import { useVisualizerMode } from "./hooks/useVisualizerMode";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return false; // Default to light mode
  });

  const currentTheme = isDarkMode ? materialDarkTheme : blueTheme;

  // Audio analyser hook
  const { isPlaying, needsInteraction, toggle, getFrequencyData } = useAudioAnalyser(AUDIO_FILE);

  // Visualizer mode cycling hook
  const { currentMode, opacity, cycleMode } = useVisualizerMode();

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <>
        <GlobalStyles />

        {/* Background visualizer - z-index: 0 */}
        <AudioVisualizer
          theme={currentTheme}
          getFrequencyData={getFrequencyData}
          isPlaying={isPlaying}
          currentMode={currentMode}
          opacity={opacity}
        />

        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        {/* Mode selector - z-index: 9998 */}
        <ModeSelector theme={currentTheme} currentMode={currentMode} onCycle={cycleMode} />

        {/* Music player controls - z-index: 9998 */}
        <MusicPlayer
          theme={currentTheme}
          isPlaying={isPlaying}
          needsInteraction={needsInteraction}
          onToggle={toggle}
        />

        {/* Main content - rendered above visualizer */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Main theme={currentTheme} />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
