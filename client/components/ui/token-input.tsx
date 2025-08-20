import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface TokenInputProps {
  token: string;
  amount: string;
  balance: string;
  icon: string;
  onAmountChange: (value: string) => void;
  onTokenSelect: () => void;
}

export function TokenInput({
  token,
  amount,
  balance,
  icon,
  onAmountChange,
  onTokenSelect,
}: TokenInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative p-4 bg-muted/50 rounded-lg border border-aptx-100"
    >
      <div className="flex justify-between gap-4">
        <Input
          type="number"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
          placeholder="0.0"
          className="border-0 bg-transparent text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield]"
        />
        <Button
          variant="outline"
          className="gap-2"
          onClick={onTokenSelect}
        >
          <span className="text-lg">{icon}</span>
          <span>{token}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>Balance: {balance}</span>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-aptx-600 hover:text-aptx-700"
          onClick={() => onAmountChange(balance)}
        >
          MAX
        </Button>
      </div>
    </motion.div>
  );
}
