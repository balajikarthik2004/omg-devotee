import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon, MapPin } from "lucide-react";
import { temples, districts } from "@/data/temples";
import { CrowdBadge } from "@/components/app/CrowdBadge";

export const Route = createFileRoute("/_app/search")({
  head: () => ({ meta: [{ title: "Search Temples — OMG Smart Temple" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState<string>("");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [view, setView] = useState<"list"|"map">("list");

  const results = useMemo(() => {
    const v = q.toLowerCase().trim();
    return temples.filter(t => {
      if (district && t.district !== district) return false;
      if (!v) return true;
      return t.name.toLowerCase().includes(v) || t.district.toLowerCase().includes(v) || t.deity.toLowerCase().includes(v);
    });
  }, [q, district, onlyOpen]);

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-6">
      <div className="sticky top-0 -mx-4 lg:mx-0 px-4 lg:px-0 pt-2 pb-3 bg-background/95 backdrop-blur z-20">
        <div className="flex items-center gap-2 bg-white rounded-full border border-border card-soft px-4 py-2.5">
          <SearchIcon className="w-5 h-5 text-muted-foreground" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search temple, deity, or district..." className="flex-1 bg-transparent outline-none" />
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          <select value={district} onChange={e => setDistrict(e.target.value)} className="text-sm bg-white border border-border rounded-full px-3 py-1.5">
            <option value="">All districts</option>
            {districts.map(d => <option key={d}>{d}</option>)}
          </select>
          <button onClick={() => setOnlyOpen(o => !o)} className={`text-sm rounded-full px-3 py-1.5 border ${onlyOpen?"bg-foreground text-background border-foreground":"bg-white border-border"}`}>Open Now</button>
          <div className="ml-auto flex bg-white border border-border rounded-full p-0.5">
            <button onClick={() => setView("list")} className={`text-sm px-3 py-1 rounded-full ${view==="list"?"bg-foreground text-background":""}`}>List</button>
            {/* <button onClick={() => setView("map")} className={`text-sm px-3 py-1 rounded-full ${view==="map"?"bg-foreground text-background":""}`}>Map</button> */}
          </div>
        </div>
      </div>

      {view === "list" ? (
        <div className="space-y-3 mt-4">
          {results.map(t => (
            <Link key={t.id} to="/temple/$slug" params={{ slug: t.slug }} className="flex items-center gap-3 bg-card border border-border rounded-2xl p-3.5 card-soft hover:-translate-y-0.5 transition-transform">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-serif text-xl shrink-0" style={{ background: t.color }}>ॐ</div>
              <div className="flex-1 min-w-0">
                <div className="font-serif font-semibold truncate">{t.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {t.district} · {t.deity}</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <CrowdBadge status={t.crowdStatus} />
                  <span className="text-xs text-muted-foreground">⏱ {t.waitMin} min</span>
                  <span className="text-xs text-status-low">● Open</span>
                </div>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1">
                <span className="text-[11px] text-muted-foreground">AI best time</span>
                <span className="text-xs font-medium text-saffron bg-secondary px-2 py-0.5 rounded-full">3–5 PM</span>
              </div>
            </Link>
          ))}
          {results.length === 0 && <div className="text-center text-muted-foreground py-12">No temples found, devotee 🙏</div>}
        </div>
      ) : (
        <div className="mt-4 bg-card border border-border rounded-2xl p-6 card-soft">
          <div className="font-serif font-semibold mb-3">Tamil Nadu — Live Temple Map</div>
          <div className="relative aspect-[4/3] bg-secondary rounded-xl overflow-hidden">
            <svg viewBox="0 0 400 300" className="w-full h-full">
              <path d="M80 60 Q60 100 70 160 Q80 230 140 260 Q220 280 300 250 Q340 220 330 160 Q320 100 280 70 Q200 40 80 60 Z" fill="#FEF3C7" stroke="#EAB308" strokeWidth="1.5"/>
              {results.map((t, i) => {
                const x = 90 + (i * 31) % 220;
                const y = 90 + Math.floor((i * 31) / 220) * 50 + (i*17)%80;
                return <circle key={t.id} cx={x} cy={y} r="8" fill={t.color} className="pulse-soft" opacity={0.9} />;
              })}
            </svg>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-status-low"/> Low crowd</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-status-mod"/> Moderate</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-status-high"/> High / Critical</span>
          </div>
        </div>
      )}

      {!q && view==="list" && (
        <section className="mt-8">
          <h3 className="font-serif text-lg font-semibold mb-3">Browse by district</h3>
          <div className="flex flex-wrap gap-2">
            {districts.map(d => {
              const count = temples.filter(t => t.district === d).length;
              return (
                <button key={d} onClick={() => setDistrict(d)} className={`text-sm rounded-full px-3 py-1.5 border ${district===d?"bg-foreground text-background border-foreground":"bg-white border-border hover:border-saffron/40"}`}>
                  {d}{count>0 && <span className="ml-1 text-muted-foreground">({count})</span>}
                </button>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
