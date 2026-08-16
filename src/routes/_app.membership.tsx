import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import { temples } from "@/data/temples";
import { MEMBERSHIP_PLANS, currencyFor, priceFor } from "@/features/membership/data";
import { MembershipStepper } from "@/features/membership/components/MembershipStepper";
import { TempleSelectStep } from "@/features/membership/components/TempleSelectStep";
import { PlanSelectStep } from "@/features/membership/components/PlanSelectStep";
import {
  DevoteeDetailsStep,
  EMPTY_DEVOTEE,
  type DevoteeDetails,
} from "@/features/membership/components/DevoteeDetailsStep";
import {
  RazorpayCheckout,
  type PaymentResult,
} from "@/features/membership/components/RazorpayCheckout";
import { MembershipSuccess } from "@/features/membership/components/MembershipSuccess";

export const Route = createFileRoute("/_app/membership")({
  head: () => ({ meta: [{ title: "Membership — OMG Smart Temple" }] }),
  component: MembershipPage,
});

function MembershipPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [templeSlug, setTempleSlug] = useState<string | null>(null);
  const [planId, setPlanId] = useState<string | null>(null);
  const [devotee, setDevotee] = useState<DevoteeDetails>(EMPTY_DEVOTEE);
  const [gatewayOpen, setGatewayOpen] = useState(false);
  const [payment, setPayment] = useState<PaymentResult | null>(null);

  const temple = temples.find((x) => x.slug === templeSlug) ?? null;
  const plan = MEMBERSHIP_PLANS.find((p) => p.id === planId) ?? null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, payment]);

  const reset = () => {
    setStep(1);
    setTempleSlug(null);
    setPlanId(null);
    setDevotee(EMPTY_DEVOTEE);
    setPayment(null);
  };

  const handleSuccess = (result: PaymentResult) => {
    setGatewayOpen(false);
    setPayment(result);
  };

  const currency = temple ? currencyFor(temple.state) : "INR";
  const amount = plan ? priceFor(plan, currency) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 pb-28">
      {!payment && (
        <>
          <div className="text-center max-w-2xl mx-auto mb-7">
            <div className="inline-flex items-center gap-2 text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
              <Shield className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {t("Support Your Temple")}
              </span>
            </div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-3">
              {t("Become a Member")}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(
                "Temple memberships fund daily poojas, annadhanam, gopuram upkeep and the cultural schools. Choose a temple, pick a seva that suits you, and your contribution reaches that temple's trust directly.",
              )}
            </p>
          </div>

          <MembershipStepper current={step} onJump={setStep} />
        </>
      )}

      {payment && temple && plan ? (
        <MembershipSuccess
          temple={temple}
          plan={plan}
          devotee={devotee}
          payment={payment}
          onReset={reset}
        />
      ) : (
        <>
          {step === 1 && (
            <TempleSelectStep
              selected={templeSlug}
              onSelect={setTempleSlug}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && temple && (
            <PlanSelectStep
              temple={temple}
              selectedPlan={planId}
              onSelectPlan={setPlanId}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && temple && plan && (
            <DevoteeDetailsStep
              temple={temple}
              plan={plan}
              details={devotee}
              setDetails={setDevotee}
              onNext={() => {
                setStep(4);
                setGatewayOpen(true);
              }}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && temple && plan && !gatewayOpen && (
            <ResumeCheckout onResume={() => setGatewayOpen(true)} onBack={() => setStep(3)} />
          )}
        </>
      )}

      {temple && plan && (
        <RazorpayCheckout
          open={gatewayOpen}
          amount={amount}
          currency={currency}
          merchant="OMG Smart Temple Trust"
          description={`${t(plan.name)} · ${t(temple.name)}`}
          contactEmail={devotee.email || "devotee@example.com"}
          contactPhone={`${currency === "USD" ? "+1" : "+91"} ${devotee.phone || "9876543210"}`}
          allowEmi={currency === "INR" && amount >= 3000}
          onClose={() => setGatewayOpen(false)}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
}

function ResumeCheckout({ onResume, onBack }: { onResume: () => void; onBack: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="fade-in max-w-md mx-auto text-center bg-card border border-border rounded-2xl p-8 shadow-sm">
      <h3 className="font-serif text-xl font-bold text-foreground mb-2">
        {t("Payment not completed")}
      </h3>
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {t(
          "You closed the payment window before the transaction finished. No money was debited — you can pick up right where you left off.",
        )}
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-xl border-2 border-border/60 text-sm font-bold text-foreground hover:bg-secondary/10 transition-colors"
        >
          {t("Edit details")}
        </button>
        <button
          onClick={onResume}
          className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all"
        >
          {t("Retry payment")}
        </button>
      </div>
    </div>
  );
}
