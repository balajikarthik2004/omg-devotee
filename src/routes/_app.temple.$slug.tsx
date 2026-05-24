import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTemple, forecastFor, temples } from "@/data/temples";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Share2, Bookmark, Bell, Sparkles, Navigation, MessageCircle, MapPin, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CrowdBadge } from "@/components/app/CrowdBadge";

import muruganImg from "@/assets/murugan.png";
import meenakshiImg from "@/assets/meenakshi.png";

const bgImages: Record<string, string> = {
  "palani-murugan": muruganImg,
  "madurai-meenakshi": meenakshiImg,
};

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

  const now = new Date();
  const meterColor = pct < 40 ? "var(--status-low)" : pct < 70 ? "var(--status-mod)" : "var(--status-high)";
  const hasBgImg = !!bgImages[t.slug];

  return (
    <div className="pb-32 lg:pb-8">
      {/* Hero */}
      <div className="relative h-[260px] lg:h-[280px] overflow-hidden" style={{ 
        background: hasBgImg 
          ? `url(${bgImages[t.slug]}) center 20% / cover no-repeat` 
          : `linear-gradient(135deg, ${t.gradientFrom}, ${t.color})` 
      }}>
        {hasBgImg && <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/10 to-black/10" />}
        {!hasBgImg && <svg viewBox="0 0 100 100" className="absolute -right-10 -bottom-10 w-72 h-72 text-white opacity-[0.08]"><text x="50" y="72" textAnchor="middle" fontSize="80" fill="currentColor" fontFamily="Noto Serif">ॐ</text></svg>}
        
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 z-10">
          <Link to="/" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white"><ArrowLeft className="w-5 h-5" /></Link>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white"><Share2 className="w-4 h-4" /></button>
            <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white"><Bookmark className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 p-5 lg:p-8 text-white z-10">
          <h1 className="font-serif text-3xl lg:text-4xl font-semibold leading-tight drop-shadow-lg">{t.name}</h1>
          <div className="text-sm opacity-90 mt-1 drop-shadow-md">{t.established || "Ancient temple"} · {t.tier || "Major Kshetram"}</div>
          <div className="text-sm opacity-90 flex items-center gap-1 mt-1 drop-shadow-md"><MapPin className="w-4 h-4" /> {t.city}, {t.district} District</div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-6">
        {/* Full width Dashboard Card */}
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-sm bg-card p-6 text-foreground">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div>
              <div className="text-xl font-bold font-serif">{t.name}</div>
              <div className="text-sm text-muted-foreground mt-0.5">Crowd Intelligence Dashboard</div>
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold tracking-wider text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  LIVE <span className="text-muted-foreground font-medium normal-case tracking-normal ml-1">· Updated {now.toLocaleTimeString("en-IN", { hour12: false })}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-5">
              <div className="relative grid h-32 w-32 place-items-center shrink-0">
                <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--secondary)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--saffron)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(t.crowdPct / 100) * 264} 264`} />
                </svg>
                <div className="text-center">
                  <div className="text-xl font-bold tabular-nums">{t.crowdPct}%</div>
                  <div className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Capacity</div>
                </div>
              </div>
              <div>
                <div className="text-4xl font-bold tabular-nums">{t.crowd.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground font-medium mt-1">Devotees currently inside</div>
              </div>
            </div>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between border-b border-border/50 pb-2"><span className="text-muted-foreground">Today's total</span><span className="font-semibold tabular-nums">38,240</span></div>
              <div className="flex justify-between border-b border-border/50 pb-2"><span className="text-muted-foreground">Peak (10:30 AM)</span><span className="font-semibold tabular-nums">15,820</span></div>
              <div className="flex justify-between border-b border-border/50 pb-2"><span className="text-muted-foreground">Darshan Flow Rate</span><span className="font-semibold">1,250 / hr</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Next Peak Est.</span><span className="font-semibold">{t.afternoonOpen || "5:30 PM"}</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 grid lg:grid-cols-3 gap-6">
        {/* Left/main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Recommendation */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg mb-1">
                <Sparkles className="w-5 h-5" /> AI Visit Intelligence
              </div>
              <div className="text-sm text-muted-foreground mb-5">Predictive insights based on live crowd data & historical trends</div>
              
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <SlotCard ok time="6:30 – 8:00 AM" period="Morning" label="Highly Recommended" />
                <SlotCard warn time="10:00 – 11:00 AM" period="Mid-morning" label="Moderate Crowd" />
                <SlotCard ok time="3:00 – 5:30 PM" period="Afternoon" label="Recommended" />
                <SlotCard bad time="8:30 – 10:00 AM" period="Avoid" label="School Groups Rush" />
              </div>

              <div className="bg-white/80 backdrop-blur-md border border-indigo-100/50 rounded-xl p-4 shadow-sm flex gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-indigo-900 block mb-1">Insight for Today</span>
                  Today is <strong>{t.specialDay}</strong> — a highly auspicious day. Our models predict a <strong>40% surge</strong> in devotees. For a peaceful darshan, arrive before 7:00 AM or after 3:00 PM.
                </div>
              </div>

              <Link to="/chat" className="mt-5 group inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 hover:border-indigo-200 px-4 py-2 rounded-full transition-all">
                Ask AI Assistant <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Forecast chart */}
          <div className="bg-card border border-border rounded-2xl p-5 card-soft">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-lg font-semibold">Today's crowd forecast</h3>
              <span className="text-xs text-muted-foreground">6 AM – 9 PM</span>
            </div>
            <div className="h-48">
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
            <div className="mt-3 grid sm:grid-cols-2 gap-3 text-sm">
              <div><div className="text-muted-foreground text-xs">Morning</div>Open {t.openTime} · First pooja {t.openTime}</div>
              <div><div className="text-muted-foreground text-xs">Afternoon break</div>Closed {t.afternoonClose || "12:30"} – {t.afternoonOpen || "15:00"}</div>
              <div><div className="text-muted-foreground text-xs">Evening</div>Reopens {t.afternoonOpen || "15:00"}</div>
              <div><div className="text-muted-foreground text-xs">Closes</div>Last entry 8:30 PM · Gates {t.closeTime}</div>
            </div>
            <Link to="/poojas" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-saffron border border-saffron/30 hover:bg-saffron/10 px-4 py-2 rounded-full transition-colors">
              View full pooja schedule <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Parking */}
          <div className="bg-card border border-border rounded-2xl p-5 card-soft">
            <h3 className="font-serif text-lg font-semibold">Parking status</h3>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              {(["lotA","lotB","overflow"] as const).map((k, i) => {
                const v = t.parking[k];
                const label = k === "lotA" ? "Lot A" : k === "lotB" ? "Lot B" : "Overflow";
                const color = v > 80 ? "var(--status-high)" : v > 50 ? "var(--status-mod)" : "var(--status-low)";
                return (
                  <div key={k} className="rounded-xl border border-border p-3">
                    <div className="text-sm font-medium">{label}</div>
                    <div className="text-2xl font-serif font-semibold mt-1" style={{ color }}>{v}%</div>
                    <div className="h-1.5 bg-secondary rounded-full mt-2 overflow-hidden"><div className="h-full rounded-full" style={{ width: `${v}%`, background: color }} /></div>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-sm text-foreground/80 bg-secondary rounded-xl p-3">🤖 Park at Lot B or the overflow lot today — Lot A will be full by 10:30 AM.</div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="bg-card border border-border rounded-2xl p-5 card-soft">
            <div className="flex gap-2 border-b border-border -mx-5 px-5 pb-3 overflow-x-auto scrollbar-hide">
              {tabContent.map((tname, i) => (
                <button key={tname} onClick={() => setTab(i)} className={`px-3 py-1.5 rounded-full text-sm font-medium ${tab===i?"bg-foreground text-background":"text-muted-foreground"}`}>{tname}</button>
              ))}
            </div>
            <div className="pt-4 text-sm">
              {tab===0 && (
                <div className="space-y-4">
                  <div className="flex flex-col gap-1 bg-secondary/50 p-3 rounded-xl border border-border">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Deity</span>
                    <span className="font-medium text-foreground break-words">{t.deity}</span>
                  </div>
                  <div className="leading-relaxed text-sm text-foreground/80">{t.description}</div>
                </div>
              )}
              {tab===1 && (
                <div className="flex flex-wrap gap-2">
                  {["♿ Wheelchair","🚻 Restrooms","🥛 Prasad","👟 Footwear","💊 First Aid","🚿 Bathing Ghat","📵 No Photography","🅿 Free Parking"].map(f => (
                    <div key={f} className="bg-secondary rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-foreground/80 whitespace-nowrap">{f}</div>
                  ))}
                </div>
              )}
              {tab===2 && (
                <div className="space-y-2">
                  {["🏨 Choultries — 0.3 km","🍽 Veg restaurants — 0.5 km","🏧 ATM — 0.2 km","🏥 Hospital — 1.1 km"].map(n => (
                    <div key={n} className="flex justify-between items-center border-b border-border pb-2 last:border-0 last:pb-0">
                      <span className="text-sm truncate mr-2">{n.split(" — ")[0]}</span>
                      <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">{n.split(" — ")[1]}</span>
                    </div>
                  ))}
                </div>
              )}
              {tab===3 && (
                <div className="space-y-3">
                  <div className="text-2xl font-serif font-semibold">4.3 <span className="text-sm text-muted-foreground">/ 5 · 2,841 reviews</span></div>
                  <div className="space-y-2">
                    <div className="border border-border rounded-xl p-3">
                      <div className="text-sm">"Very peaceful in the morning hours."</div>
                      <div className="text-xs text-muted-foreground mt-1">— Ramesh K · ⭐⭐⭐⭐⭐</div>
                    </div>
                    <div className="border border-border rounded-xl p-3">
                      <div className="text-sm">"Queue was manageable at 4 PM."</div>
                      <div className="text-xs text-muted-foreground mt-1">— Priya S · ⭐⭐⭐⭐</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-card border border-border rounded-2xl p-5 card-soft">
            <h3 className="font-serif text-lg font-semibold mb-2">Crowd Alerts</h3>
            <p className="text-sm text-muted-foreground mb-4">Get notified when wait times drop below 30 mins.</p>
            <button onClick={() => setAlertOn(a => !a)} className={`w-full rounded-full py-2.5 text-sm font-medium border transition-colors ${alertOn?"bg-saffron text-white border-saffron":"bg-white border-border text-foreground hover:border-saffron/50"}`}>
              <Bell className="w-4 h-4 inline mr-1.5" /> {alertOn ? "Alert set — we'll notify you 🙏" : "Alert me when crowd drops"}
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 card-soft">
            <h3 className="font-serif text-lg font-semibold mb-3">Other temples nearby</h3>
            <div className="space-y-2">
              {temples.filter(o => o.id !== t.id).slice(0,4).map(o => (
                <Link key={o.id} to="/temple/$slug" params={{ slug: o.slug }} className="flex items-center gap-3 p-2 rounded-xl hover:bg-secondary">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-serif" style={{ background: o.color }}>ॐ</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-sm font-semibold truncate">{o.name}</div>
                    <div className="text-xs text-muted-foreground">{o.district}</div>
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
        <ActionBtn icon={<Navigation className="w-4 h-4"/>} label="Navigate" />
        <ActionBtn icon={<Bell className="w-4 h-4"/>} label="Alert" />
        <Link to="/chat" className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-foreground/80"><MessageCircle className="w-4 h-4"/>Ask AI</Link>
        <ActionBtn icon={<Share2 className="w-4 h-4"/>} label="Share" />
      </div>
    </div>
  );
}

function SlotCard({ ok, warn, bad, time, period, label }: any) {
  const Icon = ok ? CheckCircle2 : warn ? AlertTriangle : XCircle;
  const color = ok ? "text-emerald-600" : warn ? "text-amber-600" : "text-rose-600";
  const bg = ok ? "bg-emerald-50 border-emerald-100" : warn ? "bg-amber-50 border-amber-100" : "bg-rose-50 border-rose-100";
  
  return (
    <div className={`border rounded-xl p-3 flex flex-col gap-1.5 transition-all hover:shadow-sm ${bg}`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{period}</span>
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="font-bold text-sm text-slate-800 tracking-tight">{time}</div>
      <div className={`text-xs font-semibold ${color}`}>{label}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <div className="bg-secondary rounded-xl p-2"><div className="font-serif font-semibold">{value}</div><div className="text-[11px] text-muted-foreground">{label}</div></div>;
}

function ActionBtn({ icon, label }: any) {
  return <button className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-foreground/80">{icon}{label}</button>;
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
        <div className="font-serif text-3xl font-semibold" style={{ color }}>{pct}%</div>
        <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Capacity</div>
      </div>
    </div>
  );
}
