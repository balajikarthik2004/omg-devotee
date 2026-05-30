import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function DashboardHeader({ activeTemple, now }: any) {
  const { t } = useTranslation();

  return (
    <header className="">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-gradient-to-br from-white via-white to-saffron/5 p-8 text-foreground backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid gap-8 md:grid-cols-3 md:items-center relative z-10">
            <div>
              <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">{t(activeTemple.name)}</div>
              <div className="text-sm text-slate-500 mt-1 font-medium tracking-wide uppercase">{t("Crowd Intelligence Dashboard")}</div>
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 text-xs font-bold tracking-wider text-emerald-700 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                  {t("LIVE")} <span className="text-emerald-600/80 font-semibold normal-case tracking-normal ml-1">· {t("Updated")} {now.toLocaleTimeString("en-IN", { hour12: false })}</span>
                </div>
                <Link
                  to="/temple/$slug"
                  params={{ slug: activeTemple.slug }}
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-white bg-gradient-to-r from-saffron to-amber-500 hover:from-saffron/90 hover:to-amber-500/90 transition-all shadow-[0_4px_12px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.4)] hover:-translate-y-0.5 px-5 py-2.5 rounded-full ml-1"
                >
                  {t("Explore Full Details")} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_12px_36px_rgba(0,0,0,0.06)] overflow-hidden w-full max-w-sm group hover:border-rose-200/80 transition-all duration-500">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500" />
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-50 rounded-full blur-3xl pointer-events-none group-hover:bg-rose-100/50 transition-colors duration-700" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-50 rounded-full blur-3xl pointer-events-none group-hover:bg-orange-100/50 transition-colors duration-700" />
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-100/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose-600 mb-4 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> {t("Live Queue Status")}
                  </div>
                  
                  <div className="flex items-baseline gap-1.5 justify-center">
                    <div className="text-6xl font-extrabold tabular-nums tracking-tighter text-slate-800 drop-shadow-sm">{activeTemple.waitMin}</div>
                    <div className="text-xl font-bold text-slate-500 mb-2">{t("mins")}</div>
                  </div>
                  
                  <div className="mt-3 text-[13px] font-medium text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3 w-full shadow-inner">
                    {t("If you enter the queue now,")}<br/>
                    {t("expected Darshan is in")} <strong className="text-rose-600 font-bold">{activeTemple.waitMin} {t("mins")}</strong>.
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between border-b border-slate-200/60 pb-2.5"><span className="text-slate-500 font-medium"> {t("Today's total Devotees")}</span><span className="font-bold tabular-nums text-slate-800">38,240</span></div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2.5">
                <span className="text-slate-500 font-medium">{t("Peak (10:30 AM)")}</span>
                <span className="text-right">
                  <div className="font-bold tabular-nums text-slate-800">15,820</div>
                  <div className="text-[11px] font-bold text-rose-500 mt-0.5">{t("Maximum Wait:")} ~{activeTemple.waitMin + 45} {t("mins")}</div>
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2.5"><span className="text-slate-500 font-medium">{t("Darshan Flow")}</span><span className="font-bold text-emerald-600">1,250 / hr</span></div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">
                  {t("Next Peak")} <br /> (5:00 PM - 6:30 PM)
                </span>
                <span className="text-right">
                  <div className="font-bold ">18,500 {t("Expected")}</div>
                  <div className="text-[11px] font-bold text-rose-500 mt-0.5">{t("Expected Wait:")} ~{activeTemple.waitMin + 60} {t("mins")}</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
