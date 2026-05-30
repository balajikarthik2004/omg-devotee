import { useTranslation } from "react-i18next";
import { useState } from "react";

export function TempleTabs({ t }: any) {
  const { t: tStr } = useTranslation();
  const tabContent = [tStr("About"), tStr("Facilities"), tStr("Nearby"), tStr("Reviews")];
  const [tab, setTab] = useState(0);

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-3">
        {tabContent.map((tname, i) => (
          <button key={tname} onClick={() => setTab(i)} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${tab === i ? "bg-slate-800 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>{tname}</button>
        ))}
      </div>
      <div className="pt-6 text-sm">
        {tab === 0 && (
          <div className="space-y-5">
            <div className="flex flex-col gap-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{tStr("Deity")}</span>
              <span className="font-bold text-slate-900 break-words">{tStr(t.deity)}</span>
            </div>
            <div className="leading-relaxed text-sm text-slate-700 font-medium">{t.description}</div>
          </div>
        )}
        {tab === 1 && (
          <div className="flex flex-wrap gap-2">
            {["♿ Wheelchair", "🚻 Restrooms", "🥛 Prasad", "👟 Footwear", "💊 First Aid", "🚿 Bathing Ghat", "📵 No Photography", "🅿 Free Parking"].map(f => (
              <div key={f} className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-[11px] font-bold text-slate-700 whitespace-nowrap">{f}</div>
            ))}
          </div>
        )}
        {tab === 2 && (
          <div className="space-y-3">
            {["🏨 Choultries — 0.3 km", "🍽 Veg restaurants — 0.5 km", "🏧 ATM — 0.2 km", "🏥 Hospital — 1.1 km"].map(n => (
              <div key={n} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <span className="text-sm font-medium text-slate-800 truncate mr-3">{n.split(" — ")[0]}</span>
                <span className="text-xs font-bold text-slate-500 whitespace-nowrap">{n.split(" — ")[1]}</span>
              </div>
            ))}
          </div>
        )}
        {tab === 3 && (
          <div className="space-y-4">
            <div className="text-3xl font-serif font-bold text-slate-900">4.3 <span className="text-sm text-slate-500 font-medium">/ 5 · 2,841 reviews</span></div>
            <div className="space-y-3">
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                <div className="text-sm font-medium text-slate-800">"Very peaceful in the morning hours."</div>
                <div className="text-xs font-bold text-slate-500 mt-2">— Ramesh K · ⭐⭐⭐⭐⭐</div>
              </div>
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                <div className="text-sm font-medium text-slate-800">"Queue was manageable at 4 PM."</div>
                <div className="text-xs font-bold text-slate-500 mt-2">— Priya S · ⭐⭐⭐⭐</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
