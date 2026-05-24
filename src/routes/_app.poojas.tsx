import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { temples } from "@/data/temples";
import { MapPin, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_app/poojas")({
  head: () => ({ meta: [{ title: "Pooja & Timings — OMG Smart Temple" }] }),
  component: PoojaPage,
});

function PoojaPage() {
  const router = useRouter();
  const [sel, setSel] = useState(temples[0].id);
  const t = temples.find(x => x.id === sel)!;
  const now = new Date().getHours();

  function status(p: string) {
    let [timeStr, ampm] = p.split(" ");
    let h = parseInt(timeStr.split(":")[0]);
    if (ampm === "PM" && h !== 12) h += 12;
    if (ampm === "AM" && h === 12) h = 0;
    
    if (h < now) return "done";
    if (h === now) return "live";
    return "upcoming";
  }

  return (
    <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8 pb-24">
      <button 
        onClick={() => router.history.back()} 
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors bg-secondary/50 hover:bg-secondary px-3 py-1.5 rounded-full"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <h1 className="font-serif text-3xl lg:text-4xl font-semibold tracking-tight">Pooja & Timings</h1>
      <p className="text-muted-foreground text-sm lg:text-base mt-2">Comprehensive pooja schedules across major Tamil Nadu temples.</p>

      <div className="mt-8 flex gap-2.5 overflow-x-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 pb-2">
        {temples.map(temple => (
          <button 
            key={temple.id} 
            onClick={() => setSel(temple.id)} 
            className={`shrink-0 text-sm rounded-full px-5 py-2 border font-medium transition-all ${
              sel===temple.id ? "bg-foreground text-background border-foreground shadow-md" : "bg-white border-border hover:bg-secondary text-foreground/80 hover:text-foreground"
            }`}
          >
            {temple.name.split(" ").slice(0, 2).join(" ")}
          </button>
        ))}
      </div>

      <div className="mt-6 bg-card border border-border rounded-2xl p-6 lg:p-8 card-soft shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-6">
          <div>
            <div className="font-serif text-2xl font-semibold">{t.name}</div>
            <div className="text-sm text-saffron font-medium mt-1">
              {t.specialDay} is the special pooja day
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 px-4 py-2 rounded-full text-sm font-bold tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> OPEN
          </div>
        </div>

        <div className="mt-8 relative border-l-2 border-border ml-2 space-y-8 pb-4">
          {t.poojas.map(p => {
            const s = status(p);
            const time = p.split(" ").slice(0,2).join(" ");
            const name = p.split(" ").slice(2).join(" ");
            const isDone = s === "done";
            const isLive = s === "live";

            return (
              <div key={p} className="relative pl-8 group">
                {/* Timeline Dot */}
                <div 
                  className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full border-[4px] border-card shadow-sm transition-colors ${
                    isDone ? 'bg-emerald-500' : isLive ? 'bg-saffron animate-pulse' : 'bg-border'
                  }`} 
                />
                
                <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl border transition-all ${
                  isLive ? 'bg-saffron/5 border-saffron/30 shadow-sm' : 'bg-white border-transparent group-hover:border-border group-hover:bg-secondary/50'
                }`}>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`text-base font-bold ${isLive ? 'text-foreground' : isDone ? 'text-foreground/80' : 'text-muted-foreground'}`}>
                        {name}
                      </span>
                      {isLive && (
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-saffron text-white px-2.5 py-0.5 rounded-full shadow-sm">
                          Live Now
                        </span>
                      )}
                    </div>
                    <div className={`text-sm mt-1 font-medium ${isLive ? 'text-saffron' : isDone ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>
                      {time}
                    </div>
                  </div>
                  <div className={`text-xs font-semibold uppercase tracking-wider ${isLive ? 'text-saffron' : isDone ? 'text-emerald-600' : 'text-muted-foreground/50'}`}>
                    {isDone ? "Completed ✓" : isLive ? "In Progress" : "Upcoming"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-secondary/80 border border-border rounded-xl p-4 text-sm font-medium text-foreground/80 flex items-start gap-3">
          <span className="text-xl leading-none">⭐</span>
          <div>
            <div className="text-foreground">Today's Special Announcement</div>
            <div className="text-muted-foreground font-normal mt-0.5">Abhishekam for registered devotees at 6:30 AM · Special Sashti Pooja at 7:00 AM</div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <h2 className="font-serif text-2xl font-semibold mb-6 flex items-center gap-2">
          <span>Upcoming Festivals</span>
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { n: "Thai Poosam", t: "Palani", d: "Jan 25", c: "12 lakh" },
            { n: "Karthigai Deepam", t: "Tiruvannamalai", d: "Dec 15", c: "8.5 lakh" },
            { n: "Chithirai Festival", t: "Meenakshi", d: "Apr 14", c: "15 lakh" },
          ].map((f) => (
            <div key={f.n} className="border border-border rounded-2xl p-5 bg-card hover:border-saffron/30 hover:shadow-md transition-all group flex flex-col h-full cursor-pointer">
              <div className="flex items-start gap-3 mb-4">
                <div className="text-2xl bg-secondary rounded-xl w-12 h-12 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform">🎊</div>
                <div className="flex-1 mt-1">
                  <div className="font-bold text-base text-foreground leading-tight group-hover:text-saffron transition-colors">{f.n}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5" /> {f.t}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto flex items-center justify-between text-sm pt-4 border-t border-border/50">
                <div className="font-semibold text-foreground bg-secondary px-3 py-1.5 rounded-lg border border-border">{f.d}</div>
                <div className="text-saffron font-bold bg-saffron/10 px-3 py-1.5 rounded-lg border border-saffron/20">{f.c} Expected</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
