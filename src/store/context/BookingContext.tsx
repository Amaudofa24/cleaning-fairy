"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import {
  IBookingFormData,
  IPricingBreakdown,
  ServiceType,
  HomeSize,
  BathroomCount,
  AddonKey,
  CleaningFrequency,
} from "@/types/booking";
import { calculateBookingPrice } from "@/utils/pricingEngine";

const DEFAULT_FORM_DATA: IBookingFormData = {
  serviceType: "standard",
  homeSize: "2bed",
  bathrooms: 1,
  selectedAddons: [],
  address: "",
  building: "",
  area: "Lekki Phase 1",
  landmark: "",
  fullName: "",
  phone: "",
  email: "",
  customerNote: "",
  date: "",
  timeSlot: "",
  frequency: "one-time",
};

interface BookingContextType {
  isOpen: boolean;
  currentStep: number;
  totalSteps: number;
  formData: IBookingFormData;
  pricing: IPricingBreakdown;
  bookingId: string | null;
  openBookingModal: (initialService?: ServiceType) => void;
  closeBookingModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  updateFormData: (fields: Partial<IBookingFormData>) => void;
  toggleAddon: (key: AddonKey) => void;
  resetBooking: () => void;
  setBookingConfirmed: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<IBookingFormData>(DEFAULT_FORM_DATA);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const totalSteps = 7; // 1: Service Type, 2: Home Details, 3: Add-ons, 4: Location & Contact, 5: Date & Time, 6: Payment, 7: Confirmation

  const pricing = useMemo(() => {
    return calculateBookingPrice(formData);
  }, [formData]);

  const openBookingModal = (initialService?: ServiceType) => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
    setIsOpen(true);
  };

  const closeBookingModal = () => {
    // If user has unsaved progress (past step 1 or filled details), confirm before closing
    const isTouched =
      currentStep > 1 ||
      formData.address.trim() !== "" ||
      formData.fullName.trim() !== "" ||
      formData.selectedAddons.length > 0;

    if (
      isTouched &&
      currentStep < totalSteps &&
      !window.confirm(
        "You have unsaved booking progress. Are you sure you want to close?"
      )
    ) {
      return;
    }

    setIsOpen(false);
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(totalSteps, prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const updateFormData = (fields: Partial<IBookingFormData>) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const toggleAddon = (key: AddonKey) => {
    setFormData((prev) => {
      const exists = prev.selectedAddons.includes(key);
      const nextAddons = exists
        ? prev.selectedAddons.filter((k) => k !== key)
        : [...prev.selectedAddons, key];
      return { ...prev, selectedAddons: nextAddons };
    });
  };

  const setBookingConfirmed = (id: string) => {
    setBookingId(id);
  };

  const resetBooking = () => {
    setFormData(DEFAULT_FORM_DATA);
    setCurrentStep(1);
    setBookingId(null);
  };

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        currentStep,
        totalSteps,
        formData,
        pricing,
        bookingId,
        openBookingModal,
        closeBookingModal,
        nextStep,
        prevStep,
        goToStep,
        updateFormData,
        toggleAddon,
        resetBooking,
        setBookingConfirmed,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
