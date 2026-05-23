import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, Mic, Sparkles, Sunrise, Sun, Moon, ArrowRight, LayoutGrid } from "lucide-react";
import { temples, type Temple } from "@/data/temples";
import { TempleCard } from "@/components/app/TempleCard";
import { CrowdBadge } from "@/components/app/CrowdBadge";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "OMG Smart Temple — Discover Tamil Nadu Temples" },
      { name: "description", content: "Discover temples, see live crowd, and get AI-recommended best times to visit." },
    ],
  }),
  component: Home,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return { icon: <Sunrise className="w-4 h-4" />, text: "Good Morning, Devotee" };
  if (h < 18) return { icon: <Sun className="w-4 h-4" />, text: "Good Afternoon, Devotee" };
  return { icon: <Moon className="w-4 h-4" />, text: "Good Evening, Devotee" };
}

function Home() {
  const g = greeting();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);

  const matches: Temple[] = useMemo(() => {
    if (!q.trim()) return [];
    const v = q.toLowerCase();
    return temples.filter(t =>
      t.name.toLowerCase().includes(v) ||
      t.district.toLowerCase().includes(v) ||
      t.deity.toLowerCase().includes(v)
    ).slice(0, 6);
  }, [q]);

  const filters = ["All", "Open Now", "Low Crowd", "Murugan", "Shiva", "Amman", "Chennai", "Madurai", "Trichy", "Coimbatore"];
  const aiPick = temples[0];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Clean Header Section */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-2 text-saffron mb-1">
            {g.icon}
            <span className="text-sm font-medium">{g.text}</span>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Plan your peaceful darshan today</h1>
          
          <div className="mt-6 flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative w-full max-w-xl">
              <div className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2.5 focus-within:border-saffron/40 focus-within:ring-1 focus-within:ring-saffron/40 transition-shadow">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setTimeout(() => setFocused(false), 150)}
                  placeholder="Search temple, deity, or district..."
                  className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
                <button className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"><Mic className="w-3.5 h-3.5" /></button>
              </div>
              {focused && (matches.length > 0 || !q) && (
                <div className="absolute z-30 mt-1 w-full bg-card rounded-lg border border-border shadow-md p-1.5 fade-in">
                  {q ? matches.map(t => (
                    <Link key={t.id} to="/temple/$slug" params={{ slug: t.slug }} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary transition-colors">
                      <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-serif text-xs" style={{ background: t.color }}>ॐ</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-serif text-sm font-semibold truncate">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.district} · {t.deity.split(" ")[1] || t.deity}</div>
                      </div>
                      <CrowdBadge status={t.crowdStatus} />
                    </Link>
                  )) : (
                    <>
                      <div className="px-2 py-1.5 text-[10px] text-muted-foreground uppercase tracking-wide font-semibold">Popular Near You</div>
                      {temples.slice(0,3).map(t => (
                        <Link key={t.id} to="/temple/$slug" params={{ slug: t.slug }} className="flex items-center gap-3 p-2 rounded-md hover:bg-secondary transition-colors">
                          <div className="w-8 h-8 rounded-md flex items-center justify-center text-white font-serif text-xs" style={{ background: t.color }}>ॐ</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-serif text-sm font-semibold truncate">{t.name}</div>
                            <div className="text-xs text-muted-foreground">{t.district}</div>
                          </div>
                          <CrowdBadge status={t.crowdStatus} />
                        </Link>
                      ))}
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Minimal Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {filters.slice(0, 5).map((f, i) => (
                <button key={f} className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                  i === 0 ? "bg-foreground text-background border-foreground" : "bg-card border-border hover:bg-secondary text-foreground"
                }`}>{f}</button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <div className="flex-1 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          <div className="xl:col-span-3 space-y-8">
            {/* Featured temples Grid */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg font-semibold flex items-center gap-2"><LayoutGrid className="w-4 h-4 text-muted-foreground" /> Featured Temples</h2>
                <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">View Directory →</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {temples.slice(0, 6).map(t => <TempleCard key={t.id} t={t} compact />)}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* AI Insights Sidebar Panel */}
            <section>
              <h2 className="font-serif text-lg font-semibold mb-4 flex items-center gap-2"><Sparkles className="w-4 h-4 text-saffron" /> AI Insights</h2>
              
              <Link to="/temple/$slug" params={{ slug: aiPick.slug }} className="block group">
                <div className="bg-saffron/10 border border-saffron/30 rounded-lg p-5 hover:bg-saffron/15 transition-colors">
                  <div className="text-xs font-bold uppercase tracking-wider text-saffron mb-2">Recommended Today</div>
                  <div className="font-serif text-lg font-semibold text-foreground leading-tight group-hover:underline">{aiPick.name}</div>
                  <div className="text-sm text-foreground/80 mt-2">Optimal darshan time: 3:00 – 5:00 PM</div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Wait time: {aiPick.waitMin} min</span>
                    <ArrowRight className="w-4 h-4 text-saffron transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              <div className="mt-4 space-y-3">
                <TimingCard label="Best Morning" temple="Kapaleeshwarar" time="7:00 – 9:00 AM" tag="Clear" isGood />
                <TimingCard label="Best Afternoon" temple="Srirangam" time="3:00 – 5:00 PM" tag="Clear" isGood />
                <TimingCard label="Avoid Today" temple="Tiruvannamalai" time="Karthigai prep" tag="Heavy" />
              </div>
            </section>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function TimingCard({ label, temple, time, tag, isGood }: any) {
  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</div>
          <div className="font-serif text-sm font-semibold mt-1">{temple}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{time}</div>
        </div>
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
          isGood ? "bg-green-500/10 text-green-700 border-green-500/20" : "bg-red-500/10 text-red-700 border-red-500/20"
        }`}>{tag}</span>
      </div>
    </div>
  );
}
