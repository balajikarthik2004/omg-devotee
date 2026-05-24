import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, CheckCircle2, MapPin, ArrowRight, Navigation2, BedDouble, Ticket, Users, ThermometerSun, Bell, Heart, Car } from "lucide-react";
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
  const t = temples.find(x => x.slug === temple)!;

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-saffron"><Sparkles className="w-5 h-5" /><span className="text-sm font-medium">AI Smart Planner</span></div>
      <h1 className="font-serif text-3xl font-semibold mt-1">Plan my perfect visit</h1>
      <p className="text-muted-foreground text-sm mt-1">Tell us your preferences — AI will suggest the ideal time and travel route.</p>

      <div className="mt-6 space-y-4">
        <Step n={1} title="Where are you traveling from?">
          <input type="text" value={fromLocation} onChange={e => setFromLocation(e.target.value)} placeholder="e.g. Chennai, Bangalore, Madurai..." className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" />
        </Step>
        <Step n={2} title="Which temple?">
          <select value={temple} onChange={e => setTemple(e.target.value)} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron">
            {temples.map(x => <option key={x.id} value={x.slug}>{x.name}</option>)}
          </select>
        </Step>
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

        <button onClick={() => setResult(true)} className="w-full rounded-full gradient-saffron text-white py-3.5 text-base font-medium card-soft hover:opacity-95">
          ✨ Generate AI Itinerary
        </button>
      </div>

      {result && (
        <div className="mt-8 fade-in rounded-2xl p-[2px] gradient-saffron mb-16">
          <div className="bg-card rounded-2xl p-6">
            <div className="flex items-center gap-2 text-saffron font-medium"><Sparkles className="w-5 h-5" /> Your AI-Optimized Itinerary</div>
            <h2 className="font-serif text-2xl font-semibold mt-2">{t.name}</h2>
            <div className="text-sm text-muted-foreground">Date: {date || "Upcoming"} · Best Darshan Time: <span className="font-medium text-foreground">3:30 PM – 5:00 PM</span></div>

            {/* Travel & Logistics */}
            <div className="mt-6 border border-border/50 bg-secondary/30 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="flex items-center gap-2 mb-4">
                <Navigation2 className="w-4 h-4 text-saffron" />
                <div className="text-sm font-semibold">Travel & Logistics</div>
              </div>
              
              <div className="flex items-center gap-4 bg-background border border-border/50 rounded-xl p-3 shadow-sm mb-3 relative z-10">
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Origin</div>
                  <div className="font-medium text-sm truncate">{fromLocation || "Your Location"}</div>
                </div>
                <div className="flex flex-col items-center justify-center shrink-0 w-16">
                  <div className="text-[10px] font-bold text-saffron mb-0.5">6h 30m</div>
                  <div className="w-full h-px bg-border relative">
                    <ArrowRight className="w-3 h-3 text-saffron absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-0.5" />
                  </div>
                  <div className="text-[9px] font-medium text-muted-foreground mt-1 uppercase tracking-wider">by Road</div>
                </div>
                <div className="flex-1 text-right min-w-0">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Destination</div>
                  <div className="font-medium text-sm truncate">{t.city}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mb-5 flex items-center justify-center gap-1.5 bg-background border border-border/50 py-1.5 px-3 rounded-full w-fit mx-auto relative z-10"><MapPin className="w-3.5 h-3.5 text-saffron"/> <strong>Suggested Route:</strong> NH38 via Trichy</div>

              <div className="border-t border-border/50 pt-4 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-4 h-4 text-muted-foreground" />
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Recommended Stays Nearby</div>
                  </div>
                  <button className="text-[10px] font-semibold text-saffron hover:underline">View all</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-xl p-3 border border-border shadow-sm hover:border-saffron/40 transition-colors">
                    <div className="text-xs font-semibold truncate mb-1 text-foreground">Hotel Eden A Park</div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5 font-medium text-amber-500">⭐ 4.5</span>
                      <span>0.5 km away</span>
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-3 border border-border shadow-sm hover:border-saffron/40 transition-colors">
                    <div className="text-xs font-semibold truncate mb-1 text-foreground">Ganpat Grand</div>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-0.5 font-medium text-amber-500">⭐ 4.2</span>
                      <span>1.2 km away</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-saffron" />
                <div className="text-sm font-semibold">Why did AI pick this time?</div>
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
                  <div className="font-serif font-semibold text-lg text-saffron">~30 mins</div>
                  <div className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">Dedicated queue line B.</div>
                </div>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-3 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1"><Sparkles className="w-3 h-3"/> VIP Pass (₹500)</div>
                  <div className="font-serif font-semibold text-lg text-emerald-600">~15 mins</div>
                  <div className="text-[10px] text-muted-foreground mt-1">Fastest route. Direct access to Sanctum approach.</div>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-saffron/10 border border-saffron/20 rounded-xl p-3 text-sm text-saffron font-medium">
              ⚠ {t.specialDay} is a special puja day — carry valid ID for VIP darshan.
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <button className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5">🗺 Get Directions</button>
              <button className="rounded-full bg-white border border-border px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5">🔔 Set crowd alert</button>
              <Link to="/temple/$slug" params={{ slug: t.slug }} className="rounded-full bg-white border border-border px-5 py-2.5 text-sm font-medium transition-transform hover:-translate-y-0.5">View temple map →</Link>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="text-sm font-semibold mb-3">Compare time slots for selected date</div>
              <div className="space-y-2">
                {[
                  { t: "6:00 – 8:00 AM", crowd: 20, wait: 12, stars: 5 },
                  { t: "8:00 – 10:00 AM", crowd: 75, wait: 58, stars: 2 },
                  { t: "10:00 – 12:00 PM", crowd: 60, wait: 42, stars: 3 },
                  { t: "3:00 – 5:00 PM", crowd: 35, wait: 18, stars: 5, pick: true },
                  { t: "5:00 – 7:00 PM", crowd: 55, wait: 35, stars: 3 },
                  { t: "7:00 – 9:00 PM", crowd: 40, wait: 22, stars: 4 },
                ].map(s => (
                  <div key={s.t} className={`flex items-center gap-3 text-sm p-3 rounded-xl transition-colors ${s.pick?"bg-saffron/10 border border-saffron/30":"border border-transparent hover:border-border"}`}>
                    <div className="w-32 shrink-0 font-medium">{s.t}</div>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden"><div className="h-full transition-all" style={{ width: `${s.crowd}%`, background: s.crowd<40?"var(--status-low)":s.crowd<70?"var(--status-mod)":"var(--status-high)" }}/></div>
                    <div className="w-12 text-right text-muted-foreground">{s.wait}m</div>
                    <div className="w-16 text-right text-gold">{"⭐".repeat(s.stars)}</div>
                    {s.pick && <span className="text-xs text-saffron font-bold uppercase tracking-wider">AI Pick</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ n, title, children }: any) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 card-soft transition-all focus-within:ring-2 focus-within:ring-saffron/20 focus-within:border-saffron/40">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-7 h-7 rounded-full bg-saffron text-white text-sm font-medium flex items-center justify-center shadow-sm">{n}</div>
        <div className="font-serif font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
}

function PillRow({ value, setValue, options }: any) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([v, l]: any) => (
        <button key={v} onClick={() => setValue(v)} className={`text-sm rounded-full px-4 py-2 border font-medium transition-all ${value===v?"bg-foreground text-background border-foreground shadow-sm scale-[1.02]":"bg-white border-border hover:border-saffron/40 hover:bg-secondary text-muted-foreground hover:text-foreground"}`}>{l}</button>
      ))}
    </div>
  );
}
