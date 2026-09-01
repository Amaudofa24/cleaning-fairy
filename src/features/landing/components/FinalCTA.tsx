"use client";

import { Sparkles } from "lucide-react";
import { useBooking } from "@/features/booking";

export const FinalCTA = () => {
  const { openBookingModal } = useBooking();

  return (
    <section
      id="booking"
      className="py-24 bg-fairy-card relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-160 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="glass-card rounded-3xl p-8 sm:p-16 border border-teal-500/30 bg-linear-to-b from-white/5 to-teal-950/20 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 text-xs sm:text-sm font-semibold mb-6 border border-teal-500/20">
            <Sparkles className="w-4 h-4" />
            <span>Instant Online Booking</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Ready to come home to a <br className="hidden sm:inline" />
            <span className="fairy-gradient-text">clean space?</span>
          </h2>

          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            No phone calls, no WhatsApp back-and-forth. Just instant,
            transparent home cleaning booked in under 60 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => openBookingModal()}
              className="w-full sm:w-auto fairy-btn-teal px-10 py-4 rounded-full text-base font-extrabold flex items-center justify-center gap-3 group shadow-2xl cursor-pointer"
            >
              <span>Book a Cleaning Service</span>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
