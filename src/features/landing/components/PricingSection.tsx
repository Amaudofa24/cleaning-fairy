"use client";

import { useState } from "react";
import { Sparkles, Calculator, ArrowRight } from "lucide-react";
import { PRICING_CONFIG } from "../constants";

type ServiceTypeKey = "standard" | "deep" | "move";
type HomeSizeKey = "1bed" | "2bed" | "3bed" | "4bed";
type AddonKey = "fridge" | "oven" | "balcony";

export const PricingSection = () => {
  const [serviceType, setServiceType] = useState<ServiceTypeKey>("standard");
  const [homeSize, setHomeSize] = useState<HomeSizeKey>("2bed");
  const [addons, setAddons] = useState<Record<AddonKey, boolean>>({
    fridge: false,
    oven: false,
    balcony: false,
  });

  const {
    basePrices,
    transportFee,
    addonsList,
    homeSizesList,
    serviceTypesList,
  } = PRICING_CONFIG;

  const basePrice = basePrices[serviceType][homeSize];
  const addonsTotal = addonsList.reduce((acc, addon) => {
    return acc + (addons[addon.key] ? addon.price : 0);
  }, 0);

  const totalPrice = basePrice + transportFee + addonsTotal;

  return (
    <section id="pricing" className="py-24 bg-fairy-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Price Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Transparent Pricing Upfront
          </h2>
          <p className="text-lg text-gray-400">
            No WhatsApp quotes or surprises. Configure your estimate in
            real-time.
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
                  1. Select Service Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {serviceTypesList.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setServiceType(item.key)}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                        serviceType === item.key
                          ? "bg-emerald-500 text-emerald-950 border-emerald-400"
                          : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
                  2. Select Home Size
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {homeSizesList.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setHomeSize(item.key)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                        homeSize === item.key
                          ? "bg-emerald-500 text-emerald-950 border-emerald-400"
                          : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-3">
                  3. Optional Extra Add-ons (✨)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {addonsList.map((item) => (
                    <button
                      key={item.key}
                      onClick={() =>
                        setAddons((prev) => ({
                          ...prev,
                          [item.key]: !prev[item.key],
                        }))
                      }
                      className={`py-2.5 px-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${
                        addons[item.key]
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50"
                          : "bg-white/5 text-gray-400 border-white/10"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-2xs font-bold text-emerald-400">
                        +₦{item.price.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-400" />
                    Price Summary
                  </span>
                  <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Live Estimate
                  </span>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  <div className="flex justify-between">
                    <span className="capitalize">
                      {serviceType} Cleaning ({homeSize})
                    </span>
                    <span className="font-semibold text-white">
                      ₦{basePrice.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Transport Fee</span>
                    <span className="font-semibold text-white">
                      ₦{transportFee.toLocaleString()}
                    </span>
                  </div>

                  {addonsList
                    .filter((addon) => addons[addon.key])
                    .map((addon) => (
                      <div
                        key={addon.key}
                        className="flex justify-between text-emerald-400"
                      >
                        <span>{addon.label} Add-on</span>
                        <span>₦{addon.price.toLocaleString()}</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-sm font-semibold text-gray-400">
                    Estimated Total:
                  </span>
                  <span className="text-3xl font-extrabold text-white">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>

                <a
                  href="#booking"
                  className="w-full fairy-btn-emerald py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group"
                >
                  <span>Book This Configuration</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
