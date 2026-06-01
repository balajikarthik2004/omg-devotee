import { MapPin, ChevronDown, Bell } from "lucide-react";
import { useTranslation } from "react-i18next";
import { districts as allDistricts, temples, statesAndDistricts } from "@/data/temples";

export function DashboardTopNav({
  state, setState, stateOpen, setStateOpen,
  district, setDistrict, districtOpen, setDistrictOpen,
  activeTempleId, setActiveTempleId, templeOpen, setTempleOpen,
  bellOpen, setBellOpen, now, activeTemple
}: any) {
  const { t } = useTranslation();

  return (
    <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/20 bg-white/80 px-4 lg:px-8 backdrop-blur-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center gap-4">
        {/* State Selector */}
        <div className="relative hidden sm:block group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-saffron/20 to-rose-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <button
            onClick={() => { setStateOpen((o: boolean) => !o); setDistrictOpen(false); setTempleOpen(false); }}
            className="relative flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:border-saffron/30"
          >
            <MapPin size={15} className="text-saffron transition-transform group-hover:scale-110" />
            <span className="text-foreground tracking-wide">{state ? t(state) : t("All States")}</span>
            <ChevronDown size={14} className="text-muted-foreground transition-transform group-hover:translate-y-0.5 ml-1" />
          </button>
          {stateOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white/95 backdrop-blur-lg shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
              <div className="max-h-80 overflow-y-auto py-1">
                <button
                  onClick={() => { setState(""); setDistrict(""); setStateOpen(false); }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${!state
                    ? "bg-saffron/10 font-bold text-saffron"
                    : "font-medium text-foreground/80 hover:bg-saffron hover:text-white"
                    }`}
                >
                  <span className="truncate">{t("All States")}</span>
                  {!state && <span className="w-1.5 h-1.5 rounded-full bg-saffron" />}
                </button>
                {statesAndDistricts.map((s) => (
                  <button
                    key={s.state}
                    onClick={() => { setState(s.state); setDistrict(""); setStateOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${s.state === state
                      ? "bg-saffron/10 font-bold text-saffron"
                      : "font-medium text-foreground/80 hover:bg-saffron hover:text-white"
                      }`}
                  >
                    <span className="truncate">{t(s.state)}</span>
                    {s.state === state && <span className="w-1.5 h-1.5 rounded-full bg-saffron" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* District Selector */}
        <div className="relative hidden sm:block group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-saffron/20 to-rose-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <button
            onClick={() => { setDistrictOpen((o: boolean) => !o); setStateOpen(false); setTempleOpen(false); }}
            className="relative flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition-all hover:border-saffron/30"
          >
            <MapPin size={15} className="text-saffron transition-transform group-hover:scale-110" />
            <span className="text-foreground tracking-wide">{district ? t(district) : t("All Districts")}</span>
            <ChevronDown size={14} className="text-muted-foreground transition-transform group-hover:translate-y-0.5 ml-1" />
          </button>
          {districtOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white/95 backdrop-blur-lg shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
              <div className="max-h-80 overflow-y-auto py-1">
                <button
                  onClick={() => { setDistrict(""); setDistrictOpen(false); }}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${!district
                    ? "bg-saffron/10 font-bold text-saffron"
                    : "font-medium text-foreground/80 hover:bg-saffron hover:text-white"
                    }`}
                >
                  <span className="truncate">{t("All Districts")}</span>
                  {!district && <span className="w-1.5 h-1.5 rounded-full bg-saffron" />}
                </button>
                {(state ? statesAndDistricts.find(s => s.state === state)?.districts || [] : allDistricts).map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDistrict(d); setDistrictOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${d === district
                      ? "bg-saffron/10 font-bold text-saffron"
                      : "font-medium text-foreground/80 hover:bg-saffron hover:text-white"
                      }`}
                  >
                    <span className="truncate">{t(d)}</span>
                    {d === district && <span className="w-1.5 h-1.5 rounded-full bg-saffron" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Temple Dropdown (Second) */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-saffron/20 to-amber-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <button
            onClick={() => { setTempleOpen((o: boolean) => !o); setStateOpen(false); setDistrictOpen(false); }}
            className="relative flex items-center gap-2.5 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold shadow-sm transition-all hover:border-saffron/30"
          >
            <LandmarkIcon />
            <span className="text-foreground tracking-wide">{t(activeTemple.name)}</span>
            <ChevronDown size={14} className="text-muted-foreground transition-transform group-hover:translate-y-0.5 ml-1" />
          </button>
          {templeOpen && (
            <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-border bg-white/95 backdrop-blur-lg shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2">
              <div className="max-h-80 overflow-y-auto py-1">
                {temples.filter(t => {
                  if (state && t.state !== state) return false;
                  if (district && t.district !== district) return false;
                  return true;
                }).map((templeItem) => (
                  <button
                    key={templeItem.id}
                    onClick={() => { setActiveTempleId(templeItem.id); setTempleOpen(false); }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${templeItem.id === activeTempleId
                      ? "bg-saffron/10 font-bold text-saffron"
                      : "font-medium text-foreground/80 hover:bg-saffron hover:text-white"
                      }`}
                  >
                    <span className="truncate">{t(templeItem.name)}</span>
                    {templeItem.id === activeTempleId && <span className="w-1.5 h-1.5 rounded-full bg-saffron" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 text-sm text-muted-foreground">
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="font-mono font-medium text-foreground">
            {now.toLocaleTimeString("en-IN", { hour12: false, hour: "2-digit", minute: "2-digit" })}
          </span>
          <span className="text-xs">
            · {now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1.5 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{district ? t(district).split(" ")[0] : t(activeTemple.district).split(" ")[0]}</span>
          <span className="text-xs font-semibold text-foreground">34°C ☀</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setBellOpen((o: boolean) => !o)}
            className="relative rounded-full p-2 transition-colors hover:bg-secondary"
          >
            <Bell size={18} className="text-muted-foreground transition-colors hover:text-foreground" />
            <span className="absolute right-1 top-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-danger text-[8px] font-bold text-white">
              3
            </span>
          </button>
          {bellOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-72 overflow-hidden rounded-lg border border-border bg-white shadow-lg">
              <div className="border-b border-border bg-secondary px-3 py-2 text-xs font-semibold">
                {t("Notifications")}
              </div>
              <div className="divide-y divide-border">
                {[
                  { t: t("Peak alert"), b: t("Inner sanctum approaching capacity"), c: "text-danger" },
                  { t: t("Queue update"), b: t("Lane B wait time +6 min"), c: "text-saffron" },
                  { t: t("Staff"), b: t("8 volunteers deployed to Lane C"), c: "text-info" },
                ].map((n, i) => (
                  <div key={i} className="px-3 py-2 text-xs hover:bg-saffron hover:text-white group transition-colors">
                    <div className={`font-semibold group-hover:text-white transition-colors ${n.c}`}>{n.t}</div>
                    <div className="text-muted-foreground mt-0.5 group-hover:text-white/80 transition-colors">{n.b}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-foreground text-xs font-semibold text-background">
          SK
        </div>
      </div>
    </div>
  );
}

function LandmarkIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-saffron transition-transform group-hover:scale-110"><line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>;
}
