import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemple } from "@/data/temples";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { BookingHeader } from "@/features/booking/components/BookingHeader";
import { DateTimeSelector } from "@/features/booking/components/DateTimeSelector";
import { ServiceSelection } from "@/features/booking/components/ServiceSelection";
import { BookingForm } from "@/features/booking/components/BookingForm";
import { BookingSummary } from "@/features/booking/components/BookingSummary";
import { BookingSuccess } from "@/features/booking/components/BookingSuccess";
import { UpcomingEvents } from "@/features/booking/components/UpcomingEvents";
import { Check, Sparkles, Star, Crown } from "lucide-react";

export const Route = createFileRoute("/_app/booking/$slug")({
  loader: ({ params }) => {
    const t = getTemple(params.slug);
    if (!t) throw notFound();
    return { temple: t };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Comprehensive Booking — ${loaderData?.temple.name}` }],
  }),
  component: BookingPage,
});

export const DARSHAN_CATEGORIES = [
  { id: "special", name: "Special Darshan", price: 50, desc: "Standard special queue", icon: Sparkles },
  { id: "vip", name: "VIP Darshan", price: 200, desc: "Fast-track entry", icon: Star },
  { id: "vvip", name: "VVIP Darshan", price: 500, desc: "Direct sanctum access", icon: Crown },
];

export type BookingCart = {
  darshan: { type: string; persons: number; price: number; date: Date | null; time: string };
  poojas: Array<{ id: string; name: string; price: number }>;
  prasadam: Array<{ id: string; name: string; qty: number; price: number }>;
  archana: { optIn: boolean; partnerDelivery: boolean; price: number };
  accommodations: { type: string; nights: number; price: number; checkIn: Date | null };
  venues: { type: string; price: number; date: Date | null };
};

function BookingPage() {
  const { temple: t } = Route.useLoaderData();
  const { t: tStr } = useTranslation();

  const [cart, setCart] = useState<BookingCart>({
    darshan: { type: "", persons: 1, price: 0, date: null, time: "" },
    poojas: [],
    prasadam: [],
    archana: { optIn: false, partnerDelivery: false, price: 0 },
    accommodations: { type: "", nights: 1, price: 0, checkIn: null },
    venues: { type: "", price: 0, date: null }
  });

  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const [visitTime, setVisitTime] = useState<string>("");

  const [details, setDetails] = useState({ name: "", phone: "", idNumber: "" });
  const [errors, setErrors] = useState<any>({});
  
  // Steps: 1: Schedule, 2: Devotee, 3: Services, 4: Checkout, 5: Processing/Success
  const [step, setStep] = useState<1 | 2 | 3 | 4 | "processing" | "success">(1);

  const handleProceedToDevotee = () => {
    if (!visitDate || !visitTime) {
      setErrors({ date: tStr("Please select a date and time for your visit.") });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToServices = () => {
    const errs: any = {};
    if (!details.name.trim()) errs.name = tStr("Name is required");
    if (details.phone.length < 10) errs.phone = tStr("Valid phone required");
    if (details.idNumber.length < 4) errs.idNumber = tStr("Valid ID required");

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = () => {
    const errs: any = {};
    const hasDarshan = !!cart.darshan.type;
    const hasPoojas = cart.poojas.length > 0;
    const hasPrasadam = cart.prasadam.length > 0;
    const hasArchana = cart.archana.optIn;
    const hasAcc = !!cart.accommodations.type;
    const hasVenue = !!cart.venues.type;

    if (!hasDarshan && !hasPoojas && !hasPrasadam && !hasArchana && !hasAcc && !hasVenue) {
      errs.general = tStr("Please select at least one service to proceed.");
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePay = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3500);
  };

  let currentStep = typeof step === "number" ? step : 4;

  return (
    <div className="pb-32 lg:pb-8 min-h-screen bg-[#fafafc] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-saffron/10 via-amber-500/5 to-transparent pointer-events-none z-0" />
      <BookingHeader t={t} />

      {/* Stepper UI */}
      <div className="max-w-3xl mx-auto px-4 mt-8 mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-5 -translate-y-1/2 h-1 bg-slate-200 rounded-full z-0" />
          <div className="absolute left-0 top-5 -translate-y-1/2 h-1 bg-gradient-to-r from-saffron to-amber-500 transition-all duration-700 ease-in-out rounded-full z-0" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '33%' : currentStep === 3 ? '66%' : '100%' }} />
          
          {[1, 2, 3, 4].map(num => (
            <div key={num} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ease-out 
                ${currentStep > num ? "bg-gradient-to-br from-saffron to-amber-500 text-white shadow-lg shadow-amber-500/40 ring-4 ring-amber-50 scale-100" 
                : currentStep === num ? "bg-white text-saffron border-2 border-saffron shadow-lg shadow-saffron/20 ring-4 ring-saffron/10 scale-110" 
                : "bg-white/80 backdrop-blur-sm border-2 border-slate-200/60 text-slate-400 scale-100 shadow-sm"}`}>
                {currentStep > num ? <Check className="w-5 h-5" /> : num}
              </div>
              <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-300 ${currentStep === num ? "text-saffron" : currentStep > num ? "text-slate-800" : "text-slate-400"}`}>
                {num === 1 ? tStr("Schedule") : num === 2 ? tStr("Devotee") : num === 3 ? tStr("Services") : tStr("Checkout")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 xl:px-10 pt-2 relative z-20">
        {step === "success" ? (
          <BookingSuccess t={t} details={details} cart={cart} visitDate={visitDate} visitTime={visitTime} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              
              {errors.date && step === 1 && (
                <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 font-bold text-sm shadow-sm">
                  {errors.date}
                </div>
              )}
              
              {/* STEP 1: SCHEDULE */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 overflow-hidden">
                    <h3 className="font-serif text-2xl font-bold text-slate-800 mb-6">{tStr("When are you visiting?")}</h3>
                    <DateTimeSelector
                      t={t}
                      selectedDate={visitDate}
                      setSelectedDate={(d: Date) => { setVisitDate(d); setErrors((e: any) => ({ ...e, date: null })); }}
                      selectedTime={visitTime}
                      setSelectedTime={(time: string) => { setVisitTime(time); setErrors((e: any) => ({ ...e, time: null })); }}
                    />
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button onClick={handleProceedToDevotee} className="bg-slate-900 text-white font-bold px-10 py-4 rounded-full hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-0.5 active:scale-95">
                      {tStr("Continue to Devotee Info")}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DEVOTEE INFO */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <BookingForm details={details} setDetails={setDetails} errors={errors} />
                  <div className="flex justify-between mt-6">
                    <button onClick={() => setStep(1)} className="text-slate-600 font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition-colors border-2 border-transparent">
                      {tStr("Back to Schedule")}
                    </button>
                    <button onClick={handleProceedToServices} className="bg-slate-900 text-white font-bold px-10 py-4 rounded-full hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-0.5 active:scale-95">
                      {tStr("Continue to Services")}
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SERVICES */}
              {errors.general && step === 3 && (
                <div className="bg-rose-50 text-rose-600 p-4 rounded-xl border border-rose-100 font-bold text-sm shadow-sm">
                  {errors.general}
                </div>
              )}
              
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <ServiceSelection cart={cart} setCart={setCart} errors={errors} setErrors={setErrors} t={t} visitDate={visitDate} />
                  
                  <div className="flex justify-between mt-8">
                    <button onClick={() => setStep(2)} className="text-slate-600 font-bold px-8 py-4 rounded-full hover:bg-slate-100 transition-colors border-2 border-transparent">
                      {tStr("Back to Devotee Info")}
                    </button>
                    <button onClick={handleProceedToCheckout} className="bg-slate-900 text-white font-bold px-10 py-4 rounded-full hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-0.5 active:scale-95">
                      {tStr("Continue to Checkout")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {step !== 4 && step !== "processing" && (
              <div className="space-y-6">
                <UpcomingEvents slug={t.slug} />
              </div>
            )}
          </div>
        )}

        {/* STEP 4: CHECKOUT */}
        {(step === 4 || step === "processing") && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <BookingSummary
              cart={cart} setCart={setCart}
              details={details}
              visitDate={visitDate}
              visitTime={visitTime}
              onPay={handlePay}
              isProcessing={step === "processing"}
            />
            
            {step === 4 && (
              <div className="flex justify-center mt-6">
                <button onClick={() => setStep(3)} className="text-slate-500 font-bold px-6 py-3 hover:text-slate-800 transition-colors">
                  {tStr("Back to Services")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
