import { useTranslation } from "react-i18next";
import { Sparkles, Star, Crown, PackageOpen, Flower2, Leaf, Bed, Tent, Flame, Heart, Store, Building } from "lucide-react";
import { DARSHAN_CATEGORIES } from "@/routes/_app.booking.$slug";
import { useState } from "react";

const POOJAS = [
  { id: "p1", name: "Kala Santhi Pooja", price: 250, icon: Flame },
  { id: "p2", name: "Uchikalam Pooja", price: 300, icon: Flame },
  { id: "p3", name: "Sayarakshai Pooja", price: 400, icon: Flame },
];

const PRASADAM_ITEMS = [
  { id: "pr1", name: "Special Laddoo", price: 50 },
  { id: "pr2", name: "Tamarind Rice (Puliyodarai)", price: 80 },
  { id: "pr3", name: "Sweet Pongal (Sakkara Pongal)", price: 60 },
];

const ACCOMMODATIONS = [
  { id: "a1", name: "Standard Non-AC Room", price: 500, icon: Bed },
  { id: "a2", name: "Deluxe AC Room", price: 1200, icon: Bed },
  { id: "a3", name: "Family Cottage", price: 2500, icon: Tent },
];

const VENUES = [
  { id: "v1", name: "Kalyana Mandapam (Marriage Hall)", price: 25000, icon: Building },
  { id: "v2", name: "Mini Party Hall (Annadhanam)", price: 5000, icon: Store },
];

