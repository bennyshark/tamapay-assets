import Css3DCoin from "@/components/Css3DCoin";
import AnimatedWallet from "@/components/AnimatedWallet";
import InteractiveLogo from "@/components/InteractiveLogo";
import GlobalNode from "@/components/GlobalNode";
import SecureVault from "@/components/SecureVault";
import AutomatedInvoice from "@/components/AutomatedInvoice";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center py-20 px-4">
      
      <main className="max-w-6xl w-full flex flex-col items-center gap-20">
        
        <div className="text-center space-y-4 z-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            TamaPay Assets
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Interactive 3D UI elements built for the TamaPay platform. Hover over the wallet to see it in action!
          </p>
        </div>

        {/* Logo Section */}
        <div className="w-full flex justify-center mb-4">
           <InteractiveLogo />
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-24 w-full justify-items-center mt-4">
          
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-mono text-yellow-500 uppercase tracking-widest text-sm">Spinning Coin</h2>
            <Css3DCoin />
          </div>

          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-mono text-[#a66f43] uppercase tracking-widest text-sm">Interactive Wallet</h2>
            <AnimatedWallet />
          </div>

          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-mono text-cyan-400 uppercase tracking-widest text-sm">Global Node</h2>
            <GlobalNode />
          </div>

          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-mono text-green-400 uppercase tracking-widest text-sm">Secure Vault</h2>
            <SecureVault />
          </div>

          <div className="flex flex-col items-center gap-6">
            <h2 className="text-xl font-mono text-indigo-400 uppercase tracking-widest text-sm">Automated Invoice</h2>
            <AutomatedInvoice />
          </div>

        </div>

      </main>

    </div>
  );
}
