'use client';
import React, { useState, useEffect } from 'react';

interface AutomatedInvoiceProps {
  className?: string;
}

export default function AutomatedInvoice({ className = '' }: AutomatedInvoiceProps) {
  const [stampVisible, setStampVisible] = useState(false);

  // Sync the stamp with the scanning animation (3s cycle)
  useEffect(() => {
    const cycleTime = 4000;
    const stampTiming = 2800; // Stamp hits slightly before the scan ends
    
    const interval = setInterval(() => {
      setStampVisible(false);
      setTimeout(() => {
        setStampVisible(true);
      }, stampTiming);
    }, cycleTime);

    // Initial trigger
    setTimeout(() => {
      setStampVisible(true);
    }, stampTiming);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-64 h-72 [perspective:1200px] flex items-center justify-center ${className}`}>
      
      {/* Floor Shadow */}
      <div 
        className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-40 h-10 bg-cyan-900/40 filter blur-[20px] rounded-[50%]"
        style={{ animation: 'float-shadow 4s ease-in-out infinite' }}
      />

      {/* Floating Document */}
      <div 
        className="w-40 h-56 relative [transform-style:preserve-3d] rounded-xl border border-white/30 bg-white/10 backdrop-blur-xl shadow-[0_30px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.4)] flex flex-col p-4 overflow-hidden"
        style={{ 
          transform: 'rotateX(0deg) rotateY(0deg)',
          animation: 'float-doc 4s ease-in-out infinite' 
        }}
      >
        {/* Massive TamaPay Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none overflow-hidden">
          <span className="text-[12rem] font-black -rotate-45">T</span>
        </div>

        {/* Document Header (Building Icon for Real Estate) */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/40 to-indigo-700/40 mb-4 flex items-center justify-center border border-indigo-400/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
          <svg className="w-6 h-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>

        {/* Document Lines (Skeleton UI) */}
        <div className="space-y-3 flex-1 relative z-10">
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden relative shadow-inner">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 w-full translate-x-[-100%]" style={{ animation: 'fill-line 4s linear infinite' }} />
          </div>
          <div className="h-2 w-3/4 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 w-full translate-x-[-100%]" style={{ animation: 'fill-line 4s linear infinite 0.2s' }} />
          </div>
          <div className="h-2 w-5/6 bg-white/10 rounded-full overflow-hidden relative shadow-inner">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 w-full translate-x-[-100%]" style={{ animation: 'fill-line 4s linear infinite 0.4s' }} />
          </div>
        </div>
        
        {/* Footer/Total (Lights up green on approval) */}
        <div className="mt-auto pt-3 border-t border-white/20 flex justify-between items-end relative overflow-hidden z-10">
          <div className="h-2 w-12 bg-white/10 rounded-full" />
          <div className="h-4 w-16 bg-green-900/50 rounded-md border border-green-500/50 overflow-hidden relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-400 w-full translate-x-[-100%] mix-blend-screen" style={{ animation: 'fill-line 4s linear infinite 0.6s' }} />
          </div>
        </div>

        {/* The 3D Verified Stamp */}
        <div 
           className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${stampVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}
           style={{ transform: stampVisible ? 'translate(-50%, -50%) translateZ(20px) rotate(-15deg)' : 'translate(-50%, -50%) translateZ(80px) rotate(-15deg)' }}
        >
           <div className="border-4 border-green-400 text-green-400 font-black tracking-widest text-lg px-4 py-2 rounded-lg bg-green-400/10 backdrop-blur-sm shadow-[0_0_20px_rgba(74,222,128,0.5),inset_0_0_10px_rgba(74,222,128,0.3)]">
             SETTLED
           </div>
        </div>

        {/* Laser Scanner */}
        <div 
          className="absolute left-0 right-0 h-[3px] bg-cyan-300 shadow-[0_0_20px_#22d3ee,0_0_40px_#22d3ee,0_20px_20px_rgba(34,211,238,0.2)] z-30"
          style={{ animation: 'scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        >
           {/* Laser flare at edges */}
           <div className="absolute left-0 w-2 h-full bg-white blur-[2px]" />
           <div className="absolute right-0 w-2 h-full bg-white blur-[2px]" />
        </div>
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
