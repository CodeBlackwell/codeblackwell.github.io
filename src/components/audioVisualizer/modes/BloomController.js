// BloomController - CSS-based bloom effect (postprocessing lib incompatible with Three.js 0.137)
// The actual bloom is applied via CSS filter in AudioVisualizer.css
// This component provides a hook for future WebGL-based bloom when Three.js is upgraded

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export default function BloomController({
  frequencyData,
  enabled = true,
  intensity = 1.0,
  onBloomUpdate,
}) {
  const bloomIntensityRef = useRef(0.5);

  useFrame(() => {
    if (!enabled) return;

    const data = frequencyData.current;
    const bass = data.bass || 0;

    // Calculate bloom intensity based on bass, multiplied by intensity factor
    bloomIntensityRef.current = (0.3 + bass * 1.5) * intensity;

    // Notify parent of bloom intensity for CSS-based effects
    if (onBloomUpdate) {
      onBloomUpdate(bloomIntensityRef.current);
    }
  });

  // Update CSS variable for bloom intensity
  useEffect(() => {
    const updateCSSBloom = () => {
      const intensity = bloomIntensityRef.current;
      document.documentElement.style.setProperty("--bloom-intensity", intensity);
    };

    const interval = setInterval(updateCSSBloom, 50);
    return () => clearInterval(interval);
  }, []);

  return null;
}
