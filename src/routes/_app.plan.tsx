import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import { temples } from "@/data/temples";

export const Route = createFileRoute("/_app/plan")({
  head: () => ({ meta: [{ title: "AI Smart Planner — OMG Smart Temple" }] }),
  component: PlanPage,
});

function PlanPage() {
  const [temple, setTemple] = useState(temples[0].slug);
  const [date, setDate] = useState("today");
  const [time, setTime] = useState("afternoon");
  const [who, setWho] = useState("family");
  const [purpose, setPurpose] = useState("darshan");
  const [result, setResult] = useState(false);
  const t = temples.find(x => x.slug === temple)!;

  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-saffron"><Sparkles className="w-5 h-5" /><span className="text-sm font-medium">AI Smart Planner</span></div>
      <h1 className="font-serif text-3xl font-semibold mt-1">Plan my perfect visit</h1>
      <p className="text-muted-foreground text-sm mt-1">Tell us your preferences — AI will suggest the ideal time.</p>

      <div className="mt-6 space-y-4">
        <Step n={1} title="Which temple?">
          <select value={temple} onChange={e => setTemple(e.target.value)} className="w-full bg-white border border-border rounded-xl px-4 py-3 text-base">
            {temples.map(x => <option key={x.id} value={x.slug}>{x.name}</option>)}
          </select>
        </Step>
        <Step n={2} title="When do you plan to visit?">
          <PillRow value={date} setValue={setDate} options={[["today","Today"],["tomorrow","Tomorrow"],["weekend","This weekend"]]} />
        </Step>
        <Step n={3} title="What time do you prefer?">
          <PillRow value={time} setValue={setTime} options={[["morning","🌅 Early Morning"],["lateMorning","☀️ Morning"],["afternoon","🌤 Afternoon"],["evening","🌇 Evening"],["night","🌙 Night"],["any","✨ AI decides"]]} />
        </Step>
        <Step n={4} title="Who is visiting?">
          <PillRow value={who} setValue={setWho} options={[["solo","👤 Just me"],["couple","👫 Couple"],["family","👨‍👩‍👧 Family"],["senior","👴 With seniors"],["dis","♿ Differently-abled"]]} />
        </Step>
        <Step n={5} title="Visit purpose?">
          <PillRow value={purpose} setValue={setPurpose} options={[["darshan","Regular darshan"],["pooja","Special pooja"],["festival","Festival attendance"],["first","First visit"]]} />
        </Step>

        <button onClick={() => setResult(true)} className="w-full rounded-full gradient-saffron text-white py-3.5 text-base font-medium card-soft hover:opacity-95">
          ✨ Get AI recommendation
        </button>
      </div>

      {result && (
        <div className="mt-8 fade-in rounded-2xl p-[2px] gradient-saffron">
          <div className="bg-card rounded-2xl p-6">
            <div className="flex items-center gap-2 text-saffron font-medium"><Sparkles className="w-5 h-5" /> Your perfect visit plan</div>
            <h2 className="font-serif text-2xl font-semibold mt-2">{t.name}</h2>
            <div className="text-sm text-muted-foreground">Recommended date: Today · Best time: <span className="font-medium text-foreground">3:30 PM – 5:00 PM</span></div>

            <div className="mt-5">
              <div className="text-sm font-medium mb-2">Why this time?</div>
              <ul className="space-y-1.5 text-sm text-foreground/80">
                {["Crowd drops to 30% capacity at 3:30 PM","Temperature cools to 28°C — comfortable","Sayaratchai Pooja at 3:00 PM — auspicious","Senior-friendly: ramps available, less rush","Parking: Lot B will be 40% free at 3:30 PM"].map(r =>
                  <li key={r} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-status-low shrink-0 mt-0.5" /> {r}</li>
                )}
              </ul>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-2 text-center">
              {[["Entry","~8m"],["Queue","~22m"],["Darshan","~6m"],["Total","45-60m"]].map(([l,v]) => (
                <div key={l} className="bg-secondary rounded-xl p-2.5">
                  <div className="font-serif font-semibold">{v}</div>
                  <div className="text-[11px] text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 bg-secondary rounded-xl p-3 text-sm">⚠ {t.specialDay} is special puja day — carry ID for VIP darshan.</div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button className="rounded-full bg-foreground text-background px-4 py-2 text-sm">🗺 Get directions</button>
              <button className="rounded-full bg-white border border-border px-4 py-2 text-sm">🔔 Set crowd alert</button>
              <Link to="/temple/$slug" params={{ slug: t.slug }} className="rounded-full bg-white border border-border px-4 py-2 text-sm">View temple →</Link>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Compare time slots today</div>
              <div className="space-y-1.5">
                {[
                  { t: "6:00 – 8:00 AM", crowd: 20, wait: 12, stars: 5 },
                  { t: "8:00 – 10:00 AM", crowd: 75, wait: 58, stars: 2 },
                  { t: "10:00 – 12:00", crowd: 60, wait: 42, stars: 3 },
                  { t: "3:00 – 5:00 PM", crowd: 35, wait: 18, stars: 5, pick: true },
                  { t: "5:00 – 7:00 PM", crowd: 55, wait: 35, stars: 3 },
                  { t: "7:00 – 9:00 PM", crowd: 40, wait: 22, stars: 4 },
                ].map(s => (
                  <div key={s.t} className={`flex items-center gap-3 text-sm p-2 rounded-xl ${s.pick?"bg-saffron/10 border border-saffron/30":""}`}>
                    <div className="w-32 shrink-0">{s.t}</div>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden"><div className="h-full" style={{ width: `${s.crowd}%`, background: s.crowd<40?"var(--status-low)":s.crowd<70?"var(--status-mod)":"var(--status-high)" }}/></div>
                    <div className="w-12 text-right text-muted-foreground">{s.wait}m</div>
                    <div className="w-16 text-right text-gold">{"⭐".repeat(s.stars)}</div>
                    {s.pick && <span className="text-xs text-saffron font-medium">AI pick</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Step({ n, title, children }: any) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 card-soft">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-7 h-7 rounded-full bg-saffron text-white text-sm font-medium flex items-center justify-center">{n}</div>
        <div className="font-serif font-semibold">{title}</div>
      </div>
      {children}
    </div>
  );
}

function PillRow({ value, setValue, options }: any) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([v, l]: any) => (
        <button key={v} onClick={() => setValue(v)} className={`text-sm rounded-full px-4 py-2 border ${value===v?"bg-foreground text-background border-foreground":"bg-white border-border hover:border-saffron/40"}`}>{l}</button>
      ))}
    </div>
  );
}
