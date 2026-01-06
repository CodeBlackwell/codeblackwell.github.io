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

    // Create displacement based on audio frequencies
    float noise = snoise(position * 0.5 + uTime * 0.2);
    float bassDisp = uBass * 1.5 * noise;
    float midDisp = uMid * 0.8 * sin(position.y * 3.0 + uTime);
    float trebleDisp = uTreble * 0.4 * sin(position.x * 5.0 + uTime * 2.0);

    vDisplacement = bassDisp + midDisp * 0.5 + trebleDisp * 0.3;

    // Base subtle animation even without audio
    float baseAnimation = 0.1 * sin(uTime * 0.5 + position.x) * cos(uTime * 0.3 + position.y);

    vec3 newPosition = position + normal * (vDisplacement + baseAnimation);

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

  varying vec2 vUv;
  varying float vDisplacement;

  ${rgbToHsv}
  ${hsvToRgb}

  void main() {
    // Mix colors based on audio and UV position
    vec3 color = mix(uColorPrimary, uColorSecondary, vUv.y + uMid * 0.3);
    color = mix(color, uColorAccent, abs(vDisplacement) * 0.5 + uBass * 0.2);

    // Add subtle pulse
    float pulse = 0.8 + 0.2 * sin(uTime * 2.0 + uBass * 10.0);
    color *= pulse;

    // Apply frequency-based hue shift and saturation
    vec3 hsv = rgb2hsv(color);
    hsv.x = fract(hsv.x + uHueShift * 0.1); // Treble shifts hue
    hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0); // Bass controls saturation
    color = hsv2rgb(hsv);

    gl_FragColor = vec4(color, uOpacity);
  }
`;
