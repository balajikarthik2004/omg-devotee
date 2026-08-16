import { ArrowRight, ArrowLeft, User, Mail, Phone, Star, FileText, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Temple } from "@/data/temples";
import { currencyFor, priceFor, formatMoney, type MembershipPlan } from "../data";

export interface DevoteeDetails {
  name: string;
  email: string;
  phone: string;
  nakshatra: string;
  gothram: string;
  pan: string;
  address: string;
}

const NAKSHATRAS = [
  "Ashwini",
  "Bharani",
  "Krittika",
  "Rohini",
  "Mrigashira",
  "Ardra",
  "Punarvasu",
  "Pushya",
  "Ashlesha",
  "Magha",
  "Purva Phalguni",
  "Uttara Phalguni",
  "Hasta",
  "Chitra",
  "Swati",
  "Vishakha",
  "Anuradha",
  "Jyeshtha",
  "Mula",
  "Purva Ashadha",
  "Uttara Ashadha",
  "Shravana",
  "Dhanishta",
  "Shatabhisha",
  "Purva Bhadrapada",
  "Uttara Bhadrapada",
  "Revati",
];

export const EMPTY_DEVOTEE: DevoteeDetails = {
  name: "",
  email: "",
  phone: "",
  nakshatra: "",
  gothram: "",
  pan: "",
  address: "",
};

export function isDevoteeValid(d: DevoteeDetails, currency: string) {
  const phoneDigits = d.phone.replace(/\D/g, "");
  return (
    d.name.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email.trim()) &&
    (currency === "USD" ? phoneDigits.length >= 10 : phoneDigits.length === 10) &&
    d.address.trim().length >= 10 &&
    (d.pan.trim() === "" || /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(d.pan.trim().toUpperCase()))
  );
}

