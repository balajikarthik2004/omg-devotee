import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { temples } from "@/data/temples";
import { useTranslation } from "react-i18next";
import { useHeatmapZones } from "@/features/heatmap/hooks/useHeatmapZones";
import { ZoneList } from "@/features/heatmap/components/ZoneList";
import { HeatmapDisplay } from "@/features/heatmap/components/HeatmapDisplay";

export const Route = createFileRoute("/_app/heatmap")({
  head: () => ({ meta: [{ title: "Live Heatmap — OMG Smart Temple" }] }),
  component: HeatmapPage,
});

function HeatmapPage() {
  const { t: tStr } = useTranslation();
  const [sel, setSel] = useState(temples[0].id);
  const [fullView, setFullView] = useState(false);
  const t = temples.find(x => x.id === sel)!;

  const { displayZones, mapImage, genericZones } = useHeatmapZones(t);

  return (
    <div className="max-w-5xl mx-auto px-4 lg:px-8 py-6">
      <h1 className="font-serif text-3xl font-semibold">{tStr("Live temple heatmap")}</h1>
      <p className="text-muted-foreground text-sm mt-1">{tStr("Real-time crowd density across temples · Tamil Nadu")}</p>

      <div className="mt-5 flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
        {temples.map(temple => (
          <button key={temple.id} onClick={() => setSel(temple.id)} className={`shrink-0 text-sm rounded-full px-3.5 py-1.5 border ${sel===temple.id?"bg-foreground text-background border-foreground":"bg-white border-border"}`}>
            {tStr(temple.name).split(" ").slice(0,2).join(" ")}
          </button>
        ))}
      </div>

      <HeatmapDisplay 
        t={t} 
        mapImage={mapImage} 
        genericZones={genericZones} 
        fullView={fullView} 
        setFullView={setFullView} 
      />

      <ZoneList displayZones={displayZones} />
    </div>
  );
}
