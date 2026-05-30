import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Calendar, HandHeart, Ticket, Coins, PackageOpen, Heart, BellRing } from "lucide-react";

export function DevoteeEssentials() {
  const { t } = useTranslation();

  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-saffron" />
        <h2 className="font-serif text-lg font-semibold text-foreground">{t("Devotee Essentials")}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Panchangam / Calendar */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="text-xs font-bold uppercase tracking-widest text-saffron flex items-center gap-2">
              <div className="p-1.5 bg-saffron/10 rounded-lg"><Calendar className="w-4 h-4" /></div>
              {t("Panchangam")}
            </div>
            <div className="text-[10px] bg-slate-50 px-2.5 py-1 rounded-full font-bold text-slate-500 border border-slate-200 uppercase tracking-widest">{t("Valarpirai")}</div>
          </div>
          <div className="font-serif text-2xl font-bold mb-2 text-slate-900 relative z-10">{t("Pradosham")}</div>
          <div className="text-sm text-slate-500 leading-relaxed font-medium relative z-10">{t("Highly auspicious day for Lord Shiva. Special abhishekam begins at 4:30 PM.")}</div>
        </div>

        {/* Quick E-Services */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-slate-50 rounded-lg text-slate-500"><HandHeart className="w-4 h-4" /></div>
            {t("Quick Services")}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 transition-all text-left group/btn shadow-sm hover:shadow">
              <div className="p-1.5 bg-white rounded-xl shadow-sm group-hover/btn:scale-110 transition-transform"><Ticket className="w-4 h-4 text-emerald-600" /></div>
              <span className="text-[11px] font-bold text-slate-700 leading-tight" dangerouslySetInnerHTML={{__html: t("Book Darshan").replace(' ', '<br />')}}></span>
            </button>
            <button className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-100 hover:border-amber-200 transition-all text-left group/btn shadow-sm hover:shadow">
              <div className="p-1.5 bg-white rounded-xl shadow-sm group-hover/btn:scale-110 transition-transform"><Coins className="w-4 h-4 text-amber-500" /></div>
              <span className="text-[11px] font-bold text-slate-700 leading-tight" dangerouslySetInnerHTML={{__html: t("Digital Hundi").replace(' ', '<br />')}}></span>
            </button>
            <button className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all text-left group/btn shadow-sm hover:shadow">
              <div className="p-1.5 bg-white rounded-xl shadow-sm group-hover/btn:scale-110 transition-transform"><PackageOpen className="w-4 h-4 text-indigo-500" /></div>
              <span className="text-[11px] font-bold text-slate-700 leading-tight" dangerouslySetInnerHTML={{__html: t("Order Prasadam").replace(' ', '<br />')}}></span>
            </button>
            <button className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 transition-all text-left group/btn shadow-sm hover:shadow">
              <div className="p-1.5 bg-white rounded-xl shadow-sm group-hover/btn:scale-110 transition-transform"><Heart className="w-4 h-4 text-rose-500" /></div>
              <span className="text-[11px] font-bold text-slate-700 leading-tight" dangerouslySetInnerHTML={{__html: t("Donate Annadhan").replace(' ', '<br />')}}></span>
            </button>
          </div>
        </div>

        {/* Devotee Alert / Insight */}
        <div className="bg-gradient-to-br from-saffron/10 via-amber-500/5 to-rose-500/10 border border-saffron/20 rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/20 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none transition-all group-hover:bg-saffron/30"></div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-rose-600 flex items-center gap-2 mb-3 relative z-10">
              <div className="p-1.5 bg-rose-100 rounded-lg"><BellRing className="w-4 h-4 animate-bounce text-rose-600" /></div>
              {t("Live Alert")}
            </div>
            <div className="text-sm font-semibold leading-relaxed relative z-10 text-slate-800">{t("Kapaleeshwarar Temple queue is moving exceptionally fast right now. Estimated wait time is only 15 mins!")}</div>
          </div>
          <Link to="/temple/$slug" params={{ slug: "kapaleeshwarar" }} className="mt-5 text-[11px] font-bold uppercase tracking-widest text-rose-600 inline-flex items-center gap-1.5 hover:text-rose-700 w-fit relative z-10 bg-white/50 px-3 py-1.5 rounded-full border border-rose-200 backdrop-blur-sm transition-all hover:bg-white shadow-sm">
            {t("View Live Crowd")} <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