export function ServiceSelection({ cart, setCart, errors, setErrors, t }: any) {
  const { t: tStr } = useTranslation();
  
  const [activeTab, setActiveTab] = useState<"darshan" | "poojas" | "prasadam" | "accommodations" | "venues">("poojas");

  const updateDarshan = (updates: any) => {
    setCart({ ...cart, darshan: { ...cart.darshan, ...updates } });
    if (errors.darshan) setErrors({ ...errors, darshan: null });
  };

  const togglePooja = (p: any) => {
    const exists = cart.poojas.find((x: any) => x.id === p.id);
    if (exists) {
      setCart({ ...cart, poojas: cart.poojas.filter((x: any) => x.id !== p.id) });
    } else {
      setCart({ ...cart, poojas: [...cart.poojas, p] });
    }
  };

  const updatePrasadam = (p: any, delta: number) => {
    const existing = cart.prasadam.find((x: any) => x.id === p.id);
    let newItems = [...cart.prasadam];
    
    if (existing) {
      const newQty = existing.qty + delta;
      if (newQty <= 0) {
        newItems = newItems.filter((x: any) => x.id !== p.id);
      } else {
        existing.qty = newQty;
      }
    } else if (delta > 0) {
      newItems.push({ ...p, qty: 1 });
    }
    
    setCart({ ...cart, prasadam: newItems });
  };

  const getPrasadamQty = (id: string) => {
    const p = cart.prasadam.find((x: any) => x.id === id);
    return p ? p.qty : 0;
  };

  const toggleArchana = () => {
    setCart({ 
      ...cart, 
      archana: { ...cart.archana, optIn: !cart.archana.optIn, price: !cart.archana.optIn ? 150 : 0 }
    });
  };

  const togglePartnerDelivery = () => {
    setCart({ 
      ...cart, 
      archana: { ...cart.archana, partnerDelivery: !cart.archana.partnerDelivery, price: cart.archana.optIn ? (!cart.archana.partnerDelivery ? 250 : 150) : 0 }
    });
  };

  const selectAccommodation = (a: any) => {
    if (cart.accommodations.type === a.name) {
      setCart({ ...cart, accommodations: { type: "", nights: 1, price: 0, checkIn: null } });
    } else {
      setCart({ ...cart, accommodations: { type: a.name, nights: 1, price: a.price, checkIn: new Date() } });
    }
  };

  const selectVenue = (v: any) => {
    if (cart.venues.type === v.name) {
      setCart({ ...cart, venues: { type: "", price: 0, date: null } });
    } else {
      setCart({ ...cart, venues: { type: v.name, price: v.price, date: new Date() } });
    }
  };

  const tabs = [
    // { id: "darshan", label: tStr("Darshan") },
    { id: "poojas", label: tStr("Poojas & Archana") },
    { id: "prasadam", label: tStr("Prasadam") },
    { id: "accommodations", label: tStr("Rooms") },
    { id: "venues", label: tStr("Venues") },
  ] as const;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 overflow-hidden relative">
      
      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-6 border-b border-slate-100 gap-2 hide-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
              activeTab === tab.id 
                ? "bg-saffron text-white shadow-md shadow-saffron/20" 
                : "bg-slate-50 text-slate-500 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* DARSHAN SECTION 
      {activeTab === "darshan" && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
          <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">{tStr("Select Darshan Category")}</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {DARSHAN_CATEGORIES.map(cat => (
              <div 
                key={cat.id} 
                onClick={() => {
                  // Toggle off if already selected, otherwise set it
                  if (cart.darshan.type === cat.name) {
                    updateDarshan({ type: "", price: 0 });
                  } else {
                    updateDarshan({ type: cat.name, price: cat.price });
                  }
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  cart.darshan.type === cat.name ? "border-saffron bg-saffron/5 shadow-sm" : "border-slate-100 hover:border-saffron/40"
                }`}
              >
                <cat.icon className={`w-8 h-8 mb-3 ${cart.darshan.type === cat.name ? "text-saffron" : "text-slate-400"}`} />
                <div className="font-bold text-slate-800">{tStr(cat.name)}</div>
                <div className="text-sm font-semibold text-saffron mt-1">{cat.price === 0 ? tStr("Free") : `₹${cat.price}`}</div>
                <div className="text-xs text-slate-500 mt-2">{tStr(cat.desc)}</div>
              </div>
            ))}
          </div>

          {cart.darshan.type && (
            <>
              <div className="mb-8">
                <h3 className="font-serif text-lg font-bold text-slate-800 mb-3">{tStr("Number of Devotees")}</h3>
                <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl inline-flex border border-slate-200">
                  <button onClick={() => updateDarshan({ persons: Math.max(1, cart.darshan.persons - 1) })} className="w-10 h-10 rounded-lg bg-white border border-slate-200 font-bold text-slate-600 hover:bg-slate-100 transition-colors">-</button>
                  <span className="font-bold w-4 text-center">{cart.darshan.persons}</span>
                  <button onClick={() => updateDarshan({ persons: Math.min(10, cart.darshan.persons + 1) })} className="w-10 h-10 rounded-lg bg-white border border-slate-200 font-bold text-slate-600 hover:bg-slate-100 transition-colors">+</button>
                </div>
              </div>

              {errors.darshan && (
                <div className="bg-rose-50 text-rose-600 p-3 rounded-xl border border-rose-100 font-medium text-sm mb-4">
                  {errors.darshan}
                </div>
              )}
            </>
          )}
        </div>
      )}
      */}

      {/* POOJAS & ARCHANA SECTION */}
      {activeTab === "poojas" && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
          <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">{tStr("Special Poojas")}</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {POOJAS.map(p => {
              const isSelected = !!cart.poojas.find((x: any) => x.id === p.id);
              return (
                <div 
                  key={p.id} 
                  onClick={() => togglePooja(p)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected ? "border-saffron bg-saffron/5 shadow-sm" : "border-slate-100 hover:border-saffron/40"
                  }`}
                >
                  <p.icon className={`w-5 h-5 mt-0.5 ${isSelected ? "text-saffron" : "text-slate-400"}`} />
                  <div>
                    <div className="font-bold text-sm text-slate-800 leading-tight">{tStr(p.name)}</div>
                    <div className="text-sm font-semibold text-saffron mt-1">₹{p.price}</div>
                  </div>
                </div>
              )
            })}
          </div>

          <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">{tStr("Archana Thattu & Offerings")}</h3>
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-5 mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Leaf className="w-24 h-24 text-emerald-600" />
            </div>
            <div className="relative z-10">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={cart.archana.optIn} onChange={toggleArchana} className="mt-1 w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                <div>
                  <div className="font-bold text-slate-800 text-lg flex items-center gap-2">
                    {tStr("Add Archana Thattu")} <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Zero Plastic</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {tStr("Includes coconut, betel leaves, camphor, and fruits. Packaged in a 100% biodegradable bag. Pick up empty-handed at the temple counter.")}
                  </p>
                  <div className="text-emerald-700 font-bold mt-2">₹150</div>
                </div>
              </label>

              {cart.archana.optIn && (
                <div className="mt-4 pt-4 border-t border-emerald-200/50 animate-in slide-in-from-top-2 duration-300">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={cart.archana.partnerDelivery} onChange={togglePartnerDelivery} className="mt-1 w-5 h-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
                    <div>
                      <div className="font-bold text-slate-800 flex items-center gap-2">
                        <Flower2 className="w-4 h-4 text-emerald-600" /> {tStr("Add Fresh Flower Garland & Rice")} 
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        {tStr("Sourced from local temple vendors and delivered directly to your pickup counter.")}
                      </p>
                      <div className="text-emerald-700 font-bold mt-1">+ ₹100</div>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PRASADAM SECTION */}
      {activeTab === "prasadam" && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="flex items-center gap-3 mb-6 bg-blue-50 text-blue-800 p-4 rounded-xl border border-blue-100">
            <PackageOpen className="w-6 h-6 shrink-0" />
            <div className="text-sm">
              <span className="font-bold block">{tStr("Skip the Queue!")}</span>
              {tStr("Pre-book your Prasadam online. Collect directly at the dedicated Online Pickup Counter inside the temple.")}
            </div>
          </div>

          <div className="grid gap-3">
            {PRASADAM_ITEMS.map(p => {
              const qty = getPrasadamQty(p.id);
              return (
                <div key={p.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors bg-slate-50/50">
                  <div>
                    <div className="font-bold text-slate-800">{tStr(p.name)}</div>
                    <div className="text-saffron font-bold text-sm">₹{p.price}</div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                    <button onClick={() => updatePrasadam(p, -1)} className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 font-bold text-slate-600 hover:bg-slate-200">-</button>
                    <span className="font-bold w-6 text-center text-sm">{qty}</span>
                    <button onClick={() => updatePrasadam(p, 1)} className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 font-bold text-slate-600 hover:bg-slate-200">+</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ACCOMMODATIONS SECTION */}
      {activeTab === "accommodations" && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
          <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">{tStr("Temple Accommodations")}</h3>
          <p className="text-sm text-slate-500 mb-6">{tStr("Book rooms located inside the serene temple campus for your stay.")}</p>
          
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {ACCOMMODATIONS.map(a => {
              const isSelected = cart.accommodations.type === a.name;
              return (
                <div 
                  key={a.id} 
                  onClick={() => selectAccommodation(a)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    isSelected ? "border-saffron bg-saffron/5 shadow-sm" : "border-slate-100 hover:border-saffron/40"
                  }`}
                >
                  <a.icon className={`w-6 h-6 mb-3 ${isSelected ? "text-saffron" : "text-slate-400"}`} />
                  <div className="font-bold text-slate-800 text-sm">{tStr(a.name)}</div>
                  <div className="text-sm font-semibold text-saffron mt-1">₹{a.price} {tStr("/ night")}</div>
                </div>
              )
            })}
          </div>

          {cart.accommodations.type && (
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 animate-in zoom-in-95">
              <span className="font-bold text-sm text-slate-700">{tStr("Number of Nights:")}</span>
              <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-slate-200">
                <button onClick={() => setCart({...cart, accommodations: {...cart.accommodations, nights: Math.max(1, cart.accommodations.nights - 1)}})} className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 font-bold hover:bg-slate-200">-</button>
                <span className="font-bold w-4 text-center text-sm">{cart.accommodations.nights}</span>
                <button onClick={() => setCart({...cart, accommodations: {...cart.accommodations, nights: Math.min(14, cart.accommodations.nights + 1)}})} className="w-8 h-8 rounded-md bg-slate-50 border border-slate-100 font-bold hover:bg-slate-200">+</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VENUES SECTION */}
      {activeTab === "venues" && (
        <div className="animate-in fade-in slide-in-from-left-4 duration-300">
          <h3 className="font-serif text-xl font-bold text-slate-800 mb-4">{tStr("Marriage & Party Halls")}</h3>
          <p className="text-sm text-slate-500 mb-6">{tStr("Reserve divine venues for your auspicious events.")}</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {VENUES.map(v => {
              const isSelected = cart.venues.type === v.name;
              return (
                <div 
                  key={v.id} 
                  onClick={() => selectVenue(v)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex gap-4 items-center ${
                    isSelected ? "border-saffron bg-saffron/5 shadow-sm" : "border-slate-100 hover:border-saffron/40"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isSelected ? "bg-saffron text-white" : "bg-slate-100 text-slate-400"}`}>
                    <v.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-800">{tStr(v.name)}</div>
                    <div className="text-sm font-semibold text-saffron mt-1">₹{v.price.toLocaleString()} {tStr("/ day")}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}
