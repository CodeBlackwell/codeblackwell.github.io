// Terrain Mode - Audio-reactive mountain landscape
import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { terrainVertexShader, terrainFragmentShader } from "./shaders/terrain";

function TerrainMesh({ frequencyData, theme, opacity }) {
  const meshRef = useRef();
  const materialRef = useRef();

  // Parse theme colors
  const colors = useMemo(
    () => ({
      primary: new THREE.Color(theme.visualizer?.primary || theme.imageHighlight || "#0E6BA8"),
      secondary: new THREE.Color(theme.visualizer?.secondary || theme.highlight || "#A6E1FA"),
      accent: new THREE.Color(theme.visualizer?.accent || theme.text || "#001C55"),
    }),
    [theme]
  );

  // Create shader material uniforms
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

  // Animation frame
  useFrame((state) => {
    if (!materialRef.current) return;

    const data = frequencyData.current;
    const { bass = 0, mid = 0, treble = 0 } = data;

    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uBass.value = bass;
    materialRef.current.uniforms.uMid.value = mid;
    materialRef.current.uniforms.uTreble.value = treble;

    // Frequency-to-color mapping
    materialRef.current.uniforms.uHueShift.value = treble;
    materialRef.current.uniforms.uSaturation.value = 0.8 + bass * 0.4;

    // Update opacity for transitions
    materialRef.current.uniforms.uOpacity.value = (theme.visualizer?.opacity || 0.7) * opacity;

    // Continuous Z-axis rotation (spins flat like a record)
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.2;
      // Tilt slightly to show depth
      meshRef.current.rotation.x = -0.5 + bass * 0.15;
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
    <mesh ref={meshRef} rotation={[0, 0, 0]} position={[0, 0, -5]}>
      <planeGeometry args={[12, 12, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={terrainVertexShader}
        fragmentShader={terrainFragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// Ambient particles floating around terrain
function TerrainParticles({ theme, frequencyData, opacity }) {
  const particlesRef = useRef();
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere around the terrain
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 8 + Math.random() * 6;
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      pos[i * 3 + 2] = Math.cos(phi) * radius - 5;
    }
    return pos;
  }, []);

  const color = useMemo(
    () => new THREE.Color(theme.visualizer?.accent || theme.text || "#001C55"),
    [theme]
  );

  useFrame((state) => {
    if (!particlesRef.current) return;

    const data = frequencyData.current;
    const mid = data.mid || 0;

    // Gentle floating motion
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.01;

    // Pulse with mid frequencies
    const scale = 1 + mid * 0.2;
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
        size={0.15}
        color={color}
        transparent
        opacity={0.4 * opacity}
        sizeAttenuation
      />
    </points>
  );
}

// Main Terrain Mode component
export default function TerrainMode({ frequencyData, theme, opacity = 1 }) {
  return (
    <group>
      <TerrainMesh frequencyData={frequencyData} theme={theme} opacity={opacity} />
      <TerrainParticles theme={theme} frequencyData={frequencyData} opacity={opacity} />

      {/* Ambient lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.4} />
    </group>
  );
}
