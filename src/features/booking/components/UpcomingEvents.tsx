import { useTranslation } from "react-i18next";
import { CalendarDays, Sparkles } from "lucide-react";
import { getUpcomingEvents } from "@/data/events";

export function UpcomingEvents({ slug }: { slug: string }) {
  const { t: tStr } = useTranslation();
  const events = getUpcomingEvents(slug);

  if (events.length === 0) return null;

  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="font-serif text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-amber-500" />
          {tStr("Upcoming Temple Events")}
        </h3>

        <div className="space-y-4">
          {events.map((event, i) => (
            <div key={i} className={`p-4 rounded-2xl border ${event.isMajor ? "bg-amber-50/50 border-amber-100" : "bg-slate-50 border-slate-100"}`}>
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
