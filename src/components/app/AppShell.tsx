import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Home, Search, Sparkles, Map, User, Bell, Calendar, Navigation, Settings } from "lucide-react";
import { OmWatermark } from "./OmWatermark";
import logoPng from "@/assets/logo.png";

const navItems = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/search", label: "Search", icon: Search },
  { to: "/plan", label: "AI Plan", icon: Sparkles },
  { to: "/heatmap", label: "Heatmap", icon: Map },
  { to: "/profile", label: "Profile", icon: User },
];

const sidebarExtras = [
  // { to: "/poojas", label: "Pooja & Timings", icon: Calendar },
  // { to: "/nearby", label: "Nearby & Navigate", icon: Navigation },
  { to: "/notifications", label: "Notifications", icon: Bell },
];

export function AppShell() {
  const pathname = useRouterState({ select: r => r.location.pathname });
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-[240px] border-r border-border bg-sidebar sticky top-0 h-screen">
        <div className="px-5 py-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden">
              <img src={logoPng} alt="OMG Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <div className="font-serif text-lg font-semibold">OMG</div>
              <div className="text-[11px] text-muted-foreground -mt-0.5">Smart Temple</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[...navItems, ...sidebarExtras].map(item => {
            const Icon = item.icon;
            const active = isActive(item.to, (item as any).exact);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-accent text-saffron" : "text-foreground/80 hover:bg-secondary"
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <Link to="/profile" className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-secondary text-sm">
            <Settings className="w-4 h-4 text-muted-foreground" /> Settings
          </Link>
          <div className="px-2 mt-2 text-[11px] text-muted-foreground font-serif">வாழ்க வளமுடன்</div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 pb-20 lg:pb-0 relative">
        <Outlet />
        <OmWatermark className="hidden lg:block fixed bottom-4 right-4 w-32 h-32 text-foreground opacity-[0.03] pointer-events-none" />
      </main>

      {/* Bottom nav (mobile) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-border h-16 grid grid-cols-5">
        {navItems.map(item => {
          const Icon = item.icon;
          const active = isActive(item.to, (item as any).exact);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 text-[11px] ${
                active ? "text-saffron" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
