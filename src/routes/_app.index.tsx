import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { Search, Mic, Sparkles, Sunrise, Sun, Moon, ArrowRight, MapPin, BellRing, Landmark, ChevronDown, Bell, Calendar, HandHeart, Ticket, Coins, PackageOpen, Heart } from "lucide-react";
import { temples, districts } from "@/data/temples";
import { CrowdBadge } from "@/components/app/CrowdBadge";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "OMG Smart Temple — Devotee Dashboard" },
      { name: "description", content: "Your personalized dashboard for Tamil Nadu temples." },
    ],
  }),
  component: Dashboard,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return { icon: <Sunrise className="w-5 h-5 text-saffron" />, text: "Good Morning, Devotee 🙏" };
  if (h < 18) return { icon: <Sun className="w-5 h-5 text-saffron" />, text: "Good Afternoon, Devotee 🙏" };
  return { icon: <Moon className="w-5 h-5 text-indigo-400" />, text: "Good Evening, Devotee 🙏" };
}

function Dashboard() {
  const g = greeting();
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  const [templeOpen, setTempleOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [activeTempleId, setActiveTempleId] = useState(1); // 1 = Palani
  
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeTemple = temples.find(t => t.id === activeTempleId) || temples[0];

  const filters = ["All", "Open Now", "Shiva", "Murugan", "Amman", "Low Crowd"];

  // AI Suggestions tailored for a Tamil Nadu devotee
  const suggestions = [
    { id: 1, title: "Pradosham Today", desc: "Expect high crowds at Shiva temples this evening. Plan darshan before 4 PM.", type: "alert" },
    { id: 2, title: "Fast Darshan", desc: "Kapaleeshwarar queue is moving exceptionally fast (15 mins wait).", type: "good", templeSlug: "kapaleeshwarar" },
    { id: 3, title: "Palani Update", desc: "Rope car maintenance scheduled between 1 PM - 3 PM today.", type: "info", templeSlug: "palani-murugan" }
  ];

  const results = useMemo(() => {
    const v = q.toLowerCase().trim();
    return temples.filter(t => {
      // District filter
      if (district && t.district !== district) return false;
      
      // Category filter
      if (activeFilter === "Low Crowd" && t.crowdStatus !== "low") {
        return false;
      } else if (activeFilter !== "All" && activeFilter !== "Open Now" && !t.deity.includes(activeFilter)) {
        return false;
      }

      // Text search
      if (!v) return true;
      return t.name.toLowerCase().includes(v) || t.district.toLowerCase().includes(v) || t.deity.toLowerCase().includes(v);
    });
  }, [q, district, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-12">
      {/* Premium Top Navbar */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/20 bg-white/80 px-4 lg:px-8 backdrop-blur-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-4">
          
          {/* District Selector (First) */}
          <div className="relative hidden sm:block group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-saffron/20 to-rose-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <button
              onClick={() => setDistrictOpen((o) => !o)}
              className="relative flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:border-saffron/30"
            >
              <MapPin size={15} className="text-saffron transition-transform group-hover:scale-110" />
              <span className="text-foreground tracking-wide">{district || "All Districts"}</span>
              <ChevronDown size={14} className="text-muted-foreground transition-transform group-hover:translate-y-0.5 ml-1" />
            </button>
            {districtOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white/95 backdrop-blur-lg shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                <div className="max-h-80 overflow-y-auto py-1">
                  <button
                    onClick={() => { setDistrict(""); setDistrictOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      !district 
                        ? "bg-saffron/10 font-bold text-saffron" 
                        : "font-medium text-foreground/80 hover:bg-saffron hover:text-white"
                    }`}
                  >
                    <span className="truncate">All Districts</span>
                    {!district && <span className="w-1.5 h-1.5 rounded-full bg-saffron" />}
                  </button>
                  {districts.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDistrict(d); setDistrictOpen(false); }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                        d === district 
                          ? "bg-saffron/10 font-bold text-saffron" 
                          : "font-medium text-foreground/80 hover:bg-saffron hover:text-white"
                      }`}
                    >
                      <span className="truncate">{d}</span>
                      {d === district && <span className="w-1.5 h-1.5 rounded-full bg-saffron" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Temple Dropdown (Second) */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-saffron/20 to-amber-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <button
              onClick={() => setTempleOpen((o) => !o)}
              className="relative flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:border-saffron/30"
            >
              <Landmark size={15} className="text-saffron transition-transform group-hover:scale-110" />
              <span className="text-foreground tracking-wide">{activeTemple.name}</span>
              <ChevronDown size={14} className="text-muted-foreground transition-transform group-hover:translate-y-0.5 ml-1" />
            </button>
            {templeOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-white/95 backdrop-blur-lg shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
                <div className="max-h-80 overflow-y-auto py-1">
                  {temples.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => { setActiveTempleId(t.id); setTempleOpen(false); }}
                      className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                        t.id === activeTempleId 
                          ? "bg-saffron/10 font-bold text-saffron" 
                          : "font-medium text-foreground/80 hover:bg-saffron hover:text-white"
                      }`}
                    >
                      <span className="truncate">{t.name}</span>
                      {t.id === activeTempleId && <span className="w-1.5 h-1.5 rounded-full bg-saffron" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 text-sm text-muted-foreground">
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="font-mono font-medium text-foreground">
              {now.toLocaleTimeString("en-IN", { hour12: false, hour: "2-digit", minute: "2-digit" })}
            </span>
            <span className="text-xs">
              · {now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{activeTemple.district.split(" ")[0]}</span>
            <span className="text-xs font-semibold text-foreground">34°C ☀</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setBellOpen((o) => !o)}
              className="relative rounded-full p-2 transition-colors hover:bg-secondary"
            >
              <Bell size={18} className="text-muted-foreground transition-colors hover:text-foreground" />
              <span className="absolute right-1 top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-danger text-[8px] font-bold text-white">
                3
              </span>
            </button>
            {bellOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-lg border border-border bg-white shadow-lg">
                <div className="border-b border-border bg-secondary px-3 py-2 text-xs font-semibold">
                  Notifications
                </div>
                <div className="divide-y divide-border">
                  {[
                    { t: "Peak alert", b: "Inner sanctum approaching capacity", c: "text-danger" },
                    { t: "Queue update", b: "Lane B wait time +6 min", c: "text-saffron" },
                    { t: "Staff", b: "8 volunteers deployed to Lane C", c: "text-info" },
                  ].map((n, i) => (
                    <div key={i} className="px-3 py-2 text-xs hover:bg-saffron hover:text-white group transition-colors">
                      <div className={`font-semibold group-hover:text-white transition-colors ${n.c}`}>{n.t}</div>
                      <div className="text-muted-foreground mt-0.5 group-hover:text-white/80 transition-colors">{n.b}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
            SK
          </div>
        </div>
      </div>

      {/* Devotee Dashboard Header */}
      <header className="">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-gradient-to-br from-white via-white to-saffron/5 p-8 text-foreground backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-20 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid gap-8 md:grid-cols-3 md:items-center relative z-10">
              <div>
                <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">{activeTemple.name}</div>
                <div className="text-sm text-slate-500 mt-1 font-medium tracking-wide uppercase">Crowd Intelligence Dashboard</div>
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 text-xs font-bold tracking-wider text-emerald-700 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    LIVE <span className="text-emerald-600/80 font-semibold normal-case tracking-normal ml-1">· Updated {now.toLocaleTimeString("en-IN", { hour12: false })}</span>
                  </div>
                  <Link 
                    to="/temple/$slug" 
                    params={{ slug: activeTemple.slug }} 
                    className="group inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-saffron to-amber-500 hover:from-saffron/90 hover:to-amber-500/90 transition-all shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 px-5 py-2.5 rounded-full ml-1"
                  >
                    Explore Full Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center gap-6">
                <div className="relative grid h-36 w-36 place-items-center shrink-0">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90 drop-shadow-md">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#saffronGradient)" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${(63 / 100) * 264} 264`} className="transition-all duration-1000" />
                    <defs>
                      <linearGradient id="saffronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold tabular-nums text-slate-800">63%</div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">Capacity</div>
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-extrabold tabular-nums tracking-tight text-slate-900 drop-shadow-sm">12,500</div>
                  <div className="text-xs text-slate-500 font-semibold mt-2 uppercase tracking-wide">Devotees Inside</div>
                </div>
              </div>
              <div className="space-y-3.5 text-sm">
                <div className="flex justify-between border-b border-slate-200/60 pb-2.5"><span className="text-slate-500 font-medium"> Today's total Devotees</span><span className="font-bold tabular-nums text-slate-800">38,240</span></div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2.5"><span className="text-slate-500 font-medium">Peak (10:30 AM)</span><span className="font-bold tabular-nums text-slate-800">15,820</span></div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2.5"><span className="text-slate-500 font-medium">Darshan Flow</span><span className="font-bold text-emerald-600">1,250 / hr</span></div>
                <div className="flex justify-between"><span className="text-slate-500 font-medium">Next Peak <br /> (5:00 PM - 6:30 PM)</span><span className="font-bold text-rose-500">18,500 Expected</span></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-8 w-full">
        
        {/* Devotee Essentials */}
        {(!q && district === "" && activeFilter === "All") && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-saffron" />
              <h2 className="font-serif text-lg font-semibold text-foreground">Devotee Essentials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Daily Panchangam / Calendar */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="text-xs font-bold uppercase tracking-widest text-saffron flex items-center gap-2">
                    <div className="p-1.5 bg-saffron/10 rounded-lg"><Calendar className="w-4 h-4" /></div>
                    Panchangam
                  </div>
                  <div className="text-[10px] bg-slate-50 px-2.5 py-1 rounded-full font-bold text-slate-500 border border-slate-200 uppercase tracking-widest">Valarpirai</div>
                </div>
                <div className="font-serif text-2xl font-bold mb-2 text-slate-900 relative z-10">Pradosham</div>
                <div className="text-sm text-slate-500 leading-relaxed font-medium relative z-10">Highly auspicious day for Lord Shiva. Special abhishekam begins at 4:30 PM.</div>
              </div>

              {/* Quick E-Services */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4">
                  <div className="p-1.5 bg-slate-50 rounded-lg text-slate-500"><HandHeart className="w-4 h-4" /></div>
                  Quick Services
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 transition-all text-left group/btn shadow-sm hover:shadow">
                    <div className="p-1.5 bg-white rounded-xl shadow-sm group-hover/btn:scale-110 transition-transform"><Ticket className="w-4 h-4 text-emerald-600" /></div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight">Book<br/>Darshan</span>
                  </button>
                  <button className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 transition-all text-left group/btn shadow-sm hover:shadow">
                    <div className="p-1.5 bg-white rounded-xl shadow-sm group-hover/btn:scale-110 transition-transform"><Coins className="w-4 h-4 text-amber-500" /></div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight">Digital<br/>Hundi</span>
                  </button>
                  <button className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all text-left group/btn shadow-sm hover:shadow">
                    <div className="p-1.5 bg-white rounded-xl shadow-sm group-hover/btn:scale-110 transition-transform"><PackageOpen className="w-4 h-4 text-indigo-500" /></div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight">Order<br/>Prasadam</span>
                  </button>
                  <button className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 transition-all text-left group/btn shadow-sm hover:shadow">
                    <div className="p-1.5 bg-white rounded-xl shadow-sm group-hover/btn:scale-110 transition-transform"><Heart className="w-4 h-4 text-rose-500" /></div>
                    <span className="text-[11px] font-bold text-slate-700 leading-tight">Donate<br/>Annadhan</span>
                  </button>
                </div>
              </div>

              {/* Devotee Alert / Insight */}
              <div className="bg-gradient-to-br from-saffron/10 via-amber-500/5 to-rose-500/10 border border-saffron/20 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/20 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none transition-all group-hover:bg-saffron/30"></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-rose-600 flex items-center gap-2 mb-3 relative z-10">
                    <div className="p-1.5 bg-rose-100 rounded-lg"><BellRing className="w-4 h-4 animate-bounce text-rose-600" /></div>
                    Live Alert
                  </div>
                  <div className="text-sm font-semibold leading-relaxed relative z-10 text-slate-800">Kapaleeshwarar Temple queue is moving exceptionally fast right now. Estimated wait time is only 15 mins!</div>
                </div>
                <Link to="/temple/$slug" params={{ slug: "kapaleeshwarar" }} className="mt-5 text-[11px] font-bold uppercase tracking-widest text-rose-600 inline-flex items-center gap-1.5 hover:text-rose-700 w-fit relative z-10 bg-white/50 px-3 py-1.5 rounded-full border border-rose-200 backdrop-blur-sm transition-all hover:bg-white shadow-sm">
                  View Live Crowd <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
            </div>
          </section>
        )}

        {/* Live Temple Feed */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl font-bold flex items-center gap-2 text-slate-900 tracking-tight">Live Darshan Feed</h2>
            <div className="text-xs text-slate-500 font-bold tracking-widest uppercase bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">{results.length} Temples</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.map(t => (
              <Link key={t.id} to="/temple/$slug" params={{ slug: t.slug }} className="group flex flex-col bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: t.color }}></div>
                <div className="flex gap-5 relative z-10">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-serif text-3xl shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300" style={{ background: t.color }}>ॐ</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="font-serif font-bold text-slate-900 truncate text-xl group-hover:text-saffron transition-colors">{t.name}</div>
                    </div>
                    <div className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {t.district} · {t.deity}</div>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      <CrowdBadge status={t.crowdStatus} />
                      <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg shadow-sm">Wait: {t.waitMin} min</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg shadow-sm">Open Now</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs relative z-10">
                  <span className="text-slate-500 font-medium">AI Optimal Darshan Time: <strong className="text-slate-800">3:00 – 5:00 PM</strong></span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-saffron group-hover:border-saffron group-hover:shadow-md transition-all">
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {results.length === 0 && (
            <div className="text-center text-muted-foreground py-16 bg-card rounded-2xl border border-border">
              <div className="text-4xl mb-3">🙏</div>
              <div className="font-medium text-foreground">No temples found</div>
              <div className="text-sm mt-1">Try adjusting your filters or search terms.</div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
