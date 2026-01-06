import { useState, useEffect, useCallback, useRef } from "react";
import {
  MODES,
  AUTO_CYCLE_INTERVAL,
  TRANSITION_DURATION,
  MANUAL_PAUSE_DURATION,
  getNextMode,
} from "../components/audioVisualizer/visualizerModes";

export function useVisualizerMode() {
  const [currentMode, setCurrentMode] = useState(MODES.NEBULA);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const autoCycleEnabled = useRef(true);
  const pauseTimeout = useRef(null);
  const cycleTimeout = useRef(null);

  // Perform mode transition with fade
  const transitionToMode = useCallback(
    (nextMode) => {
      if (isTransitioning) return;

      setIsTransitioning(true);

      // Fade out
      setOpacity(0);

      // After fade out, switch mode and fade in
      setTimeout(() => {
        setCurrentMode(nextMode);
        setOpacity(1);

        // Mark transition complete after fade in
        setTimeout(() => {
          setIsTransitioning(false);
        }, TRANSITION_DURATION);
      }, TRANSITION_DURATION);
    },
    [isTransitioning]
  );

  // Transition to next mode in sequence
  const transitionToNextMode = useCallback(() => {
    const nextMode = getNextMode(currentMode);
    transitionToMode(nextMode);
  }, [currentMode, transitionToMode]);

  // Manual cycle - pauses auto-cycle temporarily
  const cycleMode = useCallback(() => {
    // Clear any existing pause timeout
    if (pauseTimeout.current) {
      clearTimeout(pauseTimeout.current);
    }

    // Pause auto-cycle
    autoCycleEnabled.current = false;

    // Transition to next mode
    transitionToNextMode();

    // Resume auto-cycle after pause duration
    pauseTimeout.current = setTimeout(() => {
      autoCycleEnabled.current = true;
    }, MANUAL_PAUSE_DURATION);
  }, [transitionToNextMode]);

  // Auto-cycle timer
  useEffect(() => {
    const scheduleCycle = () => {
      cycleTimeout.current = setTimeout(() => {
        if (autoCycleEnabled.current && !isTransitioning) {
          transitionToNextMode();
        }
        scheduleCycle();
      }, AUTO_CYCLE_INTERVAL);
    };

    scheduleCycle();

    return () => {
      if (cycleTimeout.current) {
        clearTimeout(cycleTimeout.current);
      }
      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current);
      }
    };
  }, [isTransitioning, transitionToNextMode]);

  return {
    currentMode,
    isTransitioning,
    opacity,
    cycleMode,
    transitionToMode,
  };
}
