"use client";

import React from "react";
import { useBooking } from "@/store/context/BookingContext";
import { HomeSize, BathroomCount } from "@/types/booking";

const HOME_SIZE_OPTIONS: { key: HomeSize; label: string }[] = [
  { key: "1bed", label: "1 Bedroom" },
  { key: "2bed", label: "2 Bedrooms" },
  { key: "3bed", label: "3 Bedrooms" },
  { key: "4bed", label: "4+ Bedrooms" },
  { key: "5bed", label: "5+ Bedrooms" },
  { key: "duplex", label: "Duplex" },
];

const BATHROOM_OPTIONS: { count: BathroomCount; label: string }[] = [
  { count: 1, label: "1 Bathroom" },
  { count: 2, label: "2 Bathrooms (+₦3,000)" },
  { count: 3, label: "3 Bathrooms (+₦6,000)" },
  { count: 4, label: "4+ Bathrooms (+₦9,000)" },
];

export const Step2HomeDetails = () => {
  const { formData, updateFormData, pricing, nextStep, prevStep } = useBooking();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Tell us about your home
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 mt-1">
          Select your property size and number of bathrooms to calculate your base price.
        </p>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block">
          Home size (select one):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
          {HOME_SIZE_OPTIONS.map((opt) => {
            const isSelected = formData.homeSize === opt.key;
            return (
              <button
                type="button"
                key={opt.key}
                onClick={() => updateFormData({ homeSize: opt.key })}
                className={`py-2.5 sm:py-3 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer text-center ${
                  isSelected
                    ? "bg-teal-500 text-white dark:text-teal-950 border-teal-400 shadow-md shadow-teal-500/10"
                    : "bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-gray-200 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2.5 sm:space-y-3">
        <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block">
          Number of bathrooms (select one):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
          {BATHROOM_OPTIONS.map((opt) => {
            const isSelected = formData.bathrooms === opt.count;
            return (
              <button
                type="button"
                key={opt.count}
                onClick={() => updateFormData({ bathrooms: opt.count })}
                className={`py-2.5 sm:py-3 px-2 sm:px-3 rounded-xl text-2xs xs:text-xs sm:text-sm font-bold border transition-all text-center cursor-pointer ${
                  isSelected
                    ? "bg-teal-500 text-white dark:text-teal-950 border-teal-400 shadow-md shadow-teal-500/10"
                    : "bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-gray-200 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-1 sm:gap-2">
        <span className="text-2xs xs:text-xs text-slate-700 dark:text-gray-300 font-medium">
          Estimated Base Price (Service + Bathrooms):
        </span>
        <span className="text-base sm:text-lg font-extrabold text-teal-700 dark:text-teal-400">
          ₦{(pricing.basePrice + pricing.extraBathroomFee).toLocaleString()}
        </span>
      </div>

      <div className="pt-2 sm:pt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={prevStep}
          className="px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-pointer"
        >
          Back
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="fairy-btn-teal px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
