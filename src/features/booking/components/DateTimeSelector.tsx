import { useTranslation } from "react-i18next";
import { Temple } from "@/data/temples";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { useMemo } from "react";

export function DateTimeSelector({ t, selectedDate, setSelectedDate, selectedTime, setSelectedTime }: any) {
  const { t: tStr } = useTranslation();

  // Generate available dates (next 14 days, starting from tomorrow)
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  }, []);

  // Generate time slots for the selected date
  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];
    
    const slots = [];
    const [openH, openM] = t.openTime.split(":").map(Number);
    const [closeH, closeM] = t.closeTime.split(":").map(Number);
    
    let afternoonCloseH = -1, afternoonOpenH = -1;
    if (t.afternoonClose && t.afternoonOpen) {
      afternoonCloseH = Number(t.afternoonClose.split(":")[0]);
      afternoonOpenH = Number(t.afternoonOpen.split(":")[0]);
    }

    const now = new Date();
    const minTimeMs = now.getTime() + 24 * 60 * 60 * 1000; // 24 hours from now

    for (let h = openH; h < closeH; h++) {
      // Skip afternoon break
      if (afternoonCloseH !== -1 && h >= afternoonCloseH && h < afternoonOpenH) {
        continue;
      }

      // Create a Date object for this slot to check the 24h rule
      const slotDate = new Date(selectedDate);
      slotDate.setHours(h, 0, 0, 0);

      if (slotDate.getTime() >= minTimeMs) {
        const ampm = h >= 12 ? tStr("PM") : tStr("AM");
        const hr12 = h > 12 ? h - 12 : (h === 0 ? 12 : h);
        slots.push(`${hr12}:00 ${ampm}`);
      }
    }
    return slots;
  }, [selectedDate, t]);

  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm mb-6">
      <h2 className="font-serif text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-saffron" />
        {tStr("Select Date & Time")}
      </h2>

      <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 flex items-start gap-3 mb-6 text-amber-800 text-sm">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">{tStr("Advance Booking Required:")}</span>{" "}
          {tStr("Special Darshan must be booked at least 24 hours in advance.")}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-slate-700 mb-2">{tStr("Select Date")}</label>
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
          {availableDates.map((d, i) => {
            const isSelected = selectedDate && d.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedDate(d);
                  setSelectedTime(""); // reset time on date change
                }}
                className={`flex flex-col items-center justify-center min-w-[70px] h-20 rounded-2xl border transition-all ${
                  isSelected
                    ? "bg-saffron text-white border-saffron shadow-md"
                    : "bg-slate-50 border-slate-200 hover:border-saffron/50 text-slate-700"
                }`}
              >
                <span className="text-[10px] uppercase font-bold opacity-80">
                  {tStr(d.toLocaleDateString("en-US", { weekday: "short" }))}
                </span>
                <span className="text-xl font-bold my-0.5">{d.getDate()}</span>
                <span className="text-[10px] uppercase font-bold opacity-80">
                  {tStr(d.toLocaleDateString("en-US", { month: "short" }))}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4" /> {tStr("Select Time Slot")}
          </label>
          {availableTimes.length === 0 ? (
            <div className="text-sm text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
              {tStr("No slots available for this date that meet the 24-hour advance requirement.")}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {availableTimes.map((time, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-1 rounded-xl text-sm font-bold border transition-all text-center ${
                    selectedTime === time
                      ? "bg-saffron text-white border-saffron shadow-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-saffron/50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
