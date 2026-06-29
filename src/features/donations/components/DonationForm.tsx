import { useTranslation } from "react-i18next";
import { ShieldCheck, Calendar, CalendarDays, Zap } from "lucide-react";
import { temples } from "@/data/temples";
import { CAUSES } from "../constants";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function DonationForm({
  temple, setTemple,
  cause, setCause,
  amount, setAmount,
  customAmount, setCustomAmount,
  frequency, setFrequency,
  pledgeDate, setPledgeDate,
  onNext, getActiveAmount
}: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="fade-in p-5 md:p-6 bg-card rounded-2xl shadow-sm border border-border/50">
      
      <div className="mb-5">
        <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">{tStr("Select Temple")}</label>
        <select 
          value={temple} 
          onChange={e => setTemple(e.target.value)} 
          className="w-full bg-secondary/20 border-2 border-border/60 hover:border-border rounded-xl px-3 py-2.5 text-sm font-semibold text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer appearance-none shadow-sm"
          style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7rem top 50%', backgroundSize: '.65rem auto' }}
        >
          {temples.map(x => <option key={x.id} value={x.slug}>{tStr(x.name)}</option>)}
        </select>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">{tStr("Donation Frequency")}</label>
        <RadioGroup value={frequency === 'one-time' ? 'one-time' : frequency === 'pledge' ? 'pledge' : 'recurrent'} onValueChange={(val) => {
          if (val === 'one-time') setFrequency('one-time');
          else if (val === 'pledge') setFrequency('pledge');
          else setFrequency('30days');
        }} className="grid grid-cols-3 gap-2">
          <div className={`flex flex-col items-center justify-center p-2 border-2 rounded-xl cursor-pointer transition-all ${frequency === 'one-time' ? 'border-primary bg-primary/5 shadow-sm text-primary' : 'border-border/60 hover:border-border text-muted-foreground hover:bg-secondary/20'}`} onClick={() => setFrequency('one-time')}>
            <Zap className="w-4 h-4 mb-1" />
            <span className="font-semibold text-xs">{tStr("One-time")}</span>
          </div>
          <div className={`flex flex-col items-center justify-center p-2 border-2 rounded-xl cursor-pointer transition-all ${frequency !== 'one-time' && frequency !== 'pledge' ? 'border-primary bg-primary/5 shadow-sm text-primary' : 'border-border/60 hover:border-border text-muted-foreground hover:bg-secondary/20'}`} onClick={() => setFrequency('30days')}>
            <CalendarDays className="w-4 h-4 mb-1" />
            <span className="font-semibold text-xs">{tStr("Recurring")}</span>
          </div>
          <div className={`flex flex-col items-center justify-center p-2 border-2 rounded-xl cursor-pointer transition-all ${frequency === 'pledge' ? 'border-primary bg-primary/5 shadow-sm text-primary' : 'border-border/60 hover:border-border text-muted-foreground hover:bg-secondary/20'}`} onClick={() => setFrequency('pledge')}>
            <Calendar className="w-4 h-4 mb-1" />
            <span className="font-semibold text-xs">{tStr("Pledge")}</span>
          </div>
        </RadioGroup>
        
        {frequency !== 'one-time' && frequency !== 'pledge' && (
          <div className="mt-3 p-4 bg-primary/5 border border-primary/20 rounded-xl animate-in fade-in slide-in-from-top-2">
             <label className="block text-xs font-bold uppercase tracking-widest text-primary mb-1.5">{tStr("Recurring Period")}</label>
             <select 
               value={frequency.startsWith('custom') ? 'custom' : frequency} 
               onChange={e => setFrequency(e.target.value === 'custom' ? 'custom-7' : e.target.value)} 
               className="w-full bg-background border-2 border-primary/20 hover:border-primary/40 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer shadow-sm mb-3"
             >
               <option value="15days">{tStr("Every 15 Days")}</option>
               <option value="30days">{tStr("Every 30 Days")}</option>
               <option value="custom">{tStr("Custom")}</option>
             </select>
             
             {frequency.startsWith('custom') && (
               <div className="flex items-center gap-3 mb-3 animate-in fade-in slide-in-from-top-1 bg-white p-2 rounded-xl border border-primary/20">
                 <input 
                   type="number" 
                   min="1"
                   value={frequency.replace('custom-', '').replace('custom', '')} 
                   onChange={e => setFrequency(`custom-${e.target.value}`)} 
                   placeholder={tStr("E.g. 10")} 
                   className="w-full bg-transparent px-2 py-1 text-sm font-bold outline-none text-foreground placeholder:font-normal"
                 />
                 <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest shrink-0 pr-2">{tStr("Days")}</span>
               </div>
             )}
             
             <div className="flex items-start gap-2 text-xs font-medium text-muted-foreground bg-background/50 p-3 rounded-lg border border-primary/10">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>{tStr("By choosing recurring, you agree to auto-pay like other payment gateways. The amount will be auto-debited securely based on the selected period.")}</span>
             </div>
          </div>
        )}

        {frequency === 'pledge' && (
          <div className="mt-3 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-in fade-in slide-in-from-top-2">
             <label className="block text-xs font-bold uppercase tracking-widest text-amber-700 mb-1.5">{tStr("I promise to donate by:")}</label>
             <input 
               type="date"
               value={pledgeDate}
               onChange={e => setPledgeDate(e.target.value)}
               min={new Date().toISOString().split('T')[0]}
               className="w-full bg-white border-2 border-amber-200 hover:border-amber-300 rounded-xl px-3 py-2.5 text-sm font-semibold outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all cursor-pointer shadow-sm mb-3"
             />
             
             <div className="flex items-start gap-2 text-xs font-medium text-amber-800 bg-amber-100/50 p-3 rounded-lg border border-amber-200/50">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span>{tStr("No money will be deducted today. We will gently remind you when your pledge date approaches.")}</span>
             </div>
          </div>
        )}
      </div>

      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">{tStr("Select Cause")}</label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-5">
        {CAUSES.map(c => (
          <div 
            key={c.id} 
            onClick={() => setCause(c.id)}
            className={`flex flex-col items-center p-3 rounded-2xl border-2 cursor-pointer transition-all text-center ${cause === c.id ? 'border-saffron bg-saffron/5 shadow-md scale-[1.02]' : 'border-border/60 bg-background hover:border-saffron/30 hover:bg-secondary/10'}`}
          >
            <div className={`w-10 h-10 rounded-full ${c.bg} ${c.color} flex items-center justify-center mb-1.5 shadow-inner`}>
              <c.icon className="w-5 h-5" />
            </div>
            <div className="font-bold text-xs text-foreground leading-tight">{tStr(c.title)}</div>
          </div>
        ))}
      </div>

      <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5">{tStr("Select Amount")}</label>
      <div className="grid grid-cols-4 gap-2 mb-3">
        {[101, 501, 1001, 5001].map(amt => (
          <div 
            key={amt} 
            onClick={() => { setAmount(amt); setCustomAmount(""); }}
            className={`py-2 rounded-xl border-2 text-center cursor-pointer transition-all font-serif font-bold text-base flex items-center justify-center ${amount === amt && !customAmount ? 'border-primary bg-primary text-primary-foreground shadow-md scale-105' : 'border-border/60 bg-background text-foreground hover:border-primary/40 hover:bg-secondary/10'}`}
          >
            ₹{amt}
          </div>
        ))}
      </div>

      <div className="relative mb-5">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-serif text-muted-foreground font-medium">₹</span>
        <input 
          type="number" 
          value={customAmount} 
          onChange={e => { setCustomAmount(e.target.value); setAmount(0); }} 
          placeholder={tStr("Custom Amount")} 
          className="w-full bg-secondary/10 border-2 border-border/60 rounded-xl pl-9 pr-3 py-2.5 text-lg font-serif font-bold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm hover:border-border placeholder:font-sans placeholder:text-sm placeholder:font-normal" 
        />
      </div>

      <button onClick={onNext} disabled={!getActiveAmount() || (frequency.startsWith('custom-') && !frequency.split('-')[1]) || (frequency === 'pledge' && !pledgeDate)} className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-bold flex items-center justify-center transition-all hover:-translate-y-0.5 shadow-md shadow-primary/20 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]">
        {frequency === 'pledge' ? tStr("Confirm Pledge") : tStr("Proceed to Pay")} ₹{getActiveAmount().toLocaleString()} {frequency !== 'one-time' && frequency !== 'pledge' && <span className="ml-1 text-xs font-medium opacity-80 uppercase tracking-wider">/ {frequency === '15days' ? '15d' : frequency === '30days' ? '30d' : frequency.startsWith('custom-') ? `${frequency.split('-')[1]}d` : 'period'}</span>}
      </button>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">
        <ShieldCheck className="w-4 h-4 text-emerald-500" /> {tStr("100% Secure & Direct Transfer")}
      </div>
    </div>
  );
}
