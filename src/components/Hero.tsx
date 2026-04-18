import heroBurger from "@/assets/hero-burger.jpg";
import { Button } from "@/components/ui/button";
import { ChevronDown, Clock } from "lucide-react";
import { RESTAURANT, currentStatus } from "@/lib/menu";

export function Hero({ onOrder }: { onOrder: () => void }) {
  const status = currentStatus();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-95" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(0_0%_0%/0.1),transparent_60%)]" aria-hidden />

      <div className="relative container mx-auto px-4 pt-8 pb-10 sm:pt-16 sm:pb-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-primary-foreground animate-float-up">
            <div className="inline-flex items-center gap-2 bg-background/15 backdrop-blur-sm border border-primary-foreground/20 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
              </span>
              Now Open
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl mt-4 leading-[0.95] text-balance">
              Dallas' Favorite
              <span className="block text-secondary drop-shadow-[0_2px_0_hsl(20_30%_10%/0.3)]">Late-Night Spot</span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl font-medium text-primary-foreground/90 flex items-center gap-2">
              <Clock className="h-5 w-5 shrink-0" />
              Serving you until <span className="font-bold text-secondary">{status.closesAt}</span>
            </p>

            <p className="mt-2 text-sm sm:text-base text-primary-foreground/80">
              Smashed burgers, hand-spun shakes, and crispy fries on {RESTAURANT.address.split(",")[0]}.
            </p>

            <div className="mt-7">
              <Button
                size="xl"
                variant="cta"
                onClick={onOrder}
                className="w-full sm:w-auto animate-pulse-glow"
              >
                🔥 Order Online — Skip the Line
              </Button>
              <p className="mt-3 text-xs text-primary-foreground/70">
                Ready in ~15 min · Free pickup · No fees
              </p>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute -inset-8 bg-secondary/30 blur-3xl rounded-full" aria-hidden />
            <img
              src={heroBurger}
              alt="Dairy Mart signature double cheeseburger"
              width={1024}
              height={1024}
              fetchPriority="high"
              className="relative w-full h-auto rounded-3xl shadow-bold"
            />
          </div>

          <img
            src={heroBurger}
            alt="Dairy Mart signature double cheeseburger"
            width={800}
            height={800}
            fetchPriority="high"
            className="lg:hidden mt-8 w-full max-w-sm mx-auto rounded-3xl shadow-bold"
          />
        </div>

        <a href="#menu" className="hidden sm:flex items-center justify-center mt-10 text-primary-foreground/80 hover:text-primary-foreground transition">
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
