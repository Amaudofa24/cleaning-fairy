"use client";

import React from "react";
import { useBooking } from "@/store/context/BookingContext";
import { formatDateDisplay } from "@/utils/misc";
import { Sparkles, Calendar, MapPin, CheckCircle2, Home } from "lucide-react";

export const Step7Confirmation = () => {
  const { formData, bookingId, resetBooking, closeBookingModal } = useBooking();

  const handleFinish = () => {
    resetBooking();
    closeBookingModal();
  };

  const getServiceLabel = () => {
    if (formData.serviceType === "standard") return "Standard Cleaning";
    if (formData.serviceType === "deep") return "Deep Cleaning";
    return "Move-in / Move-out Cleaning";
  };

  const getHomeSizeLabel = () => {
    if (formData.homeSize === "1bed") return "1 Bedroom";
    if (formData.homeSize === "2bed") return "2 Bedrooms";
    if (formData.homeSize === "3bed") return "3 Bedrooms";
    if (formData.homeSize === "4bed") return "4+ Bedrooms";
    if (formData.homeSize === "5bed") return "5+ Bedrooms";
    return "Duplex";
  };

  return (
    <div className="text-center space-y-6 py-4">
      <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center mx-auto text-teal-600 dark:text-teal-400 shadow-xl shadow-teal-500/20 animate-bounce">
        <Sparkles className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          🧚🏽 Your Cleaning Fairy has been booked!
        </h2>
        <p className="text-sm text-slate-600 dark:text-gray-300 mt-2 max-w-md mx-auto leading-relaxed">
          Your payment was successful and your cleaner will be assigned shortly.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left space-y-3 max-w-md mx-auto text-xs sm:text-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider block">
              Booking Reference
            </span>
            <span className="text-[11px] text-slate-500 dark:text-gray-400 block mt-0.5">
              You can use your booking reference to view your booking
            </span>
          </div>
          <span className="text-sm sm:text-base font-extrabold text-teal-700 dark:text-teal-400 font-mono">
            {bookingId || "CF-000128"}
          </span>
        </div>

        <div className="space-y-2 text-slate-700 dark:text-gray-200">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="font-semibold">
              {formatDateDisplay(formData.date, formData.timeSlot)}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Home className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>
              {getServiceLabel()} ({getHomeSizeLabel()})
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span>
              {formData.address}, {formData.area}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-300 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Email confirmation sent to {formData.email || "your inbox"}</span>
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleFinish}
          className="w-full sm:w-auto fairy-btn-teal px-10 py-3.5 rounded-full text-sm font-bold shadow-xl cursor-pointer"
        >
          View My Booking
        </button>
      </div>
    </div>
  );
};
