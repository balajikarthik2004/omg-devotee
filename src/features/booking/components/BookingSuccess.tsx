import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Download, ArrowLeft, QrCode } from "lucide-react";

export function BookingSuccess({ t, details, selectedDate, selectedTime }: any) {
  const { t: tStr } = useTranslation();
  const ticketId = `TN-HRCE-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

  return (
    <div className="max-w-md mx-auto animate-in zoom-in-95 duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
        
        <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h2 className="font-serif text-2xl font-bold text-slate-900 mb-2">{tStr("Booking Confirmed!")}</h2>
        <p className="text-slate-500 text-sm mb-8">{tStr("Your Special Darshan tickets have been generated successfully.")}</p>

        {/* E-Ticket */}
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-6 mb-8 relative">
          <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full border-r border-slate-200" />
          <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full border-l border-slate-200" />
          
          <div className="flex flex-col items-center justify-center mb-4 pb-4 border-b border-slate-200 border-dashed">
            <QrCode className="w-24 h-24 text-slate-800 mb-2" />
            <div className="font-mono text-xs font-bold tracking-widest text-slate-500">{ticketId}</div>
          </div>
          
          <div className="text-left space-y-3">
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">{tStr("Temple")}</div>
              <div className="font-bold text-slate-800">{tStr(t.name)}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">{tStr("Date & Time")}</div>
                <div className="font-bold text-slate-800">{selectedDate.toLocaleDateString("en-IN")}, {selectedTime}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">{tStr("Devotees")}</div>
                <div className="font-bold text-slate-800">{details.persons} {tStr("Persons")}</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">{tStr("Primary ID")}</div>
              <div className="font-bold text-slate-800 uppercase">{details.name} (ID: {details.idNumber.slice(-4).padStart(details.idNumber.length, '*')})</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors">
            <Download className="w-4 h-4" /> {tStr("Download E-Ticket")}
          </button>
          <Link to="/temple/$slug" params={{ slug: t.slug }} className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {tStr("Back to Temple")}
          </Link>
        </div>
      </div>
    </div>
  );
}
