'use client';
import React from 'react';

interface Css3DCoinProps {
  className?: string;
}

export default function Css3DCoin({ className = '' }: Css3DCoinProps) {
  // Generate 35 ultra-thin layers to create smooth 3D thickness
  const edgeLayers = 35;
  const thickness = 14; 

  return (
    <div className={`relative w-48 h-48 [perspective:1500px] flex items-center justify-center ${className}`}>
      
      {/* Dynamic floor shadow */}
      <div 
        className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 w-48 h-12 bg-black/80 filter blur-[20px] rounded-[50%]"
        style={{ animation: 'pulse-shadow 5s ease-in-out infinite' }}
      />

      {/* Floating Particles in 3D Space */}
      <div className="absolute inset-[-60px] pointer-events-none [transform-style:preserve-3d] z-0">
         <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-yellow-300 rounded-full blur-[1px] shadow-[0_0_15px_#facc15]" style={{ animation: 'particle-orbit 6s linear infinite', transformOrigin: '0px 120px' }} />
         <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-blue-300 rounded-full blur-[1px] shadow-[0_0_15px_#60a5fa]" style={{ animation: 'particle-orbit 8s linear infinite reverse', transformOrigin: '90px -60px' }} />
      </div>

      {/* Main Slanted Container */}
      <div 
        className="w-full h-full relative [transform-style:preserve-3d] z-10"
        style={{ transform: 'rotateZ(-45deg) rotateX(25deg)' }}
      >
        {/* Ambient back glow hitting the tilted coin */}
        <div 
          className="absolute inset-0 rounded-full bg-yellow-500/20 filter blur-[40px]"
          style={{ transform: 'translateZ(-50px)' }}
        />

        {/* The Spinning Coin Object */}
        <div 
          className="w-full h-full absolute inset-0 [transform-style:preserve-3d]"
          style={{ animation: 'spin-y 7s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
          {/* Edge Layers (Ribbed metallic thickness) */}
          {Array.from({ length: edgeLayers }).map((_, i) => {
            const zOffset = (i / (edgeLayers - 1)) * (thickness * 2) - thickness;
            return (
              <div 
                key={i}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ 
                  transform: `translateZ(${zOffset}px)`,
                  background: 'repeating-conic-gradient(from 0deg, #d4af37 0deg 2deg, #8b6508 2deg 4deg, #b8860b 4deg 5deg, #fcd34d 5deg 6deg)',
                }}
              />
            );
          })}

          {/* Front Face */}
          <div 
            className="absolute inset-0 rounded-full flex items-center justify-center border-[4px] border-[#a67c00] overflow-hidden"
            style={{ 
              transform: `translateZ(${thickness + 0.5}px)`, 
              background: 'radial-gradient(ellipse at center, #ffe066 0%, #d4af37 45%, #8b6508 100%)',
              boxShadow: 'inset 0 0 35px rgba(80, 50, 0, 0.9)'
            }}
          >
             {/* Sweep Light Effect */}
            <div className="absolute top-1/2 left-1/2 bg-gradient-to-tr from-transparent via-white/80 to-transparent w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 mix-blend-overlay pointer-events-none" style={{ animation: 'sweep 4s linear infinite' }} />

            {/* Guilloché Pattern (intricate inner rings) */}
            <div className="w-[70%] h-[70%] rounded-full border-2 border-[#d4af37]/60 shadow-[inset_0_5px_20px_rgba(0,0,0,0.6)] flex items-center justify-center relative z-10"
                 style={{ background: 'repeating-radial-gradient(circle at center, transparent 0, transparent 4px, rgba(212,175,55,0.15) 5px, transparent 6px)' }}>
              
              {/* Premium TamaPay "T" Branding */}
              <span 
                className="text-[6.5rem] font-black tracking-tighter"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #e0e7ff 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(3px 6px 5px rgba(0,0,0,0.7)) drop-shadow(-1px -1px 2px rgba(255,255,255,0.6))',
                  animation: 'holo-shift 3s ease infinite alternate'
                }}
              >
                T
              </span>
            </div>
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-0 rounded-full flex items-center justify-center border-[4px] border-[#a67c00] overflow-hidden"
            style={{ 
              transform: `translateZ(${-(thickness + 0.5)}px) rotateY(180deg)`, 
              background: 'radial-gradient(ellipse at center, #ffe066 0%, #d4af37 45%, #8b6508 100%)',
              boxShadow: 'inset 0 0 35px rgba(80, 50, 0, 0.9)'
            }}
          >
            <div className="absolute top-1/2 left-1/2 bg-gradient-to-tr from-transparent via-white/80 to-transparent w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 mix-blend-overlay pointer-events-none" style={{ animation: 'sweep 4s linear infinite reverse' }} />
            <div className="w-[70%] h-[70%] rounded-full border-2 border-[#d4af37]/60 shadow-[inset_0_5px_20px_rgba(0,0,0,0.6)] flex items-center justify-center relative z-10"
                 style={{ background: 'repeating-radial-gradient(circle at center, transparent 0, transparent 4px, rgba(212,175,55,0.15) 5px, transparent 6px)' }}>
              <span 
                className="text-[6.5rem] font-black tracking-tighter"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #e0e7ff 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(3px 6px 5px rgba(0,0,0,0.7)) drop-shadow(-1px -1px 2px rgba(255,255,255,0.6))',
                  animation: 'holo-shift 3s ease infinite alternate'
                }}
              >
                T
              </span>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes spin-y {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes sweep {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes pulse-shadow {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.9; transform: translateX(-50%) scale(1.1); }
        }
        @keyframes holo-shift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes particle-orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-y 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
