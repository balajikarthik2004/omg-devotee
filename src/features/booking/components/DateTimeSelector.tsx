import { useTranslation } from "react-i18next";
import { Temple } from "@/data/temples";
import { Clock, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, isAfter } from "date-fns";

export function DateTimeSelector({ t, selectedDate, setSelectedDate, selectedTime, setSelectedTime }: any) {
  const { t: tStr } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Business logic bounds
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 90); // Allow booking up to 90 days in advance

  // Generate time slots based on EXACT temple timings
  const availableTimes = useMemo(() => {
    if (!selectedDate) return [];
    
    const timeToMins = (tStr: string | undefined) => {
      if (!tStr) return -1;
      const [h, m] = tStr.split(":").map(Number);
      return h * 60 + m;
    };

    const openMins = timeToMins(t.openTime);
    const closeMins = timeToMins(t.closeTime);
    const acMins = timeToMins(t.afternoonClose);
    const aoMins = timeToMins(t.afternoonOpen);
    
    const slots = [];
    const now = new Date();
    const minTimeMs = now.getTime() + 24 * 60 * 60 * 1000; // 24 hours from now

    // Start from the first full hour after opening
    const startHour = Math.ceil(openMins / 60);
    // End before closing
    const endHour = Math.ceil(closeMins / 60); 

    for (let h = startHour; h < endHour; h++) {
      const slotMins = h * 60;
      
      // Stop if slot is at or past closing time
      if (slotMins >= closeMins) continue;

      // Skip slots that fall inside the afternoon break
      if (acMins !== -1 && aoMins !== -1) {
        if (slotMins >= acMins && slotMins < aoMins) continue;
      }

      // Check the 24-hour advance booking rule
      const slotDate = new Date(selectedDate);
      slotDate.setHours(h, 0, 0, 0);

      if (slotDate.getTime() >= minTimeMs) {
        const ampm = h >= 12 ? tStr("PM") : tStr("AM");
        const hr12 = h > 12 ? h - 12 : (h === 0 ? 12 : h);
        slots.push(`${hr12}:00 ${ampm}`);
      }
    }
    return slots;
  }, [selectedDate, t, tStr]);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6 px-2">
        <h3 className="font-bold text-[28px] text-slate-800 font-serif tracking-tight drop-shadow-sm">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/80 bg-white/50 backdrop-blur-md hover:bg-white text-slate-700 transition-all shadow-sm hover:shadow-md hover:-translate-x-0.5"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/80 bg-white/50 backdrop-blur-md hover:bg-white text-slate-700 transition-all shadow-sm hover:shadow-md hover:translate-x-0.5"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentMonth));
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-extrabold text-slate-400 text-[11px] uppercase pb-3 tracking-[0.2em]">
          {format(addDays(startDate, i), "EE").charAt(0)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-1">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = new Date(day);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const isDisabled = isBefore(day, addDays(today, 1)) || isAfter(day, maxDate);

        days.push(
          <div key={day.toString()} className="p-1 h-16 sm:h-20 lg:h-24">
            {isCurrentMonth ? (
              <button
                disabled={isDisabled}
                onClick={() => {
                  setSelectedDate(cloneDay);
                  setSelectedTime("");
                }}
                className={`w-full h-full relative rounded-[14px] transition-all duration-300 ${
                  isSelected
                    ? "border-saffron/50 bg-saffron/10 shadow-sm z-10 scale-[1.08] ring-1 ring-saffron/30"
                    : isDisabled
                    ? "bg-white/40 opacity-40 cursor-not-allowed border border-transparent"
                    : "bg-white/60 backdrop-blur-md hover:bg-white border border-white/60 hover:border-saffron/40 hover:shadow-md hover:-translate-y-0.5"
                }`}
              >
                <div className={`absolute top-1 right-1 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-[13px] font-bold transition-colors ${
                  isSelected ? "text-saffron bg-white shadow-sm" : "text-slate-700 group-hover:text-saffron"
                }`}>
                  {formattedDate}
                </div>
              </button>
            ) : (
              <div className="w-full h-full rounded-xl flex items-start justify-end p-1.5 opacity-30 text-sm font-bold text-slate-400 bg-transparent">
                <span className="mr-0.5 mt-0.5">{formattedDate}</span>
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="bg-white/70 backdrop-blur-2xl border border-white/80 rounded-[32px] p-6 shadow-[0_8px_40px_rgb(0,0,0,0.04)] mb-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      
      <div className="relative z-10 bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-3 mb-6 text-amber-900 text-sm shadow-sm">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">{tStr("Advance Booking Required:")}</span>{" "}
          {tStr("Special Darshan must be booked at least 24 hours in advance.")}
        </div>
      </div>

      <div className="mb-4 w-full mx-auto">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      {selectedDate && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 w-full mx-auto border-t border-slate-100 pt-6">
          <label className="block text-sm font-bold text-[#2a2c5a] mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" /> {tStr("Select Time Slot")}
          </label>
          {availableTimes.length === 0 ? (
            <div className="text-sm text-rose-600 bg-rose-50 p-4 rounded-xl border border-rose-100">
              {tStr("No slots available for this date that meet the 24-hour advance requirement.")}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {availableTimes.map((time, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3.5 px-2 rounded-[16px] text-sm font-bold border transition-all duration-300 text-center ${
                    selectedTime === time
                      ? "bg-saffron/10 text-saffron border-saffron/40 shadow-sm scale-105"
                      : "bg-white/80 backdrop-blur-md border-white/80 text-slate-700 hover:border-saffron/40 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
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
