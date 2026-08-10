'use client';
import React from 'react';

interface AutomatedInvoiceProps {
  className?: string;
}

export default function AutomatedInvoice({ className = '' }: AutomatedInvoiceProps) {
  return (
    <div className={`relative w-48 h-56 [perspective:1200px] flex items-center justify-center ${className}`}>
      
      {/* Floating Document */}
      <div 
        className="w-32 h-44 relative [transform-style:preserve-3d] rounded-xl border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl flex flex-col p-4 overflow-hidden"
        style={{ 
          transform: 'rotateX(20deg) rotateY(-15deg)',
          animation: 'float-doc 4s ease-in-out infinite' 
        }}
      >
        {/* Document Header (Building Icon for Real Estate) */}
        <div className="w-10 h-10 rounded bg-indigo-500/20 mb-4 flex items-center justify-center border border-indigo-500/30">
          <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>

        {/* Document Lines (Skeleton UI) */}
        <div className="space-y-2 flex-1">
          <div className="h-2 w-full bg-white/10 rounded overflow-hidden relative">
             <div className="absolute inset-0 bg-blue-400/50 w-full translate-x-[-100%]" style={{ animation: 'fill-line 3s linear infinite' }} />
          </div>
          <div className="h-2 w-3/4 bg-white/10 rounded overflow-hidden relative">
             <div className="absolute inset-0 bg-blue-400/50 w-full translate-x-[-100%]" style={{ animation: 'fill-line 3s linear infinite 0.2s' }} />
          </div>
          <div className="h-2 w-5/6 bg-white/10 rounded overflow-hidden relative">
             <div className="absolute inset-0 bg-blue-400/50 w-full translate-x-[-100%]" style={{ animation: 'fill-line 3s linear infinite 0.4s' }} />
          </div>
        </div>
        
        {/* Footer/Total (Lights up green on approval) */}
        <div className="mt-auto pt-2 border-t border-white/10 flex justify-between items-end relative overflow-hidden">
          <div className="h-2 w-12 bg-white/10 rounded" />
          <div className="h-3 w-16 bg-green-500/30 rounded border border-green-500/50 overflow-hidden relative">
              <div className="absolute inset-0 bg-green-400 w-full translate-x-[-100%]" style={{ animation: 'fill-line 3s linear infinite 0.6s' }} />
          </div>
        </div>

        {/* Laser Scanner */}
        <div 
          className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee] z-10"
          style={{ animation: 'scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite' }}
        />
      </div>

      <style>{`
        @keyframes float-doc {
          0%, 100% { transform: rotateX(20deg) rotateY(-15deg) translateY(0); }
          50% { transform: rotateX(25deg) rotateY(-10deg) translateY(-15px); }
        }
        @keyframes scan {
          0%, 100% { top: -10px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          95% { top: 110%; opacity: 0; }
        }
        @keyframes fill-line {
          0%, 30% { transform: translateX(-100%); }
          60%, 100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
