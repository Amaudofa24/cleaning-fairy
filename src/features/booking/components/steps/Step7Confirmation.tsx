"use client";

import React from "react";
import { useBooking } from "@/store/context/BookingContext";
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

  // Format date display
  const formatDateDisplay = () => {
    if (!formData.date) return "Scheduled Cleaning";
    try {
      const dateObj = new Date(formData.date);
      const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });
      const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
      const dayNum = dateObj.getDate();
      return `${dayName}, ${monthName} ${dayNum} · ${formData.timeSlot}`;
    } catch {
      return `${formData.date} · ${formData.timeSlot}`;
    }
  };

  return (
    <div className="text-center space-y-6 py-4">
      {/* Sparkle Icon Badge */}
      <div className="w-16 h-16 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center mx-auto text-teal-400 shadow-xl shadow-teal-500/20 animate-bounce">
        <Sparkles className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          🧚🏽 Your Cleaning Fairy has been booked!
        </h2>
        <p className="text-sm text-gray-300 mt-2 max-w-md mx-auto leading-relaxed">
          Your payment was successful and your cleaner will be assigned shortly.
        </p>
      </div>

      {/* Booking Summary Box */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3 max-w-md mx-auto text-xs sm:text-sm">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Booking Reference
          </span>
          <span className="text-sm font-extrabold text-teal-400 font-mono">
            {bookingId || "CF-000128"}
          </span>
        </div>

        <div className="space-y-2 text-gray-200">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
            <span className="font-semibold">{formatDateDisplay()}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Home className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              {getServiceLabel()} ({getHomeSizeLabel()})
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
            <span>
              {formData.address}, {formData.area}
            </span>
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300 max-w-md mx-auto flex items-center justify-center gap-2">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>Email confirmation sent to {formData.email || "your inbox"}</span>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={handleFinish}
          className="w-full sm:w-auto fairy-btn-teal px-10 py-3.5 rounded-full text-sm font-bold shadow-xl"
        >
          View My Booking
        </button>
      </div>
    </div>
  );
};
