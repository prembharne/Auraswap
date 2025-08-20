import { Button } from "@/components/ui/button";
import { ArrowUpDown, Settings, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { ToastNotification } from "@/components/ui/toast-notification";
import { useToast } from "@/components/ui/use-toast";
import { BlurBackground } from "@/components/ui/blur-background";
import { TokenSelector } from "@/components/ui/token-selector";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
  price?: number;
}

function Swap() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [fromToken, setFromToken] = useState<Token>({
    symbol: "ETH",
    name: "Ethereum",
    icon: "🔷",
    balance: "2.45",
    price: 1800
  });
  const [toToken, setToToken] = useState<Token>({
    symbol: "USDC",
    name: "USD Coin",
    icon: "💵",
    balance: "1,250.00",
    price: 1
  });
  const [isSwapping, setIsSwapping] = useState(false);
  const [showTokenList, setShowTokenList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedTokenSide, setSelectedTokenSide] = useState<"from" | "to" | null>(null);
  const { toast } = useToast();
  const { isConnected } = useAccount();

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleSwap = async () => {
    if (!isConnected) {
      toast({
        description: (
          <ToastNotification
            type="error"
            title="Wallet Not Connected"
            message="Please connect your wallet to start swapping"
          />
        )
      });
      return;
    }

    setIsSwapping(true);
    toast({
      description: (
        <ToastNotification
          type="loading"
          title="Swapping Tokens"
          message={`Swapping ${fromAmount} ${fromToken.symbol} to ${toAmount} ${toToken.symbol}`}
        />
      )
    });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        description: (
          <ToastNotification
            type="success"
            title="Swap Successful"
            message={`Successfully swapped ${fromAmount} ${fromToken.symbol} to ${toAmount} ${toToken.symbol}`}
          />
        )
      });
    } catch (error) {
      toast({
        description: (
          <ToastNotification
            type="error"
            title="Swap Failed"
            message="Failed to execute swap. Please try again."
          />
        )
      });
    } finally {
      setIsSwapping(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black">
      <BlurBackground />
      
      <div className="relative max-w-lg mx-auto pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl overflow-hidden"
        >
          <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h1 className="text-xl font-semibold">Swap</h1>
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
                <Settings className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 space-y-4">
              {/* From Token Input */}
              <div className="relative p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-500 dark:text-gray-400">You pay</label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Balance: {fromToken.balance}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    placeholder="0"
                    className="w-full text-4xl bg-transparent border-none focus:outline-none focus:ring-0"
                  />
                  <TokenSelector
                    symbol={fromToken.symbol}
                    icon={fromToken.icon}
                    onClick={() => {
                      setSelectedTokenSide("from");
                      setShowTokenList(true);
                    }}
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => setFromAmount(fromToken.balance)}
                    className="text-sm text-purple-500 hover:text-purple-600"
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-2 relative z-10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSwapTokens}
                  className="p-3 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all"
                >
                  <ArrowUpDown className="h-4 w-4" />
                </motion.button>
              </div>

              {/* To Token Input */}
              <div className="relative p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-gray-500 dark:text-gray-400">You receive</label>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Balance: {toToken.balance}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    placeholder="0"
                    className="w-full text-4xl bg-transparent border-none focus:outline-none focus:ring-0"
                  />
                  <TokenSelector
                    symbol={toToken.symbol}
                    icon={toToken.icon}
                    onClick={() => {
                      setSelectedTokenSide("to");
                      setShowTokenList(true);
                    }}
                  />
                </div>
              </div>

              {/* Rate Info */}
              <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl space-y-2">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Rate</span>
                  <span>1 {fromToken.symbol} = {((fromToken.price || 0) / (toToken.price || 1)).toFixed(6)} {toToken.symbol}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Network Fee</span>
                  <span>~$2.50</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Route</span>
                  <span>{fromToken.symbol} → {toToken.symbol}</span>
                </div>
              </div>

              {/* Swap Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                disabled={!fromAmount || !toAmount || isSwapping || !isConnected}
                onClick={handleSwap}
                className="relative w-full px-6 py-4 text-lg font-semibold text-white rounded-2xl overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
              >
                {!isConnected ? (
                  "Connect Wallet"
                ) : isSwapping ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Swapping...</span>
                  </motion.div>
                ) : (
                  "Swap"
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Make sure to export the component as default
export default Swap;
