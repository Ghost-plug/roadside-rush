import { Phone, MapPin } from "lucide-react";
import { RESTAURANT } from "@/lib/menu";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 md:hidden safe-bottom">
      <div className="mx-3 mb-3 grid grid-cols-2 gap-2 p-2 rounded-2xl bg-card/95 backdrop-blur-md border border-border shadow-bold">
        <a
          href={`tel:${RESTAURANT.phone}`}
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-bold"
        >
          <Phone className="h-5 w-5" /> Call
        </a>
        <a
          href={RESTAURANT.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 h-12 rounded-xl bg-secondary text-secondary-foreground font-bold"
        >
          <MapPin className="h-5 w-5" /> Maps
        </a>
      </div>
    </div>
  );
}
