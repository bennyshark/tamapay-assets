'use client';
import React, { useState, useEffect } from 'react';

interface SecureVaultProps {
  className?: string;
}

export default function SecureVault({ className = '' }: SecureVaultProps) {
  // We'll stack some metallic rings to create a 3D vault dial
  const layers = 15;
  const thickness = 14;
  const [unlocked, setUnlocked] = useState(false);

  // Simulate scanning -> unlocking
  useEffect(() => {
    const interval = setInterval(() => {
      setUnlocked(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={`relative w-48 h-48 [perspective:1500px] flex items-center justify-center ${className}`}>
      
      {/* Container slightly tilted */}
      <div 
        className="w-48 h-48 relative [transform-style:preserve-3d]"
        style={{ transform: 'rotateX(0deg) rotateY(0deg)' }}
      >
        {/* Dynamic Shadow */}
        <div 
          className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-48 h-12 bg-black/80 filter blur-[20px] rounded-[50%]"
        />

        {/* The Outer Dial Body */}
        <div 
          className="w-full h-full absolute inset-0 [transform-style:preserve-3d]"
          style={{ animation: 'vault-spin-outer 6s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite alternate' }}
        >
          {/* Edge Layers */}
          {Array.from({ length: layers }).map((_, i) => {
            const zOffset = (i / (layers - 1)) * (thickness * 2) - thickness;
            return (
              <div 
                key={i}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ 
                  transform: `translateZ(${zOffset}px)`,
                  background: 'repeating-conic-gradient(from 0deg, #3f3f46 0deg 3deg, #18181b 3deg 6deg)', // Deeply ridged metal
                }}
              />
            );
          })}

          {/* Front Face (Outer Ring) */}
          <div 
            className="absolute inset-0 rounded-full flex items-center justify-center border-4 border-[#71717a] overflow-hidden"
            style={{ 
              transform: `translateZ(${thickness + 0.5}px)`, 
              background: 'radial-gradient(ellipse at center, #71717a 0%, #27272a 100%)',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9)'
            }}
          >
            {/* Outer Tick Marks */}
            <div className="absolute inset-1 border-[6px] border-dashed border-zinc-400/40 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 mix-blend-overlay pointer-events-none" style={{ animation: 'sweep 3s linear infinite' }} />
            
            {/* Middle Parallax Ring */}
            <div 
              className="absolute inset-4 rounded-full border-4 border-[#3f3f46] shadow-[0_5px_15px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(0,0,0,0.9)] bg-gradient-to-b from-[#27272a] to-[#18181b] flex items-center justify-center"
              style={{ animation: 'vault-spin-inner 8s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate' }}
            >
               {/* Inner Tick Marks */}
               <div className="absolute inset-2 border-[2px] border-dashed border-zinc-500/50 rounded-full" />

               {/* Center Core Lock Area */}
              <div 
                className="w-20 h-20 bg-zinc-950 rounded-full shadow-[inset_0_5px_15px_rgba(0,0,0,1)] border-2 border-zinc-700 flex items-center justify-center relative overflow-hidden"
                style={{ animation: 'vault-spin-core 10s linear infinite' }}
              >
                {/* Scanner Laser (Visible when scanning) */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent h-[20px] w-full transition-opacity duration-300 ${unlocked ? 'opacity-0' : 'opacity-100'}`} 
                  style={{ animation: 'scan-laser 2s linear infinite' }} 
                />

                {/* Status Glow (Green when unlocked, blue when scanning) */}
                <div 
                  className={`absolute inset-0 rounded-full filter blur-[15px] transition-colors duration-500 ${unlocked ? 'bg-green-500/40 animate-pulse-slow' : 'bg-blue-500/20'}`} 
                />
                
                {/* Fingerprint / Shield Switcher */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                   {unlocked ? (
                      <div className="flex items-center justify-center animate-fade-in drop-shadow-[0_0_10px_rgba(74,222,128,0.9)]">
                        {/* Custom T Shield */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-10 h-10 text-green-400">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                           <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6m-3 0v6" />
                        </svg>
                      </div>
                   ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400 opacity-80 animate-pulse-slow drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                   )}
                </div>

              </div>
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
        @keyframes vault-spin-outer {
          0% { transform: rotateZ(0deg); }
          30% { transform: rotateZ(180deg); }
          60% { transform: rotateZ(45deg); }
          100% { transform: rotateZ(360deg); }
        }
        @keyframes vault-spin-inner {
          0% { transform: rotateZ(0deg); }
          40% { transform: rotateZ(-120deg); }
          80% { transform: rotateZ(90deg); }
          100% { transform: rotateZ(-360deg); }
        }
        @keyframes vault-spin-core {
          0% { transform: rotateZ(0deg); }
          100% { transform: rotateZ(-360deg); }
        }
        @keyframes sweep {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes scan-laser {
          0% { transform: translateY(-30px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(70px); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
