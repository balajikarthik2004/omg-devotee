import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HeartHandshake, CheckCircle2, Gift, Banknote, ShieldCheck, Download, Loader2, CreditCard, Wallet, QrCode } from "lucide-react";
import { temples } from "@/data/temples";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_app/donations")({
  head: () => ({ meta: [{ title: "Donations — OMG Smart Temple" }] }),
  component: DonationsPage,
});

const CAUSES = [
  { id: "general", title: "General Hundi", desc: "Temple maintenance", icon: Banknote, color: "text-amber-600", bg: "bg-amber-50" },
  { id: "annadhanam", title: "Annadhanam", desc: "Free meals for devotees", icon: Gift, color: "text-emerald-600", bg: "bg-emerald-50" },
  { id: "gho", title: "Gho Samrakshana", desc: "Care for temple cows", icon: HeartHandshake, color: "text-rose-600", bg: "bg-rose-50" },
];

function DonationsPage() {
  const { t: tStr } = useTranslation();
  const [temple, setTemple] = useState(temples[0].slug);
  const [step, setStep] = useState(1);
  const [cause, setCause] = useState("general");
  const [amount, setAmount] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  
  const [isProcessing, setIsProcessing] = useState(false);

  const t = temples.find(x => x.slug === temple)!;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2500);
  };

  const getActiveAmount = () => customAmount ? parseInt(customAmount) || 0 : amount;

  return (
    <div className="max-w-xl mx-auto px-4 lg:px-8 py-8 pb-24">
      <div className="flex items-center gap-2 text-saffron mb-2 justify-center">
        <HeartHandshake className="w-5 h-5" />
        <span className="text-sm font-medium tracking-wide uppercase">{tStr("Secure Temple Donations")}</span>
      </div>
      <h1 className="font-serif text-3xl font-semibold text-center mb-8">{tStr("Make an Offering")}</h1>

      <div className="bg-card border border-border rounded-3xl shadow-sm relative overflow-hidden">
        {/* STEP 1: CAUSE & AMOUNT */}
        {step === 1 && (
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

            <button onClick={() => setStep(2)} disabled={!getActiveAmount()} className="w-full rounded-full gradient-saffron text-white py-4 text-base font-medium flex items-center justify-center transition-transform hover:-translate-y-0.5 shadow-md disabled:opacity-50 disabled:pointer-events-none">
              {tStr("Proceed to Pay")} ₹{getActiveAmount().toLocaleString()}
            </button>
            <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground mt-4 uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              {tStr("100% Secure & Direct Transfer")}
            </div>
          </div>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 2 && (
          <div className="fade-in">
            <div className="bg-secondary/40 border-b border-border p-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{tStr("Amount to Pay")}</div>
                <div className="font-serif text-3xl font-semibold text-foreground">₹{getActiveAmount().toLocaleString()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">{tStr(t.name)}</div>
                <div className="text-xs text-muted-foreground">{tStr(CAUSES.find(c => c.id === cause)?.title)}</div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">{tStr("Payment Method")}</h2>
              
              <div className="space-y-3 mb-8">
                <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-saffron bg-saffron/5' : 'border-border hover:border-saffron/30'}`}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-4 h-4 text-saffron focus:ring-saffron" />
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><QrCode className="w-5 h-5"/></div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{tStr("UPI")}</div>
                    <div className="text-xs text-muted-foreground">{tStr("Google Pay, PhonePe, Paytm")}</div>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-saffron bg-saffron/5' : 'border-border hover:border-saffron/30'}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-saffron focus:ring-saffron" />
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><CreditCard className="w-5 h-5"/></div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{tStr("Credit / Debit Card")}</div>
                    <div className="text-xs text-muted-foreground">{tStr("Visa, MasterCard, RuPay")}</div>
                  </div>
                </label>

                <label className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-saffron bg-saffron/5' : 'border-border hover:border-saffron/30'}`}>
                  <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="w-4 h-4 text-saffron focus:ring-saffron" />
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Wallet className="w-5 h-5"/></div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{tStr("Net Banking")}</div>
                    <div className="text-xs text-muted-foreground">{tStr("All major Indian banks")}</div>
                  </div>
                </label>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-4 rounded-full bg-secondary text-foreground text-base font-medium transition-colors hover:bg-secondary/80">
                  {tStr("Cancel")}
                </button>
                <button onClick={handlePay} disabled={isProcessing} className="flex-1 rounded-full gradient-saffron text-white py-4 text-base font-medium flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 shadow-md disabled:opacity-70 disabled:pointer-events-none">
                  {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : `${tStr("Pay")} ₹${getActiveAmount().toLocaleString()}`}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS */}
        {step === 3 && (
          <div className="fade-in text-center p-8 py-12">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-1 text-foreground">{tStr("Payment Successful")}</h2>
            <div className="text-saffron font-medium mb-6">{tStr("May the Divine bless you! 🙏")}</div>
            
            <div className="bg-secondary/40 rounded-2xl p-5 mb-8 text-left border border-border/50">
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 text-center border-b border-border/50 pb-3">{tStr("E-Receipt Details")}</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Amount:")}</span> <span className="font-bold text-foreground">₹{getActiveAmount().toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Temple:")}</span> <span className="font-medium text-right">{tStr(t.name)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Cause:")}</span> <span className="font-medium text-right">{tStr(CAUSES.find(c => c.id === cause)?.title)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Method:")}</span> <span className="font-medium text-right uppercase">{paymentMethod}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">{tStr("Transaction ID:")}</span> <span className="font-mono text-xs">TXN{Math.floor(Math.random()*100000000)}</span></div>
              </div>
            </div>

            <button className="w-full mb-3 rounded-full bg-white border border-border py-3.5 text-sm font-medium flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 shadow-sm">
              <Download className="w-4 h-4" /> {tStr("Download 80G Receipt")}
            </button>
            <button onClick={() => { setStep(1); setAmount(501); setCustomAmount(""); }} className="w-full rounded-full bg-secondary text-foreground py-3.5 text-sm font-medium hover:bg-secondary/80 transition-colors">
              {tStr("Make Another Donation")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
