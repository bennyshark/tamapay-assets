'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Custom Number Ticker that spins up smoothly
function NumberTicker({ value, duration = 2, prefix = "", suffix = "" }: { value: number, duration?: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Infinite Marquee
function InfiniteMarquee({ children, reverse = false }: { children: React.ReactNode, reverse?: boolean }) {
  return (
    <div className="flex w-full overflow-hidden relative border-y border-white/5 bg-white/[0.02] py-8">
      {/* Edge Gradients */}
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
      
      <div 
        className="flex w-max min-w-full"
        style={{ animation: `marquee ${reverse ? '30s' : '40s'} linear infinite ${reverse ? 'reverse' : 'normal'}` }}
      >
        <div className="flex gap-16 px-8 items-center justify-center">
          {children}
        </div>
        <div className="flex gap-16 px-8 items-center justify-center">
          {children}
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const PARTERS = [
  "JPMORGAN CHASE", "GOLDMAN SACHS", "CITIGROUP", "BANK OF AMERICA", 
  "MORGAN STANLEY", "WELLS FARGO", "BARCLAYS", "HSBC", "UBS"
];

export default function MetricsSection() {
  return (
    <section className="w-full py-32 bg-slate-950 flex flex-col items-center overflow-hidden">
      
      <div className="w-full max-w-7xl px-6 mb-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center"
        >
          <h3 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">
            <NumberTicker value={50} prefix="$" suffix="B+" />
          </h3>
          <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Volume Processed</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center relative"
        >
          {/* Subtle glow behind the middle metric */}
          <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full" />
          <h3 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-indigo-600 mb-2 relative z-10">
            <NumberTicker value={99} suffix=".99%" />
          </h3>
          <p className="text-blue-200/50 font-medium tracking-wide uppercase text-sm relative z-10">Uptime Reliability</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center justify-center"
        >
          <h3 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">
            <NumberTicker value={120} suffix="ms" duration={3} />
          </h3>
          <p className="text-slate-400 font-medium tracking-wide uppercase text-sm">Avg. Finality Time</p>
        </motion.div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <InfiniteMarquee>
          {PARTERS.map((partner, i) => (
             <div key={i} className="text-2xl font-black tracking-tighter text-slate-700/50 mix-blend-plus-lighter whitespace-nowrap">
               {partner}
             </div>
          ))}
        </InfiniteMarquee>
        
        <InfiniteMarquee reverse>
           {/* Tech stack or network protocols */}
           {["SWIFT NETWORK", "BASE L2", "SOLANA MAINNET", "POLYGON ZKEVM", "ETHEREUM", "RIPPLE NET", "STELLAR", "AVALANCHE"].map((network, i) => (
             <div key={i} className="text-2xl font-black tracking-tighter text-indigo-900/40 mix-blend-screen whitespace-nowrap">
               {network}
             </div>
          ))}
        </InfiniteMarquee>
      </div>
      
    </section>
  );
}
