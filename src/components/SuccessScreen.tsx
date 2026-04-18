import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SuccessScreen({ orderId, eta, onClose }: { orderId: string; eta: number; onClose: () => void }) {
  const [seconds, setSeconds] = useState(eta * 60);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-float-up">
      <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center shadow-bold">
        <CheckCircle2 className="h-12 w-12 text-secondary-foreground" />
      </div>
      <h2 className="font-display text-3xl mt-5">Order received!</h2>
      <p className="text-muted-foreground mt-2">See you in about {eta} minutes.</p>

      <div className="mt-6 bg-muted/40 rounded-2xl px-6 py-4 w-full max-w-xs">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Order ID</p>
        <p className="font-display text-2xl text-primary">{orderId}</p>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Ready in</p>
        <p className="font-display text-5xl tabular-nums">
          {m}:{s.toString().padStart(2, "0")}
        </p>
      </div>

      <Button className="mt-8 w-full max-w-xs" size="lg" onClick={onClose}>
        Done
      </Button>
    </div>
  );
}
