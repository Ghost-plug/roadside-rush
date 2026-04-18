import { RESTAURANT } from "@/lib/menu";
import { MapPin, Clock } from "lucide-react";

export function Hours() {
  const todayIdx = (() => {
    const d = new Date().getDay();
    return d === 0 ? 6 : d - 1;
  })();

  return (
    <section id="hours" className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl flex items-center gap-3">
            <Clock className="h-8 w-8 text-primary" /> Hours
          </h2>
          <p className="text-muted-foreground mt-1">Open early, late, and just about always.</p>
          <ul className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card overflow-hidden">
            {RESTAURANT.hours.map((h, i) => (
              <li
                key={h.day}
                className={`flex items-center justify-between px-4 py-3 ${
                  i === todayIdx ? "bg-secondary/15 font-bold" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  {h.day}
                  {i === todayIdx && (
                    <span className="text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                      Today
                    </span>
                  )}
                </span>
                <span className="tabular-nums text-sm">
                  {h.open} – {h.close}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-3xl sm:text-4xl flex items-center gap-3">
            <MapPin className="h-8 w-8 text-primary" /> Find Us
          </h2>
          <p className="text-muted-foreground mt-1">Right on Jefferson Boulevard.</p>
          <a
            href={RESTAURANT.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block rounded-2xl overflow-hidden border border-border bg-card shadow-tile hover:shadow-soft transition"
          >
            <iframe
              title="Dairy Mart location map"
              src="https://www.google.com/maps?q=3622+Jefferson+Blvd,+Dallas,+TX&output=embed"
              className="w-full h-64 border-0"
              loading="lazy"
            />
            <div className="p-4">
              <p className="font-bold">{RESTAURANT.name}</p>
              <p className="text-sm text-muted-foreground">{RESTAURANT.address}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
