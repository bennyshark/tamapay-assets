'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';

function RotatingGlobe() {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Generate some random points for the globe (cities)
  const cities = Array.from({ length: 40 }).map(() => {
    const phi = Math.acos(-1 + (2 * Math.random()));
    const theta = Math.sqrt(40 * Math.PI) * phi;
    const r = 2.05; // Slightly outside the globe
    return new THREE.Vector3(
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi)
    );
  });

  return (
    <group ref={globeRef}>
      {/* The Earth */}
      <Sphere args={[2, 64, 64]}>
        <meshStandardMaterial 
          color="#0f172a" 
          wireframe={true} 
          transparent 
          opacity={0.15} 
        />
      </Sphere>

      {/* Solid inner core for depth */}
      <Sphere args={[1.95, 32, 32]}>
        <meshBasicMaterial color="#020617" />
      </Sphere>

      {/* Cities (Nodes) */}
      {cities.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      ))}
      
      {/* Connecting Beams (Transactions) */}
      {Array.from({ length: 15 }).map((_, i) => {
        const start = cities[Math.floor(Math.random() * cities.length)];
        const end = cities[Math.floor(Math.random() * cities.length)];
        // Create an arc between the two cities
        const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(2.5);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(50);
        return (
          <Line
            key={`line-${i}`}
            points={points}
            color="#a855f7"
            lineWidth={1.5}
            transparent
            opacity={0.4}
          />
        );
      })}
    </group>
  );
}

export default function GlobeSection() {
  return (
    <section className="relative w-full py-32 overflow-hidden bg-slate-950 flex flex-col items-center justify-center min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_50%)]" />
      
      <div className="relative z-10 text-center mb-12 px-6">
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Routing</span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          Watch cross-border transactions traverse the world in real-time. Our global network connects liquidity nodes instantly, minimizing fees and maximizing speed.
        </p>
      </div>

      <div className="w-full h-[600px] md:h-[800px] relative pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#38bdf8" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />
          <RotatingGlobe />
        </Canvas>
        
        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 pointer-events-none" />
      </div>
    </section>
  );
}
