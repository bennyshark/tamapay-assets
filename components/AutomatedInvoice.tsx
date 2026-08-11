'use client';
import React, { useState, useEffect } from 'react';

interface AutomatedInvoiceProps {
  className?: string;
}

export default function AutomatedInvoice({ className = '' }: AutomatedInvoiceProps) {
  const [stampVisible, setStampVisible] = useState(false);
  const [shake, setShake] = useState(false);

  // Sync the stamp with the scanning animation (4s cycle)
  useEffect(() => {
    const cycleTime = 4000;
    const stampTiming = 2800; // Stamp hits slightly before the scan ends
    
    const interval = setInterval(() => {
      setStampVisible(false);
      setTimeout(() => {
        setStampVisible(true);
        // Trigger impact shake
        setShake(true);
        setTimeout(() => setShake(false), 300);
      }, stampTiming);
    }, cycleTime);

    // Initial trigger
    setTimeout(() => {
      setStampVisible(true);
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }, stampTiming);

    return () => clearInterval(interval);
  }, []);

  const impactEasing = 'cubic-bezier(0.1, 1.2, 0.3, 1)'; // Violent snap

  return (
    <div className={`relative w-64 h-72 [perspective:1200px] flex items-center justify-center ${className}`}>
      
      {/* SVG Filters for paper and glass */}
      <svg className="hidden">
        <defs>
          <filter id="tactile-paper">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 1 0 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise" />
            <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* Floor Shadow */}
      <div 
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-48 h-10 bg-cyan-900/40 filter blur-[20px] rounded-[50%] transition-transform duration-300"
        style={{ 
          animation: 'float-shadow 4s ease-in-out infinite',
          transform: shake ? 'scale(1.15) translateX(-45%)' : 'scale(1) translateX(-50%)'
        }}
      />

      {/* Floating Document with Impact Shake (overflow-hidden removed so stamp can overflow) */}
      <div 
        className="w-44 h-60 relative [transform-style:preserve-3d] rounded-xl border border-white/40 flex flex-col p-5 transition-all"
        style={{ 
          transform: `rotateX(0deg) rotateY(0deg) ${shake ? 'translateY(5px) rotateZ(-1deg)' : 'translateY(0)'}`,
          animation: shake ? 'none' : 'float-doc 4s ease-in-out infinite',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
          backdropFilter: 'blur(25px) saturate(150%)',
          boxShadow: '0 30px 50px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.2)',
          filter: 'url(#tactile-paper)'
        }}
      >
        {/* Document Header (Building Icon for Real Estate) */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/50 to-indigo-700/50 mb-5 flex items-center justify-center border border-indigo-400/50 shadow-[0_5px_15px_rgba(99,102,241,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent h-1/2" />
          <svg className="w-6 h-6 text-indigo-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>

        {/* Document Lines (Skeleton UI) */}
        <div className="space-y-4 flex-1 relative z-10">
          <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 w-full translate-x-[-100%]" style={{ animation: 'fill-line 4s linear infinite' }} />
          </div>
          <div className="h-2.5 w-3/4 bg-white/10 rounded-full overflow-hidden relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 w-full translate-x-[-100%]" style={{ animation: 'fill-line 4s linear infinite 0.2s' }} />
          </div>
          <div className="h-2.5 w-5/6 bg-white/10 rounded-full overflow-hidden relative shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]">
             <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 w-full translate-x-[-100%]" style={{ animation: 'fill-line 4s linear infinite 0.4s' }} />
          </div>
        </div>
        
        {/* Footer/Total (Lights up green on approval) */}
        <div className="mt-auto pt-4 border-t border-white/20 flex justify-between items-end relative overflow-hidden z-10">
          <div className="h-3 w-14 bg-white/10 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />
          <div className="h-5 w-20 bg-emerald-900/40 rounded-md border border-emerald-500/50 overflow-hidden relative shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-300 w-full translate-x-[-100%] mix-blend-screen" style={{ animation: 'fill-line 4s linear infinite 0.6s' }} />
          </div>
        </div>

        {/* The 3D Verified Stamp (Violent Impact) */}
        <div 
           className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300`}
           style={{ 
             transform: stampVisible ? 'translate(-50%, -50%) translateZ(10px) rotate(-15deg)' : 'translate(-50%, -50%) translateZ(200px) rotate(-15deg) scale(3)',
             opacity: stampVisible ? 1 : 0,
             transitionTimingFunction: stampVisible ? impactEasing : 'ease-out'
           }}
        >
           <div className="border-[5px] border-emerald-400 text-emerald-400 font-black tracking-widest text-xl px-5 py-2 rounded-xl bg-emerald-400/10 backdrop-blur-sm shadow-[0_10px_20px_rgba(52,211,153,0.5),inset_0_0_15px_rgba(52,211,153,0.4)] relative overflow-hidden">
             {/* Impact flash */}
             <div 
               className="absolute inset-0 bg-white transition-opacity duration-300 mix-blend-overlay"
               style={{ opacity: shake ? 1 : 0 }}
             />
             SETTLED
           </div>
        </div>

        {/* Laser Scanner - High End */}
        <div 
          className="absolute left-0 right-0 h-[3px] z-30"
          style={{ 
            background: 'linear-gradient(90deg, transparent, #22d3ee, #fff, #22d3ee, transparent)',
            boxShadow: '0 0 20px #22d3ee, 0 0 40px #22d3ee, 0 20px 20px rgba(34,211,238,0.2)',
            animation: 'scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite' 
          }}
        />
        
        {/* Full Document Impact Flash */}
        <div 
          className="absolute inset-0 rounded-xl bg-emerald-400/20 mix-blend-screen transition-opacity duration-300 pointer-events-none z-40"
          style={{ opacity: shake ? 1 : 0 }}
        />
      </div>

      <style>{`
        @keyframes float-doc {
          0%, 100% { transform: rotateX(0deg) rotateY(0deg) translateY(0); }
          50% { transform: rotateX(0deg) rotateY(0deg) translateY(-20px); }
        }
        @keyframes float-shadow {
          0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.8; transform: translateX(-50%) scale(1.1); }
        }
        @keyframes scan {
          0%, 100% { top: -10px; opacity: 0; }
          10% { opacity: 1; }
          70% { opacity: 1; top: 110%; }
          75%, 95% { top: 110%; opacity: 0; }
        }
        @keyframes fill-line {
          0%, 25% { transform: translateX(-100%); opacity: 1; }
          65%, 95% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(0); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
