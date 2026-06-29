import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Download, ArrowLeft, Info } from "lucide-react";
import QRCode from "react-qr-code";
import type { BookingCart } from "@/routes/_app.booking.$slug";

export function BookingSuccess({ t, details, cart }: any) {
  const { t: tStr } = useTranslation();
  const ticketId = `TN-HRCE-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;

  const hasPhysicalItems = cart.prasadam.length > 0 || cart.archana.optIn;

  return (
    <div className="max-w-2xl mx-auto animate-in zoom-in-95 duration-500 pb-10">
      <div className="bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgb(0,0,0,0.08)] border border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
        
        <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-4 ring-emerald-50">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">{tStr("Booking Confirmed!")}</h2>
        <p className="text-slate-500 text-sm mb-8">{tStr("Your comprehensive booking has been generated successfully. May the divine bless you!")}</p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* E-Ticket Core */}
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-6 relative">
            <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full border-r border-slate-200" />
            <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full border-l border-slate-200" />
            
            <div className="flex flex-col items-center justify-center mb-4 pb-4 border-b border-slate-200 border-dashed">
              <div className="bg-white p-2.5 rounded-xl mb-3 shadow-sm border border-slate-100">
                <QRCode value={ticketId} size={100} fgColor="#1e293b" />
              </div>
              <div className="font-mono text-xs font-bold tracking-widest text-slate-500">{ticketId}</div>
            </div>
            
            <div className="text-left space-y-3">
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">{tStr("Temple")}</div>
                <div className="font-bold text-slate-800">{tStr(t.name)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">{tStr("Primary ID")}</div>
                <div className="font-bold text-slate-800 uppercase">{details.name} ({tStr("ID:")} {details.idNumber.slice(-4).padStart(details.idNumber.length, '*')})</div>
              </div>
              
              {cart.darshan.type && (
                <div className="mt-4 pt-4 border-t border-slate-200 border-dashed">
                  <div className="text-[10px] uppercase text-saffron font-bold tracking-widest mb-1">{tStr("Darshan Entry")}</div>
                  <div className="font-bold text-slate-800">{tStr(cart.darshan.type)}</div>
                  <div className="text-xs font-semibold text-slate-500">
                    {cart.darshan.date?.toLocaleDateString("en-IN")} @ {cart.darshan.time} • {cart.darshan.persons} Persons
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Add-ons & Pickup details */}
          <div className="flex flex-col gap-4">
            
            {(cart.poojas.length > 0 || cart.accommodations.type || cart.venues.type) && (
              <div className="bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm">
                 <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">{tStr("Reserved Services")}</h4>
                 <ul className="text-sm space-y-2 text-slate-600">
                    {cart.poojas.map((p: any) => (
                      <li key={p.id} className="flex gap-2"><span className="text-saffron">•</span> {tStr(p.name)}</li>
                    ))}
                    {cart.accommodations.type && (
                      <li className="flex gap-2"><span className="text-saffron">•</span> {tStr(cart.accommodations.type)} ({cart.accommodations.nights} Nights)</li>
                    )}
                    {cart.venues.type && (
                      <li className="flex gap-2"><span className="text-saffron">•</span> {tStr(cart.venues.type)}</li>
                    )}
                 </ul>
              </div>
            )}

            {hasPhysicalItems && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-left shadow-sm relative overflow-hidden h-full">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                <h4 className="font-bold text-emerald-900 mb-2 text-sm flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-600" /> {tStr("Pickup Counter Instructions")}
                </h4>
                <p className="text-xs text-emerald-700/90 mb-3 font-medium">
                  {tStr("Please scan your QR code at the dedicated Online Services Counter inside the temple to collect the following items. You may walk in empty-handed.")}
                </p>
                <div className="bg-white/60 rounded-xl p-3 border border-emerald-100">
                  <ul className="text-sm space-y-2 text-emerald-800 font-semibold">
                    {cart.archana.optIn && (
                      <li className="flex gap-2 items-start">
                        <span className="text-emerald-500 mt-0.5">•</span> 
                        <div>
                          {tStr("Zero-Plastic Archana Thattu")}
                          {cart.archana.partnerDelivery && <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-0.5">{tStr("Includes partner delivery (Flowers/Rice)")}</div>}
                        </div>
                      </li>
                    )}
                    {cart.prasadam.map((p: any) => (
                      <li key={p.id} className="flex gap-2"><span className="text-emerald-500">•</span> {tStr(p.name)} (x{p.qty})</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="mt-8 space-y-3 sm:space-y-0 sm:flex sm:gap-4 justify-center">
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3.5 px-8 rounded-full hover:bg-slate-800 transition-all shadow-md hover:-translate-y-0.5">
            <Download className="w-4 h-4" /> {tStr("Download PDF Receipt")}
          </button>
          <Link to="/temple/$slug" params={{ slug: t.slug }} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-slate-700 font-bold py-3.5 px-8 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all">
            <ArrowLeft className="w-4 h-4" /> {tStr("Back to Temple")}
          </Link>
        </div>
      </div>
    </div>
  );
}
