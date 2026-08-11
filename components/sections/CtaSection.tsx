'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Meteors({ number = 20 }: { number?: number }) {
  const [meteors, setMeteors] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const newMeteors = new Array(number).fill(true).map(() => ({
      top: 0,
      left: Math.floor(Math.random() * (400 - -400) + -400) + 'px',
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
    }));
    setMeteors(newMeteors);
  }, [number]);

  return (
    <>
      {meteors.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className="absolute top-1/2 left-1/2 h-[0.1rem] w-[50px] rotate-[215deg] animate-meteor-effect rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] pointer-events-none opacity-0"
          style={{
            ...style,
            left: Math.floor(Math.random() * 100) + '%',
            top: Math.floor(Math.random() * 100) + '%',
          }}
        >
          {/* Meteor Head */}
          <div className="absolute top-[50%] right-[100%] h-[2px] w-[2px] -translate-y-[50%] rounded-full bg-white shadow-[0_0_5px_2px_#fff]" />
        </span>
      ))}
      <style>{`
        @keyframes meteor-effect {
          0% { transform: rotate(215deg) translateX(0); opacity: 1; }
          70% { opacity: 1; }
          100% { transform: rotate(215deg) translateX(-1000px); opacity: 0; }
        }
        .animate-meteor-effect {
          animation-name: meteor-effect;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </>
  );
}

export default function CtaSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0">
      
      {/* Background Meteors */}
      <Meteors number={30} />

      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 mt-48">
        
        {/* Lamp Cone Left */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        
        {/* Lamp Cone Right */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        {/* Lamp Top Plate & Glow */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl" />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950" />
      </div>
      
      {/* CTA Content */}
      <div className="relative z-50 flex -translate-y-48 flex-col items-center px-5">
        <motion.h1
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Ready to build the <br /> future of finance?
        </motion.h1>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-10 py-4 rounded-full bg-cyan-500 text-slate-950 font-bold text-lg tracking-wide shadow-[0_0_40px_rgba(34,211,238,0.5),inset_0_2px_4px_rgba(255,255,255,0.5)] border border-cyan-400 hover:shadow-[0_0_60px_rgba(34,211,238,0.8),inset_0_2px_4px_rgba(255,255,255,0.5)] transition-all"
        >
          Create TamaPay Account
        </motion.button>
      </div>
    </section>
  );
}
