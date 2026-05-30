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
      
      <div className="bg-secondary/40 rounded-2xl p-5 mb-8 text-left border border-border/50">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 text-center border-b border-border/50 pb-3">{tStr("E-Receipt Details")}</div>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Amount:")}</span> <span className="font-bold text-foreground">₹{getActiveAmount().toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Temple:")}</span> <span className="font-medium text-right">{tStr(templeObj.name)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Cause:")}</span> <span className="font-medium text-right">{tStr(CAUSES.find(c => c.id === cause)?.title)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Method:")}</span> <span className="font-medium text-right uppercase">{paymentMethod}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Transaction ID:")}</span> <span className="font-mono text-xs">TXN{Math.floor(Math.random()*100000000)}</span></div>
        </div>
      </div>

      <button className="w-full mb-3 rounded-full bg-white border border-border py-3.5 text-sm font-medium flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 shadow-sm">
        <Download className="w-4 h-4" /> {tStr("Download 80G Receipt")}
      </button>
      <button onClick={onReset} className="w-full rounded-full bg-secondary text-foreground py-3.5 text-sm font-medium hover:bg-secondary/80 transition-colors">
        {tStr("Make Another Donation")}
      </button>
    </div>
  );
}
