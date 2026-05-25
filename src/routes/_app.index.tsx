import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search, Mic, Sparkles, Sunrise, Sun, Moon, ArrowRight,
  MapPin, BellRing, Check, ChevronsUpDown, Clock, Users,
  TrendingUp, Flame, Star, Eye
} from "lucide-react";
import { temples, districts } from "@/data/temples";
import { CrowdBadge } from "@/components/app/CrowdBadge";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "OMG Devotee — AI-Powered Temple Guide" },
      { name: "description", content: "Your personalized AI-powered dashboard for Tamil Nadu temples." },
    ],
  }),
  component: Dashboard,
});

function greeting() {
  const h = new Date().getHours();
  if (h < 5) return { icon: "🌙", label: "Good Night", sub: "Devotee" };
  if (h < 12) return { icon: "🌅", label: "Good Morning", sub: "Devotee 🙏" };
  if (h < 17) return { icon: "☀️", label: "Good Afternoon", sub: "Devotee 🙏" };
  return { icon: "🌆", label: "Good Evening", sub: "Devotee 🙏" };
}

const crowdColor = (s: string) => {
  if (s === "LOW") return { bar: "#22c55e", bg: "#dcfce7", text: "#15803d" };
  if (s === "MODERATE") return { bar: "#f59e0b", bg: "#fef3c7", text: "#92400e" };
  if (s === "HIGH") return { bar: "#ef4444", bg: "#fee2e2", text: "#991b1b" };
  return { bar: "#dc2626", bg: "#fee2e2", text: "#7f1d1d" };
};

