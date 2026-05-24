import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Mic, Sparkles, Sunrise, Sun, Moon, ArrowRight, MapPin, BellRing } from "lucide-react";
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
      {/* Devotee Header */}
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {g.icon}
              <h1 className="font-serif text-xl font-semibold text-foreground">{g.text}</h1>
            </div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-saffron bg-saffron/10 border border-saffron/20 px-3 py-1 rounded-full">
              Today: Valarpirai, Pradosham
            </div>
          </div>
          
          {/* Unified Search Bar */}
          <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-3 focus-within:border-saffron focus-within:ring-1 focus-within:ring-saffron transition-shadow shadow-inner">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search for temples, deities, or districts in Tamil Nadu..."
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
            />
            <button className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><Mic className="w-4 h-4" /></button>
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
            <select value={district} onChange={e => setDistrict(e.target.value)} className="text-sm bg-background border border-border rounded-full px-4 py-1.5 font-medium outline-none focus:border-saffron focus:ring-1 focus:ring-saffron">
              <option value="">All districts</option>
              {districts.map(d => <option key={d}>{d}</option>)}
            </select>
            {filters.map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`whitespace-nowrap text-sm rounded-full px-4 py-1.5 border font-medium transition-colors ${
                  activeFilter === f ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:bg-secondary text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-6 space-y-8 w-full">
        
        {/* AI Smart Suggestions */}
        {(!q && district === "" && activeFilter === "All") && (
          <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-saffron" />
              <h2 className="font-serif text-lg font-semibold text-foreground">Smart Suggestions</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x">
              {suggestions.map(s => (
                <div key={s.id} className="snap-start shrink-0 w-72 bg-card border border-border rounded-2xl p-4 flex flex-col justify-between hover:border-saffron/40 transition-colors shadow-sm relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${s.type === 'alert' ? 'bg-danger' : s.type === 'good' ? 'bg-emerald' : 'bg-info'}`}></div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2">
                      {s.type === 'alert' && <BellRing className="w-3 h-3 text-danger" />}
                      {s.type === 'good' && <Sparkles className="w-3 h-3 text-emerald" />}
                      <span className={s.type === 'alert' ? 'text-danger' : s.type === 'good' ? 'text-emerald' : 'text-info'}>{s.title}</span>
                    </div>
                    <div className="text-sm font-medium text-foreground leading-relaxed">{s.desc}</div>
                  </div>
                  {s.templeSlug && (
                    <Link to="/temple/$slug" params={{ slug: s.templeSlug }} className="mt-4 text-xs font-semibold text-saffron flex items-center gap-1 group">
                      View Temple <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              ))}
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
