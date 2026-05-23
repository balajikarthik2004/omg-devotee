import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { temples } from "@/data/temples";

export const Route = createFileRoute("/_app/poojas")({
  head: () => ({ meta: [{ title: "Pooja & Timings — OMG Smart Temple" }] }),
  component: PoojaPage,
});

function PoojaPage() {
  const [sel, setSel] = useState(temples[0].id);
  const t = temples.find(x => x.id === sel)!;
  const now = new Date().getHours();

  function status(p: string) {
    const h = parseInt(p.split(":")[0]);
    if (h < now) return "done";
    if (h === now) return "live";
    return "upcoming";
  }

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6">
      <h1 className="font-serif text-3xl font-semibold">Pooja & timings</h1>
      <p className="text-muted-foreground text-sm mt-1">Full schedule across Tamil Nadu temples.</p>

      <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
        {temples.map(temple => (
          <button key={temple.id} onClick={() => setSel(temple.id)} className={`shrink-0 text-sm rounded-full px-3.5 py-1.5 border ${sel===temple.id?"bg-foreground text-background border-foreground":"bg-white border-border"}`}>
            {temple.name.split(" ").slice(0,2).join(" ")}
          </button>
        ))}
      </div>

      <div className="mt-5 bg-card border border-border rounded-2xl p-5 card-soft">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-serif text-xl font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.specialDay} is special pooja day</div>
          </div>
          <span className="text-sm flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-status-low pulse-soft"/> OPEN</span>
        </div>

        <div className="mt-5 space-y-3">
          {t.poojas.map(p => {
            const s = status(p);
            const time = p.split(" ").slice(0,2).join(" ");
            const name = p.split(" ").slice(2).join(" ");
            return (
              <div key={p} className="flex items-start gap-3">
                <div className="w-3 h-3 mt-1.5 rounded-full shrink-0" style={{ background: s==="done"?"var(--status-low)":s==="live"?"var(--saffron)":"#E7E5E4" }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{name}</span>
                    {s==="live" && <span className="text-xs bg-saffron/10 text-saffron px-2 py-0.5 rounded-full pulse-soft">Live</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{time} · {s==="done"?"Completed":s==="live"?"In progress":"Upcoming"}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 bg-secondary rounded-xl p-3 text-sm">⭐ Today: Abhishekam for registered devotees at 6:30 AM · Special Sashti Pooja at 7:00 AM</div>
      </div>

      <div className="mt-6 bg-card border border-border rounded-2xl p-5 card-soft">
        <div className="font-serif text-lg font-semibold mb-3">Upcoming festivals</div>
        <div className="space-y-2 text-sm">
          {[
            ["🎊 Thai Poosam","Palani","Jan 25","12 lakh expected"],
            ["🎊 Karthigai Deepam","Tiruvannamalai","Dec 15","8.5 lakh expected"],
            ["🎊 Chithirai Festival","Meenakshi","Apr 14","15 lakh expected"],
          ].map(([n, t, d, c]) => (
            <div key={n} className="flex items-center justify-between border-b border-border pb-2 last:border-0">
              <div><div className="font-medium">{n}</div><div className="text-xs text-muted-foreground">{t} · {d}</div></div>
              <div className="text-xs text-saffron">{c}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
