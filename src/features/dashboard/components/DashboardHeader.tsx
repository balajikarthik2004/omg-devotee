import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Users, TrendingUp, Workflow, CalendarClock, Landmark } from "lucide-react";
import type { Temple } from "@/data/temples";
import { templeStats } from "../utils";

// Tall gopuram photos read best in the banner; fall back to the temple's card/thumb image.
const HERO: Record<string, string> = { tiruvannamalai: "/temples/tiruvannamalai/gopuram-sky.jpg" };

const nf = new Intl.NumberFormat("en-IN");

/**
 * Rotating scene banner for temples with images of the temple and its sacred hill.
 * Each image is shown whole at the banner's height (centred at `center`% of the banner),
 * over a blurred copy of itself that fills the rest of the banner, so any image shape fits.
 * `peak` (in % of the image) adds the Maha Deepam glow when the image has no lit lamp.
 */
interface SceneImage {
  src: string;
  /** Image width / height. */
  aspect: string;
  center: number;
  peak?: { x: number; y: number };
}

const ROTATE_MS = 5000;

const SCENES: Record<string, SceneImage[]> = {
  tiruvannamalai: [
    // Gopuram at sunset with the Maha Deepam already lit on the summit.
    { src: "/temples/tiruvannamalai/banner-a.png", aspect: "2172/724", center: 40 },
    // Four gopurams beneath Arunachala at dusk; glow added on the summit.
    { src: "/temples/tiruvannamalai/banner-b.png", aspect: "1774/887", center: 42, peak: { x: 57, y: 30.5 } },
  ],
};

