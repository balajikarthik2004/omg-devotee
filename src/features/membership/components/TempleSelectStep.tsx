import { useMemo, useState } from "react";
import { Search, MapPin, Check, ArrowRight, Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import { temples, type Temple } from "@/data/temples";
import { currencyFor } from "../data";

export function TempleSelectStep({
  selected,
  onSelect,
  onNext,
}: {
  selected: string | null;
  onSelect: (slug: string) => void;
  onNext: () => void;
}) {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All");

  const states = useMemo(() => ["All", ...Array.from(new Set(temples.map((x) => x.state)))], []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return temples.filter((x) => {
      if (state !== "All" && x.state !== state) return false;
      if (!q) return true;
      return (
        x.name.toLowerCase().includes(q) ||
        x.city.toLowerCase().includes(q) ||
        x.deity.toLowerCase().includes(q) ||
        x.district.toLowerCase().includes(q)
      );
    });
  }, [query, state]);

  const selectedTemple = temples.find((x) => x.slug === selected);

  return (
    <div className="fade-in">
      <div className="text-center max-w-xl mx-auto mb-7">
        <h2 className="font-serif text-2xl lg:text-3xl font-bold text-foreground mb-2">
          {t("Which temple would you like to serve?")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t(
            "Your membership fee goes directly to the temple you choose here. Benefits like archana, prasadam and priority darshan apply at this temple.",
          )}
        </p>
      </div>

      {/* Search + state filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("Search by temple, deity or city…")}
            className="w-full bg-card border-2 border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm placeholder:font-normal placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
        {states.map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-all ${
              state === s
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {t(s === "All" ? "All States" : s)}
          </button>
        ))}
      </div>

      {/* Temple grid */}
      {results.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-border rounded-3xl">
          <Landmark className="w-10 h-10 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-sm font-semibold text-muted-foreground">
            {t("No temple matches your search.")}
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((temple) => (
            <TempleOption
              key={temple.slug}
              temple={temple}
              active={selected === temple.slug}
              onSelect={() => onSelect(temple.slug)}
            />
          ))}
        </div>
      )}

      {/* Sticky continue bar */}
      <div className="sticky bottom-16 lg:bottom-4 mt-6 z-30">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-lg p-3 flex items-center gap-3">
          <div className="flex-1 min-w-0 pl-1">
            {selectedTemple ? (
              <>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t("Selected Temple")}
                </div>
                <div className="font-bold text-sm text-foreground truncate">
                  {t(selectedTemple.name)}
                </div>
              </>
            ) : (
              <div className="text-sm font-semibold text-muted-foreground">
                {t("Select a temple to continue")}
              </div>
            )}
          </div>
          <button
            onClick={onNext}
            disabled={!selected}
            className="rounded-xl bg-primary text-primary-foreground px-6 py-3 text-sm font-bold flex items-center gap-2 shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98]"
          >
            {t("Continue")} <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TempleOption({
  temple,
  active,
  onSelect,
}: {
  temple: Temple;
  active: boolean;
  onSelect: () => void;
}) {
  const { t } = useTranslation();

  return (
    <button
      onClick={onSelect}
      className={`group text-left bg-card border-2 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        active
          ? "border-primary shadow-lg ring-4 ring-primary/10"
          : "border-border/60 hover:border-primary/40"
      }`}
    >
      <div
        className="h-28 relative"
        style={{
          background: temple.image
            ? `url(${temple.image}) center 30% / cover no-repeat`
            : `linear-gradient(135deg, ${temple.gradientFrom}, ${temple.color})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute top-2.5 right-2.5">
          <span
            className={`w-6 h-6 rounded-full grid place-items-center transition-all ${
              active
                ? "bg-primary text-primary-foreground scale-100"
                : "bg-white/25 backdrop-blur text-white/70 scale-90 group-hover:scale-100"
            }`}
          >
            <Check className="w-3.5 h-3.5" strokeWidth={3} />
          </span>
        </div>
        <div className="absolute bottom-2 left-3 right-3">
          <div className="text-white font-serif font-bold text-base leading-tight drop-shadow-lg line-clamp-1">
            {t(temple.name)}
          </div>
        </div>
      </div>

      <div className="p-3.5">
        <div className="text-xs font-medium text-muted-foreground line-clamp-1 mb-2">
          {t(temple.deity)}
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-foreground/70 min-w-0">
            <MapPin className="w-3 h-3 shrink-0 text-primary" />
            <span className="truncate">
              {t(temple.city)}, {t(temple.state)}
            </span>
          </div>
          <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded-full">
            {currencyFor(temple.state) === "USD" ? "USD" : "INR"}
          </span>
        </div>
      </div>
    </button>
  );
}
