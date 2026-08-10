import Css3DCoin from "@/components/Css3DCoin";
import AnimatedWallet from "@/components/AnimatedWallet";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#0a0a0a] font-sans overflow-hidden">
      <main className="flex flex-col items-center justify-center gap-16 py-20 px-8 w-full max-w-5xl">
        
        <div className="text-center space-y-4 z-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            TamaPay Assets
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Interactive 3D UI elements built for the TamaPay platform. Hover over the wallet to see it in action!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 w-full mt-10">
          
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-mono text-yellow-500 uppercase tracking-widest text-sm">Spinning Coin</h2>
            <Css3DCoin coinText="₱" />
          </div>

          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-mono text-[#a66f43] uppercase tracking-widest text-sm">Interactive Wallet</h2>
            <AnimatedWallet />
          </div>

        </div>

      </main>
    </div>
  );
}
