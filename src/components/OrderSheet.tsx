import { useState } from "react";
import { z } from "zod";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SuccessScreen } from "./SuccessScreen";

const FormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
});

export function OrderSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { lines, setQty, remove, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ orderId: string; eta: number } | null>(null);

  const submit = async () => {
    const parsed = FormSchema.safeParse({ name, phone });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (lines.length === 0) {
      toast.error("Add at least one item");
      return;
    }

    setSubmitting(true);
    const orderId = `DM-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const eta = 15;

    try {
      const { error } = await supabase.functions.invoke("send-order-sms", {
        body: {
          orderId,
          name: parsed.data.name,
          phone: parsed.data.phone,
          eta,
          items: lines.map((l) => ({ name: l.name, qty: l.qty, price: l.price })),
          total: total(),
        },
      });
      if (error) throw error;

      setSuccess({ orderId, eta });
      clear();
      setName("");
      setPhone("");
    } catch (e) {
      console.error(e);
      toast.error("Couldn't send order. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) setSuccess(null);
      }}
    >
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        {success ? (
          <SuccessScreen orderId={success.orderId} eta={success.eta} onClose={() => onOpenChange(false)} />
        ) : (
          <>
            <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
              <SheetTitle className="font-display text-2xl">Skip the Line</SheetTitle>
              <p className="text-sm text-muted-foreground">Your order, ready in ~15 min.</p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {lines.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">Your cart is empty. Tap items below to add.</p>
              ) : (
                <ul className="space-y-2">
                  {lines.map((l) => (
                    <li key={l.id} className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                      <div className="text-2xl">{l.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{l.name}</p>
                        <p className="text-xs text-muted-foreground">${l.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => setQty(l.id, l.qty - 1)}>
                          <Minus className="h-3.5 w-3.5" />
                        </Button>
                        <span className="w-6 text-center font-bold tabular-nums">{l.qty}</span>
                        <Button size="icon" variant="outline" className="h-8 w-8 rounded-full" onClick={() => setQty(l.id, l.qty + 1)}>
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove(l.id)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="space-y-3 pt-2">
                <div>
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex" maxLength={80} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(214) 555-0123" maxLength={20} />
                </div>
              </div>
            </div>

            <div className="border-t border-border p-4 space-y-3 bg-card">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total</span>
                <span className="font-display text-2xl text-primary">${total().toFixed(2)}</span>
              </div>
              <Button size="xl" variant="cta" className="w-full" disabled={submitting || lines.length === 0} onClick={submit}>
                {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Place Order"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
