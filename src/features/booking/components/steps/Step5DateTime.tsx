"use client";

import React, { useState } from "react";
import { useBooking } from "@/store/context/BookingContext";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

const TIME_SLOTS = [
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
];

export const Step5DateTime = () => {
  const { formData, updateFormData, nextStep, prevStep } = useBooking();
  const [error, setError] = useState("");

  // Get tomorrow's date string formatted as YYYY-MM-DD for min date
  const tomorrowStr = React.useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const handleNext = () => {
    if (!formData.date) {
      setError("Please select a date for your cleaning.");
      return;
    }
    if (!formData.timeSlot) {
      setError("Please select an available time slot.");
      return;
    }
    setError("");
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          When should your Fairy arrive?
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Pick your preferred date and time slot for cleaner arrival.
        </p>
      </div>

      {/* Date Picker */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
          Select Date *
        </label>
        <div className="relative">
          <input
            type="date"
            min={tomorrowStr}
            value={formData.date}
            onChange={(e) => {
              setError("");
              updateFormData({ date: e.target.value });
            }}
            className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
          />
        </div>
      </div>

      {/* Time Slot Picker */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider block">
          Available Time Slots *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TIME_SLOTS.map((slot) => {
            const isSelected = formData.timeSlot === slot;
            return (
              <button
                type="button"
                key={slot}
                onClick={() => {
                  setError("");
                  updateFormData({ timeSlot: slot });
                }}
                className={`py-3.5 px-3 rounded-xl text-sm font-bold border transition-all flex items-center justify-center gap-2 ${
                  isSelected
                    ? "bg-teal-500 text-teal-950 border-teal-400 shadow-md shadow-teal-500/10"
                    : "bg-white/5 text-gray-200 border-white/10 hover:border-white/30 hover:bg-white/10"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{slot}</span>
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium">
          {error}
        </div>
      )}

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
          onClick={handleNext}
          className="fairy-btn-teal px-8 py-3 rounded-full text-sm font-bold shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
};
