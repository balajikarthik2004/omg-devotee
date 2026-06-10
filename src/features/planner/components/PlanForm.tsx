import { useTranslation } from "react-i18next";
import { Sparkles, MapPin, Loader2 } from "lucide-react";
import { temples } from "@/data/temples";

export function PlanForm({
  fromLocation, setFromLocation,
  temple, setTemple,
  date, setDate,
  time, setTime,
  who, setWho,
  purpose, setPurpose,
  handleGenerate, loading,
  travelHours, travelMins, setFullMap, t
}: any) {
  const { t: tStr } = useTranslation();

  return (
    <div className="mt-6 space-y-4">
      <div className="grid lg:grid-cols-2 gap-3">
        <div className="space-y-4">
          <Step n={1} title={tStr("Where are you traveling from?")}>
            <input type="text" value={fromLocation} onChange={e => { setFromLocation(e.target.value); }} placeholder={tStr("e.g. Chennai, Bangalore, Madurai...")} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" />
          </Step>
          <Step n={2} title={tStr("Which temple?")}>
            <select value={temple} onChange={e => { setTemple(e.target.value); }} className={`w-full bg-white border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron ${!temple ? "text-slate-400 border-border" : "text-slate-900 border-saffron"}`}>
              <option value="" disabled>{tStr("Select temple name")}</option>
              {temples.map(x => <option key={x.id} value={x.slug}>{tStr(x.name)}</option>)}
            </select>
          </Step>
        </div>

        <div className="h-full">
          {fromLocation.trim().length >= 3 && t ? (
            <div className="animate-in fade-in zoom-in-95 duration-300 w-full h-full min-h-[260px] rounded-3xl overflow-hidden border border-border/60 bg-card shadow-[0_18px_45px_rgba(0,0,0,0.08)] flex flex-col">
              <div className="bg-saffron/10 px-4 py-3 border-b border-border/60 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 text-saffron font-semibold text-sm">
                  <MapPin className="w-4 h-4" /> {tStr("Live Route Preview")}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-xs font-bold text-saffron bg-background px-2 py-1 rounded-md">{travelHours}{tStr("h")} {travelMins}{tStr("m")}</div>
                  <button onClick={() => setFullMap(true)} className="p-1 hover:bg-saffron/20 rounded-md transition-colors text-saffron" title="Full view">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /></svg>
                  </button>
                </div>
              </div>
              <iframe
                className="flex-1 w-full"
                frameBorder="0"
                style={{ border: 0 }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?saddr=${encodeURIComponent(fromLocation)}&daddr=${encodeURIComponent(t.city + ', TN')}&output=embed`}
                allowFullScreen
              />
            </div>
          ) : (
            <div className="w-full h-full min-h-[260px] rounded-3xl border border-dashed border-border/70 bg-secondary/40 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
              <MapPin className="w-8 h-8 mb-3 opacity-50" />
              <div className="text-sm font-medium">{tStr("Enter origin and select a temple to see the route")}</div>
              <div className="text-xs text-muted-foreground/80 mt-1">{tStr("We will tailor the ETA and route quality score.")}</div>
            </div>
          )}
        </div>
      </div>

      <Step n={3} title={tStr("When do you plan to visit?")}>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base outline-none focus:border-saffron focus:ring-1 focus:ring-saffron" />
      </Step>
      <Step n={4} title={tStr("What time do you prefer?")}>
        <PillRow value={time} setValue={setTime} options={[["morning", tStr("🌅 Early Morning")], ["lateMorning", tStr("☀️ Morning")], ["afternoon", tStr("🌤 Afternoon")], ["evening", tStr("🌇 Evening")], ["any", tStr("✨ AI decides")]]} />
      </Step>
      <Step n={5} title={tStr("Who is visiting?")}>
        <PillRow value={who} setValue={setWho} options={[["solo", tStr("👤 Just me")], ["couple", tStr("👫 Couple")], ["family", tStr("👨‍👩‍👧 Family")], ["friends", tStr("👥 Friends")], ["senior", tStr("👴 With seniors")], ["dis", tStr("♿ Differently-abled")]]} />
      </Step>
      <Step n={6} title={tStr("Visit purpose?")}>
        <PillRow value={purpose} setValue={setPurpose} options={[["darshan", tStr("Regular darshan")], ["pooja", tStr("Special pooja")], ["festival", tStr("Festival attendance")], ["first", tStr("First visit")]]} />
      </Step>

      <button onClick={handleGenerate} disabled={loading || !temple || !fromLocation || !date} className="w-full rounded-full gradient-saffron text-white py-3.5 text-sm font-semibold shadow-[0_12px_30px_rgba(234,179,8,0.35)] hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 transition-all mt-4">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        {loading ? tStr("AI is planning...") : tStr("Generate AI Itinerary")}
      </button>
    </div>
  );
}

function Step({ n, title, children }: any) {
  return (
    <div className="bg-card border border-border/70 rounded-2xl p-4 shadow-[0_10px_26px_rgba(0,0,0,0.06)] transition-all focus-within:ring-1 focus-within:ring-saffron/20 focus-within:border-saffron/40">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-saffron text-white text-xs font-semibold flex items-center justify-center shadow-sm">{n}</div>
        <div className="font-serif text-base font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
}

function PillRow({ value, setValue, options }: any) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([v, l]: any) => (
        <button key={v} onClick={() => setValue(v)} className={`text-sm rounded-full px-4 py-2 border font-semibold transition-all ${value === v ? "bg-foreground text-background border-foreground shadow-sm scale-[1.02]" : "bg-white border-border hover:border-saffron hover:bg-saffron text-muted-foreground hover:text-white"}`}>{l}</button>
      ))}
    </div>
  );
}
