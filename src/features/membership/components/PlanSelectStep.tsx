import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  MapPin,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Temple } from "@/data/temples";
import {
  MEMBERSHIP_PLANS,
  UNIVERSAL_PERKS,
  PLAN_COMPARISON,
  MEMBERSHIP_FAQ,
  currencyFor,
  priceFor,
  formatMoney,
  type MembershipPlan,
} from "../data";

export function PlanSelectStep({
  temple,
  selectedPlan,
  onSelectPlan,
  onNext,
  onBack,
}: {
  temple: Temple;
  selectedPlan: string | null;
  onSelectPlan: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { t } = useTranslation();
  const currency = currencyFor(temple.state);
  const active = MEMBERSHIP_PLANS.find((p) => p.id === selectedPlan);

  return (
    <div className="fade-in">
      {/* Chosen temple recap */}
      <div className="flex items-center gap-3 bg-card border border-border rounded-2xl p-3 mb-7 shadow-sm">
        <div
          className="w-12 h-12 rounded-xl shrink-0 bg-secondary/40"
          style={{
            background: temple.image
              ? `url(${temple.image}) center / cover no-repeat`
              : `linear-gradient(135deg, ${temple.gradientFrom}, ${temple.color})`,
          }}
        />
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {t("Supporting")}
          </div>
          <div className="font-bold text-sm text-foreground truncate">{t(temple.name)}</div>
          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" /> {t(temple.city)}, {t(temple.state)}
          </div>
        </div>
        <button
          onClick={onBack}
          className="shrink-0 text-xs font-bold text-primary hover:underline px-3 py-2 rounded-lg hover:bg-primary/5 transition-colors"
        >
          {t("Change")}
        </button>
      </div>

      <div className="text-center max-w-xl mx-auto mb-8">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {t("Choose your seva")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t(
            "Every plan carries an 80G tax exemption receipt and a digital membership card. Lifetime tiers never renew.",
          )}
        </p>
      </div>

      {/* Plans */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-8">
        {MEMBERSHIP_PLANS.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            currency={currency}
            active={selectedPlan === plan.id}
            onSelect={() => onSelectPlan(plan.id)}
          />
        ))}
      </div>

      {/* Universal perks */}
      <div className="bg-gradient-to-r from-primary/5 via-amber-500/5 to-primary/5 border border-primary/15 rounded-2xl p-4 lg:p-5 mb-10">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
            {t("Included in every plan")}
          </span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {UNIVERSAL_PERKS.map((perk) => (
            <div
              key={perk}
              className="flex gap-2 items-start text-xs font-medium text-foreground/80"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-px" />
              <span>{t(perk)}</span>
            </div>
          ))}
        </div>
      </div>

      <ComparisonTable
        currency={currency}
        selectedPlan={selectedPlan}
        onSelectPlan={onSelectPlan}
      />

      <Faq />

      {/* Sticky continue bar */}
      <div className="sticky bottom-16 lg:bottom-4 mt-8 z-30">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-lg p-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="shrink-0 w-11 h-11 rounded-xl bg-secondary/30 hover:bg-secondary/50 grid place-items-center text-foreground transition-colors"
            aria-label={t("Back")}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0">
            {active ? (
              <>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t(active.name)}
                </div>
                <div className="font-serif font-bold text-lg text-foreground leading-tight">
                  {formatMoney(priceFor(active, currency), currency)}
                  <span className="text-xs font-sans font-medium text-muted-foreground ml-1">
                    {active.cycle === "lifetime" ? t("one-time") : t("/ year")}
                  </span>
                </div>
              </>
            ) : (
              <div className="text-sm font-semibold text-muted-foreground pl-1">
                {t("Select a plan to continue")}
              </div>
            )}
          </div>
          <button
            onClick={onNext}
            disabled={!selectedPlan}
            className="rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-bold flex items-center gap-2 shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]"
          >
            {t("Continue")} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PlanCard({
  plan,
  currency,
  active,
  onSelect,
}: {
  plan: MembershipPlan;
  currency: string;
  active: boolean;
  onSelect: () => void;
}) {
  const { t } = useTranslation();
  const Icon = plan.icon;

  return (
    <button
      onClick={onSelect}
      className={`relative text-left bg-card border-2 rounded-3xl flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        active
          ? "border-primary shadow-xl ring-4 ring-primary/10"
          : plan.popular
            ? "border-primary/40 shadow-md"
            : "border-border/60 hover:border-primary/40"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md whitespace-nowrap">
          {t("Most Chosen")}
        </div>
      )}

      <div className={`p-5 lg:p-6 ${plan.popular ? "pt-7" : ""}`}>
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} text-white grid place-items-center mb-4 shadow-md`}
        >
          <Icon className="w-6 h-6" />
        </div>

        <h3 className="font-serif text-xl font-bold text-foreground leading-tight">
          {t(plan.name)}
        </h3>
        <div className="text-[11px] font-medium text-muted-foreground mb-3">
          {plan.sanskritName}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-4 min-h-[32px]">
          {t(plan.tagline)}
        </p>

        <div className="flex items-baseline gap-1 mb-1">
          <span className="font-serif text-3xl font-extrabold text-foreground">
            {formatMoney(priceFor(plan, currency), currency)}
          </span>
          {plan.cycle === "year" && (
            <span className="text-sm font-medium text-muted-foreground">/{t("year")}</span>
          )}
        </div>
        <div className="text-[11px] font-medium text-muted-foreground mb-5">{t(plan.note)}</div>

        <div className="space-y-2.5 border-t border-border/60 pt-4">
          {plan.benefits.map((benefit) => (
            <div key={benefit} className="flex gap-2 text-xs leading-relaxed">
              <CheckCircle2
                className="w-3.5 h-3.5 shrink-0 mt-0.5"
                style={{ color: plan.accent }}
              />
              <span className="text-foreground/80">{t(benefit)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 lg:p-6 pt-0 mt-auto">
        <div
          className={`w-full py-3 rounded-xl font-bold text-sm text-center transition-all ${
            active
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary/30 text-foreground hover:bg-secondary/50"
          }`}
        >
          {active ? t("Selected") : t("Select this plan")}
        </div>
      </div>
    </button>
  );
}

function ComparisonTable({
  currency,
  selectedPlan,
  onSelectPlan,
}: {
  currency: string;
  selectedPlan: string | null;
  onSelectPlan: (id: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="mb-10">
      <h3 className="font-serif text-xl font-bold text-foreground text-center mb-4">
        {t("Compare the tiers")}
      </h3>
      <div className="bg-card border border-border rounded-2xl overflow-x-auto shadow-sm">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                {t("Benefit")}
              </th>
              {MEMBERSHIP_PLANS.map((p) => (
                <th key={p.id} className="p-4 text-center">
                  <button
                    onClick={() => onSelectPlan(p.id)}
                    className={`font-bold text-xs leading-tight transition-colors ${
                      selectedPlan === p.id ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {t(p.name)}
                    <div className="font-serif text-sm font-extrabold mt-1">
                      {formatMoney(priceFor(p, currency), currency)}
                    </div>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PLAN_COMPARISON.map((row, i) => (
              <tr key={row.label} className={i % 2 ? "bg-secondary/10" : ""}>
                <td className="p-4 text-xs font-semibold text-foreground/80">{t(row.label)}</td>
                {MEMBERSHIP_PLANS.map((p) => (
                  <td
                    key={p.id}
                    className={`p-4 text-center text-xs font-bold ${
                      row.values[p.id] === "—" ? "text-muted-foreground/40" : "text-foreground"
                    } ${selectedPlan === p.id ? "bg-primary/5" : ""}`}
                  >
                    {t(row.values[p.id])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Faq() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <h3 className="font-serif text-xl font-bold text-foreground text-center mb-4">
        {t("Common questions")}
      </h3>
      <div className="space-y-2 max-w-3xl mx-auto">
        {MEMBERSHIP_FAQ.map((item, i) => (
          <div key={item.q} className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-secondary/10 transition-colors"
            >
              <span className="font-bold text-sm text-foreground">{t(item.q)}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-4 pb-4 text-xs leading-relaxed text-muted-foreground animate-in fade-in slide-in-from-top-1">
                {t(item.a)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
