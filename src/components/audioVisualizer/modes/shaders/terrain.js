// Terrain mode shaders
import { simplexNoise3D, rgbToHsv, hsvToRgb } from "./common";

export const terrainVertexShader = `
  uniform float uTime;
  uniform float uBass;
  uniform float uMid;
  uniform float uTreble;

  varying vec2 vUv;
  varying float vElevation;

  ${simplexNoise3D}

  void main() {
    vUv = uv;

    // Create terrain displacement
    float baseNoise = snoise(vec3(position.x * 0.15, position.y * 0.15, uTime * 0.1));
    float detailNoise = snoise(vec3(position.x * 0.4, position.y * 0.4, uTime * 0.2));
    float fineNoise = snoise(vec3(position.x * 1.0, position.y * 1.0, uTime * 0.4));

    // Audio-reactive mountain height
    float bassHeight = uBass * 4.0 * baseNoise;
    float midRipple = uMid * 1.5 * detailNoise;
    float trebleDetail = uTreble * 0.5 * fineNoise;

    // Create wave-like ripples from center
    float dist = length(position.xy);
    float ripple = sin(dist * 0.5 - uTime * 2.0) * uMid * 0.5;

    vElevation = bassHeight + midRipple + trebleDetail + ripple;

    // Base subtle animation
    float baseAnimation = 0.2 * sin(uTime * 0.3 + position.x * 0.1) * cos(uTime * 0.2 + position.y * 0.1);

    vec3 newPosition = position;
    newPosition.z = vElevation + baseAnimation;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const terrainFragmentShader = `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform vec3 uColorAccent;
  uniform float uBass;
  uniform float uMid;
  uniform float uTreble;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uHueShift;
  uniform float uSaturation;

  varying vec2 vUv;
  varying float vElevation;

  ${rgbToHsv}
  ${hsvToRgb}

  void main() {
    // Height-based color gradient - much more sensitive normalization
    // Elevation typically ranges from -2 to +2, so use tighter range
    float normalizedHeight = (vElevation + 1.5) / 3.0;
    // Apply contrast curve to spread out the middle values
    normalizedHeight = clamp(normalizedHeight, 0.0, 1.0);
    normalizedHeight = pow(normalizedHeight, 0.7); // Boost contrast

    // Direct Blue to Red gradient (no purple middle)
    vec3 lowColor = vec3(0.1, 0.3, 1.0);   // Deep Blue
    vec3 highColor = vec3(1.0, 0.1, 0.05); // Bright Red

    // Simple linear interpolation for clearer gradient
    vec3 color = mix(lowColor, highColor, normalizedHeight);

    // Add glow effect at peaks
    float peakGlow = smoothstep(0.6, 1.0, normalizedHeight);
    color += peakGlow * vec3(1.0, 0.5, 0.2) * 0.3 * (1.0 + uBass);

    // Subtle pulse with audio
    float pulse = 0.9 + 0.1 * sin(uTime * 1.5 + vElevation * 2.0);
    color *= pulse;

    // Bass boosts saturation, treble shifts slightly
    vec3 hsv = rgb2hsv(color);
    hsv.y = clamp(hsv.y * (0.9 + uBass * 0.3), 0.0, 1.0);
    hsv.z = clamp(hsv.z * (0.9 + uMid * 0.2), 0.0, 1.0);
    color = hsv2rgb(hsv);

    // Grid lines for wireframe effect
    float gridX = smoothstep(0.02, 0.03, abs(fract(vUv.x * 24.0) - 0.5));
    float gridY = smoothstep(0.02, 0.03, abs(fract(vUv.y * 24.0) - 0.5));
    float grid = min(gridX, gridY);

    // Combine color with grid - grid lines are brighter
    color = mix(color * 1.3, color * 0.7, 1.0 - grid);

    gl_FragColor = vec4(color, uOpacity);
  }
`;
