import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemple, forecastFor } from "@/data/temples";
import { useEffect, useState } from "react";

import { TempleHero } from "@/features/temple-details/components/TempleHero";
import { CrowdDashboard } from "@/features/temple-details/components/CrowdDashboard";
import { AIInsights } from "@/features/temple-details/components/AIInsights";
import { ForecastChart } from "@/features/temple-details/components/ForecastChart";
import { TempleTimings } from "@/features/temple-details/components/TempleTimings";
import { ParkingStatus } from "@/features/temple-details/components/ParkingStatus";
import { SmartAlerts } from "@/features/temple-details/components/SmartAlerts";
import { TempleTabs } from "@/features/temple-details/components/TempleTabs";
import { MobileActionBar, OtherTemples } from "@/features/temple-details/components/SidebarWidgets";

export const Route = createFileRoute("/_app/temple/$slug")({
  loader: ({ params }) => {
    const t = getTemple(params.slug);
    if (!t) throw notFound();
    return { temple: t };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.temple.name} — Live crowd, AI best time | OMG Smart Temple` },
      { name: "description", content: `Live crowd, parking and AI-recommended visit times for ${loaderData?.temple.name}.` },
    ],
  }),
  notFoundComponent: () => <div className="p-12 text-center text-muted-foreground">Temple not found, devotee 🙏</div>,
  component: TempleDetail,
});

function TempleDetail() {
  const { temple: t } = Route.useLoaderData();
  const data = forecastFor(t);
  const nowHour = new Date().getHours();
  const [pct, setPct] = useState(t.crowdPct);
  const [wait, setWait] = useState(t.waitMin);
  const [alertOn, setAlertOn] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setPct(p => Math.max(5, Math.min(98, p + (Math.random() * 6 - 3))));
      setWait(w => Math.max(2, Math.round(w + (Math.random() * 4 - 2))));
    }, 8000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="pb-32 lg:pb-8">
      <TempleHero t={t} />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-4 relative z-20">
        <CrowdDashboard t={t} wait={wait} now={now} />

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AIInsights t={t} />
            <ForecastChart data={data} nowHour={nowHour} />
            <TempleTimings t={t} />
            <ParkingStatus t={t} />
          </div>

          <div className="space-y-6">
            <SmartAlerts t={t} pct={pct} alertOn={alertOn} setAlertOn={setAlertOn} />
            <TempleTabs t={t} />
            <OtherTemples t={t} />
          </div>
        </div>
      </div>

      <MobileActionBar />
    </div>
  );
}
