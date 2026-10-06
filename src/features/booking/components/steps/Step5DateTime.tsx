"use client";

import React from "react";
import { useFormik } from "formik";
import { useBooking } from "@/store/context/BookingContext";
import { step5DateTimeValidation } from "@/validations";
import {
  getMinBookingDateString,
  getMaxBookingDateString,
  time24To12,
  time12To24,
} from "@/utils/misc";
import { Input } from "@/components/shared";
import { Calendar, Clock, Sparkles, ShieldAlert, Info } from "lucide-react";

const PRESET_TIME_SLOTS = [
  "8:00 AM",
  "10:00 AM",
  "12:00 PM",
  "2:00 PM",
  "4:00 PM",
];

export const Step5DateTime = () => {
  const { formData, updateFormData, nextStep, prevStep } = useBooking();

  const minBookingDate = React.useMemo(() => {
    return getMinBookingDateString();
  }, []);

  const maxBookingDate = React.useMemo(() => {
    return getMaxBookingDateString();
  }, []);

  const formik = useFormik({
    initialValues: {
      date: formData.date,
      timeSlot: formData.timeSlot,
    },
    validationSchema: step5DateTimeValidation,
    onSubmit: (values) => {
      updateFormData(values);
      nextStep();
    },
  });

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal) {
      const formatted = time24To12(rawVal);
      formik.setFieldValue("timeSlot", formatted);
      updateFormData({ timeSlot: formatted });
    }
  };

  const handlePresetSelect = (slot: string) => {
    formik.setFieldValue("timeSlot", slot);
    updateFormData({ timeSlot: slot });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateVal = e.target.value;
    formik.setFieldValue("date", dateVal);
    updateFormData({ date: dateVal });
  };

  const currentTime24 = time12To24(formik.values.timeSlot);

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          When should your Fairy arrive?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 mt-1">
          Pick your preferred date and specify an arrival time for your cleaner.
        </p>
      </div>

      <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-start gap-2.5 sm:gap-3 text-xs text-teal-900 dark:text-teal-200">
        <Info className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <p className="font-bold">Minimum 48 Hours Notice Required</p>
          <p className="text-2xs sm:text-xs text-slate-600 dark:text-teal-300/80">
            This gives our team adequate time to assign your vetted cleaner, confirm availability, arrange transportation, and prepare specialized equipment. You can book up to 90 days in advance.
          </p>
        </div>
      </div>

      <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3">
        <Input
          formik={formik}
          name="date"
          type="date"
          label="1. Select Date (48h Notice to 90 Days Max)"
          min={minBookingDate}
          max={maxBookingDate}
          onChange={handleDateChange}
          icon={<Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
          required
        />
      </div>

      <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-3 sm:space-y-4">
        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5">
          <div className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>2. Select or Pick Arrival Time *</span>
          </div>
          {formik.values.timeSlot && (
            <span className="self-start xs:self-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-2xs sm:text-xs font-bold bg-teal-500/15 text-teal-800 dark:text-teal-300 border border-teal-500/30 animate-in fade-in duration-200">
              <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
              <span>Selected: {formik.values.timeSlot}</span>
            </span>
          )}
        </div>

        <div>
          <span className="text-2xs sm:text-xs text-slate-500 dark:text-gray-400 block mb-2 font-medium">
            Quick slots:
          </span>
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
            {PRESET_TIME_SLOTS.map((slot) => {
              const isSelected = formik.values.timeSlot === slot;
              return (
                <button
                  type="button"
                  key={slot}
                  onClick={() => handlePresetSelect(slot)}
                  className={`py-2 sm:py-2.5 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    isSelected
                      ? "bg-teal-500 text-white dark:text-teal-950 border-teal-400 shadow-md shadow-teal-500/10"
                      : "bg-white dark:bg-white/5 text-slate-700 dark:text-gray-200 border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 hover:bg-slate-100 dark:hover:bg-white/10"
                  }`}
                >
                  <span>{slot}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200/80 dark:border-white/10">
          <Input
            name="timeSlot"
            type="time"
            label="Or pick a custom time"
            value={currentTime24}
            onChange={handleCustomTimeChange}
            onBlur={formik.handleBlur}
            step="900"
            helperText="Tip: Cleaners are available between 7:00 AM and 6:00 PM daily."
            error={formik.touched.timeSlot && formik.errors.timeSlot ? formik.errors.timeSlot : undefined}
          />
        </div>
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
          type="submit"
          className="fairy-btn-teal px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
