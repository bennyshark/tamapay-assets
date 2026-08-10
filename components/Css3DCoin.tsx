'use client';

import React from 'react';

interface Css3DCoinProps {
  className?: string;
}

export default function Css3DCoin({ className = '' }: Css3DCoinProps) {
  // Generate 30 ultra-thin layers to create smooth 3D thickness
  const edgeLayers = 30;
  const thickness = 12; // Positive and negative max Z-translation

  return (
    <div className={`relative w-48 h-48 [perspective:1200px] ${className}`}>
      
      {/* Dynamic floor shadow - Anchors the slanted coin */}
      <div 
        className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-48 h-16 bg-black/60 filter blur-[20px] rounded-[50%]"
        style={{ animation: 'pulse-shadow 4s ease-in-out infinite' }}
      />

      {/* Main Slanted Container - creates the tilt */}
      <div 
        className="w-full h-full relative [transform-style:preserve-3d]"
        style={{ transform: 'rotateZ(-45deg) rotateX(15deg)' }}
      >
        
        {/* Ambient back glow hitting the tilted coin */}
        <div 
          className="absolute inset-0 rounded-full bg-orange-500/30 filter blur-[30px]"
          style={{ transform: 'translateZ(-40px)' }}
        />

        {/* The Spinning Coin Object (Rotates on Y axis, which looks diagonal due to Z rotation) */}
        <div 
          className="w-full h-full absolute inset-0 [transform-style:preserve-3d]"
          style={{ animation: 'spin-y 5s linear infinite' }}
        >
          
          {/* Edge Layers (The ribbed metallic thickness of the coin) */}
          {Array.from({ length: edgeLayers }).map((_, i) => {
            const zOffset = (i / (edgeLayers - 1)) * (thickness * 2) - thickness;
            return (
              <div 
                key={i}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ 
                  transform: `translateZ(${zOffset}px)`,
                  // Repeating conic gradient creates highly realistic ribbed metallic edges
                  background: 'repeating-conic-gradient(from 0deg, #d4af37 0deg 2deg, #8b6508 2deg 4deg, #b8860b 4deg 6deg)',
                }}
              />
            );
          })}

          {/* Front Face */}
          <div 
            className="absolute inset-0 rounded-full flex items-center justify-center border-[3px] border-[#8b6508] overflow-hidden"
            style={{ 
              transform: `translateZ(${thickness + 0.5}px)`, 
              background: 'radial-gradient(ellipse at center, #ffe066 0%, #d4af37 60%, #a67c00 100%)',
              boxShadow: 'inset 0 0 25px rgba(139, 101, 8, 0.8)'
            }}
          >
            {/* Light sweep effect across the face */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 opacity-60" style={{ animation: 'sweep 5s linear infinite' }} />

            {/* Recessed Inner Ring */}
            <div className="w-36 h-36 rounded-full border border-[#d4af37]/30 flex items-center justify-center shadow-[inset_0_4px_15px_rgba(0,0,0,0.3)] bg-gradient-to-br from-[#ffd700]/5 to-[#8b6508]/10 relative z-10">
              
              {/* Premium TamaPay "T" Branding */}
              <span 
                className="text-[5.5rem] font-black tracking-tighter"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #e0e7ff)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(2px 4px 3px rgba(0,0,0,0.5)) drop-shadow(-1px -1px 1px rgba(255,255,255,0.3))'
                }}
              >
                T
              </span>
            </div>
          </div>

          {/* Back Face (Flipped to render correctly on the back) */}
          <div 
            className="absolute inset-0 rounded-full flex items-center justify-center border-[3px] border-[#8b6508] overflow-hidden"
            style={{ 
              transform: `translateZ(${-(thickness + 0.5)}px) rotateY(180deg)`, 
              background: 'radial-gradient(ellipse at center, #ffe066 0%, #d4af37 60%, #a67c00 100%)',
              boxShadow: 'inset 0 0 25px rgba(139, 101, 8, 0.8)'
            }}
          >
            {/* Light sweep effect across the face */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 opacity-60" style={{ animation: 'sweep 5s linear infinite reverse' }} />

            {/* Recessed Inner Ring */}
            <div className="w-36 h-36 rounded-full border border-[#d4af37]/30 flex items-center justify-center shadow-[inset_0_4px_15px_rgba(0,0,0,0.3)] bg-gradient-to-br from-[#ffd700]/5 to-[#8b6508]/10 relative z-10">
              
              {/* Premium TamaPay "T" Branding */}
              <span 
                className="text-[5.5rem] font-black tracking-tighter"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa, #a78bfa, #e0e7ff)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  filter: 'drop-shadow(2px 4px 3px rgba(0,0,0,0.5)) drop-shadow(-1px -1px 1px rgba(255,255,255,0.3))'
                }}
              >
                T
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Animations */}
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
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
