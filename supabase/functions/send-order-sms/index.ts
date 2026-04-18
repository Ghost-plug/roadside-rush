import { corsHeaders } from "npm:@supabase/supabase-js@2.95.0/cors";
import { z } from "npm:zod@3.23.8";

const ItemSchema = z.object({
  name: z.string().min(1).max(120),
  qty: z.number().int().min(1).max(99),
  price: z.number().min(0).max(999),
});

const BodySchema = z.object({
  orderId: z.string().min(3).max(40),
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(7).max(20),
  eta: z.number().int().min(1).max(120),
  items: z.array(ItemSchema).min(1).max(40),
  total: z.number().min(0).max(9999),
});

const GATEWAY_URL = "https://connector-gateway.lovable.dev/twilio";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.flatten() }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { orderId, name, phone, eta, items, total } = parsed.data;

    const itemList = items.map((i) => `${i.qty}× ${i.name}`).join("\n");
    const message =
      `🍔 NEW ORDER ${orderId}\n` +
      `Customer: ${name} (${phone})\n` +
      `Pickup ETA: ~${eta} min\n` +
      `---\n${itemList}\n---\n` +
      `Total: $${total.toFixed(2)}`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const TWILIO_API_KEY = Deno.env.get("TWILIO_API_KEY");
    const TWILIO_FROM = Deno.env.get("TWILIO_FROM");
    const KITCHEN_PHONE = Deno.env.get("KITCHEN_PHONE");

    if (!LOVABLE_API_KEY || !TWILIO_API_KEY || !TWILIO_FROM || !KITCHEN_PHONE) {
      console.log("[Order received — SMS not configured]\n" + message);
      return new Response(JSON.stringify({ ok: true, smsSent: false, orderId }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(`${GATEWAY_URL}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": TWILIO_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ To: KITCHEN_PHONE, From: TWILIO_FROM, Body: message }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Twilio error", res.status, data);
      throw new Error(`Twilio API error ${res.status}`);
    }

    return new Response(JSON.stringify({ ok: true, smsSent: true, orderId, sid: data.sid }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("send-order-sms error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
