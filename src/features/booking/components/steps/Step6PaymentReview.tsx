"use client";

import React, { useState } from "react";
import { useBooking } from "@/store/context/BookingContext";
import { ADDONS_CONFIG } from "@/utils/pricingEngine";
import { generateBookingReference } from "@/utils/misc";
import { CleaningFrequency } from "@/types/booking";
import {
  ShieldCheck,
  CreditCard,
  Building,
  Loader2,
  AlertCircle,
  Clock,
  RotateCcw,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { PolicyModal, PolicyTab } from "@/features/landing/components/PolicyModal";

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

  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank_transfer">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab>("cancellation");

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentError(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const randomId = generateBookingReference("CF");
      setBookingConfirmed(randomId);
      setIsProcessing(false);
      nextStep();
    } catch {
      setIsProcessing(false);
      setPaymentError(true);
    }
  };

  const openPolicy = (tab: PolicyTab) => {
    setPolicyTab(tab);
    setPolicyModalOpen(true);
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
    <>
      <div className="space-y-4 sm:space-y-6 max-h-form-mobile sm:max-h-form-desktop overflow-y-auto pr-1">
        <div className="space-y-2.5 sm:space-y-3">
          <label className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider block">
            How often would you like Cleaning Fairy to clean? (Optional)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
            {FREQUENCY_OPTIONS.map((opt) => {
              const isSelected = formData.frequency === opt.key;
              return (
                <button
                  type="button"
                  key={opt.key}
                  onClick={() => updateFormData({ frequency: opt.key })}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    isSelected
                      ? "bg-teal-500/15 border-teal-500 text-slate-900 dark:text-white shadow-xs"
                      : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-700 dark:text-gray-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold">{opt.label}</span>
                      {opt.badge && (
                        <span className="text-2xs font-extrabold text-teal-700 dark:text-teal-300 bg-teal-500/20 px-1.5 py-0.5 rounded">
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs-plus text-slate-500 dark:text-gray-400 block leading-tight">
                      {opt.sub}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2.5 sm:pb-3">
            <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Review & Line Item Breakdown
            </h3>
            <span className="text-2xs sm:text-xs text-teal-700 dark:text-teal-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 100% Guaranteed
            </span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-gray-300 font-mono">
            <div className="flex justify-between items-center gap-2">
              <span className="truncate">
                {getServiceLabel()} ({getHomeSizeLabel()})
              </span>
              <span className="font-semibold text-slate-900 dark:text-white shrink-0">
                ₦{pricing.basePrice.toLocaleString()}
              </span>
            </div>

            {pricing.extraBathroomFee > 0 && (
              <div className="flex justify-between items-center gap-2">
                <span className="truncate">Extra Bathrooms ({formData.bathrooms - 1})</span>
                <span className="font-semibold text-slate-900 dark:text-white shrink-0">
                  +₦{pricing.extraBathroomFee.toLocaleString()}
                </span>
              </div>
            )}

            {formData.selectedAddons.map((key) => {
              const addon = ADDONS_CONFIG.find((a) => a.key === key);
              if (!addon) return null;
              return (
                <div key={key} className="flex justify-between items-center gap-2 text-teal-700 dark:text-teal-300">
                  <span className="truncate">{addon.label} (add-on)</span>
                  <span className="shrink-0">+₦{addon.price.toLocaleString()}</span>
                </div>
              );
            })}

            <div className="flex justify-between items-center gap-2">
              <span className="truncate">Service Charge ({formData.area || "Lagos Zone"})</span>
              <span className="font-semibold text-slate-900 dark:text-white shrink-0">
                +₦{pricing.transportFee.toLocaleString()}
              </span>
            </div>

            {pricing.discountAmount > 0 && (
              <div className="flex justify-between items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
                <span className="truncate">Recurring Frequency Discount</span>
                <span className="shrink-0">-₦{pricing.discountAmount.toLocaleString()}</span>
              </div>
            )}

            <div className="border-t border-slate-200 dark:border-white/10 pt-2.5 sm:pt-3 flex justify-between items-baseline font-sans">
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase">
                Total Amount
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-teal-700 dark:text-teal-400">
                ₦{pricing.total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Payment Method (Powered by Paystack)</span>
            </span>
            <span className="text-2xs font-extrabold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
              Encrypted & Safe
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                paymentMethod === "card"
                  ? "bg-teal-500/15 border-teal-500 text-slate-900 dark:text-white shadow-xs"
                  : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:border-slate-300"
              }`}
            >
              <CreditCard className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <span className="text-xs font-bold block">Debit / Credit Card</span>
                <span className="text-2xs text-slate-500 dark:text-gray-400">Instant Verification</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("bank_transfer")}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                paymentMethod === "bank_transfer"
                  ? "bg-teal-500/15 border-teal-500 text-slate-900 dark:text-white shadow-xs"
                  : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:border-slate-300"
              }`}
            >
              <Building className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <span className="text-xs font-bold block">Bank Transfer</span>
                <span className="text-2xs text-slate-500 dark:text-gray-400">Dedicated Virtual Account</span>
              </div>
            </button>
          </div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 space-y-2 text-2xs sm:text-xs text-teal-900 dark:text-teal-200">
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Cleaning Fairy Policy Safeguards</span>
            </span>
            <button
              type="button"
              onClick={() => openPolicy("cancellation")}
              className="text-teal-700 dark:text-teal-400 underline hover:opacity-80 cursor-pointer"
            >
              View Full Policy
            </button>
          </div>

          <ul className="space-y-1 text-slate-600 dark:text-teal-300/80 leading-relaxed">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
              <span><strong>100% Refund</strong> if cancelled &gt; 24h prior • <strong>50% Refund</strong> if 12–24h prior.</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
              <span><strong>Free Rescheduling</strong> up to 12h prior (₦5,000 late fee if &lt; 12h).</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
              <span><strong>Cleaner No-show Guarantee:</strong> 100% refund or free rebooking.</span>
            </li>
          </ul>
        </div>

        {paymentError && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 dark:text-red-400 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Payment was unsuccessful. Your booking has not been confirmed.</span>
            </div>
            <button
              type="button"
              onClick={handlePayment}
              className="px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-700 dark:text-red-300 font-bold cursor-pointer shrink-0"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={prevStep}
            disabled={isProcessing}
            className="order-2 sm:order-1 px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 disabled:opacity-50 cursor-pointer text-center"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handlePayment}
            disabled={isProcessing}
            className="order-1 sm:order-2 fairy-btn-teal px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Paystack Payment...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                <span>Pay ₦{pricing.total.toLocaleString()} & Confirm</span>
              </>
            )}
          </button>
        </div>
      </div>

      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        initialTab={policyTab}
      />
    </>
  );
};
