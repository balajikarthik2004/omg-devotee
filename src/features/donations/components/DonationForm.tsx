import { useTranslation } from "react-i18next";
import { ShieldCheck } from "lucide-react";
import { temples } from "@/data/temples";
import { CAUSES } from "../constants";

export function DonationForm({
  temple, setTemple,
  cause, setCause,
  amount, setAmount,
  customAmount, setCustomAmount,
  onNext, getActiveAmount
}: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="fade-in p-6 md:p-8">
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{tStr("Select Temple")}</label>
        <select value={temple} onChange={e => setTemple(e.target.value)} className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all font-medium">
          {temples.map(x => <option key={x.id} value={x.slug}>{tStr(x.name)}</option>)}
        </select>
      </div>

      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{tStr("Donation Cause")}</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {CAUSES.map(c => (
          <div 
            key={c.id} 
            onClick={() => setCause(c.id)}
            className={`flex flex-col items-center p-4 rounded-2xl border-2 cursor-pointer transition-all text-center ${cause === c.id ? 'border-saffron bg-saffron/5 shadow-sm' : 'border-border bg-background hover:border-saffron/30'}`}
          >
            <div className={`w-10 h-10 rounded-full ${c.bg} ${c.color} flex items-center justify-center mb-2`}>
              <c.icon className="w-5 h-5" />
            </div>
            <div className="font-bold text-sm text-foreground leading-tight mb-1">{tStr(c.title)}</div>
          </div>
        ))}
      </div>

      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">{tStr("Select Amount")}</label>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[101, 501, 1001, 5001].map(amt => (
          <div 
            key={amt} 
            onClick={() => { setAmount(amt); setCustomAmount(""); }}
            className={`py-3 rounded-xl border text-center cursor-pointer transition-all font-serif font-semibold ${amount === amt && !customAmount ? 'border-saffron bg-saffron text-white shadow-sm' : 'border-border bg-background text-foreground hover:border-saffron/40'}`}
          >
            ₹{amt}
          </div>
        ))}
      </div>

      <div className="relative mb-8">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-serif text-muted-foreground">₹</span>
        <input 
          type="number" 
          value={customAmount} 
          onChange={e => { setCustomAmount(e.target.value); setAmount(0); }} 
          placeholder={tStr("Custom Amount")} 
          className="w-full bg-white border border-border rounded-xl pl-9 pr-4 py-4 text-lg font-serif outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all" 
        />
      </div>

      <button onClick={onNext} disabled={!getActiveAmount()} className="w-full rounded-full gradient-saffron text-white py-4 text-base font-medium flex items-center justify-center transition-transform hover:-translate-y-0.5 shadow-md disabled:opacity-50 disabled:pointer-events-none">
        {tStr("Proceed to Pay")} ₹{getActiveAmount().toLocaleString()}
      </button>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600" /> {tStr("100% Secure & Direct Transfer")}
      </div>
    </div>
  );
}