export function DashboardHeader({ activeTemple: t, now }: { activeTemple: Temple; now: Date }) {
  const { t: tr } = useTranslation();
  const s = templeStats(t);
  const scenes = SCENES[t.slug];
  const [index, setIndex] = useState(0);
  const scene = scenes?.[index % scenes.length];

  // Crossfade to the next image every 5 s; paused while the tab is hidden.
  useEffect(() => {
    setIndex(0);
    if (!scenes || scenes.length < 2) return;
    const id = setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % scenes.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [scenes]);
  const hero = scene ? undefined : HERO[t.slug] ?? t.thumb ?? t.image;

  const stats = [
    { icon: Users, label: tr("Today's Devotees"), value: nf.format(s.todayTotal), tone: "text-slate-900", bg: "bg-white" },
    { icon: TrendingUp, label: `${tr("Peak")} (10:30 AM)`, value: `~${s.peakWait} ${tr("mins")}`, tone: "text-saffron", bg: "bg-rose-50/70" },
    { icon: Workflow, label: tr("Darshan Flow"), value: `${nf.format(s.flowPerHour)} / ${tr("hr")}`, tone: "text-[#006300]", bg: "bg-emerald-50/70" },
    { icon: CalendarClock, label: tr("Next Peak"), sub: "(5:00 PM – 6:30 PM)", value: `~${s.nextPeakWait} ${tr("mins")}`, tone: "text-amber-700", bg: "bg-amber-50/70" },
  ];

  return (
    <header className="max-w-7xl mx-auto w-full px-4 lg:px-6 pt-6">
      <div className="relative overflow-hidden rounded-3xl border border-rose-100 bg-gradient-to-br from-[#fff7f2] via-[#fdeee9] to-[#fbe3dc] shadow-sm">
        {/* Scene: crossfading temple + sacred hill images */}
        {scenes && (
          <div className="absolute inset-0 hidden lg:block pointer-events-none" aria-hidden>
            {scenes.map((sc, i) => (
              <div key={sc.src} className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${i === index ? "opacity-100" : "opacity-0"}`}>
                {/* Blurred fill so the banner is covered whatever the image shape */}
                <img src={sc.src} alt="" className="absolute inset-0 w-full h-full object-cover scale-125 blur-lg saturate-125" />
                {/* Whole image at banner height, edges feathered into the blurred fill */}
                <div
                  className="absolute -top-[15%] -bottom-[15%] -translate-x-1/2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]"
                  style={{ left: `${sc.center}%`, aspectRatio: sc.aspect }}
                >
                  <img src={sc.src} alt="" className="w-full h-full object-cover" />
                  {sc.peak && (
                    <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${sc.peak.x}%`, top: `${sc.peak.y}%` }}>
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[radial-gradient(circle,rgba(255,170,60,0.7)_0%,rgba(255,120,40,0.3)_35%,rgba(255,120,40,0)_70%)] motion-safe:animate-pulse" />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#fff3c4] shadow-[0_0_10px_5px_rgba(255,190,80,0.9)]" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Temple photo, blended into the banner */}
        {hero && (
          <div className="absolute inset-y-0 left-[22%] w-[46%] hidden lg:block pointer-events-none" aria-hidden>
            <img src={hero} alt="" className="w-full h-full object-cover object-[center_35%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fff7f2] via-transparent to-[#fdeee9]" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#fbe3dc]/80 to-transparent" />
          </div>
        )}

        <div className={`relative grid gap-4 p-4 sm:p-5 lg:items-center ${scene ? "lg:min-h-[260px] " : ""}${scene ? "lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)_minmax(0,0.8fr)_minmax(0,0.95fr)]" : "lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.05fr)_minmax(0,0.8fr)_minmax(0,0.95fr)]"}`}>
          {/* Temple identity (frosted card over the image) */}
          <div className={`min-w-0 ${scene ? "lg:bg-white/80 lg:backdrop-blur-md lg:border lg:border-white/70 lg:rounded-2xl lg:p-3.5 lg:shadow-sm" : ""}`}>
            <div className="flex items-start gap-3">
              <span className="w-11 h-11 rounded-xl bg-white/80 border border-rose-100 text-saffron flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <h1 className={`font-serif font-bold text-[#7a1a17] leading-tight ${scene ? "text-lg" : "text-xl sm:text-2xl"}`}>{tr(t.name)}</h1>
                <p className="text-xs text-slate-600 mt-0.5">{tr("Crowd Intelligence Dashboard")}</p>

              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-[#006300]">
                <span className="h-2 w-2 rounded-full bg-[#0ca30c] animate-pulse" />
                {tr("LIVE")}
                <span className="font-semibold text-slate-600">{now.toLocaleTimeString("en-IN", { hour12: false })}</span>
              </span>
              <Link
                to="/temple/$slug"
                params={{ slug: t.slug }}
                className="group inline-flex items-center gap-1.5 text-[13px] font-bold text-white bg-saffron px-4 py-2 rounded-full shadow-lg shadow-saffron/25 hover:brightness-95 transition-all"
              >
                {tr("Explore Full Details")} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Photo slot on large screens; inline photo on small screens */}
          <div className="lg:h-full">
            {(scene?.src ?? hero) && <img src={scene?.src ?? hero} alt={tr(t.name)} className="lg:hidden w-full h-40 object-cover object-[center_60%] rounded-2xl" />}
          </div>

          {/* Live queue */}
          <div className="bg-white/85 backdrop-blur-md border border-white/70 rounded-3xl p-4 text-center shadow-md">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-[#7a1a17]">
              <Users className="w-4 h-4 text-saffron" /> {tr("Live Queue Status")}
            </div>
            <div className="mt-2 flex items-baseline justify-center gap-1.5">
              <span className="text-4xl font-black tabular-nums text-[#7a1a17]">{t.waitMin}</span>
              <span className="text-lg font-bold text-slate-600">{tr("mins")}</span>
            </div>
            <div className="mt-3 mx-auto w-fit max-w-full text-[11px] leading-tight text-slate-600 bg-rose-50 border border-rose-100 rounded-2xl px-3 py-1.5">
              {tr("Expected Darshan:")} <strong className="text-slate-800 whitespace-nowrap">~{t.waitMin} {tr("mins")}</strong>
            </div>
          </div>

          {/* Stats */}
          <ul className="space-y-1.5">
            {stats.map((st) => (
              <li key={st.label} className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 ${scene ? "bg-white/85 backdrop-blur-md border-white/70 shadow-sm" : `border-rose-100 ${st.bg}`}`}>
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
