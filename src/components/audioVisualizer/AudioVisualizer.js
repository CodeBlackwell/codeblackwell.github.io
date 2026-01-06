// AudioVisualizer - Orchestrator for multiple visualization modes
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import "./AudioVisualizer.css";
import { MODES } from "./visualizerModes";
import { NebulaMode, TerrainMode, BloomController } from "./modes";

// Main visualizer component
export default function AudioVisualizer({
  theme,
  getFrequencyData,
  isPlaying,
  currentMode,
  opacity = 1,
  isDarkMode = false,
}) {
  const frequencyDataRef = useRef({ bass: 0, mid: 0, treble: 0, average: 0 });
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef();

  // Update frequency data each frame
  useEffect(() => {
    let animationId;

    const update = () => {
      if (getFrequencyData) {
        frequencyDataRef.current = getFrequencyData();
      }
      animationId = requestAnimationFrame(update);
    };

    update();
    return () => cancelAnimationFrame(animationId);
  }, [getFrequencyData]);

  // Mouse move handler for parallax (used by Nebula mode)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Render the current mode
  const renderMode = () => {
    const modeProps = {
      frequencyData: frequencyDataRef,
      theme,
      opacity,
      isDarkMode,
    };

    switch (currentMode) {
      case MODES.NEBULA:
        return <NebulaMode {...modeProps} mousePosition={mousePositionRef} />;
      case MODES.TERRAIN:
        return <TerrainMode {...modeProps} />;
      default:
        return <NebulaMode {...modeProps} mousePosition={mousePositionRef} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={`audio-visualizer ${isPlaying ? "playing" : "idle"} ${
        isDarkMode ? "dark-mode-enhanced" : ""
      }`}
      style={{ opacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={isDarkMode ? [1, 2] : [1, 1.5]}
      >
        <color attach="background" args={[isDarkMode ? "#030308" : "transparent"]} />

        {/* Bloom post-processing - enhanced in dark mode */}
        <BloomController
          frequencyData={frequencyDataRef}
          enabled={isPlaying}
          intensity={isDarkMode ? 1.5 : 1.0}
        />

        {/* Render current visualization mode */}
        {renderMode()}
      </Canvas>
    </div>
  );
}
