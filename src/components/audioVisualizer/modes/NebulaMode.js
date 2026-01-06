// Nebula Mode - Extracted from original AudioVisualizer
import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { nebulaVertexShader, nebulaFragmentShader } from "./shaders/nebula";

// Audio-reactive mesh component
function AudioMesh({ frequencyData, theme, layerIndex, scale, zPosition, opacity }) {
  const meshRef = useRef();
  const materialRef = useRef();

  // Parse theme colors to Three.js color objects
  const colors = useMemo(
    () => ({
      primary: new THREE.Color(theme.visualizer?.primary || theme.imageHighlight || "#0E6BA8"),
      secondary: new THREE.Color(theme.visualizer?.secondary || theme.highlight || "#A6E1FA"),
      accent: new THREE.Color(theme.visualizer?.accent || theme.text || "#001C55"),
    }),
    [theme]
  );

  // Create shader material with uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBass: { value: 0 },
      uMid: { value: 0 },
      uTreble: { value: 0 },
      uColorPrimary: { value: colors.primary },
      uColorSecondary: { value: colors.secondary },
      uColorAccent: { value: colors.accent },
      uOpacity: { value: (theme.visualizer?.opacity || 0.7) * opacity },
      uHueShift: { value: 0 },
      uSaturation: { value: 1 },
    }),
    [colors, theme.visualizer, opacity]
  );

  // Animation frame - update uniforms
  useFrame((state) => {
    if (!materialRef.current) return;

    const data = frequencyData.current;
    const { bass = 0, mid = 0, treble = 0 } = data;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    // Each layer emphasizes different frequencies
    materialRef.current.uniforms.uBass.value = bass * (1.5 - layerIndex * 0.3);
    materialRef.current.uniforms.uMid.value = mid * (1 + layerIndex * 0.1);
    materialRef.current.uniforms.uTreble.value = treble * (0.5 + layerIndex * 0.3);

    // Frequency-to-color mapping
    materialRef.current.uniforms.uHueShift.value = treble;
    materialRef.current.uniforms.uSaturation.value = 0.7 + bass * 0.6;

    // Update opacity for transitions
    materialRef.current.uniforms.uOpacity.value = (theme.visualizer?.opacity || 0.7) * opacity;

    // Subtle rotation based on audio
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001 + bass * 0.005;
      meshRef.current.rotation.y += 0.002 + mid * 0.003;
      meshRef.current.rotation.z += 0.0005 + treble * 0.002;
    }
  });

  // Update colors when theme changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uColorPrimary.value = colors.primary;
      materialRef.current.uniforms.uColorSecondary.value = colors.secondary;
      materialRef.current.uniforms.uColorAccent.value = colors.accent;
    }
  }, [colors]);

  return (
    <mesh ref={meshRef} position={[0, 0, zPosition]} scale={scale}>
      <icosahedronGeometry args={[4, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={nebulaVertexShader}
        fragmentShader={nebulaFragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// Parallax camera controller
function ParallaxCamera({ mousePosition }) {
  const { camera } = useThree();

  useFrame(() => {
    // Smooth camera movement based on mouse
    const targetX = mousePosition.current.x * 3;
    const targetY = -mousePosition.current.y * 2;

    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Ambient particles for additional depth
function Particles({ theme, frequencyData, opacity }) {
  const particlesRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return pos;
  }, []);

  const color = useMemo(
    () => new THREE.Color(theme.visualizer?.secondary || theme.highlight || "#A6E1FA"),
    [theme]
  );

  useFrame((state) => {
    if (!particlesRef.current) return;

    const data = frequencyData.current;
    const bass = data.bass || 0;

    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;

    // Pulse size with bass
    const scale = 1 + bass * 0.3;
    particlesRef.current.scale.setScalar(scale);
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={0.6 * opacity}
        sizeAttenuation
      />
    </points>
  );
}

// Main Nebula Mode component
export default function NebulaMode({ frequencyData, theme, mousePosition, opacity = 1 }) {
  // Depth layers configuration
  const layers = [
    { scale: 1.0, zPosition: -8 }, // Back layer - bass responsive
    { scale: 0.6, zPosition: -2 }, // Middle layer - mid responsive
    { scale: 0.3, zPosition: 4 }, // Front layer - treble responsive
  ];

  return (
    <group>
      <ParallaxCamera mousePosition={mousePosition} />

      {layers.map((layer, index) => (
        <AudioMesh
          key={index}
          frequencyData={frequencyData}
          theme={theme}
          layerIndex={index}
          scale={layer.scale}
          zPosition={layer.zPosition}
          opacity={opacity}
        />
      ))}

      <Particles theme={theme} frequencyData={frequencyData} opacity={opacity} />

      {/* Ambient light for subtle glow effect */}
      <ambientLight intensity={0.5} />
    </group>
  );
}
