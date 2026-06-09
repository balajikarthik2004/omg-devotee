import { Clock, Utensils, Info, Coffee, Sun, Moon, Soup } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const getAnnadhanamData = (slug: string, tStr: any) => {
  switch (slug) {
    case "palani-murugan":
      return {
        complex: tStr("Dhandayuthapani Swamy Annadhanam Hall"),
        timings: [
          { name: tStr("Breakfast"), code: "BF", time: tStr("8:00 AM – 11:00 AM"), menu: tStr("Ven Pongal, Rava Upma, Sambar, Chutney") },
          { name: tStr("Lunch"), code: "LU", time: tStr("11:30 AM – 3:30 PM"), menu: tStr("Rice, Sambar, Rasam, Kootu, Poriyal, Buttermilk, Payasam") },
          { name: tStr("Dinner"), code: "DI", time: tStr("6:00 PM – 9:00 PM"), menu: tStr("Wheat Upma, Chapati, Veg Kurma") }
        ],
        notes: tStr("Annadhanam is provided continuously from morning to night. About 5,000 devotees are served daily.")
      };
    case "shirdi-sai":
      return {
        complex: tStr("Shri Sai Prasadalaya"),
        timings: [
          { name: tStr("Breakfast"), code: "BF", time: tStr("7:00 AM – 10:00 AM") },
          { name: tStr("Lunch"), code: "LU", time: tStr("10:30 AM – 3:00 PM") },
          { name: tStr("Dinner"), code: "DI", time: tStr("7:00 PM – 10:00 PM") }
        ],
        notes: tStr("One of the largest solar-powered dining halls. Both free and subsidized meals available.")
      };
    case "madurai-meenakshi":
      return {
        complex: tStr("HR&CE Annadhanam Hall"),
        timings: [
          { name: tStr("Lunch Service"), code: "LU", time: tStr("12:15 PM onwards") }
        ],
        notes: tStr("Provided as part of the HR&CE scheme. Tokens are usually issued earlier in the day.")
      };
    default:
      return {
        complex: tStr("Temple Annaprasadam Complex"),
        timings: [
          { name: tStr("Lunch"), code: "LU", time: tStr("11:30 AM – 2:30 PM") },
          { name: tStr("Dinner"), code: "DI", time: tStr("7:30 PM – 9:30 PM") }
        ],
        notes: tStr("Free service for all pilgrims. Timing may vary based on crowd and festival days. Please leave footwear outside.")
      };
  }
};

export function AnnadhanamDetails({ t }: { t: any }) {
  const { t: tStr } = useTranslation();
  const [waitTime, setWaitTime] = useState(30);

  const data = getAnnadhanamData(t.slug, tStr);

  useEffect(() => {
    // Simulating live wait time variation
    const i = setInterval(() => {
      setWaitTime(w => Math.max(10, Math.round(w + (Math.random() * 6 - 3))));
    }, 12000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#fffdf5] to-[#fff7ed] border border-amber-200/60 rounded-2xl p-5 shadow-[0_4px_15px_rgb(245,158,11,0.05)] hover:shadow-[0_8px_25px_rgb(245,158,11,0.1)] transition-all duration-300 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-amber-100/50">
          <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 shadow-sm shrink-0">
            <Utensils className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-slate-900 text-lg leading-tight tracking-tight">{t.name} {tStr("Annadhanam")}</h3>
            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{data.complex}</p>
          </div>
        </div>

        <div className="mb-5 p-3.5 rounded-xl bg-white/80 backdrop-blur-sm border border-amber-100/50 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Clock className="w-7 h-7 text-amber-500" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 border border-white rounded-full animate-ping" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 border border-white rounded-full" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-slate-800">{tStr("Live Wait Time")}</div>
              <div className="text-[10px] font-medium text-slate-500">{tStr("Updates every few minutes")}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-black tabular-nums text-rose-600">{waitTime} <span className="text-xs font-bold text-rose-500/80">{tStr("min")}</span></div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{tStr("Moderate Crowd")}</div>
          </div>
        </div>

        <div className="space-y-3">
          {data.timings.map((timing: any, idx: number) => (
            <div key={idx} className="flex items-start p-3 rounded-xl border border-amber-100/30 bg-amber-50/30 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border border-amber-100 mr-3 mt-0.5">
                {timing.code === "BF" && <Coffee className="w-4 h-4 text-orange-500" />}
                {timing.code === "LU" && <Sun className="w-4 h-4 text-amber-500" />}
                {timing.code === "DI" && <Moon className="w-4 h-4 text-indigo-500" />}
                {timing.code === "ALL" && <Soup className="w-4 h-4 text-emerald-500" />}
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-800">{timing.name}</div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">{timing.time}</div>
                {timing.menu && <div className="text-[10px] text-amber-700/80 mt-1 leading-relaxed">{timing.menu}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-start gap-2 text-[11px] font-medium text-slate-600 bg-white/60 p-3 rounded-xl border border-amber-100/50 leading-relaxed shadow-[inset_0_2px_10px_rgb(0,0,0,0.01)]">
          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p>{data.notes}</p>
        </div>
      </div>
    </div>
  );
}
