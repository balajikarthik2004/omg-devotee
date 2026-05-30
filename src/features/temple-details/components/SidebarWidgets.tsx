import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Bell, MessageCircle, Navigation, Share2 } from "lucide-react";
import { CrowdBadge } from "@/components/shared/CrowdBadge";
import { temples } from "@/data/temples";

export function MobileActionBar() {
  const { t: tStr } = useTranslation();

  return (
    <div className="lg:hidden fixed bottom-16 inset-x-0 z-40 bg-white/95 backdrop-blur border-t border-border p-2 grid grid-cols-4 gap-2">
      <ActionBtn icon={<Navigation className="w-4 h-4" />} label={tStr("Navigate")} />
      <ActionBtn icon={<Bell className="w-4 h-4" />} label={tStr("Alert")} />
      <Link to="/chat" className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-foreground/80"><MessageCircle className="w-4 h-4" />{tStr("Ask AI")}</Link>
      <ActionBtn icon={<Share2 className="w-4 h-4" />} label={tStr("Share")} />
    </div>
  );
}

function ActionBtn({ icon, label }: any) {
  return <button className="flex flex-col items-center justify-center gap-0.5 text-[11px] text-foreground/80">{icon}{label}</button>;
}

export function OtherTemples({ t }: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      <h3 className="font-serif text-xl font-bold text-slate-900 mb-4">{tStr("Other temples nearby")}</h3>
      <div className="space-y-2">
        {temples.filter(o => o.id !== t.id).slice(0, 4).map(o => (
          <Link key={o.id} to="/temple/$slug" params={{ slug: o.slug }} className="group flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-serif shadow-sm group-hover:scale-105 transition-transform" style={{ background: o.color }}>ॐ</div>
            <div className="flex-1 min-w-0">
              <div className="font-serif text-sm font-bold text-slate-800 truncate group-hover:text-saffron transition-colors">{tStr(o.name)}</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">{tStr(o.district)}</div>
            </div>
            <CrowdBadge status={o.crowdStatus} />
          </Link>
        ))}
      </div>
    </div>
  );
}
