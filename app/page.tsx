'use client';
import { useState, useEffect } from 'react';
import Css3DCoin from "@/components/Css3DCoin";
import AnimatedWallet from "@/components/AnimatedWallet";
import InteractiveLogo from "@/components/InteractiveLogo";
import GlobalNode from "@/components/GlobalNode";
import SecureVault from "@/components/SecureVault";
import AutomatedInvoice from "@/components/AutomatedInvoice";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <div 
      className="min-h-screen bg-[#050505] flex flex-col items-center py-24 px-4 overflow-hidden relative selection:bg-indigo-500/30"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Mesh Gradient Background */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-[800ms] ease-out opacity-40"
        style={{
          background: `
            radial-gradient(circle 800px at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.15), transparent 40%),
            radial-gradient(circle 1000px at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(212, 175, 55, 0.08), transparent 40%)
          `
        }}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      <main className="max-w-7xl w-full flex flex-col items-center gap-24 relative z-10">
        
        {/* Premium Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto mt-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
            <span className="text-xs font-mono text-zinc-400 tracking-widest uppercase">Next-Gen Interface</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            TamaPay <span className="font-light italic text-zinc-500">Design System</span>
          </h1>
          <p className="text-xl text-zinc-400 font-light leading-relaxed">
            Experience our ultra-premium interactive UI suite. Every asset is powered by liquid glass refraction, volumetric lighting, and physical spring mechanics.
          </p>
        </div>

        {/* Logo Presentation Showcase */}
        <div className="w-full flex justify-center py-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent blur-3xl opacity-50" />
           <InteractiveLogo />
        </div>

        {/* Ultra-Premium Glassmorphism Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full mt-10">
          
          <AssetShowcaseCard 
             title="Interactive Wallet" 
             color="text-[#c59d5f]" 
             glow="group-hover:bg-[#c59d5f]/10 group-hover:shadow-[0_0_50px_rgba(197,157,95,0.2)]"
          >
            <AnimatedWallet />
          </AssetShowcaseCard>

          <AssetShowcaseCard 
             title="Global Node" 
             color="text-cyan-400" 
             glow="group-hover:bg-cyan-500/10 group-hover:shadow-[0_0_50px_rgba(34,211,238,0.2)]"
          >
            <GlobalNode />
          </AssetShowcaseCard>

          <AssetShowcaseCard 
             title="Secure Vault" 
             color="text-indigo-400" 
             glow="group-hover:bg-indigo-500/10 group-hover:shadow-[0_0_50px_rgba(99,102,241,0.2)]"
          >
            <SecureVault />
          </AssetShowcaseCard>

          <AssetShowcaseCard 
             title="Automated Invoice" 
             color="text-emerald-400" 
             glow="group-hover:bg-emerald-500/10 group-hover:shadow-[0_0_50px_rgba(52,211,153,0.2)]"
          >
            <AutomatedInvoice />
          </AssetShowcaseCard>

          <AssetShowcaseCard 
             title="Spinning Coin" 
             color="text-yellow-500" 
             glow="group-hover:bg-yellow-500/10 group-hover:shadow-[0_0_50px_rgba(234,179,8,0.2)]"
          >
            <Css3DCoin />
          </AssetShowcaseCard>
          
        </div>
      </main>
    </div>
  );
}

// Reusable High-End Showcase Card
function AssetShowcaseCard({ children, title, color, glow }: { children: React.ReactNode, title: string, color: string, glow: string }) {
  return (
    <div className={`group relative flex flex-col items-center justify-between p-12 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-2xl transition-all duration-[600ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] hover:-translate-y-2 hover:border-white/10 ${glow}`}>
       {/* Ambient Inner Glow on Hover */}
       <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay"
            style={{ background: 'radial-gradient(circle at center, rgba(255,255,255,0.1), transparent 70%)' }} />
       
       <div className="flex-1 flex items-center justify-center w-full min-h-[300px]">
         {children}
       </div>
       
       <div className="mt-8 pt-6 border-t border-white/10 w-full text-center relative z-10">
         <h2 className={`text-sm font-mono uppercase tracking-[0.3em] font-bold ${color} drop-shadow-md`}>
           {title}
         </h2>
       </div>
    </div>
  );
}
