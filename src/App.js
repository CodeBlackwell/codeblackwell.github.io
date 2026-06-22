import React, { useState, useEffect, lazy, Suspense } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { blueTheme, materialDarkTheme } from "./theme";
import { GlobalStyles } from "./global";
import ThemeToggle from "./components/themeToggle/ThemeToggle";
import MusicPlayer, { AUDIO_FILE } from "./components/musicPlayer/MusicPlayer";
import ModeSelector from "./components/modeSelector/ModeSelector";
import { useAudioAnalyser } from "./hooks/useAudioAnalyser";
import { useVisualizerMode } from "./hooks/useVisualizerMode";

// three.js is heavy; load it as a separate chunk after the page is interactive
const AudioVisualizer = lazy(() => import("./components/audioVisualizer/AudioVisualizer"));

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

  // Defer the background visualizer until the browser is idle after first paint
  const [showVisualizer, setShowVisualizer] = useState(false);
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    idle(() => setShowVisualizer(true));
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    document.body.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  // Visualizer is more prominent in dark mode
  const visualizerOpacity = isDarkMode ? 1.0 : opacity;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <>
        <GlobalStyles />

        {/* Background visualizer - z-index: 0 */}
        {showVisualizer && (
          <Suspense fallback={null}>
            <AudioVisualizer
              theme={currentTheme}
              getFrequencyData={getFrequencyData}
              isPlaying={isPlaying}
              currentMode={currentMode}
              opacity={visualizerOpacity}
              isDarkMode={isDarkMode}
            />
          </Suspense>
        )}

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
