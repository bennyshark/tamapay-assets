'use client';

import React from 'react';

interface AnimatedWalletProps {
  className?: string;
}

export default function AnimatedWallet({ className = '' }: AnimatedWalletProps) {
  return (
    <div className={`relative w-80 h-56 group cursor-pointer [perspective:1000px] ${className}`}>
      
      {/* Wallet Back */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-[#6b4226] to-[#4a2e1a] rounded-3xl shadow-xl z-10 border-t-2 border-[#8b5a33]"
        style={{ transform: 'rotateX(15deg)', transformOrigin: 'bottom' }}
      />

      {/* Card 1 (Silver Card) */}
      <div 
        className="absolute top-6 left-6 right-6 h-32 bg-gradient-to-br from-gray-100 to-gray-400 rounded-xl z-20 shadow-md transition-all duration-500 ease-out group-hover:-translate-y-20 group-hover:-rotate-3 group-hover:scale-105 border border-white flex flex-col justify-between p-4"
        style={{ transform: 'translateZ(10px) rotateX(10deg)', transformOrigin: 'bottom' }}
      >
        <div className="w-12 h-8 bg-gradient-to-r from-gray-300 to-gray-400 rounded shadow-sm opacity-80" />
        <div className="flex justify-between items-end">
          <div className="text-gray-600 font-mono text-sm">•••• 4567</div>
          <div className="w-10 h-6 bg-red-500/20 rounded-full flex -space-x-3">
            <div className="w-6 h-6 rounded-full bg-red-500 mix-blend-multiply" />
            <div className="w-6 h-6 rounded-full bg-yellow-500 mix-blend-multiply" />
          </div>
        </div>
      </div>

      {/* Card 2 (Gold Card) */}
      <div 
        className="absolute top-12 left-6 right-6 h-32 bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-500 rounded-xl z-30 shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out group-hover:-translate-y-12 group-hover:rotate-2 group-hover:scale-105 border border-yellow-200 flex flex-col justify-between p-4"
        style={{ transform: 'translateZ(20px) rotateX(5deg)', transformOrigin: 'bottom' }}
      >
        <div className="w-12 h-8 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded shadow-sm opacity-80" />
        <div className="flex justify-between items-end">
          <div className="text-yellow-900 font-mono text-sm font-bold">•••• 8901</div>
          <div className="text-yellow-900 font-bold italic">VISA</div>
        </div>
      </div>

      {/* Wallet Front Cover */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-[#8b5a33] to-[#5c3a21] rounded-3xl z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.4)] border-t border-[#a66f43] flex flex-col items-center justify-end pb-4 transition-transform duration-500"
        style={{ transform: 'translateZ(30px) rotateX(-5deg)', transformOrigin: 'bottom' }}
      >
         {/* Stitching detail */}
         <div className="w-[90%] h-full absolute top-2 border-t-2 border-l-2 border-r-2 border-dashed border-[#4a2e1a] opacity-30 rounded-t-xl pointer-events-none" />
         
         <div className="bg-[#4a2e1a] px-4 py-1 rounded text-[#a66f43] font-bold tracking-[0.2em] text-sm shadow-inner opacity-80 z-10 mb-2">
           TAMAPAY
         </div>
      </div>

    </div>
  );
}
