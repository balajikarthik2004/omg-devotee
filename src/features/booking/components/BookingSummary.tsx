import { useTranslation } from "react-i18next";
import { CreditCard, CheckCircle2, ShieldCheck, Lock, PackagePlus, Leaf } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import type { BookingCart } from "@/routes/_app.booking.$slug";

export function BookingSummary({ cart, setCart, details, onPay, isProcessing }: any) {
  const { t: tStr } = useTranslation();
  
  const [loadingText, setLoadingText] = useState(() => tStr("Initiating secure connection..."));

  // Calculate totals
  const total = useMemo(() => {
    let t = 0;
    if (cart.darshan.type) t += cart.darshan.persons * cart.darshan.price;
    cart.poojas.forEach((p: any) => t += p.price);
    cart.prasadam.forEach((p: any) => t += p.qty * p.price);
    t += cart.archana.price;
    if (cart.accommodations.type) t += cart.accommodations.nights * cart.accommodations.price;
    if (cart.venues.type) t += cart.venues.price;
    return t;
  }, [cart]);

  // Upsell check
  const hasDarshanOrPooja = !!cart.darshan.type || cart.poojas.length > 0;
  const missingPrasadamOrArchana = (cart.prasadam.length === 0 || !cart.archana.optIn) && hasDarshanOrPooja;
  const [showUpsell, setShowUpsell] = useState(missingPrasadamOrArchana);

  useEffect(() => {
    if (isProcessing) {
      const timers = [
        setTimeout(() => setLoadingText(tStr("Authenticating payment...")), 800),
        setTimeout(() => setLoadingText(tStr("Verifying with bank...")), 1800),
        setTimeout(() => setLoadingText(tStr("Confirming transaction...")), 2800),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [isProcessing, tStr]);

  const handleAddArchanaUpsell = () => {
    setCart({ ...cart, archana: { ...cart.archana, optIn: true, price: 150 } });
    setShowUpsell(false);
  };

  if (isProcessing) {
    return (
      <div className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
        
        <div className="relative z-10 mb-8">
          <div className="w-20 h-20 relative">
            <style>{`
              @keyframes dash {
                0% { stroke-dasharray: 1, 300; stroke-dashoffset: 0; }
                50% { stroke-dasharray: 150, 300; stroke-dashoffset: -40; }
                100% { stroke-dasharray: 150, 300; stroke-dashoffset: -280; }
              }
            `}</style>
            <svg className="w-full h-full animate-[spin_2s_linear_infinite]" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-100" />
              <circle cx="50" cy="50" r="46" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeLinecap="round" className="text-blue-600 animate-[dash_1.5s_ease-in-out_infinite]" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Lock className="w-6 h-6 text-blue-500 animate-pulse" />
            </div>
          </div>
        </div>
        
        <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 relative z-10">{tStr("Processing Payment")}</h3>
        <div className="h-6 relative z-10 mb-6 overflow-hidden flex items-center justify-center">
          <p key={loadingText} className="text-sm font-medium text-slate-500 animate-in slide-in-from-bottom-2 fade-in duration-300">{loadingText}</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-100 px-4 py-2 rounded-full relative z-10 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-emerald-500" /> {tStr("100% Secure & Encrypted")}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* UPSELL SECTION */}
      {showUpsell && !cart.archana.optIn && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 shadow-sm relative overflow-hidden animate-in zoom-in-95">
          <div className="absolute top-0 right-0 p-4 opacity-10"><Leaf className="w-32 h-32 text-emerald-600" /></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <PackagePlus className="w-8 h-8" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-emerald-900 text-lg">{tStr("Enhance your visit!")}</h3>
              <p className="text-sm text-emerald-700/80 mt-1 font-medium">{tStr("Add an Archana Thattu to your booking. Delivered in a 100% biodegradable bag directly to the temple pickup counter. Walk in empty-handed!")}</p>
            </div>
            <button onClick={handleAddArchanaUpsell} className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-full hover:bg-emerald-700 transition-colors shrink-0 shadow-md">
              + {tStr("Add for ₹150")}
            </button>
          </div>
        </div>
      )}

      {/* SUMMARY SECTION */}
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
        <h3 className="font-serif text-lg font-bold text-slate-900 mb-4">{tStr("Comprehensive Booking Summary")}</h3>
        
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mb-4 space-y-4">
          
          {cart.darshan.type && (
            <div className="pb-4 border-b border-slate-200/60 border-dashed">
              <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">{tStr("Darshan Details")}</div>
              <div className="flex justify-between items-start text-sm">
                <div>
                  <div className="font-bold text-slate-800">{tStr(cart.darshan.type)}</div>
                  <div className="text-slate-500 mt-0.5">{cart.darshan.date?.toLocaleDateString("en-IN")} at {cart.darshan.time}</div>
                  <div className="text-slate-500">{cart.darshan.persons} {tStr("Devotees")}</div>
                </div>
                <div className="font-bold text-saffron">{cart.darshan.price === 0 ? tStr("Free") : `₹${cart.darshan.price * cart.darshan.persons}`}</div>
              </div>
            </div>
          )}

          {cart.poojas.length > 0 && (
            <div className="pb-4 border-b border-slate-200/60 border-dashed">
              <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">{tStr("Special Poojas")}</div>
              {cart.poojas.map((p: any) => (
                <div key={p.id} className="flex justify-between items-center text-sm mb-2 last:mb-0">
                  <span className="font-bold text-slate-800">{tStr(p.name)}</span>
                  <span className="font-bold text-slate-600">₹{p.price}</span>
                </div>
              ))}
            </div>
          )}

          {(cart.prasadam.length > 0 || cart.archana.optIn) && (
            <div className="pb-4 border-b border-slate-200/60 border-dashed">
              <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 flex items-center justify-between">
                {tStr("Prasadam & Archana")}
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[9px]">PICKUP AT COUNTER</span>
              </div>
              
              {cart.archana.optIn && (
                <div className="flex justify-between items-start text-sm mb-3">
                  <div>
                    <div className="font-bold text-slate-800">{tStr("Zero-Plastic Archana Thattu")}</div>
                    {cart.archana.partnerDelivery && <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">+ {tStr("Partner flower/rice delivery")}</div>}
                  </div>
                  <span className="font-bold text-slate-600">₹{cart.archana.price}</span>
                </div>
              )}

              {cart.prasadam.map((p: any) => (
                <div key={p.id} className="flex justify-between items-center text-sm mb-2 last:mb-0">
                  <span className="font-medium text-slate-800">{tStr(p.name)} <span className="text-slate-400 text-xs">x{p.qty}</span></span>
                  <span className="font-bold text-slate-600">₹{p.price * p.qty}</span>
                </div>
              ))}
            </div>
          )}

          {(cart.accommodations.type || cart.venues.type) && (
            <div className="pb-1">
              <div className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2">{tStr("Campus Facilities")}</div>
              {cart.accommodations.type && (
                <div className="flex justify-between items-start text-sm mb-3">
                  <div>
                    <div className="font-bold text-slate-800">{tStr(cart.accommodations.type)}</div>
                    <div className="text-slate-500 mt-0.5">{cart.accommodations.nights} {tStr("Nights")}</div>
                  </div>
                  <span className="font-bold text-slate-600">₹{cart.accommodations.price * cart.accommodations.nights}</span>
                </div>
              )}
              {cart.venues.type && (
                <div className="flex justify-between items-start text-sm">
                  <div className="font-bold text-slate-800">{tStr(cart.venues.type)}</div>
                  <span className="font-bold text-slate-600">₹{cart.venues.price}</span>
                </div>
              )}
            </div>
          )}
          
        </div>

        <div className="flex items-center justify-between py-3 border-t-2 border-slate-200 border-dashed mb-6">
          <span className="text-base font-bold text-slate-900">{tStr("Total Payable")}</span>
          <span className="text-2xl font-black text-slate-900">{total === 0 ? tStr("Free") : `₹${total.toLocaleString()}`}</span>
        </div>

        <button
          onClick={onPay}
          className="w-full relative group inline-flex items-center justify-center gap-2.5 text-base font-bold text-white px-6 py-4 rounded-full transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-emerald-500 to-teal-500 overflow-hidden shadow-lg shadow-emerald-500/30"
        >
          <CreditCard className="w-5 h-5 relative z-10" />
          <span className="relative z-10 tracking-wide">{tStr("Pay securely")}</span>
        </button>
      </div>
    </div>
  );
}
