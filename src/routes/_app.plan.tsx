import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, CheckCircle2, MapPin, ArrowRight, Navigation2, BedDouble, Ticket, Users, ThermometerSun, Bell, Heart, Car, Loader2, Train, Bus } from "lucide-react";
import { temples } from "@/data/temples";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_app/plan")({
  head: () => ({ meta: [{ title: "AI Smart Planner — OMG Smart Temple" }] }),
  component: PlanPage,
});

function PlanPage() {
  const { t: tStr } = useTranslation();
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
  const hotels = t.slug === "palani-murugan" ? [
    { name: "Ganpat Grand", rating: "4.5", dist: "0.5" },
    { name: "Hotel Tamil Nadu", rating: "4.2", dist: "1.2" },
    { name: "Hotel SR Palani", rating: "4.4", dist: "0.8" },
    { name: "Hotel Subam", rating: "4.3", dist: "0.9" }
  ] : [
    { name: `Hotel ${t.city} Grand`, rating: "4.5", dist: "0.5" },
    { name: "Hotel Tamil Nadu", rating: "4.2", dist: "1.2" },
    { name: `${t.name.split(' ')[0]} Residency`, rating: "4.1", dist: "0.9" },
    { name: "Sree Kumaran Inn", rating: "4.0", dist: "1.5" }
  ];
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-saffron/10 blur-3xl" />
      <div className="pointer-events-none absolute top-24 -left-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6 lg:py-10 relative">
        <div className="flex flex-wrap items-center gap-3 text-saffron">
          <div className="flex items-center gap-2 rounded-full bg-saffron/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest border border-saffron/20">
            <Sparkles className="w-4 h-4" /> {tStr("AI Smart Planner")}
          </div>
          <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{tStr("Premium itinerary design")}</div>
        </div>
        <div className="mt-3">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold leading-tight">{tStr("Plan my perfect visit")}</h1>
            <p className="text-muted-foreground text-sm mt-2 max-w-xl">
              {tStr("Tell us your preferences — AI will craft the ideal time, route, and on-site flow with a premium comfort focus.")}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid lg:grid-cols-2 gap-3">
            <div className="space-y-4">
              <Step n={1} title={tStr("Where are you traveling from?")}>
                <input type="text" value={fromLocation} onChange={e => { setFromLocation(e.target.value); setResult(false); }} placeholder={tStr("e.g. Chennai, Bangalore, Madurai...")} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" />
              </Step>
              <Step n={2} title={tStr("Which temple?")}>
                <select value={temple} onChange={e => { setTemple(e.target.value); setResult(false); }} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron">
                  {temples.map(x => <option key={x.id} value={x.slug}>{tStr(x.name)}</option>)}
                </select>
              </Step>
            </div>

            <div className="h-full">
              {fromLocation.trim().length >= 3 ? (
                <div className="animate-in fade-in zoom-in-95 duration-300 w-full h-full min-h-[260px] rounded-3xl overflow-hidden border border-border/60 bg-card shadow-[0_18px_45px_rgba(0,0,0,0.08)] flex flex-col">
                  <div className="bg-saffron/10 px-4 py-3 border-b border-border/60 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 text-saffron font-semibold text-sm">
                      <MapPin className="w-4 h-4" /> {tStr("Live Route Preview")}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs font-bold text-saffron bg-background px-2 py-1 rounded-md">{travelHours}{tStr("h")} {travelMins}{tStr("m")}</div>
                      <button onClick={() => setFullMap(true)} className="p-1 hover:bg-saffron/20 rounded-md transition-colors text-saffron" title="Full view">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
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
                <div className="w-full h-full min-h-[260px] rounded-3xl border border-dashed border-border/70 bg-secondary/40 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                  <MapPin className="w-8 h-8 mb-3 opacity-50" />
                  <div className="text-sm font-medium">{tStr("Enter your origin location to see the live route map")}</div>
                  <div className="text-xs text-muted-foreground/80 mt-1">{tStr("We will tailor the ETA and route quality score.")}</div>
                </div>
              )}
            </div>
          </div>

          <Step n={3} title={tStr("When do you plan to visit?")}>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" />
          </Step>
          <Step n={4} title={tStr("What time do you prefer?")}>
            <PillRow value={time} setValue={setTime} options={[["morning", tStr("🌅 Early Morning")], ["lateMorning", tStr("☀️ Morning")], ["afternoon", tStr("🌤 Afternoon")], ["evening", tStr("🌇 Evening")], ["any", tStr("✨ AI decides")]]} />
          </Step>
          <Step n={5} title={tStr("Who is visiting?")}>
            <PillRow value={who} setValue={setWho} options={[["solo", tStr("👤 Just me")], ["couple", tStr("👫 Couple")], ["family", tStr("👨‍👩‍👧 Family")], ["senior", tStr("👴 With seniors")], ["dis", tStr("♿ Differently-abled")]]} />
          </Step>
          <Step n={6} title={tStr("Visit purpose?")}>
            <PillRow value={purpose} setValue={setPurpose} options={[["darshan", tStr("Regular darshan")], ["pooja", tStr("Special pooja")], ["festival", tStr("Festival attendance")], ["first", tStr("First visit")]]} />
          </Step>

          <button onClick={handleGenerate} disabled={loading} className="w-full rounded-full gradient-saffron text-white py-3.5 text-sm font-semibold shadow-[0_12px_30px_rgba(234,179,8,0.35)] hover:opacity-95 disabled:opacity-70 flex justify-center items-center gap-2 transition-all mt-4">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? tStr("AI is planning...") : tStr("Generate AI Itinerary")}
          </button>
        </div>

        {result && (
          <div className="mt-6 fade-in rounded-2xl p-[1px] gradient-saffron mb-10">
            <div className="bg-card rounded-2xl p-4 lg:p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-1.5 text-saffron font-semibold text-sm"><Sparkles className="w-4 h-4" /> {tStr("Your AI-Optimized Itinerary")}</div>
                  <h2 className="font-serif text-2xl font-bold mt-1.5">{tStr(t.name)}</h2>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                  <div className="flex items-center gap-2.5 bg-gradient-to-b from-white to-slate-50/80 px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow">
                    <div className="bg-indigo-50 border border-indigo-100/50 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-sm leading-none drop-shadow-sm">📅</span>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-widest text-slate-400 font-bold leading-tight mb-0.5">{tStr("Travel Date")}</div>
                      <div className="text-xs font-extrabold text-slate-800 leading-tight tracking-tight">{date || tStr("Upcoming")}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2.5 bg-gradient-to-b from-emerald-50/80 to-emerald-100/30 px-3.5 py-2 rounded-xl border border-emerald-200/60 shadow-[0_2px_12px_rgba(16,185,129,0.08)] relative overflow-hidden group hover:border-emerald-300/80 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out transition-transform"></div>
                    <div className="bg-emerald-100/80 border border-emerald-200/50 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 relative z-10">
                      <span className="text-sm leading-none drop-shadow-sm">✨</span>
                    </div>
                    <div className="relative z-10">
                      <div className="text-[9px] uppercase tracking-widest text-emerald-600 font-bold leading-tight mb-0.5">{tStr("Best Darshan")}</div>
                      <div className="text-xs font-extrabold text-emerald-900 leading-tight tracking-tight">3:30 PM – 5:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Travel & Logistics */}
              <div className="mt-4 border border-border/60 bg-secondary/20 rounded-2xl p-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-saffron/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="flex items-center gap-1.5 mb-3">
                  <Navigation2 className="w-4 h-4 text-saffron" />
                  <div className="text-sm font-semibold">{tStr("Travel & Logistics")}</div>
                </div>

                <div className="flex items-center gap-4 bg-background border border-border/60 rounded-2xl p-3 shadow-sm mb-3 relative z-10">
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{tStr("Origin")}</div>
                    <div className="font-medium text-sm truncate">{fromLocation || tStr("Your Location")}</div>
                  </div>
                  <div className="flex flex-col items-center justify-center shrink-0 w-16">
                    <div className="text-[10px] font-bold text-saffron mb-0.5">{travelHours}{tStr("h")} {travelMins}{tStr("m")}</div>
                    <div className="w-full h-px bg-border relative">
                      <ArrowRight className="w-3.5 h-3.5 text-saffron absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-0.5" />
                    </div>
                    <div className="text-[10px] font-medium text-muted-foreground mt-1 uppercase tracking-wider">{tStr("by Road")}</div>
                  </div>
                  <div className="flex-1 text-right min-w-0">
                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">{tStr("Destination")}</div>
                    <div className="font-medium text-sm truncate">{tStr(t.city)}</div>
                  </div>
                </div>
                <div className="mt-4 space-y-3 relative z-10 mb-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{tStr("Recommended Transport Modes")}</div>

                  {/* Train Option */}
                  {trans.trains.length > 0 && (
                    <div className="bg-background border border-border/60 rounded-2xl p-4 shadow-sm hover:border-saffron/40 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-semibold text-foreground flex items-center gap-2"><Train className="w-4 h-4 text-saffron" /> {tStr("By Train")}</div>
                        <div className="text-xs font-bold text-saffron">~ {travelHours - 1 > 0 ? travelHours - 1 : 1}{tStr("h")} 45{tStr("m")}</div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {trans.trains.map((tr: any, i: number) => (
                          <div key={i} className="bg-secondary/50 rounded-xl p-2.5 flex justify-between items-center border border-border/20">
                            <div>
                              <div className="font-bold text-[13px] mb-0.5 text-foreground leading-tight">{tr.name}</div>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {tr.time.split(',').map((tStr: string, idx: number) => (
                                  <div key={idx} className="font-bold text-[10px] text-black bg-white/40 border border-white/20 px-2 py-0.5 rounded-md uppercase tracking-widest inline-block shadow-sm">{tStr.trim()}</div>
                                ))}
                              </div>
                            </div>
                            <div className="font-bold text-[11px] text-foreground bg-background border border-border/50 px-2.5 py-1 rounded-lg shadow-sm whitespace-nowrap">{tr.price.replace("Duration:", tStr("Duration:"))}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5 border-t border-border/50 pt-2">
                        <Car className="w-3.5 h-3.5 shrink-0" /> <div className="leading-snug"><span className="font-medium text-foreground">{tStr("Last Mile Transit:")}</span> {tStr("Auto & Cabs available from")} {tStr(t.city)} {tStr("Junction.")} <strong className="text-foreground/90 font-semibold">~15-20 {tStr("m")}</strong> {tStr("to temple.")} {tStr("Fare: Auto")} <strong className="text-emerald-600 font-bold">{tStr("Rs. 150")}</strong> · {tStr("Cab")} <strong className="text-emerald-600 font-bold">{tStr("Rs. 300")}</strong></div>
                      </div>
                    </div>
                  )}

                  {/* Bus Option */}
                  {trans.buses.length > 0 && (
                    <div className="bg-background border border-border/60 rounded-2xl p-4 shadow-sm hover:border-saffron/40 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-semibold text-foreground flex items-center gap-2"><Bus className="w-4 h-4 text-saffron" /> {tStr("By Bus")}</div>
                        <div className="text-xs font-bold text-muted-foreground">~ {travelHours + 1}{tStr("h")} {travelMins}{tStr("m")}</div>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">{tStr("Frequent reliable bus services from your origin terminus to")} {tStr(t.city)}.</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {trans.buses.map((b: any, i: number) => (
                          <div key={i} className="bg-secondary/50 rounded-xl p-2.5 flex justify-between items-center border border-border/20">
                            <div>
                              <div className="font-bold text-[13px] mb-0.5 text-foreground leading-tight">{b.name}</div>
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {b.time.split(',').map((tStr: string, idx: number) => (
                                  <div key={idx} className="font-bold text-[10px] text-black bg-white/40 border border-white/20 px-2 py-0.5 rounded-md uppercase tracking-widest inline-block shadow-sm">{tStr.trim()}</div>
                                ))}
                              </div>
                            </div>
                            <div className="font-bold text-[11px] text-foreground bg-background border border-border/50 px-2.5 py-1 rounded-lg shadow-sm whitespace-nowrap">{b.price.replace("Duration:", tStr("Duration:"))}</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5 border-t border-border/50 pt-2">
                        <Navigation2 className="w-3.5 h-3.5 shrink-0" /> <div className="leading-snug"><span className="font-medium text-foreground">{tStr("Last Mile Transit:")}</span> {tStr("Share-autos and mini-buses ply from")} {tStr(t.city)} {tStr("Bus Stand.")} <strong className="text-foreground/90 font-semibold">~10-15 {tStr("m")}</strong> {tStr("to temple.")} {tStr("Fare: Share-Auto")} <strong className="text-emerald-600 font-bold">{tStr("Rs. 30")}</strong> · {tStr("Private Auto")} <strong className="text-emerald-600 font-bold">{tStr("Rs. 100")}</strong></div>
                      </div>
                    </div>
                  )}

                  {/* Car Option */}
                  <div className="bg-background border border-border/60 rounded-2xl p-4 shadow-sm hover:border-saffron/40 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-semibold text-foreground flex items-center gap-2"><Car className="w-4 h-4 text-saffron" /> {tStr("Personal Car / Outstation Cab")}</div>
                      <div className="text-xs font-bold text-muted-foreground">~ {travelHours}{tStr("h")} {travelMins}{tStr("m")}</div>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{tStr("Fastest and most flexible. Safe highway conditions. Ola, Uber, and local travel agencies offer outstation drops to")} {tStr(t.city)}.</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1.5 border-t border-border/50 pt-2">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-saffron" /> <div><strong>{tStr("Suggested Route:")}</strong> {trans.route}</div>
                    </div>
                  </div>
                </div>



                <div className="mt-4 border-t border-border/50 pt-4 relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <BedDouble className="w-4 h-4 text-muted-foreground" />
                      <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{tStr("Recommended Stays Nearby")}</div>
                    </div>
                    <button className="text-[10px] font-semibold text-saffron hover:underline">{tStr("View all")}</button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {hotels.map(h => (
                      <div key={h.name} className="bg-background rounded-2xl p-3 border border-border shadow-sm hover:border-saffron/40 transition-colors">
                        <div className="text-xs font-semibold truncate mb-1 text-foreground">{h.name}</div>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span className="flex items-center gap-0.5 font-medium text-amber-500">⭐ {h.rating}</span>
                          <span>{h.dist} {tStr("km away")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-saffron" />
                  <div className="text-base font-semibold">{tStr("Why did AI pick this time?")}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { icon: Users, title: tStr("Lowest Crowd"), desc: tStr("Drops to 30% capacity at 3:30 PM"), color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                    { icon: ThermometerSun, title: tStr("Comfortable Weather"), desc: tStr("Temperature cools down to 28°C"), color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                    { icon: Bell, title: tStr("Highly Auspicious"), desc: tStr("Aligns with Sayaratchai Pooja at 3:00 PM"), color: "text-saffron", bg: "bg-saffron/10", border: "border-saffron/20" },
                    { icon: Heart, title: tStr("Senior citizen Friendly"), desc: tStr("Less rush, wheelchair ramps easily accessible"), color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                    { icon: Car, title: tStr("Easy Parking"), desc: tStr("Lot B will be 40% free at 3:30 PM"), color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
                  ].map((r, i) => (
                    <div key={i} className={`flex gap-3 bg-background p-3 rounded-2xl border ${r.border} shadow-sm hover:shadow-md transition-shadow`}>
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
                  <div className="text-sm font-semibold">{tStr("Darshan Ticket Insights")}</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-secondary/40 border border-border/50 rounded-2xl p-3 relative overflow-hidden group hover:border-border transition-colors">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{tStr("General Free")}</div>
                    <div className="font-serif font-semibold text-lg text-foreground">45 - 60 {tStr("m")}</div>
                    <div className="text-[10px] font-medium text-foreground/80 mt-1 leading-snug">{tStr("Normal queue via Main Entrance. High crowd expected.")}</div>
                  </div>
                  <div className="bg-saffron/5 border border-saffron/20 rounded-2xl p-3 relative overflow-hidden group hover:border-saffron/40 transition-colors">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-saffron mb-1">{tStr("Special (Rs. 100)")}</div>
                    <div className="font-serif font-semibold text-lg text-saffron">30 {tStr("m")}</div>
                    <div className="text-[10px] font-medium text-foreground/80 mt-1 flex items-center gap-1 leading-snug">{tStr("Dedicated queue line B.")}</div>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-3 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1 flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> {tStr("VIP Pass (Rs. 500)")}</div>
                    <div className="font-serif font-semibold text-lg text-emerald-600">15 {tStr("m")}</div>
                    <div className="text-[10px] font-medium text-foreground/80 mt-1 leading-snug">{tStr("Fastest route. Direct access to Sanctum approach.")}</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-saffron/10 border border-saffron/20 rounded-lg p-2.5 text-xs text-saffron font-medium">
                ⚠ {t.specialDay} {tStr("is a special puja day — carry valid ID for VIP darshan.")}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5">{tStr("🗺 Get Directions")}</button>
                <button className="rounded-full bg-white border border-border px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5">{tStr("🔔 Set crowd alert")}</button>
                <Link to="/temple/$slug" params={{ slug: t.slug }} className="rounded-full bg-white border border-border px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5">{tStr("View temple map →")}</Link>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="text-sm font-semibold mb-2">{tStr("Compare time slots for selected date")}</div>
                <div className="space-y-1.5">
                  {[
                    { t: "6:00 – 8:00 AM", crowd: 20, wait: 12, stars: 5 },
                    { t: "8:00 – 10:00 AM", crowd: 75, wait: 58, stars: 2 },
                    { t: "10:00 – 12:00 PM", crowd: 60, wait: 42, stars: 3 },
                    { t: "3:00 – 5:00 PM", crowd: 35, wait: 18, stars: 5, pick: true },
                    { t: "5:00 – 7:00 PM", crowd: 55, wait: 35, stars: 3 },
                    { t: "7:00 – 9:00 PM", crowd: 40, wait: 22, stars: 4 },
                  ].map(s => (
                    <div key={s.t} className={`flex items-center gap-2 text-xs p-2 rounded-lg transition-colors ${s.pick ? "bg-saffron/10 border border-saffron/30" : "border border-transparent hover:border-border"}`}>
                      <div className="w-28 shrink-0 font-medium">{s.t}</div>
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden"><div className="h-full transition-all" style={{ width: `${s.crowd}%`, background: s.crowd < 40 ? "var(--status-low)" : s.crowd < 70 ? "var(--status-mod)" : "var(--status-high)" }} /></div>
                      <div className="w-10 text-right text-muted-foreground">{s.wait}{tStr("m")}</div>
                      <div className="w-14 text-right text-gold">{"⭐".repeat(s.stars)}</div>
                      {s.pick && <span className="text-[10px] text-saffron font-bold uppercase tracking-wider">{tStr("AI Pick")}</span>}
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
                {tStr("Route to")} {tStr(t.name)}
              </div>
              <button onClick={() => setFullMap(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 text-foreground transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
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
    </div>
  );
}

function Step({ n, title, children }: any) {
  return (
    <div className="bg-card border border-border/70 rounded-2xl p-4 shadow-[0_10px_26px_rgba(0,0,0,0.06)] transition-all focus-within:ring-1 focus-within:ring-saffron/20 focus-within:border-saffron/40">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-saffron text-white text-xs font-semibold flex items-center justify-center shadow-sm">{n}</div>
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
        <button key={v} onClick={() => setValue(v)} className={`text-sm rounded-full px-4 py-2 border font-semibold transition-all ${value === v ? "bg-foreground text-background border-foreground shadow-sm scale-[1.02]" : "bg-white border-border hover:border-saffron/40 hover:bg-secondary text-muted-foreground hover:text-foreground"}`}>{l}</button>
      ))}
    </div>
  );
}

function getTransportInfo(origin: string, dest: string) {
  const o = (origin || "").toLowerCase();

  if (o.includes("bangalore") || o.includes("bengaluru") || o.includes("blr")) {
    if (dest === "palani-murugan") return {
      roadTime: "6h 30m", route: "NH 44 and NH 83 via Salem",
      buses: [
        { name: "SETC (Non-AC Seater)", time: "11:00 PM, 11:45 PM", price: "Duration: 7h 30m" }, 
        { name: "TNSTC (AC Sleeper)", time: "10:30 PM", price: "Duration: 7h 00m" },
        { name: "National Travels (Volvo)", time: "11:15 PM", price: "Duration: 6h 45m" }
      ],
      trains: [
        { name: "Tuticorin Exp to Dindigul (16732)", time: "09:15 PM", price: "Duration: 8h 10m" },
        { name: "Nagercoil Exp to Dindigul (16340)", time: "08:45 PM", price: "Duration: 7h 30m" }
      ]
    };
    if (dest === "madurai-meenakshi") return {
      roadTime: "7h 00m", route: "NH 44 via Salem",
      buses: [{ name: "SETC (Ultra Deluxe)", time: "10:30 PM", price: "Duration: 8h 00m" }, { name: "SRM Transports (AC Sleeper)", time: "10:00 PM", price: "Duration: 7h 30m" }],
      trains: [{ name: "Tuticorin Exp (16236)", time: "09:15 PM", price: "Duration: 9h 30m" }, { name: "Nagercoil Exp (16340)", time: "10:30 PM", price: "Duration: 9h 15m" }]
    };
  } else if (o.includes("chennai") || o.includes("madras") || o.includes("maa")) {
    if (dest === "palani-murugan") return {
      roadTime: "8h 00m", route: "NH 38 via Trichy",
      buses: [
        { name: "SETC (AC Seater)", time: "10:00 PM", price: "Duration: 9h 00m" }, 
        { name: "SETC (Non-AC Seater)", time: "11:00 PM, 11:45 PM", price: "Duration: 9h 30m" },
        { name: "TNSTC (Ultra Deluxe)", time: "08:30 PM", price: "Duration: 9h 30m" },
        { name: "YBM Travels (AC Sleeper)", time: "09:30 PM", price: "Duration: 8h 30m" },
        { name: "KPN Travels (Volvo A/C)", time: "11:00 PM", price: "Duration: 8h 15m" }
      ],
      trains: [
        { name: "Palakkad Exp (22651)", time: "09:40 PM", price: "Duration: 9h 45m" },
        { name: "Vaigai SF Exp to Dindigul (12635)", time: "01:50 PM", price: "Duration: 6h 15m" }
      ]
    };
    if (dest === "madurai-meenakshi") return {
      roadTime: "7h 30m", route: "NH 38 via Trichy",
      buses: [{ name: "SETC (Ultra Deluxe)", time: "10:30 PM", price: "Duration: 8h 30m" }, { name: "Parveen Travels (Volvo)", time: "10:15 PM", price: "Duration: 8h 00m" }],
      trains: [{ name: "Pandian Exp (12637)", time: "09:40 PM", price: "Duration: 7h 50m" }, { name: "Kanyakumari Exp (12633)", time: "05:15 PM", price: "Duration: 8h 20m" }]
    };
  }

  return { roadTime: "Check Maps", route: "Fastest route via highway", buses: [], trains: [] };
}
