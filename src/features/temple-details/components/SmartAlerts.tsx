import { Bell, CheckCircle2, Activity, Users, Clock, TrendingDown, BellRing } from "lucide-react";
import { useTranslation } from "react-i18next";

export function SmartAlerts({ t, pct, alertOn, setAlertOn }: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-[#fffdf5] to-[#fff7ed] border border-amber-200/60 rounded-2xl p-5 shadow-[0_4px_15px_rgb(245,158,11,0.05)] hover:shadow-[0_8px_25px_rgb(245,158,11,0.1)] transition-all duration-300 relative group overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none transition-all duration-700 group-hover:bg-amber-500/20"></div>

      {/* Live Indicator pulse */}
      <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-rose-50 border border-rose-100 px-2 py-1 rounded-md shadow-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
        </span>
        <span className="text-[9px] font-bold uppercase tracking-wider text-rose-600">Live Status</span>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4 text-amber-600">
          <Activity className="w-4 h-4" />
          <h3 className="font-serif text-lg font-bold text-slate-900">{tStr("Smart Alerts")}</h3>
        </div>

        <div className="bg-white/90 backdrop-blur-sm border border-amber-100/50 rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-amber-100/50">
            <div className="flex items-center gap-3">
              <div className="relative grid h-12 w-12 place-items-center shrink-0">
                <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#fffbeb" strokeWidth="8" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke="url(#alertGradient)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray={`${(pct / 100) * 264} 264`} className="transition-all duration-1000 ease-out drop-shadow-sm" />
                  <defs>
                    <linearGradient id="alertGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="text-center flex flex-col items-center">
                  <div className="text-[11px] font-extrabold text-slate-800">{Math.round(pct)}%</div>
                </div>
              </div>
              <div>
                <div className="text-[9px] uppercase text-slate-500 font-bold tracking-widest">{tStr("Current Rush")}</div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">{pct > 80 ? tStr("Heavy Rush") : pct > 50 ? tStr("Moderate") : tStr("Peaceful")}</div>
              </div>
            </div>

            <div className="text-right pl-4 border-l border-amber-100/30">
              <div className="text-lg font-black tabular-nums text-slate-900">{t.crowd.toLocaleString()}</div>
              <div className="text-[9px] uppercase text-slate-500 font-bold tracking-widest mt-0.5">{tStr("Inside Temple")}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-amber-100/50 text-center">
            <div className="bg-slate-50/80 rounded-lg py-1.5 border border-slate-100">
              <div className="flex items-center justify-center gap-1 mb-0.5 text-slate-400"><Users className="w-3 h-3" /></div>
              <div className="text-sm font-black tabular-nums text-slate-800">4,320</div>
              <div className="text-[9px] uppercase text-slate-500 font-bold tracking-wider mt-0.5">{tStr("Waiting")}</div>
            </div>
            <div className="bg-slate-50/80 rounded-lg py-1.5 border border-slate-100">
              <div className="flex items-center justify-center gap-1 mb-0.5 text-slate-400"><Clock className="w-3 h-3" /></div>
              <div className="text-sm font-black tabular-nums text-slate-800">45m</div>
              <div className="text-[9px] uppercase text-slate-500 font-bold tracking-wider mt-0.5">{tStr("Wait Time")}</div>
            </div>
            <div className="bg-amber-50/50 rounded-lg py-1.5 border border-amber-100/50">
              <div className="flex items-center justify-center gap-1 mb-0.5 text-amber-500"><TrendingDown className="w-3 h-3" /></div>
              <div className="text-sm font-black tabular-nums text-amber-600">8m</div>
              <div className="text-[9px] uppercase text-amber-600/80 font-bold tracking-wider mt-0.5">{tStr("Darshan")}</div>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="bg-amber-100 text-amber-600 shrink-0 mt-0.5 p-1.5 rounded-full">
              <BellRing className="w-3 h-3" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">{tStr("Peaceful Darshan Alert")}</p>
              <p className="text-[10px] font-medium text-slate-600 mt-0.5 leading-relaxed">{tStr("We'll send you a gentle reminder when the crowd clears up so you can have a peaceful Darshan.")}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setAlertOn((a: boolean) => !a)}
          className={`relative overflow-hidden w-full rounded-xl py-2.5 text-xs font-bold transition-all duration-300 ${alertOn
              ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-200 shadow-inner"
              : "bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:shadow-[0_6px_20px_rgba(245,158,11,0.35)] hover:-translate-y-0.5"
            }`}
        >
          <div className="relative z-10 flex items-center justify-center gap-1.5">
            {alertOn ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bell className="w-3.5 h-3.5" />}
            {alertOn ? tStr("You will be notified") : tStr("Notify me for peaceful Darshan")}
          </div>
        </button>
      </div>
    </div>
  );
}
