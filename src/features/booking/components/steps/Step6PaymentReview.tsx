"use client";

import React, { useState } from "react";
import { useBooking } from "@/store/context/BookingContext";
import { ADDONS_CONFIG } from "@/utils/pricingEngine";
import { CleaningFrequency } from "@/types/booking";
import { ShieldCheck, CreditCard, Loader2, AlertCircle } from "lucide-react";

const FREQUENCY_OPTIONS: {
  key: CleaningFrequency;
  label: string;
  sub: string;
  badge?: string;
}[] = [
  {
    key: "one-time",
    label: "One-time",
    sub: "Single cleaning session",
  },
  {
    key: "weekly",
    label: "Weekly",
    sub: "Consistently clean",
    badge: "Save 10%",
  },
  {
    key: "bi-weekly",
    label: "Every 2 weeks",
    sub: "A regular reset",
    badge: "Save 5%",
  },
  {
    key: "monthly",
    label: "Monthly",
    sub: "Deep refresh",
  },
];

export const Step6PaymentReview = () => {
  const { formData, updateFormData, pricing, nextStep, prevStep, setBookingConfirmed } =
    useBooking();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError(false);

    // Simulate online payment processing (Paystack / gateway)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Generate human-referenceable booking ID e.g. CF-000128
      const randomId = `CF-${Math.floor(100000 + Math.random() * 900000)}`;
      setBookingConfirmed(randomId);
      setIsProcessing(false);
      nextStep(); // Advance to Confirmation
    } catch {
      setIsProcessing(false);
      setPaymentError(true);
    }
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
    <div className="space-y-6 max-h-[480px] overflow-y-auto pr-1">
      {/* Recurring Frequency Option */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
          How often would you like Cleaning Fairy to clean? (Optional)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {FREQUENCY_OPTIONS.map((opt) => {
            const isSelected = formData.frequency === opt.key;
            return (
              <button
                type="button"
                key={opt.key}
                onClick={() => updateFormData({ frequency: opt.key })}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  isSelected
                    ? "bg-teal-500/15 border-teal-400 text-white"
                    : "bg-white/5 border-white/10 hover:border-white/20 text-gray-300"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-xs font-bold">{opt.label}</span>
                    {opt.badge && (
                      <span className="text-[10px] font-extrabold text-teal-300 bg-teal-500/20 px-1.5 py-0.5 rounded">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-gray-400 block leading-tight">
                    {opt.sub}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Review & Line Item Breakdown */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Review & Line Item Breakdown
          </h3>
          <span className="text-xs text-teal-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> 100% Guaranteed
          </span>
        </div>

        <div className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-mono">
          <div className="flex justify-between items-center">
            <span>
              {getServiceLabel()} ({getHomeSizeLabel()})
            </span>
            <span className="font-semibold text-white">
              ₦{pricing.basePrice.toLocaleString()}
            </span>
          </div>

          {pricing.extraBathroomFee > 0 && (
            <div className="flex justify-between items-center">
              <span>Extra Bathrooms ({formData.bathrooms - 1})</span>
              <span className="font-semibold text-white">
                +₦{pricing.extraBathroomFee.toLocaleString()}
              </span>
            </div>
          )}

          {formData.selectedAddons.map((key) => {
            const addon = ADDONS_CONFIG.find((a) => a.key === key);
            if (!addon) return null;
            return (
              <div key={key} className="flex justify-between items-center text-teal-300">
                <span>{addon.label} (add-on)</span>
                <span>+₦{addon.price.toLocaleString()}</span>
              </div>
            );
          })}

          <div className="flex justify-between items-center">
            <span>Transport ({formData.area || "Lagos Zone"})</span>
            <span className="font-semibold text-white">
              +₦{pricing.transportFee.toLocaleString()}
            </span>
          </div>

          {pricing.discountAmount > 0 && (
            <div className="flex justify-between items-center text-emerald-400">
              <span>Recurring Frequency Discount</span>
              <span>-₦{pricing.discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="border-t border-white/10 pt-3 flex justify-between items-baseline font-sans">
            <span className="text-sm font-bold text-white uppercase">
              Total Amount
            </span>
            <span className="text-2xl font-extrabold text-teal-400">
              ₦{pricing.total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {paymentError && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Payment was unsuccessful. Your booking has not been confirmed.</span>
          </div>
          <button
            type="button"
            onClick={handlePayment}
            className="px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="pt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          disabled={isProcessing}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-gray-300 hover:text-white bg-white/5 border border-white/10 disabled:opacity-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handlePayment}
          disabled={isProcessing}
          className="fairy-btn-teal px-8 py-3.5 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing Payment...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 text-teal-950" />
              <span>Pay & Confirm Booking</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
