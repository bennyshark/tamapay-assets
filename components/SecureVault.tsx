'use client';
import React from 'react';

interface SecureVaultProps {
  className?: string;
}

export default function SecureVault({ className = '' }: SecureVaultProps) {
  // We'll stack some metallic rings to create a 3D vault dial
  const layers = 15;
  const thickness = 10;
  
  return (
    <div className={`relative w-48 h-48 [perspective:1000px] flex items-center justify-center ${className}`}>
      
      {/* Container slightly tilted */}
      <div 
        className="w-40 h-40 relative [transform-style:preserve-3d]"
        style={{ transform: 'rotateX(30deg) rotateY(-20deg)' }}
      >
        {/* Dynamic Shadow */}
        <div 
          className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-40 h-10 bg-black/50 filter blur-[15px] rounded-[50%]"
        />

        {/* The Dial Object */}
        <div 
          className="w-full h-full absolute inset-0 [transform-style:preserve-3d]"
          style={{ animation: 'vault-spin 4s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite alternate' }}
        >
          {/* Edge Layers */}
          {Array.from({ length: layers }).map((_, i) => {
            const zOffset = (i / (layers - 1)) * (thickness * 2) - thickness;
            return (
              <div 
                key={i}
                className="absolute inset-0 rounded-full"
                style={{ 
                  transform: `translateZ(${zOffset}px)`,
                  background: 'repeating-conic-gradient(from 0deg, #3f3f46 0deg 4deg, #18181b 4deg 8deg)', // Ridged metal
                }}
              />
            );
          })}

          {/* Front Face of the Dial */}
          <div 
            className="absolute inset-0 rounded-full flex items-center justify-center border-4 border-[#52525b] overflow-hidden"
            style={{ 
              transform: `translateZ(${thickness + 0.5}px)`, 
              background: 'radial-gradient(ellipse at center, #71717a 0%, #27272a 100%)',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.8)'
            }}
          >
            {/* Dial marks */}
            <div className="absolute inset-1 border-[4px] border-dashed border-zinc-400/30 rounded-full" />
            
            {/* Center Lock / Shield */}
            <div className="w-20 h-20 bg-zinc-900 rounded-full shadow-[inset_0_4px_10px_rgba(0,0,0,1)] border border-zinc-700 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full filter blur-[10px]" style={{ animation: 'pulse-slow 2s infinite' }} />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          
          {/* Base of dial (back face) */}
          <div 
            className="absolute inset-0 rounded-full border-4 border-[#27272a] bg-zinc-800"
            style={{ transform: `translateZ(${-(thickness + 0.5)}px)` }}
          />

        </div>
      </div>

      <style>{`
        @keyframes vault-spin {
          0% { transform: rotateZ(0deg); }
          30% { transform: rotateZ(120deg); }
          60% { transform: rotateZ(45deg); }
          100% { transform: rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
}
