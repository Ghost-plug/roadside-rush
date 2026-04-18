import { useState } from "react";
import { MENU } from "@/lib/menu";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Menu() {
  const [active, setActive] = useState(MENU[0].id);
  const add = useCart((s) => s.add);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const handleAdd = (item: Parameters<typeof add>[0]) => {
    add(item);
    setJustAdded(item.id);
    setTimeout(() => setJustAdded((c) => (c === item.id ? null : c)), 900);
  };

  return (
    <section id="menu" className="bg-warm-gradient py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="font-display text-4xl sm:text-5xl text-balance">The Menu</h2>
          <p className="text-muted-foreground mt-2">Tap to add. Order in seconds.</p>
        </div>

        <div className="sticky top-0 z-30 -mx-4 px-4 py-3 bg-background/85 backdrop-blur-md border-b border-border">
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
            {MENU.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActive(cat.id);
                  document.getElementById(`cat-${cat.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={cn(
                  "shrink-0 px-4 h-10 rounded-full font-semibold text-sm transition-all border-2",
                  active === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                )}
              >
                <span className="mr-1.5">{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-10">
          {MENU.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-20">
              <h3 className="font-display text-2xl sm:text-3xl mb-4 flex items-center gap-2">
                <span>{cat.emoji}</span> {cat.name}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {cat.items.map((item) => (
                  <article
                    key={item.id}
                    className="group relative bg-card rounded-2xl p-4 shadow-tile hover:shadow-soft transition-all border border-border/60"
                  >
                    <div className="text-4xl mb-2">{item.emoji}</div>
                    <h4 className="font-bold text-sm sm:text-base leading-tight">{item.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 min-h-[2rem]">{item.desc}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-display text-lg text-primary">${item.price.toFixed(2)}</span>
                      <Button
                        size="sm"
                        onClick={() => handleAdd(item)}
                        className={cn(
                          "h-9 px-3 rounded-full transition-all",
                          justAdded === item.id && "bg-secondary text-secondary-foreground hover:bg-secondary"
                        )}
                        aria-label={`Add ${item.name}`}
                      >
                        {justAdded === item.id ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        <span className="ml-0.5">{justAdded === item.id ? "Added" : "Add"}</span>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
