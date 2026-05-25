import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, CheckCircle2, MapPin, ArrowRight, Navigation2, BedDouble, Ticket, Users, ThermometerSun, Bell, Heart, Car, Loader2, Train, Bus } from "lucide-react";
import { temples } from "@/data/temples";

export const Route = createFileRoute("/_app/plan")({
  head: () => ({ meta: [{ title: "AI Smart Planner — OMG Smart Temple" }] }),
  component: PlanPage,
});

function PlanPage() {
  const [fromLocation, setFromLocation] = useState("");
  const [temple, setTemple] = useState(temples[0].slug);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("afternoon");
  const [who, setWho] = useState("family");
  const [purpose, setPurpose] = useState("darshan");
  const [result, setResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullMap, setFullMap] = useState(false);
  const t = temples.find(x => x.slug === temple)!;
  const trans = getTransportInfo(fromLocation, t.slug);

  const handleGenerate = () => {
    setLoading(true);
    setResult(false);
    setTimeout(() => {
      setLoading(false);
      setResult(true);
    }, 1500);
  };

  const travelHours = fromLocation ? (fromLocation.length % 5) + 2 : 4;
  const travelMins = fromLocation ? (fromLocation.charCodeAt(0) % 60) : 30;
  const hotel1 = `Hotel ${t.city} Grand`;
  const hotel2 = `${t.name.split(' ')[0]} Residency`;
  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-6 py-4 lg:py-6">
      <div className="flex items-center gap-2 text-saffron"><Sparkles className="w-4 h-4" /><span className="text-sm font-medium uppercase tracking-wider">AI Smart Planner</span></div>
      <h1 className="font-serif text-3xl lg:text-4xl font-bold mt-1">Plan my perfect visit</h1>
      <p className="text-muted-foreground text-sm mt-1">Tell us your preferences — AI will suggest the ideal time and travel route.</p>

      <div className="mt-4 space-y-3">
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="space-y-4">
            <Step n={1} title="Where are you traveling from?">
              <input type="text" value={fromLocation} onChange={e => { setFromLocation(e.target.value); setResult(false); }} placeholder="e.g. Chennai, Bangalore, Madurai..." className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" />
            </Step>
            <Step n={2} title="Which temple?">
              <select value={temple} onChange={e => { setTemple(e.target.value); setResult(false); }} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron">
                {temples.map(x => <option key={x.id} value={x.slug}>{x.name}</option>)}
              </select>
            </Step>
          </div>

          <div className="h-full">
            {fromLocation.trim().length >= 3 ? (
              <div className="animate-in fade-in zoom-in-95 duration-300 w-full h-full min-h-[250px] rounded-2xl overflow-hidden shadow-sm border border-border bg-card flex flex-col">
                <div className="bg-saffron/10 px-4 py-2.5 border-b border-border flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-2 text-saffron font-medium text-sm">
                    <MapPin className="w-4 h-4" /> Live Route Preview
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-bold text-saffron bg-background px-2 py-1 rounded-md">{travelHours}h {travelMins}m</div>
                    <button onClick={() => setFullMap(true)} className="p-1 hover:bg-saffron/20 rounded-md transition-colors text-saffron" title="Full view">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                    </button>
                  </div>
                </div>
                <iframe 
                  className="flex-1 w-full"
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  referrerPolicy="no-referrer-when-downgrade" 
                  src={`https://maps.google.com/maps?saddr=${encodeURIComponent(fromLocation)}&daddr=${encodeURIComponent(t.city + ', TN')}&output=embed`}
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="w-full h-full min-h-[250px] rounded-2xl border-2 border-dashed border-border bg-secondary/50 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <MapPin className="w-8 h-8 mb-3 opacity-50" />
                <div className="text-sm font-medium">Enter your origin location to see the live route map</div>
              </div>
            )}
          </div>
        </div>

        <Step n={3} title="When do you plan to visit?">
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" />
        </Step>
        <Step n={4} title="What time do you prefer?">
          <PillRow value={time} setValue={setTime} options={[["morning","🌅 Early Morning"],["lateMorning","☀️ Morning"],["afternoon","🌤 Afternoon"],["evening","🌇 Evening"],["any","✨ AI decides"]]} />
        </Step>
        <Step n={5} title="Who is visiting?">
          <PillRow value={who} setValue={setWho} options={[["solo","👤 Just me"],["couple","👫 Couple"],["family","👨‍👩‍👧 Family"],["senior","👴 With seniors"],["dis","♿ Differently-abled"]]} />
        </Step>
        <Step n={6} title="Visit purpose?">
          <PillRow value={purpose} setValue={setPurpose} options={[["darshan","Regular darshan"],["pooja","Special pooja"],["festival","Festival attendance"],["first","First visit"]]} />
        </Step>

        <button onClick={handleGenerate} disabled={loading} className="w-full rounded-xl gradient-saffron text-white py-3 text-sm font-medium shadow-sm hover:opacity-95 disabled:opacity-70 flex justify-center items-center gap-2 transition-all mt-4">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? "AI is planning..." : "Generate AI Itinerary"}
        </button>
      </div>

      {result && (
        <div className="mt-6 fade-in rounded-xl p-[1px] gradient-saffron mb-10">
          <div className="bg-card rounded-xl p-4 lg:p-6">
            <div className="flex items-center gap-1.5 text-saffron font-medium text-sm"><Sparkles className="w-4 h-4" /> Your AI-Optimized Itinerary</div>
            <h2 className="font-serif text-2xl font-bold mt-1.5">{t.name}</h2>
            <div className="text-sm text-muted-foreground mt-0.5">Date: {date || "Upcoming"} · Best Darshan Time: <span className="font-medium text-foreground">3:30 PM – 5:00 PM</span></div>

            {/* Travel & Logistics */}
            <div className="mt-4 border border-border/50 bg-secondary/20 rounded-lg p-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-saffron/10 rounded-full blur-2xl pointer-events-none"></div>
              <div className="flex items-center gap-1.5 mb-3">
                <Navigation2 className="w-4 h-4 text-saffron" />
                <div className="text-sm font-semibold">Travel & Logistics</div>
              </div>
              
              <div className="flex items-center gap-4 bg-background border border-border/50 rounded-xl p-3 shadow-sm mb-3 relative z-10">
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Origin</div>
                  <div className="font-medium text-sm truncate">{fromLocation || "Your Location"}</div>
                </div>
                <div className="flex flex-col items-center justify-center shrink-0 w-16">
                  <div className="text-[10px] font-bold text-saffron mb-0.5">{travelHours}h {travelMins}m</div>
                  <div className="w-full h-px bg-border relative">
                    <ArrowRight className="w-3.5 h-3.5 text-saffron absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-0.5" />
                  </div>
                  <div className="text-[10px] font-medium text-muted-foreground mt-1 uppercase tracking-wider">by Road</div>
                </div>
                <div className="flex-1 text-right min-w-0">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Destination</div>
                  <div className="font-medium text-sm truncate">{t.city}</div>
                </div>
              </div>
              <div className="mt-4 space-y-3 relative z-10 mb-5">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Recommended Transport Modes</div>
                
                {/* Train Option */}
                {trans.trains.length > 0 && (
                  <div className="bg-background border border-border/50 rounded-xl p-4 shadow-sm hover:border-saffron/40 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-foreground flex items-center gap-2"><Train className="w-4 h-4 text-saffron"/> By Train</div>
                      <div className="text-xs font-bold text-saffron">~ {travelHours - 1 > 0 ? travelHours - 1 : 1}h 45m</div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {trans.trains.map((tr: any, i: number) => (
                        <div key={i} className="bg-secondary/50 rounded-lg p-2 flex justify-between items-center">
                          <div>
                            <div className="font-semibold mb-0.5 text-foreground">{tr.name}</div>
                            <div className="text-muted-foreground">{tr.time}</div>
                          </div>
                          <div className="font-semibold text-emerald-600">{tr.price}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5 border-t border-border/50 pt-2">
                      <Car className="w-3.5 h-3.5 shrink-0"/> <div><span className="font-medium text-foreground">Local Transit:</span> Auto-rickshaws & Prepaid cabs available 24/7 from {t.city} junction to temple (approx. 15-20 mins).</div>
                    </div>
                  </div>
                )}

                {/* Bus Option */}
                {trans.buses.length > 0 && (
                  <div className="bg-background border border-border/50 rounded-xl p-4 shadow-sm hover:border-saffron/40 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-foreground flex items-center gap-2"><Bus className="w-4 h-4 text-saffron"/> By Bus</div>
                      <div className="text-xs font-bold text-muted-foreground">~ {travelHours + 1}h {travelMins}m</div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">Frequent reliable bus services from your origin terminus to {t.city}.</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {trans.buses.map((b: any, i: number) => (
                        <div key={i} className="bg-secondary/50 rounded-lg p-2 flex justify-between items-center">
                          <div>
                            <div className="font-semibold mb-0.5 text-foreground">{b.name}</div>
                            <div className="text-muted-foreground">{b.time}</div>
                          </div>
                          <div className="font-semibold text-emerald-600">{b.price}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5 border-t border-border/50 pt-2">
                      <Navigation2 className="w-3.5 h-3.5 shrink-0"/> <div><span className="font-medium text-foreground">Local Transit:</span> Frequent share-autos and mini-buses ply from {t.city} bus stand directly to the temple entrance.</div>
                    </div>
                  </div>
                )}

                {/* Car Option */}
                <div className="bg-background border border-border/50 rounded-xl p-4 shadow-sm hover:border-saffron/40 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-semibold text-foreground flex items-center gap-2"><Car className="w-4 h-4 text-saffron"/> Personal Car / Outstation Cab</div>
                    <div className="text-xs font-bold text-muted-foreground">~ {travelHours}h {travelMins}m</div>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">Fastest and most flexible. Safe highway conditions. Ola, Uber, and local travel agencies offer outstation drops to {t.city}.</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 border-t border-border/50 pt-2">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-saffron"/> <div><strong>Suggested Route:</strong> {trans.route}</div>
                  </div>
                </div>
              </div>



              <div className="mt-4 border-t border-border/50 pt-4 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-muted-foreground" />
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recommended Stays Nearby</div>
                  </div>
                  <button className="text-[10px] font-semibold text-saffron hover:underline">View all</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-xl p-3 border border-border shadow-sm hover:border-saffron/40 transition-colors">
                    <div className="text-xs font-semibold truncate mb-1 text-foreground">{hotel1}</div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5 font-medium text-amber-500">⭐ 4.5</span>
                      <span>0.5 km away</span>
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-3 border border-border shadow-sm hover:border-saffron/40 transition-colors">
                    <div className="text-xs font-semibold truncate mb-1 text-foreground">{hotel2}</div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5 font-medium text-amber-500">⭐ 4.2</span>
                      <span>1.2 km away</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-saffron" />
                <div className="text-base font-semibold">Why did AI pick this time?</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Users, title: "Lowest Crowd", desc: "Drops to 30% capacity at 3:30 PM", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                  { icon: ThermometerSun, title: "Comfortable Weather", desc: "Temperature cools down to 28°C", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                  { icon: Bell, title: "Highly Auspicious", desc: "Aligns with Sayaratchai Pooja at 3:00 PM", color: "text-saffron", bg: "bg-saffron/10", border: "border-saffron/20" },
                  { icon: Heart, title: "Senior Friendly", desc: "Less rush, wheelchair ramps easily accessible", color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                  { icon: Car, title: "Easy Parking", desc: "Lot B will be 40% free at 3:30 PM", color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
                ].map((r, i) => (
                  <div key={i} className={`flex gap-3 bg-background p-3 rounded-xl border ${r.border} shadow-sm hover:shadow-md transition-shadow`}>
                    <div className={`w-8 h-8 rounded-full ${r.bg} ${r.color} flex items-center justify-center shrink-0`}>
                      <r.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-foreground uppercase tracking-wider">{r.title}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{r.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Ticket className="w-4 h-4 text-saffron" />
                <div className="text-sm font-semibold">Darshan Ticket Insights</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-secondary/40 border border-border/50 rounded-xl p-3 relative overflow-hidden group hover:border-border transition-colors">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">General Free</div>
                  <div className="font-serif font-semibold text-lg text-foreground">45 - 60 mins</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Normal queue via Main Entrance. High crowd expected.</div>
                </div>
                <div className="bg-saffron/5 border border-saffron/20 rounded-xl p-3 relative overflow-hidden group hover:border-saffron/40 transition-colors">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-saffron mb-1">Special (₹100)</div>
                  <div className="font-serif font-semibold text-lg text-saffron">30 mins</div>
                  <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">Dedicated queue line B.</div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5"/> VIP Pass (₹500)</div>
                  <div className="font-serif font-semibold text-lg text-emerald-600">~15 mins</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Fastest route. Direct access to Sanctum approach.</div>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-saffron/10 border border-saffron/20 rounded-lg p-2.5 text-xs text-saffron font-medium">
              ⚠ {t.specialDay} is a special puja day — carry valid ID for VIP darshan.
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button className="rounded-xl bg-foreground text-background px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5">🗺 Get Directions</button>
              <button className="rounded-xl bg-white border border-border px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5">🔔 Set crowd alert</button>
              <Link to="/temple/$slug" params={{ slug: t.slug }} className="rounded-xl bg-white border border-border px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5">View temple map →</Link>
            </div>

            <div className="mt-6 border-t border-border pt-4">
              <div className="text-sm font-semibold mb-2">Compare time slots for selected date</div>
              <div className="space-y-1.5">
                {[
                  { t: "6:00 – 8:00 AM", crowd: 20, wait: 12, stars: 5 },
                  { t: "8:00 – 10:00 AM", crowd: 75, wait: 58, stars: 2 },
                  { t: "10:00 – 12:00 PM", crowd: 60, wait: 42, stars: 3 },
                  { t: "3:00 – 5:00 PM", crowd: 35, wait: 18, stars: 5, pick: true },
                  { t: "5:00 – 7:00 PM", crowd: 55, wait: 35, stars: 3 },
                  { t: "7:00 – 9:00 PM", crowd: 40, wait: 22, stars: 4 },
                ].map(s => (
                  <div key={s.t} className={`flex items-center gap-2 text-xs p-2 rounded-lg transition-colors ${s.pick?"bg-saffron/10 border border-saffron/30":"border border-transparent hover:border-border"}`}>
                    <div className="w-28 shrink-0 font-medium">{s.t}</div>
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden"><div className="h-full transition-all" style={{ width: `${s.crowd}%`, background: s.crowd<40?"var(--status-low)":s.crowd<70?"var(--status-mod)":"var(--status-high)" }}/></div>
                    <div className="w-10 text-right text-muted-foreground">{s.wait}m</div>
                    <div className="w-14 text-right text-gold">{"⭐".repeat(s.stars)}</div>
                    {s.pick && <span className="text-[10px] text-saffron font-bold uppercase tracking-wider">AI Pick</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full View Map Modal */}
      {fullMap && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex flex-col animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-2 font-serif text-lg font-semibold">
              <MapPin className="w-5 h-5 text-saffron" />
              Route to {t.name}
            </div>
            <button onClick={() => setFullMap(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <iframe 
            className="flex-1 w-full"
            frameBorder="0" 
            style={{ border: 0 }} 
            referrerPolicy="no-referrer-when-downgrade" 
            src={`https://maps.google.com/maps?saddr=${encodeURIComponent(fromLocation)}&daddr=${encodeURIComponent(t.city + ', TN')}&output=embed`}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

function Step({ n, title, children }: any) {
  return (
    <div className="bg-card border border-border rounded-xl p-3 card-soft transition-all focus-within:ring-1 focus-within:ring-saffron/20 focus-within:border-saffron/40">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-5 h-5 rounded-md bg-saffron text-white text-xs font-semibold flex items-center justify-center shadow-sm">{n}</div>
        <div className="font-serif text-base font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
}

function PillRow({ value, setValue, options }: any) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([v, l]: any) => (
        <button key={v} onClick={() => setValue(v)} className={`text-sm rounded-xl px-4 py-2 border font-semibold transition-all ${value===v?"bg-foreground text-background border-foreground shadow-sm scale-[1.02]":"bg-white border-border hover:border-saffron/40 hover:bg-secondary text-muted-foreground hover:text-foreground"}`}>{l}</button>
      ))}
    </div>
  );
}

function getTransportInfo(origin: string, dest: string) {
  const o = (origin || "").toLowerCase();
  
  if (o.includes("bangalore") || o.includes("bengaluru") || o.includes("blr")) {
    if (dest === "palani-murugan") return {
      roadTime: "6h 30m", route: "NH 44 and NH 83 via Salem",
      buses: [{ name: "KPN Travels (AC Sleeper)", time: "10:30 PM", price: "₹850" }, { name: "SETC (Non-AC Seater)", time: "11:00 PM", price: "₹380" }],
      trains: [{ name: "Tuticorin Exp to Dindigul (16732)", time: "09:15 PM", price: "₹250 (SL)" }]
    };
    if (dest === "madurai-meenakshi") return {
      roadTime: "7h 00m", route: "NH 44 via Salem",
      buses: [{ name: "SRM Transports (AC Sleeper)", time: "10:00 PM", price: "₹950" }, { name: "IntrCity SmartBus", time: "11:15 PM", price: "₹1,100" }],
      trains: [{ name: "Tuticorin Exp (16236)", time: "09:15 PM", price: "₹300 (SL)" }, { name: "Nagercoil Exp (16340)", time: "10:30 PM", price: "₹320 (SL)" }]
    };
  } else if (o.includes("chennai") || o.includes("madras") || o.includes("maa")) {
    if (dest === "palani-murugan") return {
      roadTime: "8h 00m", route: "NH 38 via Trichy",
      buses: [{ name: "YBM Travels (AC Sleeper)", time: "09:30 PM", price: "₹900" }, { name: "SETC (AC Seater)", time: "10:00 PM", price: "₹450" }],
      trains: [{ name: "Palakkad Exp (22651)", time: "09:40 PM", price: "₹315 (SL), ₹850 (3A)" }]
    };
    if (dest === "madurai-meenakshi") return {
      roadTime: "7h 30m", route: "NH 38 via Trichy",
      buses: [{ name: "Parveen Travels (Volvo)", time: "10:15 PM", price: "₹1,200" }, { name: "SETC (Ultra Deluxe)", time: "10:30 PM", price: "₹480" }],
      trains: [{ name: "Pandian Exp (12637)", time: "09:40 PM", price: "₹315 (SL)" }, { name: "Kanyakumari Exp (12633)", time: "05:15 PM", price: "₹320 (SL)" }]
    };
  }
  
  return { roadTime: "Check Maps", route: "Fastest route via highway", buses: [], trains: [] };
}
