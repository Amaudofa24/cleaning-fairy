"use client";

import React, { useEffect } from "react";
import { useBooking } from "@/store/context/BookingContext";
import StepIndicator from "@/components/shared/StepIndicator";
import { X, Sparkles } from "lucide-react";

import { Step1ServiceType } from "./steps/Step1ServiceType";
import { Step2HomeDetails } from "./steps/Step2HomeDetails";
import { Step3Addons } from "./steps/Step3Addons";
import { Step4LocationContact } from "./steps/Step4LocationContact";
import { Step5DateTime } from "./steps/Step5DateTime";
import { Step6PaymentReview } from "./steps/Step6PaymentReview";
import { Step7Confirmation } from "./steps/Step7Confirmation";

export const BookingModal = () => {
  const {
    isOpen,
    currentStep,
    totalSteps,
    closeBookingModal,
    pricing,
  } = useBooking();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeBookingModal();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeBookingModal]);

  if (!isOpen) return null;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1ServiceType />;
      case 2:
        return <Step2HomeDetails />;
      case 3:
        return <Step3Addons />;
      case 4:
        return <Step4LocationContact />;
      case 5:
        return <Step5DateTime />;
      case 6:
        return <Step6PaymentReview />;
      case 7:
        return <Step7Confirmation />;
      default:
        return <Step1ServiceType />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={closeBookingModal}
      />

      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div
          className="w-full max-w-2xl transform rounded-3xl bg-fairy-card border border-white/10 p-5 sm:p-8 text-left align-middle shadow-2xl transition-all relative overflow-hidden my-6 z-10 animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient glow background */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  Step {currentStep} of {totalSteps}
                </span>
              </div>

              <StepIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                activeColor="bg-teal-400"
                inactiveColor="bg-white/10"
                className="hidden sm:flex"
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Persistent Subtotal Badge visible from Step 3 to Step 6 */}
              {currentStep >= 3 && currentStep < 7 && (
                <div className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-white bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                  <span className="text-gray-400 font-medium">Subtotal:</span>
                  <span className="text-teal-400">
                    ₦{pricing.subtotal.toLocaleString()}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={closeBookingModal}
                className="p-2 rounded-full text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Step Body */}
          <div className="relative z-10">{renderStepContent()}</div>
        </div>
      </div>
    </div>
  );
};
