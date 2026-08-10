'use client';

import React, { useState, useRef, MouseEvent } from 'react';

interface AnimatedWalletProps {
  className?: string;
}

export default function AnimatedWallet({ className = '' }: AnimatedWalletProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRotation, setCardRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCardRotation({ 
      x: -(y / (rect.height / 2)) * 10, 
      y: (x / (rect.width / 2)) * 10 
    });
  };

  return (
    <div 
      className={`relative w-56 h-48 [perspective:1500px] flex items-center justify-center cursor-pointer group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setCardRotation({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
    >
      
      {/* Dynamic Leather Noise Filter */}
      <svg className="hidden">
        <filter id="leather-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.15 0" />
        </filter>
      </svg>

      {/* Main 3D Wrapper */}
      <div 
        className="w-full h-full relative [transform-style:preserve-3d] transition-transform duration-700 ease-out"
        style={{ transform: isHovered ? 'rotateX(20deg) translateY(10px) translateZ(-20px)' : 'rotateX(0deg) translateY(0px)' }}
      >
        
        {/* Floor Shadow */}
        <div className="absolute bottom-[-60px] left-[-20px] w-64 h-32 bg-black/80 blur-[25px] rounded-[50%] transition-opacity duration-500" style={{ opacity: isHovered ? 0.9 : 0.5 }} />

        {/* Back Cover of Wallet (Textured Leather) */}
        <div 
          className="absolute inset-0 bg-[#2a1b10] rounded-3xl border border-[#4a2e1a] shadow-2xl overflow-hidden"
          style={{ transform: 'translateZ(-10px)' }}
        >
           {/* Leather Texture Overlay */}
           <div className="absolute inset-0 mix-blend-overlay" style={{ filter: 'url(#leather-noise)' }} />
           {/* Inner soft lining */}
           <div className="absolute inset-2 border border-[#4a2e1a]/30 rounded-2xl bg-[#1a0f08]" />
        </div>

        {/* The Black Card (Levitates when hovered) */}
        <div 
          ref={cardRef}
          className="absolute top-4 left-1/2 w-[80%] h-[60%] rounded-xl [transform-style:preserve-3d] transition-all duration-500 ease-out z-20 flex flex-col justify-between p-3 overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, rgba(30,30,30,0.9) 0%, rgba(10,10,10,0.95) 100%)',
            boxShadow: isHovered ? '0 30px 40px rgba(0,0,0,0.6), inset 0 1px 1px rgba(255,255,255,0.2)' : '0 5px 10px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)',
            transform: isHovered 
              ? `translateX(-50%) translateZ(15px) translateY(-50px) rotateX(${cardRotation.x}deg) rotateY(${cardRotation.y}deg)` 
              : `translateX(-50%) translateZ(10px) translateY(0px)`,
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          {/* Card Holographic Sheen */}
          <div 
            className="absolute top-1/2 left-1/2 bg-gradient-to-tr from-transparent via-white/10 to-transparent w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 mix-blend-overlay pointer-events-none rounded-xl"
            style={{ 
              transform: isHovered ? `translateX(calc(-50% + ${cardRotation.y * 3}px)) translateY(calc(-50% + ${cardRotation.x * -3}px))` : 'translateX(-50%) translateY(-50%)',
              transition: 'transform 0.1s'
            }}
          />

          {/* EMV Chip */}
          <div className="w-8 h-6 rounded bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 border border-yellow-700 flex flex-col justify-between p-[2px] shadow-[0_0_5px_rgba(250,204,21,0.5)]">
            <div className="w-full h-[1px] bg-yellow-700/50" />
            <div className="w-full h-[1px] bg-yellow-700/50" />
            <div className="w-full flex justify-between"><div className="w-[1px] h-full bg-yellow-700/50" /><div className="w-[1px] h-full bg-yellow-700/50" /></div>
          </div>

          {/* Card Details */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center w-full">
              <div className="text-white/80 font-mono text-xs tracking-[0.2em] drop-shadow-md">
                5412 75** **** 9912
              </div>
              <div className="w-8 h-5 flex relative">
                 <div className="absolute left-0 w-5 h-5 rounded-full bg-red-500/80 mix-blend-screen" />
                 <div className="absolute right-0 w-5 h-5 rounded-full bg-orange-500/80 mix-blend-screen" />
              </div>
            </div>
            
            {/* Glowing T Logo embedded in card */}
            <div className="mt-2 text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)] opacity-90 text-right w-full">
              TamaPay
            </div>
          </div>
        </div>

        {/* Front Cover of Wallet (Textured Leather) */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[65%] bg-[#3d2716] rounded-3xl rounded-t-xl z-30 shadow-[0_-15px_30px_rgba(0,0,0,0.6)] border-t border-[#6b4c30] flex flex-col items-center justify-end pb-4 transition-transform duration-700 ease-out overflow-hidden"
          style={{ transform: isHovered ? 'translateZ(25px) rotateX(-12deg)' : 'translateZ(20px) rotateX(-5deg)', transformOrigin: 'bottom' }}
        >
           {/* Leather Texture */}
           <div className="absolute inset-0 mix-blend-overlay opacity-80" style={{ filter: 'url(#leather-noise)' }} />

           {/* Stitching */}
           <div className="w-[92%] h-full absolute top-2 border-t-2 border-l-2 border-r-2 border-dashed border-[#1a0f08] opacity-50 rounded-t-xl pointer-events-none" />
           
           {/* Embossed Metallic Logo Badge */}
           <div className="relative bg-gradient-to-b from-[#b48a43] to-[#8b6508] px-6 py-2 rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] border border-[#4a2e1a] z-10 mb-2 overflow-hidden flex items-center justify-center">
             <div className="absolute top-1/2 left-1/2 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2" style={{ animation: 'sweep 3s linear infinite' }} />
             <span className="text-[#3d2716] font-bold tracking-[0.25em] text-xs drop-shadow-[0_1px_0_rgba(255,255,255,0.2)]">
               TAMAPAY
             </span>
           </div>
        </div>

      </div>

      <style>{`
        @keyframes sweep {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
