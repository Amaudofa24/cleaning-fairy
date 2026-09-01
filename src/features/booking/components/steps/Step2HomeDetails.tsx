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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Tell us about your home
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Select your property size and number of bathrooms to calculate your base price.
        </p>
      </div>

      {/* Home Size Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
          Home size (select one):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {HOME_SIZE_OPTIONS.map((opt) => {
            const isSelected = formData.homeSize === opt.key;
            return (
              <button
                type="button"
                key={opt.key}
                onClick={() => updateFormData({ homeSize: opt.key })}
                className={`py-3 px-4 rounded-xl text-sm font-bold border transition-all ${
                  isSelected
                    ? "bg-teal-500 text-teal-950 border-teal-400 shadow-md shadow-teal-500/10"
                    : "bg-white/5 text-gray-200 border-white/10 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Number of Bathrooms Selector */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
          Number of bathrooms (select one):
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {BATHROOM_OPTIONS.map((opt) => {
            const isSelected = formData.bathrooms === opt.count;
            return (
              <button
                type="button"
                key={opt.count}
                onClick={() => updateFormData({ bathrooms: opt.count })}
                className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                  isSelected
                    ? "bg-teal-500 text-teal-950 border-teal-400 shadow-md shadow-teal-500/10"
                    : "bg-white/5 text-gray-200 border-white/10 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Estimated Base Price Hint */}
      <div className="p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-between">
        <span className="text-xs text-gray-300 font-medium">
          Estimated Base Price (Service + Bathrooms):
        </span>
        <span className="text-lg font-extrabold text-teal-400">
          ₦{(pricing.basePrice + pricing.extraBathroomFee).toLocaleString()}
        </span>
      </div>

      <div className="pt-4 flex items-center justify-between">
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
