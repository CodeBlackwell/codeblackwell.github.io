// Nebula mode shaders
import { simplexNoise3D, rgbToHsv, hsvToRgb } from "./common";

export const nebulaVertexShader = `
  uniform float uTime;
  uniform float uBass;
  uniform float uMid;
  uniform float uTreble;

  varying vec2 vUv;
  varying float vDisplacement;

  ${simplexNoise3D}

  void main() {
    vUv = uv;

    // Multi-layer noise for organic movement
    float noise1 = snoise(position * 0.5 + uTime * 0.2);
    float noise2 = snoise(position * 1.0 + uTime * 0.4 + 10.0);
    float noise3 = snoise(position * 2.0 + uTime * 0.8 + 20.0);

    // Bass creates big waves, treble adds fine detail
    float bassDisp = uBass * 2.5 * noise1;
    float midDisp = uMid * 1.2 * noise2;
    float trebleDisp = uTreble * 0.6 * noise3;

    // Combine with weighted sum
    vDisplacement = bassDisp + midDisp * 0.6 + trebleDisp * 0.3;

    // Breathing animation even without audio
    float breathe = 0.15 * sin(uTime * 0.4 + length(position) * 0.5);
    float ripple = 0.1 * sin(length(position.xy) * 2.0 - uTime * 1.5);

    vec3 newPosition = position + normal * (vDisplacement + breathe + ripple);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

export const nebulaFragmentShader = `
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
  uniform float uDarkModeIntensity;

  varying vec2 vUv;
  varying float vDisplacement;

  ${rgbToHsv}
  ${hsvToRgb}

  void main() {
    // Dynamic rainbow gradient based on position and time
    float hueBase = vUv.x * 0.3 + vUv.y * 0.3 + uTime * 0.05;

    // Audio modulates the hue - bass shifts red, treble shifts blue
    float audioHue = hueBase + uBass * 0.15 - uTreble * 0.1;
    audioHue = fract(audioHue); // Keep in 0-1 range

    // Displacement affects saturation and brightness
    float dispEffect = abs(vDisplacement) * 2.0;

    // Enhanced saturation and brightness for dark mode
    float saturation = 0.7 + dispEffect * 0.3 + uMid * 0.2 + uDarkModeIntensity * 0.1;
    float brightness = 0.6 + dispEffect * 0.4 + uBass * 0.3 + uDarkModeIntensity * 0.15;

    // Create vibrant color from HSV
    vec3 color = hsv2rgb(vec3(audioHue, clamp(saturation, 0.5, 1.0), clamp(brightness, 0.4, 1.0)));

    // Add cyan/magenta accents at peaks - more prominent in dark mode
    float peakGlow = smoothstep(0.3, 0.8, dispEffect);
    vec3 accentColor = hsv2rgb(vec3(fract(audioHue + 0.5), 0.9, 1.0));
    color = mix(color, accentColor, peakGlow * (0.4 + uDarkModeIntensity * 0.2));

    // Cosmic purple/pink blend for dark mode
    vec3 cosmicPurple = vec3(0.545, 0.361, 0.965); // #8b5cf6
    vec3 cosmicPink = vec3(0.753, 0.518, 0.988);   // #c084fc
    float cosmicBlend = sin(vUv.x * 3.14159 + uTime * 0.3) * 0.5 + 0.5;
    color = mix(color, mix(cosmicPurple, cosmicPink, cosmicBlend), uDarkModeIntensity * 0.2);

    // Pulsing glow synced to bass - stronger in dark mode
    float pulseStrength = 0.15 + uDarkModeIntensity * 0.1;
    float pulse = (1.0 - pulseStrength) + pulseStrength * sin(uTime * 3.0 + uBass * 15.0);
    color *= pulse;

    // Edge glow effect - cosmic purple in dark mode
    float edgeFactor = 1.0 - abs(vUv.x - 0.5) * 2.0;
    edgeFactor *= 1.0 - abs(vUv.y - 0.5) * 2.0;
    vec3 edgeGlow = mix(vec3(0.1, 0.2, 0.4), vec3(0.3, 0.1, 0.5), uDarkModeIntensity);
    color += edgeGlow * (1.0 - edgeFactor) * uMid * 0.5;

    gl_FragColor = vec4(color, uOpacity);
  }
`;
