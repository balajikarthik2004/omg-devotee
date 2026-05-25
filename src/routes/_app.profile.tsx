import { createFileRoute, Link } from "@tanstack/react-router";
import { temples } from "@/data/temples";
import { CrowdBadge } from "@/components/app/CrowdBadge";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "My profile — OMG Smart Temple" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const watchlist = temples.slice(0, 2);
  return (
    <div className="max-w-3xl mx-auto px-4 lg:px-8 py-6">
      <div className="bg-card border border-border rounded-2xl card-soft p-6 flex items-center gap-4">
        <div className="w-16 h-16 rounded-full gradient-saffron text-white flex items-center justify-center font-serif text-2xl">RA</div>
        <div>
          <div className="font-serif text-xl font-semibold">Ramesh Anandan</div>
          <div className="text-xs text-muted-foreground">Devotee since 2024</div>
          <div className="flex gap-4 mt-2 text-xs">
            <span><b className="text-foreground font-serif">7</b> visited</span>
            <span><b className="text-foreground font-serif">2</b> planned</span>
            <span><b className="text-foreground font-serif">4</b> alerts</span>
          </div>
        </div>
      </div>

      <section className="mt-6">
        <div className="font-serif text-lg font-semibold mb-3">My watchlist</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {watchlist.map(t => (
            <Link key={t.id} to="/temple/$slug" params={{ slug: t.slug }} className="bg-card border border-border rounded-2xl p-4 card-soft flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-serif" style={{ background: t.color }}>ॐ</div>
              <div className="flex-1 min-w-0">
                <div className="font-serif font-semibold truncate">{t.name}</div>
                <div className="flex items-center gap-2 mt-0.5"><CrowdBadge status={t.crowdStatus} /><span className="text-xs text-muted-foreground">{t.waitMin}m</span></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 bg-card border border-border rounded-2xl p-5 card-soft">
        <div className="font-serif text-lg font-semibold mb-3">Planned visits</div>
        <div className="border border-saffron/30 bg-saffron/5 rounded-xl p-4">
          <div className="font-medium">Tomorrow · Palani Murugan Temple · 3:30 PM</div>
          <div className="text-sm text-muted-foreground mt-1">AI suggested this time — LOW crowd expected.</div>
          <div className="mt-3 flex gap-2 text-sm"><button className="rounded-full bg-foreground text-background px-3 py-1">Directions</button><button className="rounded-full bg-white border border-border px-3 py-1">Edit</button></div>
        </div>
      </section>

      <section className="mt-6 bg-card border border-border rounded-2xl p-5 card-soft">
        <div className="font-serif text-lg font-semibold mb-3">My temple visits</div>
        <div className="space-y-4">
          <Visit date="15 May 2025" temple="Kapaleeshwarar Temple, Chennai" note="Visited at 7:30 AM — Very peaceful ✨" stars={5} />
          <Visit date="28 Apr 2025" temple="Srirangam Temple, Trichy" note="Visited at 4:00 PM — Moderate crowd" stars={4} />
        </div>
      </section>

      <section className="mt-6 bg-card border border-border rounded-2xl p-5 card-soft">
        <div className="font-serif text-lg font-semibold mb-3">Devotee preferences</div>
        <Field label="Home district" value="Chennai" />
        <Field label="Preferred visit time" value="Evening" />
        <Field label="Accessibility needs" value="None" />
        <Field label="Language" value="Tamil / English" />
      </section>
    </div>
  );
}

function Visit({ date, temple, note, stars }: any) {
  return (
    <div className="border-l-2 border-saffron/40 pl-4">
      <div className="text-xs text-muted-foreground">📅 {date}</div>
      <div className="font-serif font-semibold">{temple}</div>
      <div className="text-sm text-white mt-0.5">"{note}"</div>
      <div className="text-sm text-gold mt-1">{"⭐".repeat(stars)}</div>
    </div>
  );
}

function Field({ label, value }: any) {
  return (
    <div className="flex justify-between py-2.5 border-b border-border last:border-0 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
