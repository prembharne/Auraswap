import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { WagmiProvider } from 'wagmi';
import { config as wagmiConfig } from '@/lib/wagmi';

import Index from "./pages/Index";
import Swap from "./pages/Swap";
import Liquidity from "./pages/Liquidity";
import NFT from "./pages/NFT";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
  <WagmiProvider config={wagmiConfig}>

      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/liquidity" element={<Liquidity />} />
            <Route path="/nft" element={<NFT />} />
            <Route path="/analytics" element={<Analytics />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      </WagmiProvider>
</TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
