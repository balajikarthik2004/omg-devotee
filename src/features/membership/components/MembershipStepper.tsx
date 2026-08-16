import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const STEPS = ["Choose Temple", "Choose Plan", "Your Details", "Payment"];

export function MembershipStepper({
  current,
  onJump,
}: {
  current: number;
  onJump: (step: number) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 select-none">
      {STEPS.map((label, i) => {
        const step = i + 1;
        const done = step < current;
        const active = step === current;
        return (
          <div key={label} className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              disabled={!done}
              onClick={() => done && onJump(step)}
              className={`flex items-center gap-2 rounded-full pl-1.5 pr-2 sm:pr-3.5 py-1.5 transition-all ${
                done
                  ? "text-primary hover:bg-primary/10 cursor-pointer"
                  : active
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "text-muted-foreground/70 cursor-default"
              }`}
            >
              <span
                className={`w-6 h-6 shrink-0 rounded-full grid place-items-center text-[11px] font-bold ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                      ? "bg-white/25 text-white"
                      : "bg-secondary/40 text-muted-foreground"
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" strokeWidth={3} /> : step}
              </span>
              <span
                className={`text-xs font-bold tracking-wide whitespace-nowrap ${active ? "" : "hidden sm:inline"}`}
              >
                {t(label)}
              </span>
            </button>
            {step < STEPS.length && (
              <span
                className={`h-0.5 w-3 sm:w-8 rounded-full transition-colors ${done ? "bg-primary" : "bg-border"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
