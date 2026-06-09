import { createFileRoute, notFound } from "@tanstack/react-router";
import { getTemple } from "@/data/temples";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { BookingHeader } from "@/features/booking/components/BookingHeader";
import { DateTimeSelector } from "@/features/booking/components/DateTimeSelector";
import { BookingForm } from "@/features/booking/components/BookingForm";
import { BookingSummary } from "@/features/booking/components/BookingSummary";
import { BookingSuccess } from "@/features/booking/components/BookingSuccess";
import { UpcomingEvents } from "@/features/booking/components/UpcomingEvents";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_app/booking/$slug")({
  loader: ({ params }) => {
    const t = getTemple(params.slug);
    if (!t) throw notFound();
    return { temple: t };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Special Darshan Booking — ${loaderData?.temple.name}` }],
  }),
  component: BookingPage,
});

import { Star, Sparkles, Crown } from "lucide-react";

export const DARSHAN_CATEGORIES = [
  { id: "special", name: "Special Darshan", price: 50, desc: "Standard special queue", icon: Sparkles },
  { id: "vip", name: "VIP Darshan", price: 200, desc: "Fast-track entry", icon: Star },
  { id: "vvip", name: "VVIP Darshan", price: 500, desc: "Direct sanctum access", icon: Crown },
];

function BookingPage() {
  const { temple: t } = Route.useLoaderData();
  const { t: tStr } = useTranslation();

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [details, setDetails] = useState({ persons: 1, name: "", phone: "", idNumber: "", categoryId: "vip" });
  const [errors, setErrors] = useState<any>({});
  
  const [step, setStep] = useState<1 | 2 | 3 | "processing" | "success">(1);

  const handleProceedToDetails = () => {
    if (!selectedDate || !selectedTime) {
      setErrors({ date: tStr("Please select a date and time.") });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrors({});
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToPayment = () => {
    const errs: any = {};
    if (!details.name.trim()) errs.name = tStr("Name is required");
    if (details.phone.length < 10) errs.phone = tStr("Valid 10-digit phone number required");
    if (details.idNumber.length < 4) errs.idNumber = tStr("Valid ID number required");

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePay = () => {
    setStep("processing");
    // Simulate secure payment processing
    setTimeout(() => {
      setStep("success");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3500);
  };

  let currentStep = typeof step === "number" ? step : 3;

  return (
    <div className="pb-32 lg:pb-8 min-h-screen bg-slate-50/50">
      <BookingHeader t={t} />

      {/* Stepper UI */}
      <div className="max-w-2xl mx-auto px-4 mt-10 mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-5 -translate-y-1/2 h-1 bg-slate-200 rounded-full z-0" />
          <div className="absolute left-0 top-5 -translate-y-1/2 h-1 bg-gradient-to-r from-saffron to-amber-500 transition-all duration-700 ease-in-out rounded-full z-0" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }} />
          
          {[1, 2, 3].map(num => (
            <div key={num} className="relative z-10 flex flex-col items-center gap-3 bg-slate-50/50 px-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ease-out 
                ${currentStep > num ? "bg-gradient-to-br from-saffron to-amber-500 text-white shadow-lg shadow-amber-500/40 ring-4 ring-amber-50 scale-100" 
                : currentStep === num ? "bg-white text-saffron border-2 border-saffron shadow-lg shadow-saffron/20 ring-4 ring-saffron/10 scale-110" 
                : "bg-white border-2 border-slate-200 text-slate-400 scale-100"}`}>
                {currentStep > num ? <Check className="w-5 h-5" /> : num}
              </div>
              <span className={`text-xs uppercase tracking-widest font-bold transition-colors duration-300 ${currentStep === num ? "text-saffron" : currentStep > num ? "text-slate-800" : "text-slate-400"}`}>
                {num === 1 ? tStr("Schedule") : num === 2 ? tStr("Details") : tStr("Payment")}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 lg:px-8 pt-4 relative z-20">
        {step === "success" ? (
          <BookingSuccess t={t} details={details} selectedDate={selectedDate} selectedTime={selectedTime} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {errors.date && step === 1 && (
                <div className="bg-rose-50 text-rose-600 p-3 rounded-xl border border-rose-100 font-medium text-sm">
                  {tStr("Please select a valid date and time slot.")}
                </div>
              )}
              
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <DateTimeSelector
                    t={t}
                    selectedDate={selectedDate}
                    setSelectedDate={(d: Date) => { setSelectedDate(d); setErrors((e: any) => ({ ...e, date: null })); }}
                    selectedTime={selectedTime}
                    setSelectedTime={(tStr: string) => { setSelectedTime(tStr); setErrors((e: any) => ({ ...e, time: null })); }}
                  />
                  <div className="flex justify-end mt-6">
                    <button onClick={handleProceedToDetails} className="bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                      {tStr("Continue to Details")}
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <BookingForm details={details} setDetails={setDetails} errors={errors} />
                  <div className="flex justify-between mt-6">
                    <button onClick={() => setStep(1)} className="text-slate-600 font-bold px-6 py-3.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent">
                      {tStr("Back")}
                    </button>
                    <button onClick={handleProceedToPayment} className="bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition-colors shadow-lg">
                      {tStr("Continue to Payment")}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {step !== 3 && step !== "processing" && (
              <div className="space-y-6">
                <UpcomingEvents slug={t.slug} />
              </div>
            )}
          </div>
        )}

        {/* Step 3: Centered Payment Card */}
        {(step === 3 || step === "processing") && (
          <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            <BookingSummary
              details={details}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onPay={handlePay}
              isProcessing={step === "processing"}
            />
            
            {step === 3 && (
              <div className="flex justify-center mt-6">
                <button onClick={() => setStep(2)} className="text-slate-500 font-bold px-6 py-3 hover:text-slate-800 transition-colors">
                  {tStr("Back to Details")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
