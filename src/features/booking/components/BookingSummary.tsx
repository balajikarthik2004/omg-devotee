import { useTranslation } from "react-i18next";
import { CreditCard, CheckCircle2, ShieldCheck } from "lucide-react";

export function BookingSummary({ details, selectedDate, selectedTime, onPay, isProcessing }: any) {
  const { t: tStr } = useTranslation();
  const ticketPrice = 200;
  const total = details.persons * ticketPrice;

  if (isProcessing) {
    return (
      <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]">
        <style>{`
          @keyframes spin-slow {
            to { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            to { transform: rotate(-360deg); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.8; transform: scale(0.95); }
            50% { opacity: 1; transform: scale(1.05); }
          }
        `}</style>
        
        <div className="absolute inset-0 bg-saffron/5 animate-pulse" />
        
        {/* CSS Realistic Spiritual Loader (Mandala Style) */}
        <div className="relative w-28 h-28 mb-8 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-saffron rounded-full blur-[50px] opacity-30 animate-pulse" />
          
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-dashed border-amber-500/40 rounded-full" style={{ animation: 'spin-slow 8s linear infinite' }} />
          
          {/* Middle Ring */}
          <div className="absolute inset-3 border-[3px] border-dotted border-orange-500/60 rounded-full" style={{ animation: 'spin-reverse 6s linear infinite' }} />
          
          {/* Inner Lotus Petal Ring */}
          <div className="absolute inset-6 border-[3px] border-saffron/80 rounded-[40%_40%_40%_40%] rotate-45" style={{ animation: 'spin-slow 4s linear infinite' }} />
          <div className="absolute inset-6 border-[3px] border-saffron/80 rounded-[40%_40%_40%_40%] rotate-0" style={{ animation: 'spin-slow 4s linear infinite' }} />
          
          {/* Center Bindu (Glowing Point) */}
          <div className="absolute w-4 h-4 bg-gradient-to-tr from-orange-500 to-amber-300 rounded-full shadow-[0_0_15px_rgba(245,158,11,1)]" style={{ animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
        </div>
        
        <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 relative z-10">{tStr("Processing Payment")}</h3>
        <p className="text-sm text-slate-500 mb-6 relative z-10">{tStr("Please wait while we secure your tickets...")}</p>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full relative z-10">
          <ShieldCheck className="w-4 h-4" /> {tStr("100% Secure Transaction")}
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
            <span className="font-bold text-saffron">{tStr("Special Darshan")} (₹{ticketPrice})</span>
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
