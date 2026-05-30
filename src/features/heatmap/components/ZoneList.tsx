import { useTranslation } from "react-i18next";

export function zoneColor(p: number) {
  if (p < 35) return "rgba(22,163,74,0.35)";
  if (p < 60) return "rgba(234,179,8,0.4)";
  if (p < 80) return "rgba(217,119,6,0.45)";
  return "rgba(220,38,38,0.5)";
}

export function zoneStroke(p: number) {
  if (p < 35) return "#16A34A";
  if (p < 60) return "#EAB308";
  if (p < 80) return "#D97706";
  return "#DC2626";
}

export function ZoneList({ displayZones }: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="mt-4 grid sm:grid-cols-2 gap-3">
      {displayZones.map((z: any) => (
        <div key={z.name} className="bg-card border border-border rounded-2xl p-4 card-soft">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: zoneStroke(z.pct) }} />
            <span className="font-medium">{tStr(z.name)}</span>
            <span className="ml-auto text-xs text-muted-foreground">{z.pct}%</span>
          </div>
          <div className="text-sm text-muted-foreground mt-1">{tStr(z.advice)}</div>
        </div>
      ))}
    </div>
  );
}
