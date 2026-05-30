import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { temples } from "@/data/temples";

import { DashboardTopNav } from "@/features/dashboard/components/DashboardTopNav";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DevoteeEssentials } from "@/features/dashboard/components/DevoteeEssentials";
import { LiveTempleFeed } from "@/features/dashboard/components/LiveTempleFeed";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "OMG Smart Temple — Devotee Dashboard" },
      { name: "description", content: "Your personalized dashboard for Tamil Nadu temples." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [district, setDistrict] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  const [templeOpen, setTempleOpen] = useState(false);
  const [districtOpen, setDistrictOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [now, setNow] = useState(new Date());
  const [activeTempleId, setActiveTempleId] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activeTemple = temples.find(t => t.id === activeTempleId) || temples[0];

  const results = useMemo(() => {
    const v = q.toLowerCase().trim();
    return temples.filter(t => {
      if (district && t.district !== district) return false;
      if (activeFilter === "Low Crowd" && t.crowdStatus !== "low") return false;
      else if (activeFilter !== "All" && activeFilter !== "Open Now" && !t.deity.includes(activeFilter)) return false;
      if (!v) return true;
      return t.name.toLowerCase().includes(v) || t.district.toLowerCase().includes(v) || t.deity.toLowerCase().includes(v);
    });
  }, [q, district, activeFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-12">
      <DashboardTopNav 
        district={district} setDistrict={setDistrict}
        districtOpen={districtOpen} setDistrictOpen={setDistrictOpen}
        activeTempleId={activeTempleId} setActiveTempleId={setActiveTempleId}
        templeOpen={templeOpen} setTempleOpen={setTempleOpen}
        bellOpen={bellOpen} setBellOpen={setBellOpen}
        now={now} activeTemple={activeTemple}
      />

      <DashboardHeader activeTemple={activeTemple} now={now} />

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 space-y-8 w-full">
        {(!q && district === "" && activeFilter === "All") && (
          <DevoteeEssentials />
        )}
        <LiveTempleFeed results={results} />
      </div>
    </div>
  );
}
