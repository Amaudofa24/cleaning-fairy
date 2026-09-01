"use client";

import React from "react";
import { useBooking } from "@/store/context/BookingContext";
import { ADDONS_CONFIG } from "@/utils/pricingEngine";
import { Check } from "lucide-react";

export const Step3Addons = () => {
  const { formData, toggleAddon, pricing, nextStep, prevStep } = useBooking();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Make your cleaning extra magical ✨
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Select any extra add-on services to include in your booking.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
        {ADDONS_CONFIG.map((addon) => {
          const isSelected = formData.selectedAddons.includes(addon.key);
          return (
            <div
              key={addon.key}
              onClick={() => toggleAddon(addon.key)}
              className={`p-4 rounded-xl cursor-pointer transition-all border flex items-center justify-between ${
                isSelected
                  ? "bg-teal-500/10 border-teal-400 text-white shadow-md shadow-teal-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20 text-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-teal-500 border-teal-400 text-teal-950"
                      : "border-white/30 bg-black/20"
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span className="text-sm font-semibold">{addon.label}</span>
              </div>

              <span className="text-xs font-bold text-teal-400">
                +₦{addon.price.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>

      {/* Persistent Subtotal Bar */}
      <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-between">
        <span className="text-xs text-gray-300 font-semibold uppercase tracking-wider">
          Current Subtotal:
        </span>
        <span className="text-xl font-extrabold text-white">
          ₦{pricing.subtotal.toLocaleString()}
        </span>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-gray-300 hover:text-white bg-white/5 border border-white/10"
        >
          Back
        </button>

        <button
          type="button"
          onClick={nextStep}
          className="fairy-btn-teal px-8 py-3 rounded-full text-sm font-bold shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
