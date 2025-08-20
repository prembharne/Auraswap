import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ToastNotificationProps {
  type: "success" | "error" | "loading";
  title: string;
  message: string;
}

export function ToastNotification({ type, title, message }: ToastNotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Alert className={cn(
        "border-2 shadow-lg",
        type === "success" && "border-green-500 bg-green-50",
        type === "error" && "border-red-500 bg-red-50",
        type === "loading" && "border-aptx-500 bg-aptx-50"
      )}>
        <div className="flex items-start gap-3">
          {type === "success" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          {type === "error" && <AlertCircle className="h-5 w-5 text-red-600" />}
          {type === "loading" && <Loader2 className="h-5 w-5 text-aptx-600 animate-spin" />}
          <div>
            <AlertTitle className="mb-1">{title}</AlertTitle>
            <AlertDescription className="text-sm">{message}</AlertDescription>
          </div>
        </div>
      </Alert>
    </motion.div>
  );
}
