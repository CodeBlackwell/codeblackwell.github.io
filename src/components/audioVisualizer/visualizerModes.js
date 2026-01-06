// Visualization mode constants and configuration

export const MODES = {
  NEBULA: "NEBULA",
  TERRAIN: "TERRAIN",
};

export const MODE_ORDER = [MODES.NEBULA, MODES.TERRAIN];

export const MODE_CONFIG = {
  [MODES.NEBULA]: {
    name: "Nebula",
    icon: "fa-atom",
    description: "Wireframe icosahedrons with particles",
  },
  [MODES.TERRAIN]: {
    name: "Terrain",
    icon: "fa-mountain",
    description: "Audio-reactive mountain landscape",
  },
};

// Timing constants
export const AUTO_CYCLE_INTERVAL = 24000; // 24 seconds
export const TRANSITION_DURATION = 750; // 750ms fade each direction
export const MANUAL_PAUSE_DURATION = 24000; // Pause auto-cycle for 24s after manual click

// Get next mode in cycle
export function getNextMode(currentMode) {
  const currentIndex = MODE_ORDER.indexOf(currentMode);
  const nextIndex = (currentIndex + 1) % MODE_ORDER.length;
  return MODE_ORDER[nextIndex];
}
