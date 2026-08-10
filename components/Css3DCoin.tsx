'use client';

import React from 'react';

interface Css3DCoinProps {
  className?: string;
  coinText?: string;
}

export default function Css3DCoin({ className = '', coinText = '$' }: Css3DCoinProps) {
  return (
    <div className={`relative w-48 h-48 [perspective:1000px] ${className}`}>
      {/* Coin Container with 3D space and infinite spin */}
      <div 
        className="w-full h-full relative [transform-style:preserve-3d]"
        style={{ animation: 'spin-y 4s linear infinite' }}
      >
        
        {/* Front Face */}
        <div 
          className="absolute inset-0 rounded-full border-8 border-yellow-500 bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"
          style={{ transform: 'translateZ(10px)' }}
        >
          <div className="w-36 h-36 rounded-full border-2 border-yellow-600 border-dashed flex items-center justify-center opacity-70">
            <span className="text-6xl font-bold text-yellow-700">{coinText}</span>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 rounded-full border-8 border-yellow-500 bg-gradient-to-br from-yellow-500 to-yellow-300 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]"
          style={{ transform: 'translateZ(-10px) rotateY(180deg)' }}
        >
          <div className="w-36 h-36 rounded-full border-2 border-yellow-600 border-dashed flex items-center justify-center opacity-70">
            <span className="text-6xl font-bold text-yellow-700">{coinText}</span>
          </div>
        </div>
        
        {/* Edges (Simulating 3D thickness with stacked circles) */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute inset-0 rounded-full border-[10px] border-yellow-600 bg-transparent opacity-80"
            style={{ transform: `translateZ(${(i - 10)}px)` }}
          />
        ))}
      </div>
      
      {/* Custom Keyframes */}
      <style>{`
        @keyframes spin-y {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
