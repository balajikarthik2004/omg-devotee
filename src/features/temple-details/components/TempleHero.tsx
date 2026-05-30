import { Link } from "@tanstack/react-router";
import { ArrowLeft, Share2, Bookmark, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

import muruganImg from "@/assets/murugan.png";
import meenakshiImg from "@/assets/meenakshi.png";

const bgImages: Record<string, string> = {
  "palani-murugan": muruganImg,
  "madurai-meenakshi": meenakshiImg,
};

export function TempleHero({ t }: any) {
  const { t: tStr } = useTranslation();
  const hasBgImg = !!bgImages[t.slug];

  return (
    <div className="relative h-[180px] lg:h-[200px] overflow-hidden" style={{
      background: hasBgImg
        ? `url(${bgImages[t.slug]}) center 20% / cover no-repeat`
        : `linear-gradient(135deg, ${t.gradientFrom}, ${t.color})`
    }}>
      {hasBgImg && <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-black/30" />}
      {!hasBgImg && <svg viewBox="0 0 100 100" className="absolute -right-10 -bottom-10 w-48 h-48 text-white opacity-[0.08]"><text x="50" y="72" textAnchor="middle" fontSize="80" fill="currentColor" fontFamily="Noto Serif">ॐ</text></svg>}

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 z-10">
        <Link to="/" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white"><Share2 className="w-4 h-4" /></button>
          <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white"><Bookmark className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-5 lg:p-8 text-white z-10">
        <h1 className="font-serif text-3xl lg:text-4xl font-semibold leading-tight drop-shadow-lg">{tStr(t.name)}</h1>
        <div className="text-sm opacity-90 mt-1 drop-shadow-md">{tStr(t.established || "Ancient temple")} · {tStr(t.tier || "Major Kshetram")}</div>
        <div className="text-sm opacity-90 flex items-center gap-1 mt-1 drop-shadow-md"><MapPin className="w-4 h-4" /> {tStr(t.city)}, {tStr(t.district)} {tStr("District")}</div>
      </div>
    </div>
  );
}