export function DevoteeDetailsStep({
  temple,
  plan,
  details,
  setDetails,
  onNext,
  onBack,
}: {
  temple: Temple;
  plan: MembershipPlan;
  details: DevoteeDetails;
  setDetails: (d: DevoteeDetails) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const { t } = useTranslation();
  const currency = currencyFor(temple.state);
  const amount = priceFor(plan, currency);
  const valid = isDevoteeValid(details, currency);

  const set = (key: keyof DevoteeDetails) => (value: string) =>
    setDetails({ ...details, [key]: value });

  const phoneDigits = details.phone.replace(/\D/g, "");
  const panError =
    details.pan.trim() !== "" && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(details.pan.trim().toUpperCase());

  return (
    <div className="fade-in max-w-3xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-7">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {t("Devotee details")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t(
            "We print these on your membership card and 80G receipt. Your nakshatra and gothram are used when the archana is performed in your name.",
          )}
        </p>
      </div>

      {/* Order summary */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-6 shadow-sm flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-xl shrink-0"
          style={{
            background: temple.image
              ? `url(${temple.image}) center / cover no-repeat`
              : `linear-gradient(135deg, ${temple.gradientFrom}, ${temple.color})`,
          }}
        />
        <div className="min-w-0 flex-1">
          <div className="font-bold text-sm text-foreground truncate">{t(temple.name)}</div>
          <div className="text-xs text-muted-foreground">
            {t(plan.name)} · {plan.cycle === "lifetime" ? t("One-time") : t("Annual")}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-serif text-xl font-extrabold text-foreground">
            {formatMoney(amount, currency)}
          </div>
          <button onClick={onBack} className="text-[11px] font-bold text-primary hover:underline">
            {t("Change plan")}
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 lg:p-6 shadow-sm space-y-5">
        <Field
          label="Full name (as it should appear on the card)"
          icon={User}
          required
          value={details.name}
          onChange={set("name")}
          placeholder={t("e.g. Ramesh Subramanian")}
          error={
            details.name.length > 0 && details.name.trim().length < 3
              ? t("Please enter your full name")
              : ""
          }
        />

        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="E-mail"
            icon={Mail}
            required
            type="email"
            value={details.email}
            onChange={set("email")}
            placeholder="devotee@example.com"
            hint={t("Receipt & card are sent here")}
            error={
              details.email.length > 0 &&
              !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(details.email.trim())
                ? t("Enter a valid e-mail address")
                : ""
            }
          />
          <Field
            label="Mobile number"
            icon={Phone}
            required
            type="tel"
            inputMode="numeric"
            prefix={currency === "USD" ? "+1" : "+91"}
            value={details.phone}
            onChange={(v) =>
              set("phone")(v.replace(/\D/g, "").slice(0, currency === "USD" ? 11 : 10))
            }
            placeholder={currency === "USD" ? "5551234567" : "9876543210"}
            hint={t("Used for the payment OTP")}
            error={
              phoneDigits.length > 0 && phoneDigits.length < 10
                ? t("Enter a valid 10-digit mobile number")
                : ""
            }
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <FieldLabel
              label="Birth star (Nakshatra)"
              icon={Star}
              hint={t("For your annual archana")}
            />
            <select
              value={details.nakshatra}
              onChange={(e) => set("nakshatra")(e.target.value)}
              className="w-full bg-secondary/15 border-2 border-border/60 rounded-xl px-3.5 py-3 text-sm font-semibold outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer"
            >
              <option value="">{t("Select your nakshatra")}</option>
              {NAKSHATRAS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Gothram"
            icon={Star}
            value={details.gothram}
            onChange={set("gothram")}
            placeholder={t("e.g. Bharadwaja")}
            hint={t("Optional — recited during archana")}
          />
        </div>

        <Field
          label="Postal address"
          icon={FileText}
          required
          multiline
          value={details.address}
          onChange={set("address")}
          placeholder={t("Door no, street, city, state, PIN code")}
          hint={t("Where the printed membership card and prasadam are couriered")}
          error={
            details.address.length > 0 && details.address.trim().length < 10
              ? t("Please enter a complete postal address")
              : ""
          }
        />

        <Field
          label="PAN (for 80G tax exemption)"
          icon={FileText}
          value={details.pan}
          onChange={(v) => set("pan")(v.toUpperCase().slice(0, 10))}
          placeholder="ABCDE1234F"
          hint={t("Optional, but required to claim the deduction")}
          error={panError ? t("PAN must be in the format ABCDE1234F") : ""}
        />

        <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
          <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs font-medium text-emerald-800 leading-relaxed">
            {t(
              "Your details are shared only with the temple trust and the payment gateway. Card details are never stored on our servers.",
            )}
          </p>
        </div>
      </div>

      <div className="sticky bottom-16 lg:bottom-4 mt-6 z-30">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-lg p-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="shrink-0 w-11 h-11 rounded-xl bg-secondary/30 hover:bg-secondary/50 grid place-items-center text-foreground transition-colors"
            aria-label={t("Back")}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0 pl-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              {t("Total payable")}
            </div>
            <div className="font-serif font-bold text-lg text-foreground leading-tight">
              {formatMoney(amount, currency)}
            </div>
          </div>
          <button
            onClick={onNext}
            disabled={!valid}
            className="rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-bold flex items-center gap-2 shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]"
          >
            {t("Proceed to Pay")} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function FieldLabel({
  label,
  icon: Icon,
  required,
  hint,
}: {
  label: string;
  icon: any;
  required?: boolean;
  hint?: string;
}) {
  const { t } = useTranslation();
  return (
    <label className="flex items-baseline justify-between gap-2 mb-1.5">
      <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
        <Icon className="w-3.5 h-3.5 text-primary" />
        {t(label)}
        {required && <span className="text-primary">*</span>}
      </span>
      {hint && (
        <span className="text-[10px] font-medium text-muted-foreground/70 text-right">{hint}</span>
      )}
    </label>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  placeholder,
  hint,
  error,
  required,
  type = "text",
  inputMode,
  prefix,
  multiline,
}: {
  label: string;
  icon: any;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  hint?: string;
  error?: string;
  required?: boolean;
  type?: string;
  inputMode?: "numeric" | "text";
  prefix?: string;
  multiline?: boolean;
}) {
  const base = `w-full bg-secondary/15 border-2 rounded-xl px-3.5 py-3 text-sm font-semibold outline-none transition-all placeholder:font-normal placeholder:text-muted-foreground ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
      : "border-border/60 focus:border-primary focus:ring-4 focus:ring-primary/10"
  }`;

  return (
    <div>
      <FieldLabel label={label} icon={icon} required={required} hint={hint} />
      {multiline ? (
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${base} resize-none`}
        />
      ) : prefix ? (
        <div
          className={`flex items-stretch rounded-xl border-2 overflow-hidden transition-all ${error ? "border-red-400" : "border-border/60 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10"}`}
        >
          <span className="grid place-items-center px-3 bg-secondary/30 text-sm font-bold text-muted-foreground border-r border-border/60">
            {prefix}
          </span>
          <input
            type={type}
            inputMode={inputMode}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-secondary/15 px-3.5 py-3 text-sm font-semibold outline-none placeholder:font-normal placeholder:text-muted-foreground"
          />
        </div>
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={base}
        />
      )}
      {error && <p className="mt-1.5 text-[11px] font-semibold text-red-600">{error}</p>}
    </div>
  );
}
