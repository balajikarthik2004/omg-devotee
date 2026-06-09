import { useTranslation } from "react-i18next";
import { CreditCard, Loader2, QrCode, Wallet } from "lucide-react";
import { CAUSES } from "../constants";

export function PaymentProcessor({
  templeObj, cause, paymentMethod, setPaymentMethod, isProcessing, onPay, onCancel, getActiveAmount
}: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="fade-in">
      <div className="bg-secondary/40 border-b border-border p-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">{tStr("Amount to Pay")}</div>
          <div className="font-serif text-3xl font-semibold text-foreground">₹{getActiveAmount().toLocaleString()}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-foreground">{tStr(templeObj.name)}</div>
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
          <button onClick={onCancel} className="px-6 py-4 rounded-full bg-secondary text-white text-base font-medium transition-colors hover:bg-secondary/80">
            {tStr("Cancel")}
          </button>
          <button onClick={onPay} disabled={isProcessing} className="flex-1 rounded-full gradient-saffron text-white py-4 text-base font-medium flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 shadow-md disabled:opacity-70 disabled:pointer-events-none">
            {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : `${tStr("Pay")} ₹${getActiveAmount().toLocaleString()}`}
          </button>
        </div>
      </div>
    </div>
  );
}
