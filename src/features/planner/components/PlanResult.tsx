import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Sparkles, Navigation2, MapPin, ArrowRight, BedDouble, Ticket, Users, ThermometerSun, Bell, Heart, Car, Train, Bus } from "lucide-react";

export function PlanResult({
  t, date, fromLocation, travelHours, travelMins, trans, hotels, setFullMap
}: any) {
  const { t: tStr } = useTranslation();

  return (
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
                          {tr.time.split(',').map((tStrStr: string, idx: number) => (
                            <div key={idx} className="font-bold text-[10px] text-black bg-white/40 border border-white/20 px-2 py-0.5 rounded-md uppercase tracking-widest inline-block shadow-sm">{tStrStr.trim()}</div>
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
                          {b.time.split(',').map((tStrStr: string, idx: number) => (
                            <div key={idx} className="font-bold text-[10px] text-black bg-white/40 border border-white/20 px-2 py-0.5 rounded-md uppercase tracking-widest inline-block shadow-sm">{tStrStr.trim()}</div>
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
              {hotels.map((h: any) => (
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
  );
}
