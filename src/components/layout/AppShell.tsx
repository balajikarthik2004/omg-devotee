import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home, Map, Bell, Calendar, Navigation, Settings, HeartHandshake, MessageCircle, ArrowLeft, Ticket, Award, Compass,
  ChevronLeft, ChevronRight, ShoppingBag,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../layout/LanguageSwitcher";
import { OmWatermark } from "./OmWatermark";
import logoPng from "../../assets/logo.png";
import { CartWidget } from "@/features/store/components/CartWidget";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home, exact: true },
  { to: "/plan", label: "AI Trip Plan", icon: Compass },
  { to: "/heatmap", label: "Temple map", icon: Map },
  { to: "/donations", label: "Donations", icon: HeartHandshake },
  { to: "/store", label: "Temple Store", icon: ShoppingBag },
];

const sidebarExtras = [
  { to: "/booking/tiruvannamalai", label: "Pooja Booking", icon: Ticket },
  { to: "/membership", label: "Membership", icon: Award },
  { to: "/chat", label: "Ask AI", icon: MessageCircle },
];

export function AppShell() {
  const { t } = useTranslation();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar (Desktop) — OMG official premium gradient */}
      <aside
        className={`hidden lg:flex print:hidden flex-col sticky top-0 h-screen text-white shrink-0 z-50 transition-[width] duration-300 ease-in-out will-change-[width] ${
          sidebarExpanded ? "w-[220px]" : "w-[72px]"
        }`}
        style={{
          background: "linear-gradient(180deg, #131a72 0%, #1e2680 60%, #e32c26 100%)",
          boxShadow: "4px 0 30px rgba(0,0,0,0.18)",
        }}
      >
        {/* Ambient glow effect */}
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -top-[150px] -left-[150px] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo row */}
        <div className="border-b border-white/10 flex items-center h-20 px-4 relative z-10">
          <Link
            to="/"
            className="flex items-center min-w-0 hover:opacity-90 transition-opacity cursor-pointer group"
            title={!sidebarExpanded ? "OMG DEVI" : undefined}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden bg-white p-0.5 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20">
              <img
                src={logoPng}
                alt="OMG Logo"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <div
              className={`ml-3.5 whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
                sidebarExpanded
                  ? "max-w-[120px] opacity-100 translate-x-0"
                  : "max-w-0 opacity-0 -translate-x-2 pointer-events-none"
              }`}
            >
              <div className="font-serif font-bold text-lg text-white leading-tight tracking-wide group-hover:text-white/90 transition-colors">
                OMG
              </div>
              <div className="text-xs text-white/60 leading-tight font-medium uppercase tracking-widest mt-0.5">
                DEVI
              </div>
            </div>
          </Link>

          {/* Toggle button */}
          <button
            type="button"
            onClick={() => setSidebarExpanded((v) => !v)}
            aria-label={sidebarExpanded ? t("Collapse sidebar") : t("Expand sidebar")}
            className="absolute -right-3.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full z-50 transition-transform duration-300 hover:scale-110 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-[#131a72] border border-white/20 hover:shadow-[0_6px_16px_rgba(0,0,0,0.2)] cursor-pointer"
          >
            {sidebarExpanded ? <ChevronLeft size={14} strokeWidth={2.5} /> : <ChevronRight size={14} strokeWidth={2.5} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1.5 px-3 relative z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          {[...navItems, ...sidebarExtras].map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to, (item as any).exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                title={!sidebarExpanded ? t(item.label) : undefined}
                className={`group relative flex items-center w-full h-11 px-3 rounded-xl text-[15px] font-semibold transition-colors duration-200 overflow-hidden ${
                  active
                    ? "bg-white/20 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md ring-1 ring-white/30"
                    : "text-white/70 hover:bg-white/10 hover:text-white hover:shadow-md hover:ring-1 hover:ring-white/10"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-gradient-to-b from-white to-white/60 rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                )}
                <div className="w-5 h-5 shrink-0 flex items-center justify-center">
                  <Icon
                    className={`w-5 h-5 transition-transform duration-200 ${
                      active ? "scale-110 text-white drop-shadow-md" : "group-hover:scale-110 group-hover:text-white"
                    }`}
                  />
                </div>
                <span
                  className={`ml-3.5 whitespace-nowrap overflow-hidden tracking-wide drop-shadow-sm transition-all duration-300 ease-in-out ${
                    sidebarExpanded
                      ? "max-w-[140px] opacity-100 translate-x-0"
                      : "max-w-0 opacity-0 -translate-x-2 pointer-events-none"
                  }`}
                >
                  {t(item.label)}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 mt-auto flex flex-col gap-1.5 z-10">
          <Link
            to="/profile"
            title={!sidebarExpanded ? t("Settings") : undefined}
            className="flex items-center w-full rounded-lg px-2.5 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors overflow-hidden"
          >
            <div className="w-8 h-5 shrink-0 flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <span
              className={`ml-2.5 whitespace-nowrap overflow-hidden font-medium transition-all duration-300 ease-in-out ${
                sidebarExpanded
                  ? "max-w-[130px] opacity-100 translate-x-0"
                  : "max-w-0 opacity-0 -translate-x-2 pointer-events-none"
              }`}
            >
              {t("Settings")}
            </span>
          </Link>
          <div
            className={`px-2 mt-1 text-xs text-white/30 font-serif text-center whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out ${
              sidebarExpanded ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0 pointer-events-none"
            }`}
          >
            வாழ்க வளமுடன்
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-16 lg:pb-0 relative flex flex-col min-h-screen">
        {/* Top Header (mobile only) */}
        <header
          className="lg:hidden sticky top-0 z-40 border-b border-white/10 shadow-md h-14 flex items-center justify-between px-4 shrink-0 overflow-hidden relative print:hidden"
          style={{ background: "linear-gradient(90deg, #0f163b, #1a2366)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            {pathname !== "/" && (
              <Link
                to="/"
                className="mr-1 -ml-1.5 p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
            )}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md overflow-hidden bg-white p-[1px] ring-1 ring-white/20 transition-transform group-hover:scale-105">
                <img
                  src={logoPng}
                  alt="OMG Logo"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
              <div className="font-serif font-bold text-lg text-white tracking-wide">
                {t("OMG Devotee")}
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher className="w-8 h-8 text-white/80" />
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/80 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 relative">
          <Outlet />
        </div>
        <CartWidget />
        <OmWatermark className="hidden lg:block fixed bottom-4 right-4 w-28 h-28 text-foreground opacity-[0.03] pointer-events-none" />
      </main>

      {/* Bottom Nav (mobile) */}
      <nav className="lg:hidden print:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-border h-14 grid grid-cols-5 shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to, (item as any).exact);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 text-xs transition-all relative ${
                active ? "text-[#e32c26]" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#e32c26] rounded-b-full" />
              )}
              <div className={`p-1 rounded-lg transition-all ${active ? "bg-[#e32c26]/10" : ""}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`font-medium ${active ? "opacity-100" : "opacity-70"}`}>
                {t(item.label)}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
