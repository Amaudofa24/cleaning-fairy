"use client";

import React from "react";
import { useBooking } from "@/store/context/BookingContext";
import { formatDateDisplay } from "@/utils/misc";
import { Sparkles, Calendar, MapPin, CheckCircle2, Home, Mail, ArrowUpRight } from "lucide-react";

export const Step7Confirmation = () => {
  const { formData, bookingId, resetBooking, closeBookingModal, openTrackingModal } =
    useBooking();

  const handleFinishAndTrack = () => {
    const idToTrack = bookingId || "CF-000128";
    resetBooking();
    closeBookingModal();
    openTrackingModal(idToTrack);
  };

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

  const formattedDate = formatDateDisplay(formData.date);
  const timeSlot = formData.timeSlot || "10:00 AM";
  const refId = bookingId || "CF-839201";

  return (
    <div className="text-center space-y-4 sm:space-y-6 py-2 sm:py-4 max-h-form-mobile sm:max-h-form-desktop overflow-y-auto pr-1">
      <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center mx-auto text-teal-600 dark:text-teal-400 shadow-xl shadow-teal-500/20 animate-bounce">
        <Sparkles className="w-6 sm:w-8 h-6 sm:h-8" />
      </div>

      <div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          🧚🏽 Your Cleaning Fairy has been booked!
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 mt-1.5 max-w-md mx-auto leading-relaxed">
          Your payment was successful and your cleaner will be assigned shortly.
        </p>
      </div>

      <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-teal-500/10 border border-teal-500/20 text-left max-w-md mx-auto space-y-2">
        <div className="flex items-center gap-2 text-teal-900 dark:text-teal-200 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Email Confirmation Dispatched</span>
        </div>
        <p className="text-xs font-mono text-slate-700 dark:text-gray-200 leading-relaxed bg-white/70 dark:bg-white/5 p-3 rounded-xl border border-teal-500/20">
          &quot;Your cleaning service has been booked for <strong>{formattedDate}</strong> at <strong>{timeSlot}</strong>. Booking Reference: <strong>{refId}</strong>.&quot;
        </p>
      </div>

      <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-left space-y-2.5 sm:space-y-3 max-w-md mx-auto text-xs sm:text-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2.5 sm:pb-3">
          <div>
            <span className="text-2xs sm:text-xs font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider block">
              Booking Reference
            </span>
            <span className="text-2xs sm:text-xs-plus text-slate-500 dark:text-gray-400 block mt-0.5">
              Use your booking reference to track or reschedule
            </span>
          </div>
          <span className="text-xs sm:text-base font-extrabold text-teal-700 dark:text-teal-400 font-mono">
            {refId}
          </span>
        </div>

        <div className="space-y-2 text-slate-700 dark:text-gray-200 text-xs sm:text-sm">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="font-semibold truncate">
              {formatDateDisplay(formData.date, formData.timeSlot)}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <Home className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="truncate">
              {getServiceLabel()} ({getHomeSizeLabel()})
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="truncate">
              {formData.address || "14 Admiralty Way"}, {formData.area || "Lekki Phase 1"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <div className="p-2.5 sm:p-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-2xs sm:text-xs text-slate-600 dark:text-gray-400 flex items-center justify-center gap-1.5 sm:gap-2 text-center">
          <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-teal-600 dark:text-teal-400 shrink-0" />
          <span className="truncate">Cleaner assignment email will be sent prior to {formattedDate}</span>
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={handleFinishAndTrack}
          className="w-full sm:w-auto fairy-btn-teal px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-xl flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View & Manage My Booking</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleFinish}
          className="w-full sm:w-auto px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
