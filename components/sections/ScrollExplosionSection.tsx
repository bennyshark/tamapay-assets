'use client';

import React, { useRef, useLayoutEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Html } from '@react-three/drei';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import * as THREE from 'three';

// A single hardware layer of the card
function CardLayer({ 
  positionZ, 
  progress, 
  layerIndex, 
  color, 
  title, 
  desc 
}: { 
  positionZ: number, 
  progress: any, 
  layerIndex: number,
  color: string,
  title: string,
  desc: string
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetZ = useRef(0);
  const targetY = useRef(0);
  const targetRotX = useRef(0);
  const targetRotY = useRef(0);

  // We subscribe to framer-motion's progress value
  useLayoutEffect(() => {
    return progress.onChange((latest: number) => {
      // 0 = stacked, 1 = exploded
      // When exploded, layers spread out on Z, move down slightly on Y, and tilt
      const spreadZ = positionZ + (layerIndex - 1.5) * 4 * latest;
      const spreadY = (layerIndex - 1.5) * -1.5 * latest;
      const rotX = -0.5 * latest;
      const rotY = 0.5 * latest;
      
      targetZ.current = spreadZ;
      targetY.current = spreadY;
      targetRotX.current = rotX;
      targetRotY.current = rotY;
    });
  }, [progress, positionZ, layerIndex]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly interpolate to target values
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ.current, 4, delta);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY.current, 4, delta);
      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX.current, 4, delta);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY.current, 4, delta);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, positionZ]}>
      {/* The physical layer */}
      <RoundedBox args={[6, 3.8, 0.1]} radius={0.2} smoothness={4}>
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2} 
          transparent={layerIndex === 3}
          opacity={layerIndex === 3 ? 0.3 : 1}
        />
      </RoundedBox>

      {/* Internal details based on layer */}
      {layerIndex === 0 && (
         <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[5.8, 3.6]} />
            <meshBasicMaterial color="#111" />
         </mesh>
      )}
      {layerIndex === 1 && (
         <mesh position={[-2, 0, 0.06]}>
            <boxGeometry args={[0.8, 0.6, 0.02]} />
            <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} />
         </mesh>
      )}
      {layerIndex === 2 && (
         <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[5, 3]} />
            <meshBasicMaterial color="#3b82f6" wireframe />
         </mesh>
      )}
      {layerIndex === 3 && (
         <Text position={[-1.5, -1, 0.1]} fontSize={0.3} color="white" anchorX="left">
            TamaPay Black
         </Text>
      )}

      {/* HTML Annotation that fades in when exploded */}
      <Html position={[3.5, 0, 0]} center transform style={{ transition: 'opacity 0.3s' }}>
        <div style={{ opacity: targetZ.current > positionZ + 0.5 || targetZ.current < positionZ - 0.5 ? 1 : 0 }} className="w-48 p-4 bg-black/80 backdrop-blur-md border border-white/20 rounded-xl pointer-events-none transition-opacity duration-300">
           <h4 className="text-white font-bold mb-1">{title}</h4>
           <p className="text-xs text-zinc-400">{desc}</p>
        </div>
      </Html>
    </group>
  );
}

function ExplodingCardScene({ scrollProgress }: { scrollProgress: any }) {
  // Use a smooth spring on the scroll progress so the 3D explosion is buttery
  const smoothProgress = useSpring(scrollProgress, { damping: 20, stiffness: 100, mass: 0.2 });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#a855f7" />
      
      <group rotation={[0, 0, 0]}>
        {/* Base Layer */}
        <CardLayer positionZ={-0.3} progress={smoothProgress} layerIndex={0} color="#09090b" title="Titanium Base" desc="Aerospace-grade structural integrity." />
        {/* Secure Enclave Chip */}
        <CardLayer positionZ={-0.1} progress={smoothProgress} layerIndex={1} color="#18181b" title="Secure Enclave" desc="Hardware encryption for private keys." />
        {/* Antenna / Routing */}
        <CardLayer positionZ={0.1} progress={smoothProgress} layerIndex={2} color="#27272a" title="NFC Antenna" desc="Global near-field transaction routing." />
        {/* Gorilla Glass Top */}
        <CardLayer positionZ={0.3} progress={smoothProgress} layerIndex={3} color="#ffffff" title="Sapphire Glass" desc="Scratch-resistant biometric surface." />
      </group>
    </>
  );
}

export default function ScrollExplosionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll through this 300vh tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative w-full h-[300vh] bg-black">
      
      {/* The sticky 3D canvas */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Background ambient glow tied to scroll */}
        <motion.div 
           className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1)_0%,transparent_50%)]"
           style={{ opacity: scrollYProgress }}
        />

        <div className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-10 w-full px-6">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 drop-shadow-2xl">
            Unpack the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Hardware</span>
          </h2>
          <motion.p 
            className="text-zinc-400 text-lg max-w-xl mx-auto"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          >
            Scroll down to disassemble the TamaPay Black Card.
          </motion.p>
        </div>

        <div className="w-full h-full max-w-6xl mx-auto">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <ExplodingCardScene scrollProgress={scrollYProgress} />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
