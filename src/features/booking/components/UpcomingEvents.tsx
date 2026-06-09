import { useTranslation } from "react-i18next";
import { CalendarDays, Sparkles } from "lucide-react";
import { getUpcomingEvents } from "@/data/events";

export function UpcomingEvents({ slug }: { slug: string }) {
  const { t: tStr } = useTranslation();
  const events = getUpcomingEvents(slug);

  if (events.length === 0) return null;

  return (
    <div className="bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_40px_rgb(0,0,0,0.04)] relative overflow-hidden h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-[60px] -mr-10 -mt-10 pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="font-serif text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-amber-500" />
          {tStr("Upcoming Temple Events")}
        </h3>

        <div className="space-y-4">
          {events.map((event, i) => (
            <div key={i} className={`p-5 rounded-[20px] border transition-all hover:shadow-md hover:-translate-y-1 ${event.isMajor ? "bg-gradient-to-br from-amber-50/80 to-orange-50/30 border-amber-200/60 shadow-sm" : "bg-white/60 backdrop-blur-md border-white/80"}`}>
              <div className="mb-2">
                <div className="font-bold text-slate-800 text-sm flex items-center gap-1.5 mb-2">
                  {tStr(event.title)}
                  {event.isMajor && <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                </div>
                <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-saffron bg-white border border-amber-100 px-2 py-0.5 rounded-full shadow-sm">
                  {tStr(event.date)}
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {tStr(event.description)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
