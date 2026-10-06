"use client";

import React from "react";
import { useBooking } from "@/store/context/BookingContext";
import { ExpandableServiceCard } from "../ExpandableServiceCard";
import { ServiceType } from "@/types/booking";

export const Step1ServiceType = () => {
  const { formData, updateFormData, nextStep } = useBooking();

  const handleSelect = (type: ServiceType) => {
    updateFormData({ serviceType: type });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          What do you need cleaned?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 mt-1">
          Select a service type below to get started. Tapping any card selects it.
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <ExpandableServiceCard
          id="standard"
          title="Standard Cleaning"
          subtitle="Regular upkeep to keep your space fresh."
          isSelected={formData.serviceType === "standard"}
          onSelect={handleSelect}
          features={[
            "Dusting all visible surfaces",
            "Sweeping and mopping floors",
            "Vacuuming carpets and rugs",
            "Bathroom cleaning (toilet, sink, shower/tub)",
            "Kitchen surface wipe-down",
            "Trash removal",
            "Bed making and general tidying",
          ]}
        />

        <ExpandableServiceCard
          id="deep"
          title="Deep Cleaning"
          subtitle="A thorough top-to-bottom reset."
          isSelected={formData.serviceType === "deep"}
          onSelect={handleSelect}
          featuresHeader="Everything in Standard, plus"
          features={[
            "Baseboards, door frames, and light switches",
            "Detailed bathroom scrub (grout and tile deep clean)",
            "Exterior of kitchen cabinets and appliances",
            "Window sills and skirting boards",
            "Cobwebs and ceiling corners",
            "Under-furniture cleaning where accessible",
          ]}
        />

        <ExpandableServiceCard
          id="move-in-out"
          title="Move-in / Move-out Cleaning"
          subtitle="A spotless start or finish."
          isSelected={formData.serviceType === "move-in-out"}
          onSelect={handleSelect}
          featuresHeader="Everything in Deep, plus"
          features={[
            "Inside all cabinets, drawers, and closets",
            "Full interior and exterior window cleaning",
            "Wall spot-cleaning (scuffs and marks)",
            "Full appliance exterior detailing",
            "Complete floor detailing, corner to corner",
            "Final move-ready walkthrough check",
          ]}
        />

        <ExpandableServiceCard
          id="commercial"
          title="Commercial Cleaning"
          subtitle="Offices, Airbnb, restaurants & customized facilities."
          isSelected={formData.serviceType === "commercial"}
          onSelect={handleSelect}
          featuresHeader="Consultation & Tailored Proposal"
          features={[
            "Custom cleaning schedule & dedicated scope",
            "Offices, studios, co-working & facilities",
            "Airbnb, hotel apartments & short-let turnaround",
            "Restaurants, commercial kitchens & venues",
            "Tailored volume pricing & invoice support",
          ]}
        />
      </div>

      <div className="pt-2 sm:pt-4 flex justify-end">
        <button
          type="button"
          onClick={nextStep}
          className="w-full sm:w-auto fairy-btn-teal px-8 py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg cursor-pointer text-center"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
