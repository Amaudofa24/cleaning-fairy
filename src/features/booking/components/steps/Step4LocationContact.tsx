"use client";

import React, { useState } from "react";
import { useBooking } from "@/store/context/BookingContext";
import { TRANSPORT_ZONES } from "@/utils/pricingEngine";
import { MapPin, User, AlertTriangle } from "lucide-react";

export const Step4LocationContact = () => {
  const { formData, updateFormData, pricing, nextStep, prevStep } = useBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Flatten all transport locations for easy selection or lookup
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

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!formData.area.trim()) {
      newErrors.area = "Area is required.";
    } else if (!pricing.isLocationSupported) {
      newErrors.area = "Cleaning Fairy is not currently available in this area.";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter a valid phone number.";
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter a valid email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6 max-h-[480px] overflow-y-auto pr-1">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
          Where should we send your Fairy — and who should they ask for?
        </h2>
      </div>

      {/* Section A — Location */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider">
          <MapPin className="w-4 h-4" />
          <span>Section A — Location</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => updateFormData({ address: e.target.value })}
              placeholder="e.g. 15 Admiralty Way"
              className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:border-teal-400 ${
                errors.address ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.address && (
              <p className="text-xs text-red-400 mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Area / Location (Lagos) *
            </label>
            <select
              value={formData.area}
              onChange={(e) => updateFormData({ area: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl bg-slate-900 border text-white text-sm focus:outline-none focus:border-teal-400 ${
                errors.area ? "border-red-500" : "border-white/10"
              }`}
            >
              <option value="">Select Area</option>
              {allLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
              <option value="Other Area">Other / Outside Coverage</option>
            </select>
            {errors.area && (
              <div className="flex items-center gap-1 text-xs text-red-400 mt-1">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.area}</span>
              </div>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Estate / Building (Optional)
            </label>
            <input
              type="text"
              value={formData.building}
              onChange={(e) => updateFormData({ building: e.target.value })}
              placeholder="e.g. Oakwood Heights"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Landmark (Optional)
            </label>
            <input
              type="text"
              value={formData.landmark}
              onChange={(e) => updateFormData({ landmark: e.target.value })}
              placeholder="e.g. Opposite Dominos Pizza"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400"
            />
          </div>
        </div>
      </div>

      {/* Section B — Your Details */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider">
          <User className="w-4 h-4" />
          <span>Section B — Your Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              placeholder="Enter your full name"
              className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:border-teal-400 ${
                errors.fullName ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              placeholder="e.g. 08012345678"
              className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:border-teal-400 ${
                errors.phone ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.phone && (
              <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              placeholder="name@example.com"
              className={`w-full px-4 py-3 rounded-xl bg-black/40 border text-white text-sm focus:outline-none focus:border-teal-400 ${
                errors.email ? "border-red-500" : "border-white/10"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-gray-300 block mb-1">
              Anything your Fairy should know? (Optional)
            </label>
            <textarea
              rows={2}
              value={formData.customerNote}
              onChange={(e) => updateFormData({ customerNote: e.target.value })}
              placeholder="e.g. Please call when you arrive. There's a dog in the house."
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:border-teal-400 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
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
