import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Temple } from "@/data/temples";

export function BookingHeader({ t }: { t: Temple }) {
  const { t: tStr } = useTranslation();

  return (
    <div className="relative h-[160px] overflow-hidden" style={{
      background: t.image
        ? `url(${t.image}) center 20% / cover no-repeat`
        : `linear-gradient(135deg, ${t.gradientFrom}, ${t.color})`
    }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 z-10">
        <Link to="/temple/$slug" params={{ slug: t.slug }} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition">
          <ArrowLeft className="w-5 h-5" />
        </Link>
      </div>
      
      <div className="absolute bottom-0 inset-x-0 p-5 lg:p-8 text-white z-10">
        <div className="inline-flex items-center gap-1.5 bg-saffron/90 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
          {tStr("Special Entry Darshan")}
        </div>
        <h1 className="font-serif text-3xl font-semibold leading-tight drop-shadow-lg">{tStr(t.name)}</h1>
        <div className="text-sm opacity-90 flex items-center gap-1 mt-1 drop-shadow-md">
          {tStr(t.city)}, {tStr(t.district)} {tStr("District")}
        </div>
      </div>
    </div>
  );
}
