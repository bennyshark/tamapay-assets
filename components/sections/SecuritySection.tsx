'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function TextRevealCard({ text, revealText }: { text: string, revealText: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [randomText, setRandomText] = useState(text);

  // Generate matrix-like scrambling effect
  useEffect(() => {
    if (isHovered) {
      setRandomText(revealText);
      return;
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const interval = setInterval(() => {
      let result = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') result += ' ';
        else result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setRandomText(result);
    }, 100);

    return () => clearInterval(interval);
  }, [isHovered, revealText, text]);

  return (
    <div 
      className="relative w-full h-48 bg-[#0a0a0a] rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden group cursor-crosshair"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background radial gradient that follows mouse (simulated center for now) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-8">
        <p className="text-sm text-green-500/50 mb-2 font-mono uppercase tracking-widest text-center w-full">
          {isHovered ? 'Decrypted Payload' : 'Encrypted Data Stream'}
        </p>
        <h3 className={`text-2xl md:text-3xl font-mono font-bold tracking-tight text-center transition-colors duration-300 ${isHovered ? 'text-white' : 'text-green-500 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]'}`}>
          {randomText}
        </h3>
      </div>
      
      {/* Scanning laser line */}
      {!isHovered && (
        <div className="absolute left-0 right-0 h-[2px] bg-green-500/50 shadow-[0_0_10px_#22c55e] z-20 top-0" style={{ animation: 'scan-vertical 3s linear infinite' }} />
      )}
    </div>
  );
}

export default function SecuritySection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black flex justify-center items-center overflow-hidden">
      
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col gap-12">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6"
          >
            Military-Grade <span className="text-green-400">Security</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg"
          >
            Hover over the encrypted blocks below to decrypt our security protocols. Your assets are secured by the most advanced cryptographic architecture ever deployed.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Reveal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <TextRevealCard 
              text="9A8B 7C6D 5E4F 3G2H" 
              revealText="AES-256 ENCRYPTION ACTIVE" 
            />
          </motion.div>

          {/* Small Bento 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="w-full h-48 bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors" />
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/50">
               <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">Cold Storage</h4>
              <p className="text-zinc-400 text-sm mt-1">99% of user funds are kept in multi-sig cold vaults.</p>
            </div>
          </motion.div>

          {/* Small Bento 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-full h-48 bg-gradient-to-br from-zinc-900 to-black rounded-2xl border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors" />
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/50">
               <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h4 className="text-white font-bold text-lg">DDoS Protection</h4>
              <p className="text-zinc-400 text-sm mt-1">Enterprise Cloudflare shielding ensures 100% uptime.</p>
            </div>
          </motion.div>

          {/* Wide Bottom Bento */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2"
          >
             <TextRevealCard 
              text="SYSTEM_AUDIT_PENDING" 
              revealText="SOC2 TYPE II CERTIFIED" 
            />
          </motion.div>

        </div>
      </div>
      
      <style>{`
        @keyframes scan-vertical {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
