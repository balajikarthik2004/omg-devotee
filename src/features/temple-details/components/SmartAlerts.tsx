import { Bell, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SmartAlerts({ t, pct, alertOn, setAlertOn }: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-white to-orange-50/50 border border-orange-100 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all group-hover:bg-orange-500/20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 text-orange-600">
          <Bell className="w-5 h-5" />
          <h3 className="font-serif text-xl font-bold text-slate-900">{tStr("Smart Alerts")}</h3>
        </div>

        <div className="bg-white/60 backdrop-blur-sm border border-orange-100/50 rounded-2xl p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200/50">
            <div className="flex items-center gap-4">
              <div className="relative grid h-14 w-14 place-items-center shrink-0">
                <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90 drop-shadow-sm">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#alertGradient)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(pct / 100) * 264} 264`} className="transition-all duration-1000" />
                  <defs>
                    <linearGradient id="alertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-center flex flex-col items-center">
                  <div className="text-xs font-extrabold tabular-nums text-slate-800">{Math.round(pct)}%</div>
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Capacity</div>
                <div className="text-sm font-semibold text-slate-800 leading-tight mt-0.5">{pct > 80 ? tStr("High Crowd") : pct > 50 ? tStr("Moderate Crowd") : tStr("Low Crowd")}</div>
              </div>
            </div>

            <div className="sm:text-right sm:border-l border-slate-200/50 sm:pl-4">
              <div className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 drop-shadow-sm">{t.crowd.toLocaleString()}</div>
              <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">{tStr("Devotees Inside")}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-slate-200/50 text-center">
            <div>
              <div className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 drop-shadow-sm">4,320</div>
              <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">{tStr("In queue")}</div>
            </div>
            <div className="border-l border-slate-200/50">
              <div className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 drop-shadow-sm">45m</div>
              <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">{tStr("Wait")}</div>
            </div>
            <div className="border-l border-slate-200/50">
              <div className="text-xl font-extrabold tabular-nums tracking-tight text-slate-900 drop-shadow-sm">8m</div>
              <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest mt-0.5">{tStr("Darshan")}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-orange-100 text-orange-600 rounded-full p-2 shrink-0">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800 leading-tight">{tStr("Get notified when capacity drops")}</p>
              <p className="text-[11px] font-medium text-slate-500 mt-0.5">{tStr("We'll alert you when wait time is under 30 mins.")}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setAlertOn((a: boolean) => !a)}
          className={`relative overflow-hidden w-full rounded-full py-3 text-sm font-bold border transition-all duration-300 ${alertOn
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm"
              : "bg-gradient-to-r from-orange-500 to-rose-500 text-white border-transparent shadow-[0_4px_15px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5"
            }`}
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {alertOn ? <CheckCircle2 className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            {alertOn ? tStr("Alert Active") : tStr("Alert me when crowd drops")}
          </div>
        </button>
      </div>
    </div>
  );
}
