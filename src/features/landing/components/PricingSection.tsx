"use client";

import { useState } from "react";
import { Calculator, ArrowUpRight, Check } from "lucide-react";
import { PRICING_CONFIG } from "../constants";
import { useBooking } from "@/features/booking";

type ServiceTypeKey = keyof typeof PRICING_CONFIG.basePrices;
type HomeSizeKey = "1bed" | "2bed" | "3bed" | "4bed";

export const PricingSection = () => {
  const { openBookingModal } = useBooking();

  const [serviceType, setServiceType] = useState<ServiceTypeKey>("standard");
  const [homeSize, setHomeSize] = useState<HomeSizeKey>("2bed");
  const [addons, setAddons] = useState<Record<string, boolean>>({
    fridge: false,
    oven: false,
    balcony: false,
  });

  const { basePrices, addonsList, homeSizesList, serviceTypesList } = PRICING_CONFIG;

  const basePrice = basePrices[serviceType]?.[homeSize] || 18000;
  const addonsTotal = addonsList.reduce((acc, addon) => {
    return acc + (addons[addon.key] ? addon.price : 0);
  }, 0);

  const totalPrice = basePrice + addonsTotal;

  const handleBookConfiguration = () => {
    const mappedType = serviceType === "move" ? "move-in-out" : serviceType;
    openBookingModal(mappedType);
  };

  return (
    <section id="pricing" className="py-10 sm:py-24 bg-fairy-bg dark:bg-fairy-dark relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16">
          <h2 className="text-xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2 sm:mb-4">
            Transparent Pricing Upfront
          </h2>
          <p className="text-xs sm:text-lg text-slate-600 dark:text-gray-300 font-medium">
            No WhatsApp quotes or surprises. Configure your estimate in real-time.
          </p>
        </div>

        <div className="max-w-5xl mx-auto rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 md:p-10 bg-white dark:bg-fairy-surface border border-slate-200/80 dark:border-white/10 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-stretch">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 flex flex-col justify-between">
              <div>
                <label className="text-2xs sm:text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-2 sm:mb-3">
                  1. Select Service Type
                </label>
                <div className="grid grid-cols-3 gap-1 sm:gap-3">
                  {serviceTypesList.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setServiceType(item.key)}
                      className={`py-2 sm:py-3 px-1 sm:px-3 rounded-xl sm:rounded-2xl text-2xs xs:text-xs sm:text-sm font-bold border transition-all cursor-pointer text-center truncate ${
                        serviceType === item.key
                          ? "bg-fairy-deep text-fairy-teal border-fairy-deep dark:bg-fairy-teal dark:text-fairy-midnight dark:border-fairy-teal shadow-md scale-102"
                          : "bg-fairy-bg dark:bg-white/5 text-slate-700 dark:text-gray-300 border-slate-200 dark:border-white/10 hover:border-fairy-teal/30"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-2xs sm:text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-2 sm:mb-3">
                  2. Select Home Size
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2.5">
                  {homeSizesList.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setHomeSize(item.key)}
                      className={`py-2 sm:py-3 px-1.5 sm:px-2 rounded-xl sm:rounded-2xl text-2xs xs:text-xs font-bold border transition-all cursor-pointer text-center ${
                        homeSize === item.key
                          ? "bg-fairy-deep text-fairy-teal border-fairy-deep dark:bg-fairy-teal dark:text-fairy-midnight dark:border-fairy-teal shadow-md scale-102"
                          : "bg-fairy-bg dark:bg-white/5 text-slate-700 dark:text-gray-300 border-slate-200 dark:border-white/10 hover:border-fairy-teal/30"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-2xs sm:text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider block mb-2 sm:mb-3">
                  3. Optional Extra Add-ons (✨)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-3">
                  {addonsList.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() =>
                        setAddons((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key],
                        }))
                      }
                      className={`py-2 sm:py-3 px-2.5 sm:px-3.5 rounded-xl sm:rounded-2xl text-xs font-medium border flex items-center justify-between transition-all cursor-pointer ${
                        addons[item.key]
                          ? "bg-fairy-teal/15 text-fairy-deep dark:text-fairy-teal border-fairy-teal shadow-xs font-bold"
                          : "bg-fairy-bg dark:bg-white/5 text-slate-700 dark:text-gray-400 border-slate-200 dark:border-white/10 hover:border-slate-300"
                      }`}
                    >
                      <span className="font-semibold text-2xs sm:text-xs">{item.label}</span>
                      <span className="text-2xs sm:text-xs font-bold text-fairy-teal-dark dark:text-fairy-teal">
                        +₦{item.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-fairy-deep text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden border border-white/10">
              <div className="absolute inset-0 diamond-pattern opacity-40 pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/15 mb-3.5 sm:mb-5">
                  <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 sm:gap-2">
                    <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-fairy-teal" />
                    Price Summary
                  </span>
                  <span className="text-2xs sm:text-xs font-bold text-fairy-teal bg-fairy-teal/20 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                    Live Estimate
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/85">
                  <div className="flex justify-between items-center gap-2">
                    <span className="capitalize font-medium truncate">
                      {serviceType} Cleaning ({homeSize})
                    </span>
                    <span className="font-bold text-white shrink-0">
                      ₦{basePrice.toLocaleString()}
                    </span>
                  </div>

                  {addonsList
                    .filter((addon) => addons[addon.key])
                    .map((addon) => (
                      <div
                        key={addon.key}
                        className="flex justify-between items-center text-fairy-teal gap-2"
                      >
                        <span className="flex items-center gap-1.5 font-medium truncate">
                          <Check className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{addon.label}</span>
                        </span>
                        <span className="font-bold shrink-0">₦{addon.price.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="relative z-10 pt-3.5 sm:pt-6 mt-3.5 sm:mt-6 border-t border-white/15">
                <div className="flex justify-between items-baseline mb-3.5 sm:mb-6">
                  <span className="text-2xs sm:text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Total:
                  </span>
                  <span className="text-xl sm:text-4xl font-extrabold text-fairy-teal">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleBookConfiguration}
                  className="w-full fairy-btn-teal py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg group"
                >
                  <span>Book This Configuration</span>
                  <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 group-hover:rotate-45 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
