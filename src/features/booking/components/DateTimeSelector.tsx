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
  maxDate.setDate(today.getDate() + 14);

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
        <h3 className="font-bold text-[28px] text-[#2a2c5a] font-serif tracking-tight">
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#e2e8f0] text-slate-600 transition-colors shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} 
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#e2e8f0] text-slate-600 transition-colors shadow-sm"
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
        <div key={i} className="text-center font-bold text-[#5c688c] text-sm uppercase pb-2 tracking-wider">
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
          <div key={day.toString()} className="p-0.5 h-12 sm:h-14">
            {isCurrentMonth ? (
              <button
                disabled={isDisabled}
                onClick={() => {
                  setSelectedDate(cloneDay);
                  setSelectedTime("");
                }}
                className={`w-full h-full relative rounded-xl transition-all ${
                  isSelected
                    ? "border-2 border-[#e63946] bg-[#fdf8f8] shadow-sm z-10 scale-105"
                    : isDisabled
                    ? "bg-[#f8fafc] opacity-50 cursor-not-allowed border border-transparent"
                    : "bg-[#f8fafc] hover:bg-[#f1f5f9] border border-transparent hover:border-slate-200"
                }`}
              >
                <div className={`absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-6 h-6 flex items-center justify-center rounded-full text-[12px] font-bold ${
                  isSelected ? "bg-[#e63946] text-white shadow-sm" : "text-[#1e293b]"
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
    <div className="bg-white border border-slate-200/60 rounded-[28px] p-5 shadow-sm mb-6">
      <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3 flex items-start gap-3 mb-4 text-amber-800 text-sm">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">{tStr("Advance Booking Required:")}</span>{" "}
          {tStr("Special Darshan must be booked at least 24 hours in advance.")}
        </div>
      </div>

      <div className="mb-4 max-w-xl mx-auto">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      {selectedDate && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 max-w-2xl mx-auto border-t border-slate-100 pt-6">
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
                  className={`py-3 px-2 rounded-2xl text-sm font-bold border transition-all text-center ${
                    selectedTime === time
                      ? "bg-[#e63946] text-white border-[#e63946] shadow-md shadow-red-500/20"
                      : "bg-[#f8fafc] border-slate-200 text-slate-700 hover:border-[#e63946]/50 hover:bg-white"
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
