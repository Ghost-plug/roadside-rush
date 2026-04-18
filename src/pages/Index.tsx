import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Menu } from "@/components/Menu";
import { Hours } from "@/components/Hours";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { OrderSheet } from "@/components/OrderSheet";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { ShoppingBag } from "lucide-react";
import { RESTAURANT } from "@/lib/menu";

const Index = () => {
  const [open, setOpen] = useState(false);
  const count = useCart((s) => s.count());

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary-foreground">
            <div className="h-9 w-9 rounded-xl bg-secondary text-secondary-foreground font-display text-xl flex items-center justify-center shadow-tile">
              D
            </div>
            <span className="font-display text-lg hidden sm:inline">Dairy Mart</span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setOpen(true)}
              className="rounded-full font-bold relative"
            >
              <ShoppingBag className="h-4 w-4" />
              Cart
              {count > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Hero onOrder={() => setOpen(true)} />
        <Menu />
        <Hours />
      </main>

      <footer className="bg-foreground text-background py-8 text-center text-sm">
        <p className="font-display text-2xl text-secondary">Dairy Mart</p>
        <p className="mt-1 opacity-80">{RESTAURANT.address}</p>
        <p className="mt-1 opacity-60">© {new Date().getFullYear()} · Late nights, smashed burgers.</p>
      </footer>

      <StickyMobileCTA />
      <OrderSheet open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Index;
