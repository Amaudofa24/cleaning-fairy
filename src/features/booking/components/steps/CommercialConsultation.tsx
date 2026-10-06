"use client";

import React, { useState } from "react";
import {
  Building2,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  Mail,
  Clock,
} from "lucide-react";
import { COMMERCIAL_CALENDLY_URL } from "@/features/landing/constants";
import { useBooking } from "@/store/context/BookingContext";

export const CommercialConsultation = () => {
  const { updateFormData, closeBookingModal } = useBooking();
  const [hasClickedBook, setHasClickedBook] = useState(false);

  const handleOpenCalendly = () => {
    setHasClickedBook(true);
    window.open(COMMERCIAL_CALENDLY_URL, "_blank", "noopener,noreferrer");
  };

  const handleSwitchToResidential = () => {
    updateFormData({ serviceType: "standard" });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-fairy-deep text-white relative overflow-hidden shadow-xl border border-white/10">
        <div className="absolute inset-0 diamond-pattern opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-fairy-teal/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 border border-white/15 text-2xs sm:text-xs font-semibold mb-3 sm:mb-5 backdrop-blur-md text-fairy-teal">
            <Building2 className="w-3.5 h-3.5" />
            <span>Commercial Cleaning</span>
          </div>

          <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 sm:mb-3">
            Let&apos;s discuss your cleaning requirements
          </h2>

          <p className="text-xs sm:text-base text-white/85 leading-relaxed font-medium max-w-xl">
            Every commercial space is different. Book a consultation with our
            team to discuss your requirements and get a tailored quote.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
          <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-fairy-teal/15 text-fairy-teal-dark dark:text-fairy-teal flex items-center justify-center mb-2">
            <Calendar className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 sm:mb-1">
            1. Select a Date & Time
          </h4>
          <p className="text-2xs text-slate-600 dark:text-gray-400 leading-relaxed">
            Pick a convenient slot for a quick consultation call with our team.
          </p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
          <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-fairy-teal/15 text-fairy-teal-dark dark:text-fairy-teal flex items-center justify-center mb-2">
            <Mail className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 sm:mb-1">
            2. Share Space Details
          </h4>
          <p className="text-2xs text-slate-600 dark:text-gray-400 leading-relaxed">
            Enter your commercial space size, frequency, and custom needs.
          </p>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/10">
          <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-fairy-teal/15 text-fairy-teal-dark dark:text-fairy-teal flex items-center justify-center mb-2">
            <CheckCircle2 className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 sm:mb-1">
            3. Instant Confirmation
          </h4>
          <p className="text-2xs text-slate-600 dark:text-gray-400 leading-relaxed">
            Receive a calendar invite and custom quote tailored to your budget.
          </p>
        </div>
      </div>

      <div className="space-y-2 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-fairy-accent-light/70 dark:bg-white/5 border border-fairy-teal/30">
        <p className="text-xs font-bold text-fairy-deep dark:text-white flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-fairy-teal" />
          <span>Suitable for all commercial operations in Lagos:</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 text-2xs sm:text-xs text-slate-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-fairy-teal shrink-0" />
            <span>Offices, co-working & corporate facilities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-fairy-teal shrink-0" />
            <span>Airbnb, short-lets & hotel apartments</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-fairy-teal shrink-0" />
            <span>Restaurants, cafes, lounges & kitchens</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-fairy-teal shrink-0" />
            <span>Retail stores, salons, gyms & event venues</span>
          </div>
        </div>
      </div>

      {hasClickedBook && (
        <div className="p-3 sm:p-3.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-2xs sm:text-xs text-teal-800 dark:text-teal-300 flex items-center justify-between gap-2 animate-in fade-in">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Clock className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-fairy-teal shrink-0" />
            <span className="truncate">
              Calendly opened in a new tab. Direct link:
            </span>
          </div>
          <a
            href={COMMERCIAL_CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline flex items-center gap-1 shrink-0 hover:text-teal-900 dark:hover:text-white"
          >
            <span>Open Link</span>
            <ExternalLink className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
          </a>
        </div>
      )}

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleSwitchToResidential}
          className="text-xs font-semibold text-slate-600 dark:text-gray-400 hover:text-fairy-teal transition-colors flex items-center gap-1.5 cursor-pointer order-2 sm:order-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Switch to residential home cleaning</span>
        </button>

        <button
          type="button"
          onClick={handleOpenCalendly}
          className="w-full sm:w-auto fairy-btn-teal px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-xl cursor-pointer order-1 sm:order-2 hover:scale-102 transition-all"
        >
          <span>Book a Consultation</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
