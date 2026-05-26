import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTemple, forecastFor, temples } from "@/data/temples";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Share2, Bookmark, Bell, Sparkles, Navigation, MessageCircle, MapPin, Clock, CheckCircle2, XCircle, AlertTriangle, Sunrise, Sun, Moon, Lock } from "lucide-react";
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CrowdBadge } from "@/components/app/CrowdBadge";

import muruganImg from "@/assets/murugan.png";
import meenakshiImg from "@/assets/meenakshi.png";

const bgImages: Record<string, string> = {
  "palani-murugan": muruganImg,
  "madurai-meenakshi": meenakshiImg,
};

function formatHM(hm?: string) {
  if (!hm) return "";
  let [h, m] = hm.split(":");
  let hInt = parseInt(h);
  let ampm = hInt >= 12 ? "PM" : "AM";
  if (hInt > 12) hInt -= 12;
  if (hInt === 0) hInt = 12;
  return `${hInt}:${m} ${ampm}`;
}

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
      setPct(p => Math.max(5, Math.min(98, p + (Math.random() * 6 - 3))));
      setWait(w => Math.max(2, Math.round(w + (Math.random() * 4 - 2))));
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
      <div className="relative h-[180px] lg:h-[200px] overflow-hidden" style={{
        background: hasBgImg
          ? `url(${bgImages[t.slug]}) center 20% / cover no-repeat`
          : `linear-gradient(135deg, ${t.gradientFrom}, ${t.color})`
      }}>
        {hasBgImg && <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-black/30" />}
        {!hasBgImg && <svg viewBox="0 0 100 100" className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-[0.08]"><text x="50" y="72" textAnchor="middle" fontSize="80" fill="currentColor" fontFamily="Noto Serif">ॐ</text></svg>}

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

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-4 relative z-20">
        {/* Full width Dashboard Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white/95 backdrop-blur-xl p-8 text-foreground">
          <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid gap-8 md:grid-cols-3 md:items-center relative z-10">
            <div>
              <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">{t.name}</div>
              <div className="text-sm text-slate-500 mt-1 font-medium tracking-wide uppercase">Crowd Intelligence Dashboard</div>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 text-xs font-bold tracking-wider text-emerald-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  LIVE <span className="text-emerald-600/80 font-semibold normal-case tracking-normal ml-1">· Updated {now.toLocaleTimeString("en-IN", { hour12: false })}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.06)] overflow-hidden w-full max-w-sm group hover:border-rose-200/80 transition-all duration-500">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-50 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-100/50 transition-colors duration-700" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-50 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-100/50 transition-colors duration-700" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-4 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> Live Darshan Wait
                  </div>

                  <div className="flex items-baseline gap-1.5 justify-center">
                    <div className="text-6xl font-extrabold tabular-nums tracking-tighter text-slate-800 drop-shadow-sm">{wait}</div>
                    <div className="text-xl font-bold text-slate-500 mb-2">mins</div>
                  </div>

                  <div className="mt-3 text-[13px] font-medium text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3 w-full shadow-inner">
                    If you join the line now,<br />
                    you will reach the Sanctum in <strong className="text-rose-600 font-bold">{wait} mins</strong>.
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between border-b border-slate-200/60 pb-2.5"><span className="text-slate-500 font-medium">Today's Total Devotee</span><span className="font-bold tabular-nums text-slate-800">38,240</span></div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2.5">
                <span className="text-slate-500 font-medium">Peak (10:30 AM)</span>
                <span className="text-right">
                  <div className="font-bold tabular-nums text-slate-800">15,820</div>
                  <div className="text-[11px] font-bold text-rose-500 mt-0.5">Maximum Wait: ~{t.waitMin + 45} mins</div>
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2.5"><span className="text-slate-500 font-medium">Darshan Flow</span><span className="font-bold text-emerald-600">1,250 / hr</span></div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">
                  Next Peak <br /> (5:00 PM - 6:30 PM)
                </span>
                <span className="text-right">
                  <div className="font-bold ">18,500 Expected</div>
                  <div className="text-[11px] font-bold text-rose-500 mt-0.5">Expected Wait: ~{t.waitMin + 60} mins</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 grid lg:grid-cols-3 gap-8">
        {/* Left/main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Recommendation */}
          <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-100 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-lg mb-1">
                <Sparkles className="w-5 h-5" /> AI Visit Intelligence
              </div>
              <div className="text-sm text-muted-foreground mb-5">Predictive insights based on live crowd data & historical trends</div>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                <SlotCard ok time="5:30 – 7:00 AM" period="Morning" label="Highly Recommended" />
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

              <div className="mt-6 flex">
                <Link to="/chat" className="relative group inline-flex items-center justify-center gap-2.5 text-sm font-bold text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(79,70,229,0.4)] bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200 overflow-hidden">
                  <span className="absolute inset-0 rounded-full border-2 border-indigo-400 animate-[ping_2s_ease-in-out_infinite] opacity-40 pointer-events-none" />
                  <div className="absolute inset-0 bg-white/20 group-hover:translate-x-[150%] -translate-x-[150%] skew-x-12 transition-transform duration-700 ease-out pointer-events-none" />
                  <Sparkles className="w-4 h-4 relative z-10" />
                  <span className="relative z-10 tracking-wide">Ask AI Assistant</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                </Link>
              </div>
            </div>
          </div>

          {/* Forecast chart */}
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl font-bold text-slate-900">Today's crowd forecast</h3>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">6 AM – 9 PM</span>
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
                  <ReferenceLine x={`${nowHour > 12 ? nowHour - 12 : nowHour}${nowHour >= 12 ? 'PM' : 'AM'}`} stroke="#1C1917" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="pct" stroke="#F97316" strokeWidth={2} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Timings */}
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-status-low animate-pulse" /><span className="font-bold text-slate-800">Temple is open</span></div>
            <div className="mt-5 grid sm:grid-cols-2 gap-y-6 gap-x-4 text-sm">
              <div>
                <div className="text-slate-500 font-bold tracking-widest uppercase text-xs mb-1">Morning</div>
                <div className="font-semibold text-slate-800">Open {formatHM(t.openTime)}</div>
                <div className="text-slate-500 mt-0.5">First Pooja {t.poojas[0]?.split(" ").slice(0, 2).join(" ")}</div>
              </div>
              <div>
                <div className="text-slate-500 font-bold tracking-widest uppercase text-xs mb-1">Afternoon Break</div>
                <div className="font-semibold text-slate-800">{t.afternoonClose ? `Closed ${formatHM(t.afternoonClose)}` : 'No Afternoon Break'}</div>
                <div className="text-slate-500 mt-0.5">{t.afternoonOpen ? `Until ${formatHM(t.afternoonOpen)}` : 'Open All Day'}</div>
              </div>
              <div>
                <div className="text-slate-500 font-bold tracking-widest uppercase text-xs mb-1">Evening</div>
                <div className="font-semibold text-slate-800">{t.afternoonOpen ? `Reopens ${formatHM(t.afternoonOpen)}` : 'Evening Darshan'}</div>
                <div className="text-slate-500 mt-0.5">Last Pooja {t.poojas[t.poojas.length - 1]?.split(" ").slice(0, 2).join(" ")}</div>
              </div>
              <div>
                <div className="text-slate-500 font-bold tracking-widest uppercase text-xs mb-1">Closes</div>
                <div className="font-semibold text-slate-800">Last Entry {formatHM(t.closeTime)}</div>
                <div className="text-slate-500 mt-0.5">Gates close {formatHM(t.closeTime)}</div>
              </div>
            </div>
            <div className="mt-6 flex">
              <Link to="/poojas" className="relative group inline-flex items-center justify-center gap-2.5 text-sm font-bold text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_25px_rgba(249,115,22,0.4)] bg-gradient-to-r from-orange-500 to-rose-500 shadow-lg shadow-orange-200 overflow-hidden w-full sm:w-auto">
                <span className="absolute inset-0 rounded-full border-2 border-orange-400 animate-[ping_2s_ease-in-out_infinite] opacity-40 pointer-events-none" />
                <div className="absolute inset-0 bg-white/20 group-hover:translate-x-[150%] -translate-x-[150%] skew-x-12 transition-transform duration-700 ease-out pointer-events-none" />
                <span className="relative z-10 tracking-wide">View full pooja schedule</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
              </Link>
            </div>
          </div>

          {/* Parking */}
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <h3 className="font-serif text-xl font-bold text-slate-900">Parking status</h3>
            <div className="mt-4 grid sm:grid-cols-3 gap-4">
              {(["lotA", "lotB", "overflow"] as const).map((k, i) => {
                const v = t.parking[k];
                const label = k === "lotA" ? "Lot A" : k === "lotB" ? "Lot B" : "Overflow";
                const colorClass = v > 80 ? "text-rose-600" : v > 50 ? "text-amber-500" : "text-emerald-500";
                const bgClass = v > 80 ? "bg-rose-500" : v > 50 ? "bg-amber-500" : "bg-emerald-500";
                return (
                  <div key={k} className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50">
                    <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</div>
                    <div className={`text-3xl font-serif font-bold mt-1.5 ${colorClass}`}>{v}%</div>
                    <div className="h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-1000 ease-out ${bgClass}`} style={{ width: `${v}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-sm font-medium text-indigo-900 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
              <span className="text-xl">🤖</span>
              <span>Park at Lot B or the overflow lot today — Lot A will be full by 10:30 AM.</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-gradient-to-br from-white to-orange-50/50 border border-orange-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all group-hover:bg-orange-500/20"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 text-orange-600">
                <Bell className="w-5 h-5" />
                <h3 className="font-serif text-xl font-bold text-slate-900">Smart Alerts</h3>
              </div>

              <div className="bg-white/60 backdrop-blur-sm border border-orange-100/50 rounded-2xl p-5 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200/50">
                  <div className="flex items-center gap-4">
                    <div className="relative grid h-14 w-14 place-items-center shrink-0">
                      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90 drop-shadow-sm">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="url(#alertGradient)" strokeWidth="8" strokeLinecap="round"
                          strokeDasharray={`${(pct / 100) * 264} 264`} className="transition-all duration-1000" />
                        <defs>
                          <linearGradient id="alertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="text-center flex flex-col items-center">
                        <div className="text-xs font-extrabold tabular-nums text-slate-800">{Math.round(pct)}%</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Capacity</div>
                      <div className="text-sm font-semibold text-slate-800 leading-tight mt-0.5">{pct > 80 ? "High Crowd" : pct > 50 ? "Moderate Crowd" : "Low Crowd"}</div>
                    </div>
                  </div>

                  <div className="sm:text-right sm:border-l border-slate-200/50 sm:pl-4">
                    <div className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 drop-shadow-sm">{t.crowd.toLocaleString()}</div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">Devotees Inside</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-slate-200/50 text-center">
                  <div>
                    <div className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 drop-shadow-sm">4,320</div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">In queue</div>
                  </div>
                  <div className="border-l border-slate-200/50">
                    <div className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 drop-shadow-sm">45m</div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">Wait</div>
                  </div>
                  <div className="border-l border-slate-200/50">
                    <div className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 drop-shadow-sm">8m</div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">Darshan</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 text-orange-600 rounded-full p-2 shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800 leading-tight">Get notified when capacity drops</p>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">We'll alert you when wait time is under 30 mins.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setAlertOn(a => !a)}
                className={`relative overflow-hidden w-full rounded-full py-3 text-sm font-bold border transition-all duration-300 ${alertOn
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm"
                    : "bg-gradient-to-r from-orange-500 to-rose-500 text-white border-transparent shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5"
                  }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-2">
                  {alertOn ? <CheckCircle2 className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                  {alertOn ? "Alert Active" : "Alert me when crowd drops"}
                </div>
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
              {tabContent.map((tname, i) => (
                <button key={tname} onClick={() => setTab(i)} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${tab === i ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>{tname}</button>
              ))}
            </div>
            <div className="pt-6 text-sm">
              {tab === 0 && (
                <div className="space-y-5">
                  <div className="flex flex-col gap-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Deity</span>
                    <span className="font-bold text-slate-900 break-words">{t.deity}</span>
                  </div>
                  <div className="leading-relaxed text-sm text-slate-700 font-medium">{t.description}</div>
                </div>
              )}
              {tab === 1 && (
                <div className="flex flex-wrap gap-2">
                  {["♿ Wheelchair", "🚻 Restrooms", "🥛 Prasad", "👟 Footwear", "💊 First Aid", "🚿 Bathing Ghat", "📵 No Photography", "🅿 Free Parking"].map(f => (
                    <div key={f} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-700 whitespace-nowrap">{f}</div>
                  ))}
                </div>
              )}
              {tab === 2 && (
                <div className="space-y-3">
                  {["🏨 Choultries — 0.3 km", "🍽 Veg restaurants — 0.5 km", "🏧 ATM — 0.2 km", "🏥 Hospital — 1.1 km"].map(n => (
                    <div key={n} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm font-medium text-slate-800 truncate mr-3">{n.split(" — ")[0]}</span>
                      <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{n.split(" — ")[1]}</span>
                    </div>
                  ))}
                </div>
              )}
              {tab === 3 && (
                <div className="space-y-4">
                  <div className="text-3xl font-serif font-bold text-slate-900">4.3 <span className="text-sm text-slate-500 font-medium">/ 5 · 2,841 reviews</span></div>
                  <div className="space-y-3">
                    <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                      <div className="text-sm font-medium text-slate-800">"Very peaceful in the morning hours."</div>
                      <div className="text-xs font-bold text-slate-500 mt-2">— Ramesh K · ⭐⭐⭐⭐⭐</div>
                    </div>
                    <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                      <div className="text-sm font-medium text-slate-800">"Queue was manageable at 4 PM."</div>
                      <div className="text-xs font-bold text-slate-500 mt-2">— Priya S · ⭐⭐⭐⭐</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">Other temples nearby</h3>
            <div className="space-y-2">
              {temples.filter(o => o.id !== t.id).slice(0, 4).map(o => (
                <Link key={o.id} to="/temple/$slug" params={{ slug: o.slug }} className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-serif shadow-sm group-hover:scale-105 transition-transform" style={{ background: o.color }}>ॐ</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif text-sm font-bold text-slate-800 truncate group-hover:text-saffron transition-colors">{o.name}</div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">{o.district}</div>
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
        <ActionBtn icon={<Navigation className="w-4 h-4" />} label="Navigate" />
        <ActionBtn icon={<Bell className="w-4 h-4" />} label="Alert" />
        <Link to="/chat" className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-foreground/80"><MessageCircle className="w-4 h-4" />Ask AI</Link>
        <ActionBtn icon={<Share2 className="w-4 h-4" />} label="Share" />
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
  const offset = c - (pct / 100) * c;
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
