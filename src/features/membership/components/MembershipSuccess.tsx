import QRCode from "react-qr-code";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Download, Printer, Home, Sparkles, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Temple } from "@/data/temples";
import { currencyFor, priceFor, formatMoney, type MembershipPlan } from "../data";
import type { DevoteeDetails } from "./DevoteeDetailsStep";
import type { PaymentResult } from "./RazorpayCheckout";

export function MembershipSuccess({
  temple,
  plan,
  devotee,
  payment,
  onReset,
}: {
  temple: Temple;
  plan: MembershipPlan;
  devotee: DevoteeDetails;
  payment: PaymentResult;
  onReset: () => void;
}) {
  const { t } = useTranslation();
  const currency = currencyFor(temple.state);
  const amount = priceFor(plan, currency);
  const Icon = plan.icon;

  const issued = new Date();
  const expiry = new Date(issued);
  expiry.setFullYear(expiry.getFullYear() + 1);

  const memberId = `OMG-${plan.id.slice(0, 3).toUpperCase()}-${payment.paymentId.slice(-6).toUpperCase()}`;
  const validity =
    plan.cycle === "lifetime"
      ? t("Lifetime")
      : expiry.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="fade-in max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-full bg-emerald-50 border-4 border-emerald-100 grid place-items-center mx-auto mb-5">
          <CheckCircle2 className="w-11 h-11 text-emerald-500" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
          {t("Welcome, Sevak 🙏")}
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
          {t("Your membership at")}{" "}
          <span className="font-bold text-foreground">{t(temple.name)}</span>{" "}
          {t("is active. The 80G receipt and membership card have been e-mailed to")}{" "}
          <span className="font-bold text-foreground">{devotee.email}</span>.
        </p>
      </div>

      {/* Digital membership card */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-xl mb-6 print:shadow-none"
        style={{ background: "linear-gradient(135deg, #131a72 0%, #1e2680 55%, #e32c26 100%)" }}
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 text-white">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1">
                {t("OMG Smart Temple")}
              </div>
              <div className="font-serif text-xl font-bold leading-tight">{t(plan.name)}</div>
              <div className="text-[11px] text-white/60 mt-0.5">{plan.sanskritName}</div>
            </div>
            <div
              className={`w-11 h-11 rounded-xl bg-gradient-to-br ${plan.gradient} grid place-items-center shadow-lg shrink-0`}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="flex items-end justify-between gap-5">
            <div className="min-w-0 flex-1 space-y-3">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                  {t("Member")}
                </div>
                <div className="font-bold text-base truncate">{devotee.name}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                    {t("Member ID")}
                  </div>
                  <div className="font-mono text-xs font-bold">{memberId}</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                    {t("Valid Till")}
                  </div>
                  <div className="text-xs font-bold">{validity}</div>
                </div>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/45">
                  {t("Temple")}
                </div>
                <div className="text-xs font-bold truncate">{t(temple.name)}</div>
              </div>
            </div>

            <div className="shrink-0 bg-white p-2 rounded-xl">
              <QRCode
                value={`OMG-MEMBER|${memberId}|${temple.slug}|${plan.id}`}
                size={76}
                bgColor="#FFFFFF"
                fgColor="#131a72"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Receipt */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-6">
        <div className="px-5 py-3.5 border-b border-border bg-secondary/10 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {t("Payment Receipt")}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            {t("Paid")}
          </span>
        </div>
        <dl className="divide-y divide-border/60">
          <Row label="Payment ID" value={payment.paymentId} mono />
          <Row label="Order ID" value={payment.orderId} mono />
          <Row label="Method" value={`${payment.method} · ${payment.instrument}`} />
          {payment.emiTenure && (
            <Row label="Instalments" value={`${payment.emiTenure} ${t("monthly instalments")}`} />
          )}
          <Row
            label="Date"
            value={issued.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
          />
          <Row label="Beneficiary" value={`${t(temple.name)}, ${t(temple.city)}`} />
          {devotee.nakshatra && <Row label="Nakshatra" value={devotee.nakshatra} />}
          {devotee.gothram && <Row label="Gothram" value={devotee.gothram} />}
          {devotee.pan && <Row label="PAN (for 80G)" value={devotee.pan.toUpperCase()} mono />}
          <div className="px-5 py-4 flex items-center justify-between bg-primary/5">
            <dt className="text-sm font-bold text-foreground">{t("Amount Paid")}</dt>
            <dd className="font-serif text-xl font-extrabold text-foreground">
              {formatMoney(amount, currency)}
            </dd>
          </div>
        </dl>
      </div>

      {/* What happens next */}
      <div className="bg-gradient-to-r from-primary/5 via-amber-500/5 to-primary/5 border border-primary/15 rounded-2xl p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
            {t("What happens next")}
          </span>
        </div>
        <ol className="space-y-2.5">
          {[
            "Your 80G receipt is already in your inbox — keep it for your tax filing.",
            "The printed membership card reaches your address in 7–10 working days.",
            "Show the QR code above at the members' counter for priority darshan.",
            devotee.nakshatra
              ? `Your archana on ${devotee.nakshatra} nakshatra is scheduled — we will remind you a week before.`
              : "Add your nakshatra in your profile so we can schedule your annual archana.",
          ].map((line, i) => (
            <li key={i} className="flex gap-3 text-xs text-foreground/80 leading-relaxed">
              <span className="w-5 h-5 shrink-0 rounded-full bg-primary/10 text-primary grid place-items-center text-[10px] font-bold">
                {i + 1}
              </span>
              <span>{t(line)}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Actions */}
      <div className="grid sm:grid-cols-3 gap-3 print:hidden">
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-border/60 bg-card text-sm font-bold text-foreground hover:border-primary/40 hover:bg-secondary/10 transition-all"
        >
          <Printer className="w-4 h-4" /> {t("Print")}
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-border/60 bg-card text-sm font-bold text-foreground hover:border-primary/40 hover:bg-secondary/10 transition-all"
        >
          <Download className="w-4 h-4" /> {t("Save Receipt")}
        </button>
        <Link
          to="/"
          className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-md shadow-primary/20 hover:-translate-y-0.5 transition-all"
        >
          <Home className="w-4 h-4" /> {t("Go to Dashboard")}
        </Link>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4 text-xs print:hidden">
        <button onClick={onReset} className="font-bold text-primary hover:underline">
          {t("Add another membership")}
        </button>
        <span className="text-border">|</span>
        <span className="flex items-center gap-1.5 text-muted-foreground font-medium">
          <Mail className="w-3.5 h-3.5" /> {t("Receipt sent to")} {devotee.email}
        </span>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  const { t } = useTranslation();
  return (
    <div className="px-5 py-3 flex items-center justify-between gap-4">
      <dt className="text-xs font-semibold text-muted-foreground shrink-0">{t(label)}</dt>
      <dd
        className={`text-xs font-bold text-foreground text-right truncate ${mono ? "font-mono" : ""}`}
      >
        {value}
      </dd>
    </div>
  );
}
