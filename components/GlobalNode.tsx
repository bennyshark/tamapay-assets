'use client';
import React from 'react';

interface GlobalNodeProps {
  className?: string;
}

export default function GlobalNode({ className = '' }: GlobalNodeProps) {
  return (
    <div className={`relative w-48 h-48 [perspective:1500px] flex items-center justify-center ${className}`}>
      
      {/* Massive Outer Glow */}
      <div className="absolute inset-[-20px] bg-blue-600/20 rounded-full filter blur-[35px]" style={{ animation: 'pulse-slow 4s ease-in-out infinite' }} />

      {/* 3D Container for the Globe */}
      <div 
        className="w-40 h-40 relative [transform-style:preserve-3d]"
        style={{ animation: 'globe-spin 15s linear infinite' }}
      >
        
        {/* Core Glass Sphere */}
        <div className="absolute inset-0 m-auto w-24 h-24 rounded-full bg-blue-500/10 border border-blue-400/30 shadow-[inset_0_0_25px_rgba(96,165,250,0.6),0_0_15px_rgba(59,130,246,0.4)] backdrop-blur-md flex items-center justify-center pointer-events-none">
           <div className="w-12 h-12 bg-cyan-400/20 rounded-full filter blur-[10px]" />
           {/* Subtle TamaPay T engraved in the core */}
           <span className="absolute text-3xl font-black text-blue-300/30 tracking-tighter">T</span>
        </div>

        {/* High-speed Data Stream Ring (Equator) */}
        <div 
          className="absolute inset-[-4px] rounded-full border-[3px] border-dashed border-cyan-400/70 [transform-style:preserve-3d] shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          style={{ transform: 'rotateX(90deg)', animation: 'data-stream 2s linear infinite' }}
        />

        {/* Meridian Ring 1 */}
        <div 
          className="absolute inset-0 border-[2px] border-indigo-400/50 rounded-full [transform-style:preserve-3d]"
          style={{ transform: 'rotateY(0deg)' }}
        >
          {/* Moving Transaction Node */}
          <div className="absolute top-1/2 left-[-4px] w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_#fff,0_0_25px_#60a5fa] -translate-y-1/2" style={{ animation: 'orbit-reverse 4s linear infinite' }} />
        </div>

        {/* Meridian Ring 2 */}
        <div 
          className="absolute inset-0 border-[2px] border-cyan-400/40 rounded-full [transform-style:preserve-3d]"
          style={{ transform: 'rotateY(60deg)' }}
        >
          <div className="absolute bottom-[-4px] left-1/2 w-2.5 h-2.5 bg-yellow-300 rounded-full shadow-[0_0_12px_#fde047,0_0_25px_#f59e0b] -translate-x-1/2" style={{ animation: 'orbit 5s linear infinite' }} />
        </div>

        {/* Meridian Ring 3 */}
        <div 
          className="absolute inset-0 border-[2px] border-blue-300/30 rounded-full [transform-style:preserve-3d]"
          style={{ transform: 'rotateY(120deg)' }}
        />

        {/* Static Hubs with Sonar Pulse */}
        <div className="absolute top-[15%] left-[25%] w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] flex items-center justify-center" style={{ transform: 'translateZ(45px)' }}>
           <div className="absolute w-8 h-8 border border-cyan-400 rounded-full animate-ping opacity-50" />
        </div>
        
        <div className="absolute bottom-[25%] right-[20%] w-3.5 h-3.5 bg-yellow-400 rounded-full shadow-[0_0_15px_#facc15] flex items-center justify-center" style={{ transform: 'translateZ(-45px)' }}>
           <div className="absolute w-10 h-10 border border-yellow-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '1s' }} />
        </div>
        
      </div>

      {/* Outer Orbit Ring (Frosted Glass) */}
      <div 
        className="absolute w-56 h-56 rounded-full border-[2px] border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] [transform-style:preserve-3d]"
        style={{ transform: 'rotateX(75deg)' }}
      >
         {/* Massive Glowing Transaction Packet */}
         <div className="absolute top-[-4px] left-1/2 w-2 h-10 bg-gradient-to-b from-orange-400 via-yellow-400 to-transparent rounded-full -translate-x-1/2 shadow-[0_0_20px_#fb923c,0_0_40px_#facc15]" style={{ animation: 'orbit 2.5s linear infinite', transformOrigin: 'center 112px' }} />
      </div>

      <style>{`
        @keyframes globe-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes data-stream {
          0% { transform: rotateX(90deg) rotateZ(0deg); }
          100% { transform: rotateX(90deg) rotateZ(360deg); }
        }
        @keyframes orbit {
          0% { transform: translateX(-50%) rotate(0deg) translateY(-100px) rotate(0deg); }
          100% { transform: translateX(-50%) rotate(360deg) translateY(-100px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          0% { transform: translateY(-50%) rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: translateY(-50%) rotate(-360deg) translateX(100px) rotate(360deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(0.95); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
