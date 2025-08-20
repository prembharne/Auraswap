import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import WalletConnectModal from "./WalletConnectModal";

export default function Navigation() {
  const location = useLocation();

  const navItems = [
    { name: "Swap", href: "/swap" },
    { name: "Liquidity", href: "/liquidity" },
    { name: "NFT", href: "/nft" },
    { name: "Analytics", href: "/analytics" },
  ];

  return (
    <nav className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-aura-400 to-aura-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gradient-to-br from-aura-300 to-aura-500 animate-pulse"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-aura-600 to-aura-800 bg-clip-text text-transparent">
                Auraswap
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-aura-600 relative",
                  location.pathname === item.href
                    ? "text-aura-600"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
                {location.pathname === item.href && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-aura-400 to-aura-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <div className="flex items-center space-x-4">
            <WalletConnectModal>
              <Button
                variant="outline"
                className="hidden sm:inline-flex border-aura-200 text-aura-700 hover:bg-aura-50 hover:text-aura-800"
              >
                Connect Wallet
              </Button>
            </WalletConnectModal>
            <Link to="/swap">
              <Button className="bg-gradient-to-r from-aura-500 to-aura-600 hover:from-aura-600 hover:to-aura-700 text-white font-medium">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
