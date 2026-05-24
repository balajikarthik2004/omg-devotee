import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Home, Sparkles, Map, User, Bell, Calendar, Navigation, Settings, HeartHandshake } from "lucide-react";
import { OmWatermark } from "./OmWatermark";
import logoPng from "@/assets/logo.png";

const navItems = [
  { to: "/", label: "Dashboard", icon: Home, exact: true },
  { to: "/plan", label: "AI Plan", icon: Sparkles },
  { to: "/heatmap", label: "Heatmap", icon: Map },
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
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-[260px] border-r border-border bg-sidebar sticky top-0 h-screen shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="px-6 py-7 border-b border-border bg-gradient-to-b from-saffron/10 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-saffron/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="w-11 h-11 rounded-xl bg-white border border-border shadow-sm flex items-center justify-center overflow-hidden">
              <img src={logoPng} alt="OMG Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <div className="font-serif text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">OMG</div>
              <div className="text-[10px] font-bold text-saffron uppercase tracking-[0.2em] mt-0.5">Smart Temple</div>
            </div>
          </div>
        </div>
        
        <div className="px-4 py-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 px-2">Menu</div>
          <nav className="flex-1 space-y-1.5 overflow-y-auto">
            {[...navItems, ...sidebarExtras].map(item => {
              const Icon = item.icon;
              const active = isActive(item.to, (item as any).exact);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                    active ? "bg-gradient-to-r from-saffron/10 to-saffron/5 text-saffron border border-saffron/20 shadow-sm" : "text-foreground/70 hover:bg-secondary hover:text-foreground border border-transparent"
                  }`}
                >
                  <Icon className={`w-[18px] h-[18px] ${active ? "text-saffron" : "text-muted-foreground group-hover:text-foreground"}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="mt-auto p-4 border-t border-border bg-secondary/30 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-3 px-2">
             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-saffron to-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-md">BK</div>
             <div className="flex-1 min-w-0">
               <div className="text-sm font-bold text-foreground truncate">Balaji Krishnan</div>
               <div className="text-[11px] text-muted-foreground font-medium truncate">Devotee Tier</div>
             </div>
          </div>
          <Link to="/profile" className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-secondary/80 text-sm font-medium text-foreground/80 transition-colors border border-transparent hover:border-border">
            <span className="flex items-center gap-2"><Settings className="w-4 h-4 text-muted-foreground" /> Settings</span>
          </Link>
          <div className="mt-4 text-[12px] text-saffron/80 font-serif text-center font-medium">வாழ்க வளமுடன்</div>
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
