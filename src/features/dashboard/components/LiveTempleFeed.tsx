import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { MapPin, ArrowRight } from "lucide-react";
import { CrowdBadge } from "@/components/shared/CrowdBadge";

export function LiveTempleFeed({ results }: any) {
  const { t } = useTranslation();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold flex items-center gap-2 text-slate-900 tracking-tight">{t("Live Darshan Feed")}</h2>
        <div className="text-xs text-slate-500 font-bold tracking-widest uppercase bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm">{results.length} {t("Temples")}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((temple: any) => (
          <Link key={temple.id} to="/temple/$slug" params={{ slug: temple.slug }} className="group flex flex-col bg-white border border-slate-100 rounded-3xl p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" style={{ background: temple.color }}></div>
            <div className="flex gap-5 relative z-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-serif text-3xl shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300" style={{ background: temple.color }}>ॐ</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="font-serif font-bold text-slate-900 truncate text-xl group-hover:text-saffron transition-colors">{t(temple.name)}</div>
                </div>
                <div className="text-sm text-slate-500 font-medium flex items-center gap-1.5 mt-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {t(temple.district)} · {t(temple.deity)}</div>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <CrowdBadge status={temple.crowdStatus} />
                  <span className="text-xs font-bold text-slate-600 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg shadow-sm">{t("Wait:")} {temple.waitMin} {t("mins")}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg shadow-sm">{t("Open Now")}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs relative z-10">
              <span className="text-slate-500 font-medium">{t("AI Optimal Darshan Time:")} <strong className="text-slate-800">3:00 – 5:00 PM</strong></span>
              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-saffron group-hover:border-saffron group-hover:shadow-md transition-all">
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center text-muted-foreground py-16 bg-card rounded-2xl border border-border">
          <div className="text-4xl mb-3">🙏</div>
          <div className="font-medium text-foreground">{t("No temples found")}</div>
          <div className="text-sm mt-1">{t("Try adjusting your filters or search terms.")}</div>
        </div>
      )}
    </section>
  );
}
