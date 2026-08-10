'use client';

import React from 'react';

interface InteractiveLogoProps {
  className?: string;
}

export default function InteractiveLogo({ className = '' }: InteractiveLogoProps) {
  return (
    <div className={`relative flex items-center justify-center p-8 ${className}`}>
      
      {/* Soft ambient backlight (premium feel) */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-20">
        <div className="w-24 h-24 bg-blue-400 rounded-full mix-blend-screen filter blur-[40px] animate-pulse-slow" />
        <div className="w-24 h-24 bg-orange-400 rounded-full mix-blend-screen filter blur-[40px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Logo Text Container */}
      <div className="relative flex items-baseline font-sans select-none" style={{ letterSpacing: '-0.03em' }}>
        
        {/* 'Tama' - Trustworthy, premium cool tones */}
        <span 
          className="relative text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-[length:200%_auto]"
          style={{
            backgroundImage: 'linear-gradient(to right, #60a5fa, #a78bfa, #e0e7ff, #60a5fa)',
            animation: 'gradient-slide 5s linear infinite',
          }}
        >
          Tama
        </span>

        {/* 'Pay' - Friendly, energetic warm tones */}
        <span 
          className="relative text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-[length:200%_auto] ml-[2px]"
          style={{
            backgroundImage: 'linear-gradient(to right, #fb923c, #f43f5e, #ffedd5, #fb923c)',
            animation: 'gradient-slide 5s linear infinite reverse',
          }}
        >
          Pay
        </span>

      </div>

      <style>{`
        @keyframes gradient-slide {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; transform: scale(0.9); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
