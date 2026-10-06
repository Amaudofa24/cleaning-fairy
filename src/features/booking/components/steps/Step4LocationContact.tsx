"use client";

import React from "react";
import { useFormik } from "formik";
import { useBooking } from "@/store/context/BookingContext";
import { step4LocationContactValidation } from "@/validations";
import { TRANSPORT_ZONES } from "@/utils/pricingEngine";
import { Input, Select, TextArea } from "@/components/shared";
import { MapPin, User, Phone, Mail, Building, Navigation } from "lucide-react";

export const Step4LocationContact = () => {
  const { formData, updateFormData, pricing, nextStep, prevStep } = useBooking();

  const allLocations = React.useMemo(() => {
    const list: string[] = [];
    TRANSPORT_ZONES.forEach((tz) => {
      tz.locations.forEach((loc) => {
        const formatted = loc.charAt(0).toUpperCase() + loc.slice(1);
        if (!list.includes(formatted)) {
          list.push(formatted);
        }
      });
    });
    return list.sort();
  }, []);

  const areaOptions = React.useMemo(() => {
    return [
      ...allLocations.map((loc) => ({ value: loc, label: loc })),
      { value: "Other Area", label: "Other / Outside Coverage" },
    ];
  }, [allLocations]);

  const formik = useFormik({
    initialValues: {
      address: formData.address,
      area: formData.area,
      building: formData.building,
      landmark: formData.landmark,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      customerNote: formData.customerNote,
    },
    validationSchema: step4LocationContactValidation,
    onSubmit: (values) => {
      if (!pricing.isLocationSupported) {
        formik.setFieldError(
          "area",
          "Cleaning Fairy is not currently available in this area."
        );
        return;
      }
      updateFormData(values);
      nextStep();
    },
  });

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArea = e.target.value;
    formik.setFieldValue("area", selectedArea);
    updateFormData({ area: selectedArea });
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-6 max-h-[480px] overflow-y-auto pr-1"
    >
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Where should we send your Fairy — and who should they ask for?
        </h2>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          <span>Section A — Location</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              formik={formik}
              name="address"
              label="Street Address"
              placeholder="e.g. 15 Admiralty Way"
              icon={<MapPin className="w-4 h-4" />}
              required
            />
          </div>

          <div>
            <Select
              formik={formik}
              name="area"
              label="Area / Location (Lagos)"
              placeholder="Select Area"
              options={areaOptions}
              onChange={handleAreaChange}
              required
            />
          </div>

          <div>
            <Input
              formik={formik}
              name="building"
              label="Estate / Building (Optional)"
              placeholder="e.g. Oakwood Heights"
              icon={<Building className="w-4 h-4" />}
            />
          </div>

          <div className="sm:col-span-2">
            <Input
              formik={formik}
              name="landmark"
              label="Landmark (Optional)"
              placeholder="e.g. Opposite Dominos Pizza"
              icon={<Navigation className="w-4 h-4" />}
            />
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-bold text-sm uppercase tracking-wider">
          <User className="w-4 h-4" />
          <span>Section B — Your Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              formik={formik}
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              icon={<User className="w-4 h-4" />}
              required
            />
          </div>

          <div>
            <Input
              formik={formik}
              name="phone"
              type="tel"
              label="Phone Number"
              placeholder="e.g. 08012345678"
              icon={<Phone className="w-4 h-4" />}
              required
            />
          </div>

          <div>
            <Input
              formik={formik}
              name="email"
              type="email"
              label="Email Address"
              placeholder="name@example.com"
              icon={<Mail className="w-4 h-4" />}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <TextArea
              formik={formik}
              name="customerNote"
              label="Anything your Fairy should know? (Optional)"
              placeholder="e.g. Please call when you arrive. There's a dog in the house."
              rows={2}
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2.5 rounded-full text-sm font-semibold text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 cursor-pointer"
        >
          Back
        </button>

        <button
          type="submit"
          className="fairy-btn-teal px-8 py-3 rounded-full text-sm font-bold shadow-lg cursor-pointer"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
