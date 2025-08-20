import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";

interface SwapSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SwapSettings({ isOpen, onClose }: SwapSettingsProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Swap Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Slippage Tolerance</Label>
            <div className="flex gap-2">
              <Input defaultValue="0.5" type="number" className="w-24" />
              <span className="text-muted-foreground self-center">%</span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Info className="h-4 w-4" />
              Your transaction will revert if the price changes unfavorably by more than this percentage.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Expert Mode</Label>
              <p className="text-sm text-muted-foreground">Bypass high price impact warnings</p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Quick Swap</Label>
              <p className="text-sm text-muted-foreground">Skip confirmation step for small trades</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
