import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Smartphone, Globe, Shield } from "lucide-react";
import { useState } from "react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { injected } from 'wagmi/connectors';

interface WalletOption {
  name: string;
  icon: string;
  description: string;
  popular?: boolean;
  connector?: any;
}

const wallets: WalletOption[] = [
  {
    name: "MetaMask",
    icon: "🦊",
    description: "Connect using your MetaMask wallet",
    popular: true,
    connector: injected()
  },
  {
    name: "WalletConnect",
    icon: "🔗",
    description: "Connect with mobile wallets via QR code",
    popular: true
  },
  {
    name: "Coinbase Wallet",
    icon: "🟦",
    description: "Connect using Coinbase Wallet",
    popular: true
  },
  {
    name: "Phantom",
    icon: "👻",
    description: "Connect using Phantom wallet"
  },
  {
    name: "Trust Wallet",
    icon: "🛡️",
    description: "Connect using Trust Wallet"
  },
  {
    name: "Rainbow",
    icon: "🌈",
    description: "Connect using Rainbow wallet"
  }
];

interface WalletConnectModalProps {
  children: React.ReactNode;
}

export default function WalletConnectModal({ children }: WalletConnectModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);
  const { connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (isConnected) {
      setIsOpen(false);
    }
  }, [isConnected]);

  const handleWalletConnect = async (walletName: string) => {
    setConnecting(walletName);
    const selectedWallet = wallets.find(w => w.name === walletName);
    
    if (selectedWallet?.connector) {
      try {
        await connect({ connector: selectedWallet.connector });
      } catch (err) {
        console.error('Failed to connect:', err);
      }
    }
    
    setConnecting(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-aptx-600" />
            Connect Wallet
          </DialogTitle>
          <DialogDescription>
            Choose your preferred wallet to connect to APTX
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {wallets.map((wallet) => (
            <Card 
              key={wallet.name}
              className="border-aptx-100 hover:border-aptx-200 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => handleWalletConnect(wallet.name)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{wallet.icon}</div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground group-hover:text-aptx-700">
                          {wallet.name}
                        </span>
                        {wallet.popular && (
                          <span className="text-xs bg-aptx-100 text-aptx-700 px-2 py-0.5 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {wallet.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {connecting === wallet.name ? (
                      <div className="animate-spin h-4 w-4 border-2 border-aptx-600 border-t-transparent rounded-full" />
                    ) : (
                      <div className="h-2 w-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {isConnected && address ? (
          <div className="mt-6 p-4 bg-aptx-50/50 rounded-lg border border-aptx-100">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Connected Account</span>
                <Button variant="outline" size="sm" onClick={() => disconnect()}>Disconnect</Button>
              </div>
              <div className="text-sm font-mono break-all">{address}</div>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 p-4 bg-aptx-50/50 rounded-lg border border-aptx-100">
              <div className="flex items-start space-x-2">
                <Shield className="h-4 w-4 text-aptx-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-aptx-800 mb-1">Secure Connection</p>
                  <p className="text-aptx-700">
                    APTX uses industry-standard security protocols. We never store your private keys.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Smartphone className="h-4 w-4" />
                <span>Mobile</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Web3</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Secure</span>
              </div>
            </div>
          </>
        )}
</DialogContent>
    </Dialog>
  );
}

function ConnectorButtons() {
  const { connectors, connect, isPending, error } = useConnect();
  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();
  if (isConnected) {
    return (
      <div className="flex items-center justify-between rounded-xl border p-3">
        <div className="text-sm">Connected: <span className="font-mono">{address}</span></div>
        <Button variant="outline" onClick={() => disconnect()}>Disconnect</Button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {connectors.map((c) => (
        <Button key={c.uid} onClick={() => connect({ connector: c })} disabled={!c.ready || isPending}>
          {c.name}{!c.ready ? " (not ready)" : ""}
        </Button>
      ))}
      {error ? <div className="text-red-500 text-sm">{error.message}</div> : null}
    </div>
  );
}