function Dashboard() {
  const g = greeting();
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [openDistrict, setOpenDistrict] = useState(false);

  const filters = ["All", "Open Now", "Shiva", "Murugan", "Amman", "Low Crowd"];

  const suggestions = [
    { id: 1, title: "Pradosham Today", desc: "Expect high crowds at Shiva temples this evening. Plan darshan before 4 PM.", type: "alert" },
    { id: 2, title: "Fast Darshan", desc: "Kapaleeshwarar queue is moving exceptionally fast (15 mins wait).", type: "good", templeSlug: "kapaleeshwarar" },
    { id: 3, title: "Palani Update", desc: "Rope car maintenance scheduled between 1 PM – 3 PM today.", type: "info", templeSlug: "palani-murugan" },
  ];

  const results = useMemo(() => {
    const v = q.toLowerCase().trim();
    return temples.filter(t => {
      if (district && t.district !== district) return false;
      if (activeFilter === "Low Crowd" && t.crowdStatus !== "LOW") return false;
      else if (activeFilter !== "All" && activeFilter !== "Open Now" && !t.deity.includes(activeFilter)) return false;
      if (!v) return true;
      return t.name.toLowerCase().includes(v) || t.district.toLowerCase().includes(v) || t.deity.toLowerCase().includes(v);
    });
  }, [q, district, activeFilter]);

  const groupedResults = useMemo(() => {
    const groups: Record<string, typeof results> = {};
    for (const t of results) {
      if (!groups[t.district]) groups[t.district] = [];
      groups[t.district].push(t);
    }
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [results]);

  return (
    <div className="min-h-screen bg-background">

      {/* ── STICKY HEADER ── */}
      <header className="sticky top-12 lg:top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 lg:px-6 py-3">
          {/* Greeting row */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl">{g.icon}</span>
                <h1 className="font-serif text-xl font-bold text-foreground">{g.label}, <span style={{ color: "#e32c26" }}>{g.sub}</span></h1>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">AI-Powered Temple Guide • Tamil Nadu</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-full border" style={{ color: "#e32c26", borderColor: "#e32c2630", background: "#e32c2608" }}>
                <Flame className="w-3.5 h-3.5" />
                Pradosham Today
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 focus-within:border-[#e32c26] focus-within:ring-2 focus-within:ring-[#e32c26]/15 transition-all">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search temples, deities, districts..."
              className="flex-1 bg-transparent outline-none text-base text-foreground placeholder:text-gray-400"
            />
            <button className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:text-[#e32c26] hover:border-[#e32c26]/30 transition-colors shadow-sm">
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex gap-1.5 mt-2.5 overflow-x-auto scrollbar-hide pb-0.5">
            <Popover open={openDistrict} onOpenChange={setOpenDistrict}>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-1 whitespace-nowrap text-sm bg-white border border-gray-200 rounded-full px-3 py-1.5 font-medium hover:border-[#e32c26]/40 transition-colors outline-none shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {district || "All Districts"}
                  <ChevronsUpDown className="w-2.5 h-2.5 text-gray-400" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-52 p-0 rounded-xl shadow-lg" align="start">
                <Command>
                  <CommandInput placeholder="Search district..." className="h-8 text-sm" />
                  <CommandList className="scrollbar-hide">
                    <CommandEmpty>No district found.</CommandEmpty>
                    <CommandGroup>
                      <CommandItem onSelect={() => { setDistrict(""); setOpenDistrict(false); }} className="cursor-pointer text-sm">
                        All Districts <Check className={cn("ml-auto h-3 w-3", !district ? "opacity-100" : "opacity-0")} />
                      </CommandItem>
                      {districts.map(d => (
                        <CommandItem key={d} value={d} onSelect={() => { setDistrict(d); setOpenDistrict(false); }} className="cursor-pointer text-sm">
                          {d} <Check className={cn("ml-auto h-3 w-3", district === d ? "opacity-100" : "opacity-0")} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`whitespace-nowrap text-sm rounded-full px-3 py-1.5 border font-medium transition-all shrink-0 ${
                  activeFilter === f
                    ? "text-white border-transparent shadow-sm"
                    : "bg-white border-gray-200 text-gray-600 hover:border-[#e32c26]/40"
                }`}
                style={activeFilter === f ? { background: "#e32c26", borderColor: "#e32c26" } : {}}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 lg:px-6 py-4 space-y-5">

        {/* ── QUICK STATS BAR ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: <Users className="w-5 h-5" />, label: "Temples Live", value: `${temples.length}`, color: "#131a72" },
            { icon: <TrendingUp className="w-5 h-5" />, label: "Low Crowd Now", value: `${temples.filter(t => t.crowdStatus === "LOW").length}`, color: "#22c55e" },
            { icon: <Clock className="w-5 h-5" />, label: "Open Now", value: `${temples.filter(t => t.crowdStatus !== "CRITICAL").length}`, color: "#e32c26" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0" style={{ background: s.color }}>
                {s.icon}
              </div>
              <div>
                <div className="text-xl font-bold text-foreground leading-tight">{s.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── AI SUGGESTIONS ── */}
        {!q && !district && activeFilter === "All" && (
          <section>
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="w-5 h-5" style={{ color: "#e32c26" }} />
              <h2 className="font-serif text-lg font-semibold">AI Smart Alerts</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x">
              {suggestions.map(s => {
                const colors = s.type === "alert" ? { accent: "#ef4444", bg: "#fef2f2" } : s.type === "good" ? { accent: "#22c55e", bg: "#f0fdf4" } : { accent: "#3b82f6", bg: "#eff6ff" };
                return (
                  <div key={s.id} className="snap-start shrink-0 w-60 rounded-xl border p-3 relative overflow-hidden" style={{ background: colors.bg, borderColor: colors.accent + "30" }}>
                    <div className="absolute top-0 left-0 w-0.5 h-full rounded-r-full" style={{ background: colors.accent }} />
                    <div className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5" style={{ color: colors.accent }}>
                      {s.type === "alert" && <BellRing className="w-3.5 h-3.5" />}
                      {s.type === "good" && <Star className="w-3.5 h-3.5" />}
                      {s.title}
                    </div>
                    <p className="text-sm text-gray-600 leading-snug">{s.desc}</p>
                    {s.templeSlug && (
                      <Link to="/temple/$slug" params={{ slug: s.templeSlug }} className="mt-2 flex items-center gap-1 text-xs font-semibold" style={{ color: colors.accent }}>
                        View Temple <ArrowRight className="w-2.5 h-2.5" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}


        {/* ── DISTRICT-WISE FEED ── */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full" style={{ background: "#e32c26" }} />
              <h2 className="font-serif text-lg font-semibold">Live Darshan Feed</h2>
            </div>
            <div className="text-sm text-muted-foreground bg-gray-100 px-2.5 py-1 rounded-full font-medium">
              {results.length} temples
            </div>
          </div>

          <div className="space-y-5">
            {groupedResults.map(([groupDistrict, groupTemples]) => (
              <div key={groupDistrict}>
                {/* District Header */}
                <div className="flex items-center gap-2 mb-2.5">
                  <MapPin className="w-4 h-4 shrink-0" style={{ color: "#e32c26" }} />
                  <h3 className="font-serif text-base font-bold text-foreground">{groupDistrict}</h3>
                  <div className="flex-1 h-px bg-gray-100 ml-1" />
                  <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full shrink-0">{groupTemples.length}</span>
                </div>

                {/* Netflix-style horizontal poster carousel */}
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-3 snap-x -mx-4 px-4 lg:mx-0 lg:px-0">
                  {groupTemples.map((t, index) => {
                    const c = crowdColor(t.crowdStatus);
                    return (
                      <Link
                        key={t.id}
                        to="/temple/$slug"
                        params={{ slug: t.slug }}
                        className="snap-start shrink-0 relative group rounded-xl overflow-visible hover:-translate-y-1 transition-all duration-200"
                        style={{ width: "350px" }}
                      >
                        {/* Giant number */}
                        <div
                          className="absolute -left-3.5 bottom-3 text-6xl font-black z-10 select-none pointer-events-none"
                          style={{
                            color: "transparent",
                            WebkitTextStroke: "1.5px rgba(255,255,255,0.85)",
                            fontFamily: "var(--font-serif)",
                            lineHeight: 1,
                            textShadow: "0 2px 8px rgba(0,0,0,0.4)"
                          }}
                        >
                          {index + 1}
                        </div>

                        {/* Poster card */}
                        <div className="w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm" style={{ aspectRatio: "16/9" }}>
                          <div
                            className="w-full h-full bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${t.image})`, backgroundColor: t.color }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-2.5 z-10">
                              <div className="font-serif font-bold text-white text-sm leading-tight mb-1 line-clamp-2">{t.name}</div>
                              <div className="text-[10px] text-white/70 line-clamp-1 mb-1.5">{t.deity.split("(")[0].trim()}</div>
                              <div className="flex items-center gap-1 flex-wrap">
                                <div className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: c.bg, color: c.text }}>
                                  {t.crowdStatus}
                                </div>
                                <div className="text-[10px] text-white/60 flex items-center gap-0.5">
                                  <Clock className="w-2 h-2" />{t.waitMin}m
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <div className="text-4xl mb-2">🙏</div>
              <div className="font-semibold text-base text-foreground">No temples found</div>
              <div className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search terms.</div>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
