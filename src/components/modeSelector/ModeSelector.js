// ModeSelector - Visualizer mode toggle button
import React from "react";
import "./ModeSelector.css";
import { MODE_CONFIG } from "../audioVisualizer/visualizerModes";

export default function ModeSelector({ theme, currentMode, onCycle }) {
  const config = MODE_CONFIG[currentMode];

  return (
    <div className="mode-selector">
      <button
        className="mode-selector-button"
        onClick={onCycle}
        style={{ color: theme.text, borderColor: theme.text }}
        aria-label={`Current mode: ${config.name}. Click to cycle.`}
        title={config.name}
      >
        <i className={`fa-solid ${config.icon}`}></i>
      </button>
      <div className="mode-selector-tooltip" style={{ color: theme.text }}>
        {config.name}
      </div>
    </div>
  );
}
