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
      {/* Topbar (Admin port) */}
      <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-[#fff9f0]/95 px-4 lg:px-8 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
          <button
            onClick={() => setTempleOpen((o) => !o)}
            className="group flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-saffron/30 hover:shadow-md"
          >
            <Landmark size={14} className="text-saffron transition-transform group-hover:scale-110" />
            {activeTemple.name}
            <ChevronDown size={14} className="text-muted-foreground transition-transform group-hover:translate-y-0.5" />
          </button>
          {templeOpen && (
            <div className="absolute left-1/2 top-full z-50 mt-1 w-72 -translate-x-1/2 overflow-hidden rounded-lg border border-border bg-white shadow-lg">
              {temples.map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setActiveTempleId(t.id); setTempleOpen(false); }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-secondary ${t.id === activeTempleId ? "bg-secondary font-semibold text-saffron" : ""
                    }`}
                >
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative hidden sm:block">
          <select value={district} onChange={e => setDistrict(e.target.value)} className="text-sm bg-white border border-border rounded-full px-4 py-2 font-medium outline-none focus:border-saffron focus:ring-1 focus:ring-saffron shadow-sm cursor-pointer hover:border-saffron/30 transition-all">
            <option value="">All Districts</option>
            {districts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
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
                    <div key={i} className="px-3 py-2 text-xs hover:bg-secondary/50">
                      <div className={`font-semibold ${n.c}`}>{n.t}</div>
                      <div className="text-muted-foreground mt-0.5">{n.b}</div>
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
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6">
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-sm bg-card p-6 text-foreground">
            <div className="grid gap-6 md:grid-cols-3 md:items-center">
              <div>
                <div className="text-xl font-bold font-serif">{activeTemple.name}</div>
                <div className="text-sm text-muted-foreground mt-0.5">Crowd Intelligence Dashboard</div>
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold tracking-wider text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    LIVE <span className="text-muted-foreground font-medium normal-case tracking-normal ml-1">· Updated {now.toLocaleTimeString("en-IN", { hour12: false })}</span>
                  </div>
                  <Link 
                    to="/temple/$slug" 
                    params={{ slug: activeTemple.slug }} 
                    className="group inline-flex items-center gap-1.5 text-xs font-bold text-white bg-saffron hover:bg-saffron/90 transition-all shadow-sm hover:shadow-[0_4px_12px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 px-5 py-2 rounded-full ml-2"
                  >
                    Explore Full Details <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center gap-5">
                <div className="relative grid h-32 w-32 place-items-center shrink-0">
                  <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--secondary)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="var(--saffron)" strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={`${(63 / 100) * 264} 264`} />
                  </svg>
                  <div className="text-center">
                    <div className="text-xl font-bold tabular-nums">63%</div>
                    <div className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Capacity</div>
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-bold tabular-nums">12,500</div>
                  <div className="text-xs text-muted-foreground font-medium mt-1">Devotees currently inside</div>
                </div>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between border-b border-border/50 pb-2"><span className="text-muted-foreground">Today's total</span><span className="font-semibold tabular-nums">38,240</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span className="text-muted-foreground">Peak (10:30 AM)</span><span className="font-semibold tabular-nums">15,820</span></div>
                <div className="flex justify-between border-b border-border/50 pb-2"><span className="text-muted-foreground">Darshan Flow Rate</span><span className="font-semibold">1,250 / hr</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Next Peak Est.</span><span className="font-semibold">5:30 PM</span></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-8 w-full">
        
        {/* Devotee Essentials */}
        {(!q && district === "" && activeFilter === "All") && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-saffron" />
              <h2 className="font-serif text-lg font-semibold text-foreground">Devotee Essentials</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Daily Panchangam / Calendar */}
              <div className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:border-saffron/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-saffron flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Today's Panchangam</div>
                  <div className="text-[10px] bg-secondary px-2 py-0.5 rounded-full font-medium text-foreground/80 border border-border">Valarpirai</div>
                </div>
                <div className="font-serif text-xl font-bold mb-1">Pradosham</div>
                <div className="text-sm text-foreground/80 leading-relaxed">Highly auspicious day for Lord Shiva. Special abhishekam begins at 4:30 PM.</div>
              </div>

              {/* Quick E-Services */}
              <div className="bg-card border border-border rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:border-saffron/40 transition-colors">
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-3"><HandHeart className="w-3.5 h-3.5" /> Quick E-Services</div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center gap-2 p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-colors text-left">
                    <Ticket className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-[11px] font-semibold text-foreground leading-tight">Book<br/>Darshan</span>
                  </button>
                  <button className="flex items-center gap-2 p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-colors text-left">
                    <Coins className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-[11px] font-semibold text-foreground leading-tight">Digital<br/>Hundi</span>
                  </button>
                  <button className="flex items-center gap-2 p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-colors text-left">
                    <PackageOpen className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="text-[11px] font-semibold text-foreground leading-tight">Order<br/>Prasadam</span>
                  </button>
                  <button className="flex items-center gap-2 p-2 rounded-xl bg-secondary/50 hover:bg-secondary border border-transparent hover:border-border transition-colors text-left">
                    <Heart className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-[11px] font-semibold text-foreground leading-tight">Donate<br/>Annadhanam</span>
                  </button>
                </div>
              </div>

              {/* Devotee Alert / Insight */}
              <div className="bg-gradient-to-br from-saffron/5 to-amber-500/5 border border-saffron/20 rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-saffron/40 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-saffron/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none transition-all group-hover:bg-saffron/20"></div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-saffron flex items-center gap-1.5 mb-2 relative z-10"><BellRing className="w-3.5 h-3.5" /> Live Temple Alert</div>
                  <div className="text-sm font-medium leading-relaxed relative z-10 text-foreground/90">Kapaleeshwarar Temple queue is moving exceptionally fast right now. Estimated wait time is only 15 mins!</div>
                </div>
                <Link to="/temple/$slug" params={{ slug: "kapaleeshwarar" }} className="mt-4 text-[11px] font-bold uppercase tracking-wider text-saffron inline-flex items-center gap-1 hover:text-saffron/80 w-fit relative z-10">
                  View Live Crowd <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
            </div>
          </section>
        )}

        {/* Live Temple Feed */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg font-semibold flex items-center gap-2">Live Darshan Feed</h2>
            <div className="text-xs text-muted-foreground font-medium bg-secondary px-2 py-1 rounded-full">{results.length} temples</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map(t => (
              <Link key={t.id} to="/temple/$slug" params={{ slug: t.slug }} className="group flex flex-col bg-card border border-border rounded-2xl p-4 hover:shadow-md transition-all hover:border-saffron/30">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-serif text-2xl shrink-0 shadow-inner" style={{ background: t.color }}>ॐ</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="font-serif font-semibold text-foreground truncate text-lg group-hover:text-saffron transition-colors">{t.name}</div>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5"><MapPin className="w-3.5 h-3.5" /> {t.district} · {t.deity}</div>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <CrowdBadge status={t.crowdStatus} />
                      <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-md">Wait: {t.waitMin} min</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-status-low bg-status-low/10 border border-status-low/20 px-2 py-1 rounded-md">Open Now</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">AI Optimal Darshan Time: <strong className="text-foreground">3:00 – 5:00 PM</strong></span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-saffron group-hover:translate-x-1 transition-all" />
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
