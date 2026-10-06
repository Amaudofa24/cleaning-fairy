"use client";

import { Sparkles, ArrowUpRight } from "lucide-react";
import { useBooking } from "@/features/booking";

export const FinalCTA = () => {
  const { openBookingModal } = useBooking();

  return (
    <section
      id="booking"
      className="py-10 sm:py-24 bg-fairy-bg dark:bg-fairy-dark relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-12 md:p-16 bg-fairy-deep text-white shadow-2xl relative overflow-hidden border border-white/10">
          <div className="absolute inset-0 diamond-pattern opacity-60 pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-fairy-teal/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 border border-white/15 text-2xs sm:text-sm font-semibold mb-3 sm:mb-6 backdrop-blur-md text-fairy-teal">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Instant Online Booking</span>
            </div>

            <h2 className="text-xl xs:text-2xl sm:text-4xl md:text-6xl font-black text-white tracking-tight leading-tight mb-3 sm:mb-6">
              Ready to come home to a <br className="hidden sm:inline" />
              <span className="text-fairy-teal">clean space?</span>
            </h2>

            <p className="text-xs sm:text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-5 sm:mb-10 leading-relaxed font-normal">
              No phone calls, no WhatsApp back-and-forth. Just instant,
              transparent home cleaning booked in under 60 seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openBookingModal()}
                className="w-full sm:w-auto group inline-flex items-center justify-between sm:justify-center gap-2 sm:gap-3 bg-white hover:bg-slate-100 text-fairy-deep font-extrabold pl-4 sm:pl-8 pr-2 sm:pr-3 py-2.5 sm:py-3.5 rounded-full shadow-2xl transition-all cursor-pointer hover:scale-105"
              >
                <span className="text-xs sm:text-base">Book a Cleaning Service</span>
                <div className="w-7 sm:w-10 h-7 sm:h-10 rounded-full bg-fairy-teal flex items-center justify-center text-white group-hover:rotate-45 transition-transform shadow-xs">
                  <ArrowUpRight className="w-3.5 sm:w-5 h-3.5 sm:h-5 stroke-2" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
