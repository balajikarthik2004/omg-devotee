import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { temples } from "@/data/temples";
import { useTranslation } from "react-i18next";
import { DonationForm } from "@/features/donations/components/DonationForm";
import { PaymentProcessor } from "@/features/donations/components/PaymentProcessor";
import { DonationReceipt } from "@/features/donations/components/DonationReceipt";

export const Route = createFileRoute("/_app/donations")({
  head: () => ({ meta: [{ title: "Donations — OMG Smart Temple" }] }),
  component: DonationsPage,
});

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
        {step === 1 && (
          <DonationForm 
            temple={temple} setTemple={setTemple}
            cause={cause} setCause={setCause}
            amount={amount} setAmount={setAmount}
            customAmount={customAmount} setCustomAmount={setCustomAmount}
            onNext={() => setStep(2)} getActiveAmount={getActiveAmount}
          />
        )}

        {step === 2 && (
          <PaymentProcessor 
            templeObj={t} cause={cause} 
            paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
            isProcessing={isProcessing} onPay={handlePay} 
            onCancel={() => setStep(1)} getActiveAmount={getActiveAmount}
          />
        )}

        {step === 3 && (
          <DonationReceipt 
            templeObj={t} cause={cause} paymentMethod={paymentMethod}
            getActiveAmount={getActiveAmount} onReset={() => { setStep(1); setAmount(501); setCustomAmount(""); }}
          />
        )}
      </div>
    </div>
  );
}
