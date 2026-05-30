import { useTranslation } from "react-i18next";
import { Maximize2, X } from "lucide-react";
import { zoneColor, zoneStroke } from "./ZoneList";

function waitFor(p: number) {
  return Math.round(p * 0.7);
}

export function HeatmapDisplay({ t, mapImage, genericZones, fullView, setFullView }: any) {
  const { t: tStr } = useTranslation();

  return (
    <>
      <div className="mt-5 bg-card border border-border rounded-2xl p-5 card-soft">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-serif text-xl font-semibold">{tStr(t.name)}</div>
            <div className="text-xs text-muted-foreground">{tStr("Live · updated every 30s")}</div>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-status-low"/> {tStr("Walk in")}</span>
            <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-status-mod"/> {tStr("Short wait")}</span>
            <span className="flex items-center gap-1.5"><span className="w-3.5 h-3.5 rounded bg-status-high"/> {tStr("Avoid")}</span>
          </div>
        </div>
        <div className="aspect-[16/9] bg-secondary rounded-xl overflow-hidden relative group">
          {mapImage ? (
            <>
              <img src={mapImage} alt={`${t.name} Map`} className="absolute inset-0 w-full h-full object-cover" />
              <button 
                onClick={() => setFullView(true)}
                className="absolute bottom-4 right-4 bg-black/70 hover:bg-black text-white px-3 py-2 rounded-lg flex items-center gap-2 text-xs font-medium backdrop-blur-sm transition-all shadow-lg"
              >
                <Maximize2 size={14} /> {tStr("Full View")}
              </button>
            </>
          ) : (
            <svg viewBox="0 0 400 280" className="w-full h-full">
              <rect x="20" y="20" width="360" height="240" fill="#FFFBF5" stroke="#F5F0E8" />
              {genericZones.map((z: any) => (
                <g key={z.name}>
                  <rect x={z.x} y={z.y} width={z.w} height={z.h} rx="8" fill={zoneColor(z.pct)} stroke={zoneStroke(z.pct)} strokeWidth="1.5" />
                  <text x={z.x + z.w/2} y={z.y + z.h/2 - 4} textAnchor="middle" fontSize="10" fill="#1C1917" fontWeight="600">{z.name}</text>
                  <text x={z.x + z.w/2} y={z.y + z.h/2 + 10} textAnchor="middle" fontSize="9" fill="#78716C">~{waitFor(z.pct)} {tStr("min")}</text>
                </g>
              ))}
              <text x="200" y="265" textAnchor="middle" fontSize="9" fill="#A8A29E">{tStr("Schematic floor plan")}</text>
            </svg>
          )}
        </div>
      </div>

      <div className="mt-5 bg-card border border-border/70 rounded-2xl p-3.5 card-soft flex flex-wrap items-center gap-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <span className="text-sm font-bold text-foreground">{tStr("Timeline:")}</span>
        <button className="text-sm font-bold rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 px-3.5 py-1.5 flex items-center gap-2 shadow-sm transform scale-[1.02] transition-all">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]"></span> {tStr("Live now")}
        </button>
        <button className="text-sm font-medium rounded-full bg-white border border-border/60 px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">{tStr("Past 6 hours")}</button>
        <button className="text-sm font-medium rounded-full bg-white border border-border/60 px-3.5 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors">{tStr("Last weekend")}</button>
      </div>

      {fullView && mapImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in zoom-in duration-200">
          <button 
            onClick={() => setFullView(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <X size={32} />
          </button>
          <img src={mapImage} alt={`${t.name} Map Full View`} className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl" />
        </div>
      )}
    </>
  );
}
