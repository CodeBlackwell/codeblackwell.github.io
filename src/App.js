import React, { useState, useEffect } from "react";
import "./App.css";
import Main from "./containers/Main";
import { ThemeProvider } from "styled-components";
import { blueTheme, materialDarkTheme } from "./theme";
import { GlobalStyles } from "./global";
import ThemeToggle from "./components/themeToggle/ThemeToggle";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const currentTheme = isDarkMode ? materialDarkTheme : blueTheme;

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
        <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <div>
          <Main theme={currentTheme} />
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
