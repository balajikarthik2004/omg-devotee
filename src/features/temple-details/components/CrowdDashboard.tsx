import { useTranslation } from "react-i18next";

export function CrowdDashboard({ t, wait, now }: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white/95 backdrop-blur-xl p-8 text-foreground">
      <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-20 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="grid gap-8 md:grid-cols-3 md:items-center relative z-10">
        <div>
          <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">{tStr(t.name)}</div>
          <div className="text-sm text-slate-500 mt-1 font-medium tracking-wide uppercase">{tStr("Crowd Intelligence Dashboard")}</div>
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 text-xs font-bold tracking-wider text-emerald-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              {tStr("LIVE")} <span className="text-emerald-600/80 font-semibold normal-case tracking-normal ml-1">· {tStr("Updated")} {now.toLocaleTimeString("en-IN", { hour12: false })}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.06)] overflow-hidden w-full max-w-sm group hover:border-rose-200/80 transition-all duration-500">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-50 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-100/50 transition-colors duration-700" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-50 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-100/50 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-4 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> {tStr("Live Darshan Wait")}
              </div>

              <div className="flex items-baseline gap-1.5 justify-center">
                <div className="text-6xl font-extrabold tabular-nums tracking-tighter text-slate-800 drop-shadow-sm">{wait}</div>
                <div className="text-xl font-bold text-slate-500 mb-2">{tStr("mins")}</div>
              </div>

              <div className="mt-3 text-[13px] font-medium text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3 w-full shadow-inner">
                {tStr("If you join the line now,")}<br />
                {tStr("you will reach the Sanctum in")} <strong className="text-rose-600 font-bold">{wait} {tStr("mins")}</strong>.
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3.5 text-sm">
          <div className="flex justify-between border-b border-slate-200/60 pb-2.5"><span className="text-slate-500 font-medium">{tStr("Today's Total Devotee")}</span><span className="font-bold tabular-nums text-slate-800">38,240</span></div>
          <div className="flex justify-between border-b border-slate-200/60 pb-2.5">
            <span className="text-slate-500 font-medium">{tStr("Peak (10:30 AM)")}</span>
            <span className="text-right">
              <div className="font-bold tabular-nums text-slate-800">15,820</div>
              <div className="text-[11px] font-bold text-rose-500 mt-0.5">{tStr("Maximum Wait:")} ~{t.waitMin + 45} {tStr("mins")}</div>
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-200/60 pb-2.5"><span className="text-slate-500 font-medium">{tStr("Darshan Flow")}</span><span className="font-bold text-emerald-600">1,250 / {tStr("hr")}</span></div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">
              {tStr("Next Peak")} <br /> (5:00 PM - 6:30 PM)
            </span>
            <span className="text-right">
              <div className="font-bold ">18,500 {tStr("Expected")}</div>
              <div className="text-[11px] font-bold text-rose-500 mt-0.5">{tStr("Expected Wait:")} ~{t.waitMin + 60} {tStr("mins")}</div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
