import { useTranslation } from "react-i18next";
import { CreditCard, CheckCircle2, ShieldCheck, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { DARSHAN_CATEGORIES } from "@/routes/_app.booking.$slug";

export function BookingSummary({ details, selectedDate, selectedTime, onPay, isProcessing }: any) {
  const { t: tStr } = useTranslation();
  
  const category = DARSHAN_CATEGORIES.find(c => c.id === details.categoryId) || DARSHAN_CATEGORIES[1];
  const ticketPrice = category.price;
  const total = details.persons * ticketPrice;
  const [loadingText, setLoadingText] = useState(() => tStr("Initiating secure connection..."));

  useEffect(() => {
    if (isProcessing) {
      const timers = [
        setTimeout(() => setLoadingText(tStr("Authenticating payment...")), 800),
        setTimeout(() => setLoadingText(tStr("Verifying with bank...")), 1800),
        setTimeout(() => setLoadingText(tStr("Confirming transaction...")), 2800),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isProcessing, tStr]);

  if (isProcessing) {
    return (
      <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]">
        {/* Background ambient glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
        
        {/* Modern Loader */}
        <div className="relative z-10 mb-8">
          <div className="w-20 h-20 relative">
            <style>{`
              @keyframes dash {
                0% { stroke-dasharray: 1, 300; stroke-dashoffset: 0; }
                50% { stroke-dasharray: 150, 300; stroke-dashoffset: -40; }
                100% { stroke-dasharray: 150, 300; stroke-dashoffset: -280; }
              }
            `}</style>
            <svg className="w-full h-full animate-[spin_2s_linear_infinite]" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-slate-100"
              />
              <circle
                cx="50"
                cy="50"
                r="46"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                className="text-blue-600 animate-[dash_1.5s_ease-in-out_infinite]"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
          </div>
        </div>
        
        <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 relative z-10">
          {tStr("Processing Payment")}
        </h3>
        
        {/* Dynamic Loading Text */}
        <div className="h-6 relative z-10 mb-6 overflow-hidden flex items-center justify-center">
          <p key={loadingText} className="text-sm font-medium text-slate-500 animate-in slide-in-from-bottom-2 fade-in duration-300">
            {loadingText}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full relative z-10 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> 
          {tStr("100% Secure & Encrypted")}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">{tStr("Booking Summary")}</h3>
        
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">{tStr("Date & Time")}</span>
            <span className="font-bold text-slate-800 text-right">
              {selectedDate ? selectedDate.toLocaleDateString("en-IN") : ""}
              <br />
              {selectedTime}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">{tStr("Ticket Type")}</span>
            <span className="font-bold text-saffron">{tStr(category.name)} (₹{ticketPrice})</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-500 font-medium">{tStr("Devotees")}</span>
            <span className="font-bold text-slate-800">{details.persons} {tStr("Persons")}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-t border-slate-200 border-dashed mb-6">
          <span className="text-base font-bold text-slate-900">{tStr("Total Payable")}</span>
          <span className="text-2xl font-black text-slate-900">₹{total}</span>
        </div>

        <button
          onClick={onPay}
          className="w-full relative group inline-flex items-center justify-center gap-2.5 text-base font-bold text-white px-6 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(16,185,129,0.4)] bg-gradient-to-r from-emerald-500 to-teal-500 overflow-hidden"
        >
          <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-[ping_2s_ease-in-out_infinite] opacity-40 pointer-events-none" />
          <CreditCard className="w-5 h-5 relative z-10" />
          <span className="relative z-10 tracking-wide">{tStr("Pay securely")}</span>
        </button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-widest">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {tStr("HR&CE Official Booking")}
        </div>
      </div>
    </div>
  );
}
