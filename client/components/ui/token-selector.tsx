import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface TokenSelectorProps {
  symbol: string;
  icon: string;
  onClick: () => void;
}

export function TokenSelector({ symbol, icon, onClick }: TokenSelectorProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
    >
      <span className="text-2xl">{icon}</span>
      <span className="font-medium">{symbol}</span>
      <ChevronDown className="h-4 w-4 text-gray-500" />
    </motion.button>
  );
}
