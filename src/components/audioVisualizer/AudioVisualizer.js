import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import "./AudioVisualizer.css";

// Vertex shader for audio-reactive displacement
const vertexShader = `
  uniform float uTime;
  uniform float uBass;
  uniform float uMid;
  uniform float uTreble;

  varying vec2 vUv;
  varying float vDisplacement;

  // Simplex 3D Noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

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

// Fragment shader for theme-aware coloring
const fragmentShader = `
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform vec3 uColorAccent;
  uniform float uBass;
  uniform float uMid;
  uniform float uTime;
  uniform float uOpacity;

  varying vec2 vUv;
  varying float vDisplacement;

  void main() {
    // Mix colors based on audio and UV position
    vec3 color = mix(uColorPrimary, uColorSecondary, vUv.y + uMid * 0.3);
    color = mix(color, uColorAccent, abs(vDisplacement) * 0.5 + uBass * 0.2);

    // Add subtle pulse
    float pulse = 0.8 + 0.2 * sin(uTime * 2.0 + uBass * 10.0);
    color *= pulse;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

// Audio-reactive mesh component
function AudioMesh({ frequencyData, theme, layerIndex, scale, zPosition }) {
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
      uOpacity: { value: theme.visualizer?.opacity || 0.7 },
    }),
    [colors, theme.visualizer]
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
      materialRef.current.uniforms.uOpacity.value = theme.visualizer?.opacity || 0.7;
    }
  }, [colors, theme.visualizer]);

  return (
    <mesh ref={meshRef} position={[0, 0, zPosition]} scale={scale}>
      <icosahedronGeometry args={[4, 20]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
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
function Particles({ theme, frequencyData }) {
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
      <pointsMaterial size={0.08} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Main visualizer component
export default function AudioVisualizer({ theme, getFrequencyData, isPlaying }) {
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

  // Mouse move handler for parallax
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

  // Depth layers configuration
  const layers = [
    { scale: 1.0, zPosition: -8 }, // Back layer - bass responsive
    { scale: 0.6, zPosition: -2 }, // Middle layer - mid responsive
    { scale: 0.3, zPosition: 4 }, // Front layer - treble responsive
  ];

  return (
    <div ref={containerRef} className={`audio-visualizer ${isPlaying ? "playing" : "idle"}`}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["transparent"]} />

        <ParallaxCamera mousePosition={mousePositionRef} />

        {layers.map((layer, index) => (
          <AudioMesh
            key={index}
            frequencyData={frequencyDataRef}
            theme={theme}
            layerIndex={index}
            scale={layer.scale}
            zPosition={layer.zPosition}
          />
        ))}

        <Particles theme={theme} frequencyData={frequencyDataRef} />

        {/* Ambient light for subtle glow effect */}
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
