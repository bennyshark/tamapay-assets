'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function DockIcon({ mouseX, label, icon }: { mouseX: any, label: string, icon: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Calculate distance from mouse to the center of this icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate scaling based on distance using a bell curve (cosine or max)
  const widthSync = useTransform(distance, [-150, 0, 150], [60, 120, 60]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const heightSync = useTransform(distance, [-150, 0, 150], [60, 120, 60]);
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative group flex flex-col items-center">
      {/* Tooltip Label */}
      <motion.div 
        className="absolute -top-12 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
        initial={{ y: 10 }}
        whileHover={{ y: 0 }}
      >
        {label}
      </motion.div>

      {/* 3D Glass Icon */}
      <motion.div
        ref={ref}
        style={{ width, height }}
        className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(255,255,255,0.4)] cursor-pointer"
        whileHover={{
          translateY: -10,
          rotateX: 15,
          boxShadow: '0 20px 40px rgba(0,0,0,0.8), inset 0 2px 20px rgba(255,255,255,0.8)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {icon}
      </motion.div>
    </div>
  );
}

export default function PhysicsDockSection() {
  const mouseX = useMotionValue(Infinity);

  return (
    <section className="relative w-full py-48 bg-zinc-950 flex flex-col items-center justify-center overflow-hidden [perspective:1000px]">
      
      {/* Volumetric Spotlight background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.15)_0%,transparent_50%)] pointer-events-none" />

      <div className="text-center mb-32 z-10">
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
          The <span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-indigo-600">OS for Money</span>
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Manage all your financial applications from a single, unified operating system interface.
        </p>
      </div>

      {/* Physics Dock Container */}
      <motion.div 
        className="flex items-end gap-4 p-4 rounded-3xl bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_2px_15px_rgba(255,255,255,0.05)] relative z-20"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ rotateX: 45, translateY: 50, opacity: 0 }}
        whileInView={{ rotateX: 0, translateY: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <DockIcon 
          mouseX={mouseX} 
          label="Vault Storage" 
          icon={<svg className="w-1/2 h-1/2 text-emerald-400 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} 
        />
        <DockIcon 
          mouseX={mouseX} 
          label="Global Transfers" 
          icon={<svg className="w-1/2 h-1/2 text-cyan-400 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} 
        />
        <DockIcon 
          mouseX={mouseX} 
          label="Analytics" 
          icon={<svg className="w-1/2 h-1/2 text-violet-400 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} 
        />
        <DockIcon 
          mouseX={mouseX} 
          label="Team Access" 
          icon={<svg className="w-1/2 h-1/2 text-pink-400 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} 
        />
        <DockIcon 
          mouseX={mouseX} 
          label="API Settings" 
          icon={<svg className="w-1/2 h-1/2 text-orange-400 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>} 
        />
      </motion.div>

    </section>
  );
}
