'use client';
import React from 'react';

interface GlobalNodeProps {
  className?: string;
}

export default function GlobalNode({ className = '' }: GlobalNodeProps) {
  // We'll create 3 intersecting rings to form a wireframe globe
  return (
    <div className={`relative w-48 h-48 [perspective:1000px] flex items-center justify-center ${className}`}>
      
      {/* Outer Glow / Atmosphere */}
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[25px] animate-pulse-slow" />

      {/* 3D Container for the Globe */}
      <div 
        className="w-40 h-40 relative [transform-style:preserve-3d]"
        style={{ animation: 'globe-spin 12s linear infinite' }}
      >
        
        {/* Core glowing center */}
        <div className="absolute inset-0 m-auto w-12 h-12 bg-blue-400 rounded-full blur-[10px] opacity-70" />

        {/* Ring 1 - Equator */}
        <div 
          className="absolute inset-0 border-[2px] border-blue-400/50 rounded-full [transform-style:preserve-3d]"
          style={{ transform: 'rotateX(90deg)' }}
        >
          {/* Moving Transaction Node */}
          <div className="absolute top-[-4px] left-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#60a5fa] -translate-x-1/2" style={{ animation: 'orbit 3s linear infinite' }} />
        </div>

        {/* Ring 2 - Meridian 1 */}
        <div 
          className="absolute inset-0 border-[2px] border-indigo-400/50 rounded-full [transform-style:preserve-3d]"
          style={{ transform: 'rotateY(0deg)' }}
        >
          <div className="absolute top-1/2 left-[-4px] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff,0_0_20px_#60a5fa] -translate-y-1/2" style={{ animation: 'orbit-reverse 4s linear infinite' }} />
        </div>

        {/* Ring 3 - Meridian 2 */}
        <div 
          className="absolute inset-0 border-[2px] border-cyan-400/40 rounded-full [transform-style:preserve-3d]"
          style={{ transform: 'rotateY(60deg)' }}
        >
          <div className="absolute bottom-[-4px] left-1/2 w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_#fde047,0_0_20px_#f59e0b] -translate-x-1/2" style={{ animation: 'orbit 5s linear infinite' }} />
        </div>

        {/* Ring 4 - Meridian 3 */}
        <div 
          className="absolute inset-0 border-[2px] border-blue-300/40 rounded-full [transform-style:preserve-3d]"
          style={{ transform: 'rotateY(120deg)' }}
        />

        {/* Static Connection Nodes (Representing international hubs) */}
        <div className="absolute top-[20%] left-[20%] w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee]" style={{ transform: 'translateZ(30px)' }} />
        <div className="absolute bottom-[30%] right-[15%] w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_#facc15]" style={{ transform: 'translateZ(-40px)' }} />
        
      </div>

      {/* Orbit Ring completely outside the globe */}
      <div 
        className="absolute w-56 h-56 border border-white/10 rounded-full [transform-style:preserve-3d]"
        style={{ transform: 'rotateX(75deg) rotateY(-15deg)' }}
      >
         <div className="absolute top-[-3px] left-1/2 w-1.5 h-6 bg-gradient-to-b from-orange-400 to-transparent rounded-full -translate-x-1/2 shadow-[0_0_15px_#fb923c]" style={{ animation: 'orbit 2s linear infinite', transformOrigin: 'center 112px' }} />
      </div>

      <style>{`
        @keyframes globe-spin {
          0% { transform: rotateX(-15deg) rotateY(0deg); }
          100% { transform: rotateX(-15deg) rotateY(360deg); }
        }
        @keyframes orbit {
          0% { transform: translateX(-50%) rotate(0deg) translateY(-100px) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(360deg) translateY(-100px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          0% { transform: translateY(-50%) rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(-360deg) translateX(100px) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
