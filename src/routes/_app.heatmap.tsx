import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { temples } from "@/data/temples";
import palaniImg from "@/assets/palani.png";
import { Maximize2, X } from "lucide-react";

export const Route = createFileRoute("/_app/heatmap")({
  head: () => ({ meta: [{ title: "Live Heatmap — OMG Smart Temple" }] }),
  component: HeatmapPage,
});

function HeatmapPage() {
  const [sel, setSel] = useState(temples[0].id);
  const [fullView, setFullView] = useState(false);
  const t = temples.find(x => x.id === sel)!;

  const genericZones = [
    { name: "Main Entrance", pct: t.parking.lotA, x: 40, y: 80, w: 120, h: 50, advice: "Use East Gate instead" },
    { name: "Queue Lane A", pct: Math.min(95, t.crowdPct + 15), x: 40, y: 140, w: 60, h: 100, advice: "Wait 30 min or visit after 4 PM" },
    { name: "Queue Lane B", pct: Math.max(20, t.crowdPct - 20), x: 105, y: 140, w: 55, h: 100, advice: "Faster lane today" },
    { name: "Sanctum approach", pct: t.crowdPct, x: 170, y: 100, w: 90, h: 80, advice: "~15-20 min wait" },
    { name: "Prasad counter", pct: Math.max(15, t.crowdPct - 30), x: 270, y: 80, w: 80, h: 60, advice: "Light queue" },
    { name: "Parking Lot A", pct: t.parking.lotA, x: 270, y: 150, w: 80, h: 70, advice: "Almost full — use overflow" },
  ];

  const palaniZones = [
    { name: "Sanctum Sanctorum", pct: Math.min(95, t.crowdPct + 25), advice: "Peak crowd right now. Expected wait ~45 mins." },
    { name: "Steps Route", pct: Math.min(85, t.crowdPct + 15), advice: "Heavy footfall. Use Rope Car or Winch if possible." },
    { name: "Rope Car Station", pct: Math.max(20, t.crowdPct - 10), advice: "Moderate queue. ~20 mins wait." },
    { name: "Winch Station", pct: Math.max(15, t.crowdPct - 25), advice: "Moving fast. Good alternative to steps." },
    { name: "Panchamirtham Counter", pct: Math.max(10, t.crowdPct - 35), advice: "Clear. Get your prasadam quickly." },
    { name: "Base Parking Area", pct: t.parking.lotA, advice: "Almost full. Consider overflow parking." },
  ];

  const displayZones = t.id === 1 ? palaniZones : genericZones;

  function zoneColor(p: number) {
    if (p < 35) return "rgba(22,163,74,0.35)";
    if (p < 60) return "rgba(234,179,8,0.4)";
    if (p < 80) return "rgba(217,119,6,0.45)";
    return "rgba(220,38,38,0.5)";
  }
  function zoneStroke(p: number) {
    if (p < 35) return "#16A34A";
    if (p < 60) return "#EAB308";
    if (p < 80) return "#D97706";
    return "#DC2626";
  }
  function waitFor(p: number) {
    return Math.round(p * 0.7);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6">
      <h1 className="font-serif text-3xl font-semibold">Live temple heatmap</h1>
      <p className="text-muted-foreground text-sm mt-1">Real-time crowd density across temples · Tamil Nadu</p>

      <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
        {temples.map(temple => (
          <button key={temple.id} onClick={() => setSel(temple.id)} className={`shrink-0 text-sm rounded-full px-3.5 py-1.5 border ${sel===temple.id?"bg-foreground text-background border-foreground":"bg-white border-border"}`}>
            {temple.name.split(" ").slice(0,2).join(" ")}
          </button>
        ))}
      </div>

      <div className="mt-5 bg-card border border-border rounded-2xl p-5 card-soft">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-serif text-xl font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground">Live · updated every 30s</div>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-status-low"/> Walk in</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-status-mod"/> Short wait</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-status-high"/> Avoid</span>
          </div>
        </div>
        <div className="aspect-[16/9] bg-secondary rounded-xl overflow-hidden relative group">
          {t.id === 1 ? (
            <>
              <img src={palaniImg} alt="Palani Temple Map" className="absolute inset-0 w-full h-full object-cover" />
              <button 
                onClick={() => setFullView(true)}
                className="absolute bottom-4 right-4 bg-black/70 hover:bg-black text-white px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-medium backdrop-blur-sm transition-all shadow-lg"
              >
                <Maximize2 size={14} /> Full View
              </button>
            </>
          ) : (
            <svg viewBox="0 0 400 280" className="w-full h-full">
              <rect x="20" y="20" width="360" height="240" fill="#FFFBF5" stroke="#F5F0E8" />
              {genericZones.map(z => (
                <g key={z.name}>
                  <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="8" fill={zoneColor(z.pct)} stroke={zoneStroke(z.pct)} strokeWidth="1.5" />
                  <text x={z.x + z.w/2} y={z.y + z.h/2 - 4} textAnchor="middle" fontSize="10" fill="#1C1917" fontWeight="600">{z.name}</text>
                  <text x={z.x + z.w/2} y={z.y + z.h/2 + 10} textAnchor="middle" fontSize="9" fill="#78716C">~{waitFor(z.pct)} min</text>
                </g>
              ))}
              <text x="200" y="265" textAnchor="middle" fontSize="9" fill="#A8A29E">Schematic floor plan</text>
            </svg>
          )}
        </div>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        {displayZones.map(z => (
          <div key={z.name} className="bg-card border border-border rounded-2xl p-4 card-soft">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: zoneStroke(z.pct) }} />
              <span className="font-medium">{z.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{z.pct}%</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">{z.advice}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 bg-card border border-border rounded-2xl p-4 card-soft flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium">Timeline:</span>
        <button className="text-sm rounded-full bg-foreground text-background px-3 py-1">● Live now</button>
        <button className="text-sm rounded-full bg-white border border-border px-3 py-1">Past 6 hours</button>
        <button className="text-sm rounded-full bg-white border border-border px-3 py-1">Last weekend</button>
      </div>

      {fullView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in zoom-in duration-200">
          <button 
            onClick={() => setFullView(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={32} />
          </button>
          <img src={palaniImg} alt="Palani Temple Map Full View" className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl" />
        </div>
      )}
    </div>
  );
}
