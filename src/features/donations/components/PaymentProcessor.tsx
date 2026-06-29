import { useTranslation } from "react-i18next";
import { CreditCard, Loader2, QrCode, Wallet, RefreshCw } from "lucide-react";
import { CAUSES } from "../constants";

export function PaymentProcessor({
  templeObj, cause, frequency, paymentMethod, setPaymentMethod, isProcessing, onPay, onCancel, getActiveAmount
}: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="fade-in bg-card rounded-2xl shadow-sm overflow-hidden border border-border/50">
      <div className="bg-primary/5 border-b border-border p-5 md:p-6 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{tStr("Amount to Pay")}</div>
          <div className="font-serif text-3xl font-bold text-foreground flex items-baseline gap-1">
            ₹{getActiveAmount().toLocaleString()}
            {frequency !== 'one-time' && (
              <span className="text-xs font-sans font-medium text-muted-foreground flex items-center gap-1 bg-background px-2 py-0.5 rounded-full border border-border/50">
                <RefreshCw className="w-3 h-3" /> / {frequency === 'monthly' ? 'mo' : 'yr'}
              </span>
            )}
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="text-sm font-bold text-foreground mb-1">{tStr(templeObj.name)}</div>
          <div className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">{tStr(CAUSES.find((c: any) => c.id === cause)?.title)}</div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <h2 className="font-bold text-[10px] uppercase tracking-widest text-muted-foreground mb-3">{tStr("Select Payment Method")}</h2>
        
        <div className="space-y-2.5 mb-6">
          <label className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border/60 hover:border-border hover:bg-secondary/10'}`}>
            <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="w-4 h-4 text-primary focus:ring-primary accent-primary" />
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner"><QrCode className="w-5 h-5"/></div>
            <div className="flex-1">
              <div className="font-bold text-sm text-foreground">{tStr("UPI / QR")}</div>
              <div className="text-[10px] font-medium text-muted-foreground mt-0.5">{tStr("Google Pay, PhonePe, Paytm")}</div>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border/60 hover:border-border hover:bg-secondary/10'}`}>
            <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-primary focus:ring-primary accent-primary" />
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner"><CreditCard className="w-5 h-5"/></div>
            <div className="flex-1">
              <div className="font-bold text-sm text-foreground">{tStr("Credit / Debit Card")}</div>
              <div className="text-[10px] font-medium text-muted-foreground mt-0.5">{tStr("Visa, MasterCard, RuPay")}</div>
            </div>
          </label>

          <label className={`flex items-center gap-3 p-3 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-primary bg-primary/5 shadow-sm' : 'border-border/60 hover:border-border hover:bg-secondary/10'}`}>
            <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="w-4 h-4 text-primary focus:ring-primary accent-primary" />
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shadow-inner"><Wallet className="w-5 h-5"/></div>
            <div className="flex-1">
              <div className="font-bold text-sm text-foreground">{tStr("Net Banking")}</div>
              <div className="text-[10px] font-medium text-muted-foreground mt-0.5">{tStr("All major Indian banks")}</div>
            </div>
          </label>
        </div>

        <div className="flex gap-2">
          <button onClick={onCancel} className="px-5 py-3 rounded-full bg-secondary/80 hover:bg-secondary text-foreground text-sm font-semibold transition-colors shadow-sm">
            {tStr("Back")}
          </button>
          <button onClick={onPay} disabled={isProcessing} className="flex-1 rounded-full bg-primary text-primary-foreground py-3 text-base font-bold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-md shadow-primary/20 disabled:opacity-70 disabled:pointer-events-none active:scale-[0.98]">
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : `${frequency === 'one-time' ? tStr("Pay") : tStr("Subscribe")} ₹${getActiveAmount().toLocaleString()}`}
          </button>
        </div>
        {frequency !== 'one-time' && (
           <p className="text-center text-[10px] font-medium text-muted-foreground mt-3 leading-tight">
             You will be charged ₹{getActiveAmount().toLocaleString()} automatically every {frequency === 'monthly' ? 'month' : 'year'}. You can cancel anytime.
           </p>
        )}
      </div>
    </div>
  );
}
