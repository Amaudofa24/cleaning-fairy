"use client";

import React from "react";
import { useBooking } from "@/store/context/BookingContext";
import { Modal, StepIndicator, ConfirmDialog } from "@/components/shared";
import { Sparkles, Building2 } from "lucide-react";

import { Step1ServiceType } from "./steps/Step1ServiceType";
import { Step2HomeDetails } from "./steps/Step2HomeDetails";
import { Step3Addons } from "./steps/Step3Addons";
import { Step4LocationContact } from "./steps/Step4LocationContact";
import { Step5DateTime } from "./steps/Step5DateTime";
import { Step6PaymentReview } from "./steps/Step6PaymentReview";
import { Step7Confirmation } from "./steps/Step7Confirmation";
import { CommercialConsultation } from "./steps/CommercialConsultation";

export const BookingModal = () => {
  const {
    isOpen,
    currentStep,
    totalSteps,
    formData,
    closeBookingModal,
    showExitConfirm,
    confirmExit,
    cancelExit,
    pricing,
  } = useBooking();

  const isCommercial = formData.serviceType === "commercial";

  const renderStepContent = () => {
    if (isCommercial) {
      return <CommercialConsultation />;
    }

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
    <Modal
      open={isOpen}
      handleClose={closeBookingModal}
      stopOutsideClickClose={showExitConfirm}
      size={isCommercial ? "xl" : "2xl"}
      showAmbientGlow
      headerLeft={
        isCommercial ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-400 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Commercial Consultation</span>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 dark:text-teal-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                Step {currentStep} of {totalSteps}
              </span>
            </div>

            <StepIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              activeColor="bg-teal-500"
              inactiveColor="bg-slate-200 dark:bg-white/10"
              className="hidden sm:flex"
            />
          </div>
        )
      }
      headerRight={
        !isCommercial && currentStep >= 3 && currentStep < 7 ? (
          <div className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-slate-800 dark:text-white bg-slate-100 dark:bg-black/40 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10">
            <span className="text-slate-500 dark:text-gray-400 font-medium">Subtotal:</span>
            <span className="text-teal-600 dark:text-teal-400">
              ₦{pricing.subtotal.toLocaleString()}
            </span>
          </div>
        ) : null
      }
    >
      <ConfirmDialog
        isOpen={showExitConfirm}
        title="Unsaved Booking Progress"
        description="You have unsaved booking details. Are you sure you want to exit? Your selected options will be discarded."
        confirmText="Discard & Exit"
        cancelText="Keep Booking"
        onConfirm={confirmExit}
        onCancel={cancelExit}
        variant="warning"
      />

      <div className="relative z-10">{renderStepContent()}</div>
    </Modal>
  );
};
