import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Share2, Bookmark, Bell, Sparkles, Navigation, MessageCircle, MapPin, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getTemple, forecastFor, temples } from "@/data/temples";
import { CrowdBadge } from "@/components/app/CrowdBadge";

export const Route = createFileRoute("/_app/temple/$slug")({
  loader: ({ params }) => {
    const t = getTemple(params.slug);
    if (!t) throw notFound();
    return { temple: t };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.temple.name} — Live crowd, AI best time | OMG Smart Temple` },
      { name: "description", content: `Live crowd, parking and AI-recommended visit times for ${loaderData?.temple.name}.` },
    ],
  }),
  notFoundComponent: () => <div className="p-12 text-center text-muted-foreground">Temple not found, devotee 🙏</div>,
  component: TempleDetail,
});

function TempleDetail() {
  const { temple: t } = Route.useLoaderData();
  const data = forecastFor(t);
  const nowHour = new Date().getHours();
  const [pct, setPct] = useState(t.crowdPct);
  const [wait, setWait] = useState(t.waitMin);
  const [alertOn, setAlertOn] = useState(false);

  useEffect(() => {
    const i = setInterval(() => {
      setPct(p => Math.max(5, Math.min(98, p + (Math.random()*6 - 3))));
      setWait(w => Math.max(2, Math.round(w + (Math.random()*4 - 2))));
    }, 8000);
    return () => clearInterval(i);
  }, []);

  const tabContent = ["About", "Facilities", "Nearby", "Reviews"];
  const [tab, setTab] = useState(0);

  const meterColor = pct < 40 ? "var(--status-low)" : pct < 70 ? "var(--status-mod)" : "var(--status-high)";

  return (
    <div className="pb-24 lg:pb-6">
      {/* Hero */}
      <div className="relative h-[420px] lg:h-[540px] overflow-hidden bg-black flex justify-center">
        {/* Blurred background to prevent blank bars */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 blur-xl scale-110" 
          style={{ backgroundImage: `url(${t.deityImage || t.image || 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop'})` }}
        />
        
        {/* Un-cropped foreground image */}
        <img 
          src={t.deityImage || t.image || 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1200&auto=format&fit=crop'} 
          className="relative z-0 h-full w-auto object-contain"
          alt={t.deity || t.name}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />
        <svg viewBox="0 0 100 100" className="absolute -right-10 -bottom-10 w-72 h-72 text-white opacity-[0.10] mix-blend-overlay pointer-events-none"><text x="50" y="72" textAnchor="middle" fontSize="80" fill="currentColor" fontFamily="Noto Serif">ॐ</text></svg>
        
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 z-10">
          <Link to="/" className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white shadow-sm hover:bg-black/50 transition-colors border border-white/10"><ArrowLeft className="w-6 h-6" /></Link>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white shadow-sm hover:bg-black/50 transition-colors border border-white/10"><Share2 className="w-5 h-5" /></button>
            <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white shadow-sm hover:bg-black/50 transition-colors border border-white/10"><Bookmark className="w-5 h-5" /></button>
          </div>
        </div>
        
        <div className="absolute bottom-0 inset-x-0 p-5 lg:p-10 text-white z-10">
          <h1 className="font-serif text-5xl lg:text-6xl font-semibold leading-tight drop-shadow-lg">{t.name}</h1>
          <div className="text-lg lg:text-xl opacity-90 mt-2 drop-shadow-md font-medium">{t.established || "Ancient temple"} · {t.tier || "Major Kshetram"}</div>
          <div className="text-lg opacity-90 flex items-center gap-1.5 mt-1.5 drop-shadow-md"><MapPin className="w-6 h-6" /> {t.city}, {t.district} District</div>
        </div>
      </div>

      {/* Live strip */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-border">
        <div className="max-w-5xl mx-auto px-4 lg:px-8 py-2.5 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <CrowdBadge status={t.crowdStatus} size="md" />
          <span className="text-base flex items-center gap-1 text-white"><Clock className="w-5 h-5" /> {wait} min wait</span>
          <span className="text-base text-white">🅿 {t.parking.lotA}% full</span>
          <span className="ml-auto text-sm text-muted-foreground hidden sm:inline">Updated just now</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-4 grid lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left/main column */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* AI Recommendation */}
          <div className="bg-card border border-border rounded-xl card-soft overflow-hidden">
            <div className="border-l-4 border-saffron p-5">
              <div className="flex items-center gap-2 text-saffron font-medium"><Sparkles className="w-6 h-6" /> AI Visit Recommendation</div>
              <div className="mt-3 text-base text-muted-foreground">Best time to visit today:</div>
              <div className="mt-3 space-y-1.5 text-base">
                <SlotLine ok label="Morning · 6:30 – 8:00 AM" note="Recommended" />
                <SlotLine warn label="Mid-morning · 10:00 – 11:00 AM" note="Moderate" />
                <SlotLine ok label="Afternoon · 3:00 – 5:30 PM" note="Recommended" />
                <SlotLine ok label="Evening · 7:00 – 8:30 PM" note="Recommended" />
                <SlotLine bad label="Avoid · 8:30 – 10:00 AM" note="School groups" />
                <SlotLine bad label="Avoid · 11:30 AM – 1:00 PM" note="Noon rush" />
              </div>
              <div className="mt-4 text-base bg-secondary rounded-xl p-3 text-white">
                <span className="font-medium">AI says:</span> Today is {t.specialDay} — special pooja day. Expect ~40% more devotees than usual. Arrive before 7:00 AM or after 3:00 PM for a peaceful darshan.
              </div>
              <Link to="/chat" className="mt-4 inline-flex items-center gap-1.5 text-base font-medium text-saffron">Ask AI a question →</Link>
            </div>
          </div>

          {/* Forecast chart */}
          <div className="bg-card border border-border rounded-xl p-5 card-soft">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-2xl font-semibold">Today's crowd forecast</h3>
              <span className="text-base text-muted-foreground">6 AM – 9 PM</span>
            </div>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F97316" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#F97316" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} interval={1} stroke="#A8A29E" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#A8A29E" />
                  <Tooltip formatter={(v: any) => [`${v}%`, "Crowd"]} contentStyle={{ borderRadius: 12, border: "1px solid #F5F0E8" }} />
                  <ReferenceLine x={`${nowHour>12?nowHour-12:nowHour}${nowHour>=12?'PM':'AM'}`} stroke="#1C1917" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="pct" stroke="#F97316" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Timings */}
          <div className="bg-card border border-border rounded-2xl p-5 card-soft">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-status-low"/><span className="font-medium">Temple is open</span></div>
            <div className="mt-3 grid sm:grid-cols-2 gap-3 text-base">
              <div><div className="text-muted-foreground text-sm">Morning</div>Open {t.openTime} · First pooja {t.openTime}</div>
              <div><div className="text-muted-foreground text-sm">Afternoon break</div>Closed {t.afternoonClose || "12:30"} – {t.afternoonOpen || "15:00"}</div>
              <div><div className="text-muted-foreground text-sm">Evening</div>Reopens {t.afternoonOpen || "15:00"}</div>
              <div><div className="text-muted-foreground text-sm">Closes</div>Last entry 8:30 PM · Gates {t.closeTime}</div>
            </div>
            <Link to="/poojas" className="mt-3 inline-block text-base font-medium text-saffron">View full pooja schedule →</Link>
          </div>

          {/* Parking */}
          <div className="bg-card border border-border rounded-2xl p-5 card-soft">
            <h3 className="font-serif text-xl font-semibold">Parking status</h3>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              {(["lotA","lotB","overflow"] as const).map((k, i) => {
                const v = t.parking[k];
                const label = k === "lotA" ? "Lot A" : k === "lotB" ? "Lot B" : "Overflow";
                const color = v > 80 ? "var(--status-high)" : v > 50 ? "var(--status-mod)" : "var(--status-low)";
                return (
                  <div key={k} className="rounded-xl border border-border p-3">
                    <div className="text-base font-medium">{label}</div>
                    <div className="text-3xl font-serif font-semibold mt-1" style={{ color }}>{v}%</div>
                    <div className="h-1.5 bg-secondary rounded-full mt-2 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${v}%`, background: color }} /></div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-base text-white bg-secondary rounded-xl p-3">🤖 Park at Lot B or the overflow lot today — Lot A will be full by 10:30 AM.</div>
          </div>

          {/* Tabs */}
          <div className="bg-card border border-border rounded-2xl p-5 card-soft">
            <div className="flex gap-2 border-b border-border -mx-5 px-5 pb-3 overflow-x-auto scrollbar-hide">
              {tabContent.map((tname, i) => (
                <button key={tname} onClick={() => setTab(i)} className={`px-3 py-1.5 rounded-full text-base font-medium ${tab===i?"bg-foreground text-background":"text-muted-foreground"}`}>{tname}</button>
              ))}
            </div>
            <div className="pt-4 text-base">
              {tab===0 && <div className="space-y-2 text-white"><div><span className="font-medium">Deity:</span> {t.deity}</div><div>{t.name} is one of Tamil Nadu's most revered temples. Devotees throng here especially on {t.specialDay}s. The temple is part of the Paadal Petra Sthalams tradition.</div></div>}
              {tab===1 && <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{["♿ Wheelchair","🚻 Restrooms","🥛 Prasad","👟 Footwear","💊 First Aid","🚿 Bathing Ghat","📵 No Photography","🏧 ATM Nearby","🍽 Annadhanam","🅿 Free Parking"].map(f => <div key={f} className="bg-secondary rounded-xl p-2.5 text-base text-center">{f}</div>)}</div>}
              {tab===2 && <div className="space-y-2">{["🏨 Choultries — 0.3 km","🍽 Veg restaurants — 0.5 km","🏧 ATM — 0.2 km","🏥 Hospital — 1.1 km"].map(n => <div key={n} className="flex justify-between border-b border-border pb-2"><span>{n.split(" — ")[0]}</span><span className="text-muted-foreground">{n.split(" — ")[1]}</span></div>)}</div>}
              {tab===3 && <div className="space-y-3"><div className="text-3xl font-serif font-semibold">4.3 <span className="text-base text-muted-foreground">/ 5 · 2,841 reviews</span></div><div className="space-y-2"><div className="border border-border rounded-xl p-3"><div className="text-base">"Very peaceful in the morning hours."</div><div className="text-sm text-muted-foreground mt-1">— Ramesh K · ⭐⭐⭐⭐⭐</div></div><div className="border border-border rounded-xl p-3"><div className="text-base">"Queue was manageable at 4 PM."</div><div className="text-sm text-muted-foreground mt-1">— Priya S · ⭐⭐⭐⭐</div></div></div></div>}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4 lg:space-y-6">
          {/* Crowd meter */}
          <div className="bg-card border border-border rounded-xl p-5 card-soft">
            <h3 className="font-serif text-2xl font-semibold">Live crowd</h3>
            <Gauge pct={Math.round(pct)} color={meterColor} />
            <div className="text-center text-lg font-medium text-muted-foreground -mt-2">{t.crowd.toLocaleString()} devotees inside</div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <Stat label="In queue" value="4,320" />
              <Stat label="Wait" value={`${wait}m`} />
              <Stat label="Darshan" value="8m" />
            </div>
            <button onClick={() => setAlertOn(a => !a)} className={`mt-4 w-full rounded-full py-2.5 text-base font-medium border transition-colors ${alertOn?"bg-saffron text-white border-saffron":"bg-white border-border text-foreground hover:border-saffron/50"}`}>
              <Bell className="w-5 h-5 inline mr-1.5" /> {alertOn ? "Alert set — we'll notify you 🙏" : "Alert me when crowd drops"}
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 card-soft">
            <h3 className="font-serif text-xl font-semibold mb-3">Other temples nearby</h3>
            <div className="space-y-2">
              {temples.filter(o => o.id !== t.id).slice(0,4).map(o => (
                <Link key={o.id} to="/temple/$slug" params={{ slug: o.slug }} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm bg-cover bg-center overflow-hidden border border-border/50 relative" style={{ backgroundImage: `url(${o.image})`, backgroundColor: o.color }}>
                    {!o.image && <span className="font-serif text-base drop-shadow-md">ॐ</span>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-base font-semibold truncate">{o.name}</div>
                    <div className="text-sm text-muted-foreground">{o.district}</div>
                  </div>
                  <CrowdBadge status={o.crowdStatus} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky action bar (mobile) */}
      <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-border p-2 grid grid-cols-4 gap-2">
        <Link to="/plan" className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-white"><Navigation className="w-5 h-5"/>Navigate</Link>
        <button onClick={() => setAlertOn(a => !a)} className={`flex flex-col items-center justify-center gap-0.5 text-[11px] ${alertOn ? "text-saffron" : "text-white"}`}><Bell className="w-5 h-5"/>Alert</button>
        <Link to="/chat" className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-white"><MessageCircle className="w-5 h-5"/>Ask AI</Link>
        <button className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-white"><Share2 className="w-5 h-5"/>Share</button>
      </div>
    </div>
  );
}

function SlotLine({ ok, warn, bad, label, note }: any) {
  const Icon = ok ? CheckCircle2 : warn ? AlertTriangle : XCircle;
  const color = ok ? "var(--status-low)" : warn ? "var(--status-mod)" : "var(--status-high)";
  return <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Icon className="w-5 h-5" style={{ color }} /><span>{label}</span></div><span className="text-sm text-muted-foreground">{note}</span></div>;
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="bg-secondary rounded-xl p-2 text-white"><div className="font-serif font-semibold">{value}</div><div className="text-[11px] opacity-80">{label}</div></div>;
}

function ActionBtn({ icon, label }: any) {
  return <button className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-white">{icon}{label}</button>;
}

function Gauge({ pct, color }: { pct: number; color: string }) {
  const r = 70;
  const c = Math.PI * r;
  const offset = c - (pct/100) * c;
  return (
    <div className="relative my-2 flex justify-center">
      <svg viewBox="0 0 180 110" className="w-48 h-32">
        <path d="M 20 100 A 70 70 0 0 1 160 100" fill="none" stroke="#F5F0E8" strokeWidth="14" strokeLinecap="round" />
        <path d="M 20 100 A 70 70 0 0 1 160 100" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset .6s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
        <div className="font-serif text-4xl font-semibold" style={{ color }}>{pct}%</div>
        <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Capacity</div>
      </div>
    </div>
  );
}
