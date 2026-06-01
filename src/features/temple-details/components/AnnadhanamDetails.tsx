import { Clock, Utensils, Info, Coffee, Sun, Moon, Soup } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const getAnnadhanamData = (slug: string, tStr: any) => {
  switch (slug) {
    case "palani-murugan":
      return {
        complex: tStr("Dhandayuthapani Swamy Annadhanam Hall"),
        timings: [
          { name: tStr("Continuous Service"), code: "ALL", time: tStr("8:00 AM – 9:00 PM") }
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
    <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
          <Utensils className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-lg md:text-xl leading-tight">{t.name} {tStr("Annadhanam")}</h3>
          <p className="text-sm text-slate-500">{data.complex}</p>
        </div>
      </div>

      <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Clock className="w-8 h-8 text-rose-500" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-ping" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">{tStr("Live Wait Time")}</div>
            <div className="text-xs text-slate-500">{tStr("Updates every few minutes")}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-rose-600">{waitTime} <span className="text-sm font-semibold">{tStr("min")}</span></div>
          <div className="text-xs font-medium text-rose-500/80">{tStr("Moderate Crowd")}</div>
        </div>
      </div>

      <div className="space-y-4">
        {data.timings.map((timing, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              {timing.code === "BF" && <Coffee className="w-4 h-4 text-slate-600" />}
              {timing.code === "LU" && <Sun className="w-4 h-4 text-slate-600" />}
              {timing.code === "DI" && <Moon className="w-4 h-4 text-slate-600" />}
              {timing.code === "ALL" && <Soup className="w-4 h-4 text-slate-600" />}
            </div>
            <div>
              <div className="font-semibold text-slate-800">{timing.name}</div>
              <div className="text-sm text-slate-500">{timing.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-start gap-2 text-xs text-slate-400 bg-slate-50 p-3 rounded-xl">
        <Info className="w-4 h-4 shrink-0 mt-0.5" />
        <p>{data.notes}</p>
      </div>
    </div>
  );
}
