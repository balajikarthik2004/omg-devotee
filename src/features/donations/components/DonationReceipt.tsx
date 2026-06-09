import { useTranslation } from "react-i18next";
import { CheckCircle2, Download } from "lucide-react";
import { CAUSES } from "../constants";

export function DonationReceipt({ templeObj, cause, paymentMethod, getActiveAmount, onReset }: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="fade-in p-6 md:p-10 text-center">
      <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h2 className="font-serif text-2xl font-semibold mb-1 text-foreground">{tStr("Payment Successful")}</h2>
      <div className="text-saffron font-medium mb-6">{tStr("May the Divine bless you! 🙏")}</div>
      
      <div className="bg-white rounded-2xl p-6 mb-8 text-left border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-400 to-teal-400" />
        
        <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 text-center border-b border-dashed border-slate-200 pb-4">
          {tStr("E-Receipt Details")}
        </div>
        
        <div className="space-y-3.5 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">{tStr("Amount")}</span> 
            <span className="font-black text-xl text-emerald-600">₹{getActiveAmount().toLocaleString()}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-muted-foreground font-medium whitespace-nowrap mt-0.5">{tStr("Temple")}</span> 
            <span className="font-bold text-slate-800 text-right leading-tight">{tStr(templeObj.name)}</span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <span className="text-muted-foreground font-medium whitespace-nowrap mt-0.5">{tStr("Cause")}</span> 
            <span className="font-bold text-slate-800 text-right leading-tight">{tStr(CAUSES.find(c => c.id === cause)?.title)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-medium">{tStr("Method")}</span> 
            <span className="font-bold text-slate-600 uppercase bg-slate-100 px-2 py-0.5 rounded text-[11px] tracking-wider">{paymentMethod}</span>
          </div>
          <div className="flex items-center justify-between border-t border-dashed border-slate-200 pt-4 mt-2">
            <span className="text-muted-foreground font-medium">{tStr("Transaction ID")}</span> 
            <span className="font-mono font-bold text-slate-600 text-[11px] bg-slate-50 px-2 py-1 rounded border border-slate-100">
              TXN{Math.floor(Math.random()*100000000)}
            </span>
          </div>
        </div>
      </div>

      <button className="w-full mb-3 rounded-full bg-white border border-border py-3.5 text-sm font-medium flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 shadow-sm">
        <Download className="w-4 h-4" /> {tStr("Download 80G Receipt")}
      </button>
      <button onClick={onReset} className="w-full rounded-full bg-secondary text-white py-3.5 text-sm font-medium hover:bg-secondary/80 transition-colors">
        {tStr("Make Another Donation")}
      </button>
    </div>
  );
}
