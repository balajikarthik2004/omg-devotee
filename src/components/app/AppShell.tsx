import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Home, Sparkles, Map, Bell, Calendar, Navigation, Settings, HeartHandshake, MessageCircle, ArrowLeft } from "lucide-react";
import { OmWatermark } from "./OmWatermark";
import logoPng from "../../assets/logo.png";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home, exact: true },
  { to: "/plan", label: "AI Plan", icon: Sparkles },
  { to: "/heatmap", label: "Heatmap", icon: Map },
  { to: "/chat", label: "Ask AI", icon: MessageCircle },
  { to: "/donations", label: "Donations", icon: HeartHandshake },
];

const sidebarExtras = [
  // { to: "/poojas", label: "Pooja & Timings", icon: Calendar },
  // { to: "/nearby", label: "Nearby & Navigate", icon: Navigation },
];

export function AppShell() {
  const pathname = useRouterState({ select: r => r.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar (Desktop) — OMG official premium gradient */}
      <aside
        className="hidden lg:flex flex-col w-[260px] sticky top-0 h-screen text-white shrink-0"
        style={{ background: "linear-gradient(180deg, #131a72 0%, #1e2680 60%, #e32c26 100%)" }}
      >
        {/* Ambient glow effect */}
        <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        <div className="absolute -top-[150px] -left-[150px] w-[300px] h-[300px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Logo */}
        <Link to="/" className="px-5 py-6 border-b border-white/10 flex items-center gap-3.5 hover:bg-white/5 transition-all duration-300 cursor-pointer block group relative z-10">
          <div className="flex items-center gap-3.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden bg-white p-0.5 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20"
            >
              <img src={logoPng} alt="OMG Logo" className="w-full h-full object-contain rounded-lg" />
            </div>
            <div>
              <div className="font-serif font-bold text-lg text-white leading-tight tracking-wide group-hover:text-white/90 transition-colors">OMG</div>
              <div className="text-xs text-white/60 leading-tight font-medium uppercase tracking-widest mt-0.5">AI Devotee</div>
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto relative z-10">
          {[...navItems, ...sidebarExtras].map(item => {
            const Icon = item.icon;
            const active = isActive(item.to, (item as any).exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-4 px-5 py-4 rounded-xl text-base font-semibold transition-all duration-300 relative overflow-hidden ${
                  active
                    ? "bg-white/20 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md ring-1 ring-white/30"
                    : "text-white/70 hover:bg-white/10 hover:text-white hover:shadow-md hover:ring-1 hover:ring-white/10"
                }`}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-gradient-to-b from-white to-white/60 rounded-r-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                )}
                <Icon className={`w-6 h-6 shrink-0 transition-transform duration-300 ${active ? "scale-110 text-white drop-shadow-md" : "group-hover:scale-110 group-hover:text-white"}`} />
                <span className="tracking-wide drop-shadow-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-white/10">
          <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <div className="px-3 mt-1 text-xs text-white/30 font-serif">வாழ்க வளமுடன்</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 pb-16 lg:pb-0 relative flex flex-col min-h-screen">
        {/* Top Header (mobile only) */}
        <header className="lg:hidden sticky top-0 z-40 border-b border-white/10 shadow-md h-14 flex items-center justify-between px-4 shrink-0 overflow-hidden relative" style={{ background: "linear-gradient(90deg, #0f163b, #1a2366)" }}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            {pathname !== "/" && (
              <Link to="/" className="mr-1 -ml-1.5 p-1.5 text-white/90 hover:text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            )}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-md overflow-hidden bg-white p-[1px] ring-1 ring-white/20 transition-transform group-hover:scale-105">
                <img src={logoPng} alt="OMG Logo" className="w-full h-full object-contain rounded-md" />
              </div>
              <div className="font-serif font-bold text-lg text-white tracking-wide">OMG Devotee</div>
            </Link>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/80 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </header>

        <div className="flex-1 relative">
          <Outlet />
        </div>
        <OmWatermark className="hidden lg:block fixed bottom-4 right-4 w-28 h-28 text-foreground opacity-[0.03] pointer-events-none" />
      </main>

      {/* Bottom Nav (mobile) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-border h-14 grid grid-cols-5 shadow-lg">
        {navItems.map(item => {
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
              {active && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#e32c26] rounded-b-full" />}
              <div className={`p-1 rounded-lg transition-all ${active ? "bg-[#e32c26]/10" : ""}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`font-medium ${active ? "opacity-100" : "opacity-70"}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
