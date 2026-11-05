import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Users, TrendingUp, Workflow, CalendarClock, Landmark } from "lucide-react";
import type { Temple } from "@/data/temples";
import { templeStats } from "../utils";

// Tall gopuram photos read best in the banner; fall back to the temple's card/thumb image.
const HERO: Record<string, string> = { tiruvannamalai: "/temples/tiruvannamalai/gopuram-sky.jpg" };

const nf = new Intl.NumberFormat("en-IN");

export function DashboardHeader({ activeTemple: t, now }: { activeTemple: Temple; now: Date }) {
  const { t: tr } = useTranslation();
  const s = templeStats(t);
  const hero = HERO[t.slug] ?? t.thumb ?? t.image;

  const stats = [
    { icon: Users, label: tr("Today's Total Devotees"), value: nf.format(s.todayTotal), tone: "text-slate-900", bg: "bg-white" },
    { icon: TrendingUp, label: `${tr("Peak")} (10:30 AM)`, value: `~${s.peakWait} ${tr("mins")}`, tone: "text-saffron", bg: "bg-rose-50/70" },
    { icon: Workflow, label: tr("Darshan Flow"), value: `${nf.format(s.flowPerHour)} / ${tr("hr")}`, tone: "text-[#006300]", bg: "bg-emerald-50/70" },
    { icon: CalendarClock, label: tr("Next Peak"), sub: "(5:00 PM – 6:30 PM)", value: `~${s.nextPeakWait} ${tr("mins")}`, tone: "text-amber-700", bg: "bg-amber-50/70" },
  ];

  return (
    <header className="max-w-7xl mx-auto w-full px-4 lg:px-6 pt-6">
      <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-br from-[#fff7f2] via-[#fdeee9] to-[#fbe3dc] shadow-sm">
        {/* Temple photo, blended into the banner */}
        {hero && (
          <div className="absolute inset-y-0 left-[22%] w-[46%] hidden lg:block pointer-events-none" aria-hidden>
            <img src={hero} alt="" className="w-full h-full object-cover object-[center_35%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff7f2] via-transparent to-[#fdeee9]" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#fbe3dc]/80 to-transparent" />
          </div>
        )}

        <div className="relative grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.75fr)_minmax(0,0.85fr)_minmax(0,1fr)] lg:items-center">
          {/* Temple identity */}
          <div className="min-w-0">
            <div className="flex items-start gap-3">
              <span className="w-11 h-11 rounded-xl bg-white/80 border border-rose-100 text-saffron flex items-center justify-center shrink-0">
                <Landmark className="w-6 h-6" />
              </span>
              <div className="min-w-0">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#7a1a17] leading-tight">{tr(t.name)}</h1>
                <p className="text-sm text-slate-600 mt-1">{tr("Crowd Intelligence Dashboard")}</p>
              </div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 border border-emerald-200 px-3 py-1 text-xs font-bold text-[#006300]">
              <span className="h-2 w-2 rounded-full bg-[#0ca30c] animate-pulse" />
              {tr("LIVE")}
              <span className="font-semibold text-slate-600">{tr("Updated at")} {now.toLocaleTimeString("en-IN", { hour12: false })}</span>
            </div>
            <div className="mt-4">
              <Link
                to="/temple/$slug"
                params={{ slug: t.slug }}
                className="group inline-flex items-center gap-2 text-sm font-bold text-white bg-saffron px-5 py-2.5 rounded-full shadow-lg shadow-saffron/25 hover:brightness-95 transition-all"
              >
                {tr("Explore Full Details")} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Photo slot on large screens; inline photo on small screens */}
          <div className="lg:h-full">
            {hero && <img src={hero} alt={tr(t.name)} className="lg:hidden w-full h-40 object-cover rounded-2xl" />}
          </div>

          {/* Live queue */}
          <div className="bg-white/90 backdrop-blur-sm border border-rose-100 rounded-3xl p-5 text-center shadow-sm">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#7a1a17]">
              <Users className="w-4 h-4 text-saffron" /> {tr("Live Queue Status")}
            </div>
            <div className="mt-2 flex items-baseline justify-center gap-1.5">
              <span className="text-5xl font-black tabular-nums text-[#7a1a17]">{t.waitMin}</span>
              <span className="text-lg font-bold text-slate-600">{tr("mins")}</span>
            </div>
            <div className="mt-3 text-xs text-slate-600 bg-rose-50 border border-rose-100 rounded-full px-3 py-1.5">
              {tr("Expected Darshan:")} <strong className="text-slate-800">~{t.waitMin} {tr("mins")}</strong>
            </div>
          </div>

          {/* Stats */}
          <ul className="space-y-2">
            {stats.map((st) => (
              <li key={st.label} className={`flex items-center justify-between gap-3 rounded-xl border border-rose-100 px-3 py-2.5 ${st.bg}`}>
                <span className="flex items-center gap-2 min-w-0">
                  <st.icon className="w-4 h-4 text-saffron shrink-0" />
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[13px] font-semibold text-slate-700 truncate">{st.label}</span>
                    {st.sub && <span className="block text-[10px] font-medium text-slate-500">{st.sub}</span>}
                  </span>
                </span>
                <span className={`text-sm font-black tabular-nums shrink-0 ${st.tone}`}>{st.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
