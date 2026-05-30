import { useTranslation } from "react-i18next";

export function ParkingStatus({ t }: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      <h3 className="font-serif text-xl font-bold text-slate-900">{tStr("Parking status")}</h3>
      <div className="mt-4 grid sm:grid-cols-3 gap-4">
        {(["lotA", "lotB", "overflow"] as const).map((k) => {
          const v = t.parking[k];
          const label = k === "lotA" ? tStr("Lot A") : k === "lotB" ? tStr("Lot B") : tStr("Overflow");
          const colorClass = v > 80 ? "text-rose-600" : v > 50 ? "text-amber-500" : "text-emerald-500";
          const bgClass = v > 80 ? "bg-rose-500" : v > 50 ? "bg-amber-500" : "bg-emerald-500";
          return (
            <div key={k} className="rounded-2xl border border-slate-100 p-4 bg-slate-50/50">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">{label}</div>
              <div className={`text-3xl font-serif font-bold mt-1.5 ${colorClass}`}>{v}%</div>
              <div className="h-1.5 bg-slate-200 rounded-full mt-3 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-1000 ease-out ${bgClass}`} style={{ width: `${v}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 text-sm font-medium text-indigo-900 bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex items-start gap-3">
        <span className="text-xl">🤖</span>
        <span>{tStr("Park at Lot B or the overflow lot today — Lot A will be full by 10:30 AM.")}</span>
      </div>
    </div>
  );
}
