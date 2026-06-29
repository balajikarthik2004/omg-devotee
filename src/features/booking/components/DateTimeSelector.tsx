import { useTranslation } from "react-i18next";
import { Temple } from "@/data/temples";
import { Clock, AlertCircle, ChevronLeft, ChevronRight, CalendarDays, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, isBefore, isAfter } from "date-fns";

export function DateTimeSelector({ t, selectedDate, setSelectedDate, selectedTime, setSelectedTime }: any) {
  const { t: tStr } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 90);

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
    const minTimeMs = now.getTime() + 24 * 60 * 60 * 1000;

    const startHour = Math.ceil(openMins / 60);
    const endHour = Math.ceil(closeMins / 60); 

    for (let h = startHour; h < endHour; h++) {
      const slotMins = h * 60;
      if (slotMins >= closeMins) continue;
      if (acMins !== -1 && aoMins !== -1) {
        if (slotMins >= acMins && slotMins < aoMins) continue;
      }

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

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-saffron/10 flex items-center justify-center text-saffron shrink-0">
          <CalendarDays className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-2xl text-slate-800 tracking-tight">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} 
          className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 hover:bg-white text-slate-600 transition-all shadow-sm hover:shadow-md hover:-translate-x-0.5 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} 
          className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 hover:bg-white text-slate-600 transition-all shadow-sm hover:shadow-md hover:translate-x-0.5 active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentMonth));
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-bold text-slate-400 text-xs uppercase pb-4 tracking-widest">
          {format(addDays(startDate, i), "EEE").substring(0, 3)}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2 border-b border-slate-100/60">{days}</div>;
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
        const isToday = isSameDay(day, today);

        days.push(
          <div key={day.toString()} className="p-1 h-14 sm:h-16 flex items-center justify-center">
            {isCurrentMonth ? (
              <button
                disabled={isDisabled}
                onClick={() => {
                  setSelectedDate(cloneDay);
                  setSelectedTime("");
                }}
                className={`w-12 h-12 sm:w-14 sm:h-14 relative flex items-center justify-center rounded-full transition-all duration-300 font-medium text-sm sm:text-base ${
                  isSelected
                    ? "bg-gradient-to-br from-saffron to-amber-500 text-white shadow-lg shadow-saffron/30 scale-110 z-10"
                    : isDisabled
                    ? "text-slate-300 bg-slate-50/50 cursor-not-allowed"
                    : "text-slate-700 hover:bg-saffron/10 hover:text-saffron hover:scale-105 active:scale-95"
                } ${isToday && !isSelected && !isDisabled ? "border border-saffron text-saffron bg-saffron/5" : ""}`}
              >
                {formattedDate}
                {isSelected && <Sparkles className="w-3 h-3 absolute -top-1 -right-1 text-amber-200 animate-pulse" />}
              </button>
            ) : (
              <div className="w-10 h-10 flex items-center justify-center text-sm font-medium text-slate-300">
                {formattedDate}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="w-full relative">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 flex items-start gap-4 mb-8 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
        <div className="text-amber-900 text-sm">
          <span className="font-bold">{tStr("Advance Booking Required:")}</span>{" "}
          {tStr("Please select a date at least 24 hours in advance to guarantee your booking.")}
        </div>
      </div>

      <div className="mb-8 w-full max-w-2xl mx-auto">
        {renderHeader()}
        {renderDays()}
        <div className="pt-2">
          {renderCells()}
        </div>
      </div>

      {selectedDate && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 w-full mx-auto border-t-2 border-slate-100 border-dashed pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xl text-slate-800 tracking-tight">{tStr("Select Arrival Time")}</h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">{tStr("For Date:")} <span className="font-bold text-slate-700">{format(selectedDate, "do MMMM yyyy")}</span></p>
            </div>
          </div>

          {availableTimes.length === 0 ? (
            <div className="text-sm text-rose-600 bg-rose-50 p-5 rounded-2xl border border-rose-100 flex gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {tStr("No slots available for this date that meet the 24-hour advance requirement.")}
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {availableTimes.map((time, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-2xl text-sm font-bold border transition-all duration-300 text-center relative overflow-hidden ${
                    selectedTime === time
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30 scale-105"
                      : "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
                  }`}
                >
                  {selectedTime === time && <div className="absolute inset-0 bg-white/20 animate-pulse" />}
                  <span className="relative z-10">{time}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
