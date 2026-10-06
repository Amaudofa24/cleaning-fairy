"use client";

import React from "react";
import { useBooking } from "@/store/context/BookingContext";
import { ADDONS_CONFIG } from "@/utils/pricingEngine";
import { Check } from "lucide-react";

export const Step3Addons = () => {
  const { formData, toggleAddon, pricing, nextStep, prevStep } = useBooking();

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Make your cleaning extra magical ✨
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 mt-1">
          Select any extra add-on services to include in your booking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-h-72 sm:max-h-96 overflow-y-auto pr-1">
        {ADDONS_CONFIG.map((addon) => {
          const isSelected = formData.selectedAddons.includes(addon.key);
          return (
            <div
              key={addon.key}
              onClick={() => toggleAddon(addon.key)}
              className={`p-3 sm:p-4 rounded-xl cursor-pointer transition-all border flex items-center justify-between gap-2 ${
                isSelected
                  ? "bg-teal-500/10 border-teal-500 text-slate-900 dark:text-white shadow-md shadow-teal-500/10"
                  : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div
                  className={`w-4 sm:w-5 h-4 sm:h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-teal-500 border-teal-400 text-white dark:text-teal-950"
                      : "border-slate-300 dark:border-white/30 bg-slate-100 dark:bg-black/20"
                  }`}
                >
                  {isSelected && <Check className="w-3 sm:w-3.5 h-3 sm:h-3.5 stroke-2" />}
                </div>
                <span className="text-xs sm:text-sm font-semibold truncate">{addon.label}</span>
              </div>

              <span className="text-2xs sm:text-xs font-bold text-teal-700 dark:text-teal-400 shrink-0">
                +₦{addon.price.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 sm:p-4 rounded-xl bg-slate-100 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/10 flex items-center justify-between">
        <span className="text-2xs sm:text-xs text-slate-600 dark:text-gray-300 font-semibold uppercase tracking-wider">
          Current Subtotal:
        </span>
        <span className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
          ₦{pricing.subtotal.toLocaleString()}
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
