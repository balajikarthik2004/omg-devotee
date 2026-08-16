import { useMemo, useState } from "react";
import { Search, MapPin, Check, ArrowRight, Landmark } from "lucide-react";
import { useTranslation } from "react-i18next";
import { temples, type Temple } from "@/data/temples";

const PAGE_SIZE = 12;

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
  const [limit, setLimit] = useState(PAGE_SIZE);

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

  const shown = results.slice(0, limit);
  const selectedTemple = temples.find((x) => x.slug === selected);

  const reset = (fn: () => void) => {
    fn();
    setLimit(PAGE_SIZE);
  };

  return (
    <div className="fade-in">
      <h2 className="font-serif text-2xl font-bold text-foreground text-center mb-1">
        {t("Choose your temple")}
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        {t("Your membership supports this temple directly.")}
      </p>

      <div className="relative mb-4">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          value={query}
          onChange={(e) => reset(() => setQuery(e.target.value))}
          placeholder={t("Search temple, deity or city…")}
          className="w-full bg-card border-2 border-border/60 rounded-xl pl-11 pr-4 py-3 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm placeholder:font-normal placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-1 px-1">
        {states.map((s) => (
          <button
            key={s}
            onClick={() => reset(() => setState(s))}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider border-2 transition-all ${
              state === s
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border/60 bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {t(s === "All" ? "All" : s)}
          </button>
        ))}
      </div>

      {results.length === 0 ? (
        <div className="text-center py-14 border-2 border-dashed border-border rounded-2xl">
          <Landmark className="w-9 h-9 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-sm font-semibold text-muted-foreground">{t("No temple found.")}</p>
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {shown.map((temple) => (
              <TempleOption
                key={temple.slug}
                temple={temple}
                active={selected === temple.slug}
                onSelect={() => onSelect(temple.slug)}
              />
            ))}
          </div>

          {results.length > limit && (
            <button
              onClick={() => setLimit((n) => n + PAGE_SIZE)}
              className="mx-auto mt-5 block px-5 py-2.5 rounded-xl border-2 border-border/60 bg-card text-xs font-bold text-foreground hover:border-primary/40 transition-all"
            >
              {t("Show more")} ({results.length - limit})
            </button>
          )}
        </>
      )}

      <div className="sticky bottom-16 lg:bottom-4 mt-6 z-30">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-lg p-3 flex items-center gap-3">
          <div className="flex-1 min-w-0 pl-1">
            {selectedTemple ? (
              <>
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t("Selected")}
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
      className={`group flex items-center gap-3 text-left bg-card border-2 rounded-xl p-2.5 transition-all duration-200 hover:shadow-md ${
        active
          ? "border-primary shadow-md ring-2 ring-primary/10"
          : "border-border/60 hover:border-primary/40"
      }`}
    >
      <div
        className="w-12 h-12 rounded-lg shrink-0"
        style={{
          background: temple.image
            ? `url(${temple.image}) center 30% / cover no-repeat`
            : `linear-gradient(135deg, ${temple.gradientFrom}, ${temple.color})`,
        }}
      />
      <div className="min-w-0 flex-1">
        <div className="font-bold text-xs text-foreground leading-tight line-clamp-1">
          {t(temple.name)}
        </div>
        <div className="text-[10px] text-muted-foreground line-clamp-1 mt-0.5">
          {t(temple.deity)}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-foreground/60 mt-0.5">
          <MapPin className="w-2.5 h-2.5 shrink-0 text-primary" />
          <span className="truncate">{t(temple.city)}</span>
        </div>
      </div>
      <span
        className={`w-5 h-5 rounded-full grid place-items-center shrink-0 transition-all ${
          active
            ? "bg-primary text-primary-foreground"
            : "bg-secondary/40 text-transparent group-hover:text-muted-foreground"
        }`}
      >
        <Check className="w-3 h-3" strokeWidth={3} />
      </span>
    </button>
  );
}
