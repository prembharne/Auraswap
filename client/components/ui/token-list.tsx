import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface Token {
  symbol: string;
  name: string;
  icon: string;
  balance: string;
}

interface TokenListProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: Token) => void;
  tokens: Token[];
  selected?: string;
}

export function TokenList({ isOpen, onClose, onSelect, tokens, selected }: TokenListProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or paste address"
            className="pl-9"
          />
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {tokens.map((token) => (
              <motion.button
                key={token.symbol}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onSelect(token);
                  onClose();
                }}
                className={`w-full p-3 flex items-center justify-between rounded-lg hover:bg-muted/50 transition-colors ${
                  selected === token.symbol ? "bg-muted" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{token.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{token.symbol}</div>
                    <div className="text-sm text-muted-foreground">{token.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{token.balance}</div>
                  <div className="text-sm text-muted-foreground">Balance</div>
                </div>
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
